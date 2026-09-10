import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, CreditCard, MessageSquare } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { DatePickerField } from '../components/ui/date-picker-field';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import api from '../utils/api';
import { toast } from 'sonner';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const TIME_SLOTS = [
  { value: '16:30-18:30', label: '4:30 PM – 6:30 PM', startHour: 16, startMinute: 30 },
  { value: '18:30-20:30', label: '6:30 PM – 8:30 PM', startHour: 18, startMinute: 30 },
];

const PICKUP_LEAD_HOURS = 12;
const DELIVERY_LEAD_HOURS = 48;

const toDateInputString = (d) => d.toISOString().split('T')[0];

const slotStartDateTime = (dateStr, slot) => {
  const d = new Date(`${dateStr}T00:00:00`);
  d.setHours(slot.startHour, slot.startMinute || 0, 0, 0);
  return d;
};

// Earliest date (today or later) that has at least one slot starting on/after the threshold.
const earliestDateWithSlot = (threshold, fromDate) => {
  const d = new Date(fromDate);
  d.setHours(0, 0, 0, 0);
  for (let i = 0; i < 30; i++) {
    const dateStr = toDateInputString(d);
    if (TIME_SLOTS.some(slot => slotStartDateTime(dateStr, slot) >= threshold)) {
      return dateStr;
    }
    d.setDate(d.getDate() + 1);
  }
  return toDateInputString(d);
};

// Pickup must start at least PICKUP_LEAD_HOURS from now.
const getMinPickupDate = () => {
  const threshold = new Date(Date.now() + PICKUP_LEAD_HOURS * 60 * 60 * 1000);
  return earliestDateWithSlot(threshold, new Date());
};

const getValidPickupSlots = (selectedDate) => {
  if (!selectedDate) return TIME_SLOTS;
  const threshold = new Date(Date.now() + PICKUP_LEAD_HOURS * 60 * 60 * 1000);
  return TIME_SLOTS.filter(slot => slotStartDateTime(selectedDate, slot) >= threshold);
};

// Delivery must start at least DELIVERY_LEAD_HOURS after the chosen pickup slot's start.
const getMinDeliveryDate = (pickupDate, pickupTime) => {
  if (!pickupDate) return '';
  const pickupSlot = TIME_SLOTS.find(s => s.value === pickupTime) || TIME_SLOTS[0];
  const pickupStart = slotStartDateTime(pickupDate, pickupSlot);
  const threshold = new Date(pickupStart.getTime() + DELIVERY_LEAD_HOURS * 60 * 60 * 1000);
  return earliestDateWithSlot(threshold, new Date(`${pickupDate}T00:00:00`));
};

const getValidDeliverySlots = (pickupDate, pickupTime, deliveryDate) => {
  if (!pickupDate || !deliveryDate) return TIME_SLOTS;
  const pickupSlot = TIME_SLOTS.find(s => s.value === pickupTime) || TIME_SLOTS[0];
  const pickupStart = slotStartDateTime(pickupDate, pickupSlot);
  const threshold = new Date(pickupStart.getTime() + DELIVERY_LEAD_HOURS * 60 * 60 * 1000);
  return TIME_SLOTS.filter(slot => slotStartDateTime(deliveryDate, slot) >= threshold);
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    pickup_date: '',
    pickup_time: '',
    pickup_instruction: '',
    delivery_date: '',
    delivery_time: '',
    delivery_instruction: '',
    address: '',
    pin_code: '',
    payment_method: 'cod',
    customer_note: '',
  });
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    const savedPinCode = sessionStorage.getItem('pinCode');
    
    const minPickup = getMinPickupDate();
    const validSlots = getValidPickupSlots(minPickup);
    const defaultPickupSlot = validSlots[0]?.value || TIME_SLOTS[0].value;

    const minDelivery = getMinDeliveryDate(minPickup, defaultPickupSlot);
    const validDeliverySlots = getValidDeliverySlots(minPickup, defaultPickupSlot, minDelivery);
    const defaultDeliverySlot = validDeliverySlots[0]?.value || TIME_SLOTS[0].value;

    setFormData(prev => ({
      ...prev,
      pin_code: savedPinCode || '',
      pickup_date: minPickup,
      pickup_time: defaultPickupSlot,
      pickup_instruction: 'in-person',
      delivery_date: minDelivery,
      delivery_time: defaultDeliverySlot,
      delivery_instruction: 'ring-wait'
    }));
  }, []);

  // Recompute delivery_date/delivery_time so they still satisfy the 48h-after-pickup rule.
  const reconcileDelivery = (updates, prev) => {
    const pickupDate = updates.pickup_date ?? prev.pickup_date;
    const pickupTime = updates.pickup_time ?? prev.pickup_time;
    const minDelivery = getMinDeliveryDate(pickupDate, pickupTime);
    const currentDeliveryDate = updates.delivery_date ?? prev.delivery_date;
    const deliveryDate = (currentDeliveryDate && currentDeliveryDate >= minDelivery) ? currentDeliveryDate : minDelivery;
    const validDeliverySlots = getValidDeliverySlots(pickupDate, pickupTime, deliveryDate);
    const currentDeliveryTime = updates.delivery_time ?? prev.delivery_time;
    const deliveryTimeStillValid = validDeliverySlots.some(s => s.value === currentDeliveryTime);
    return {
      delivery_date: deliveryDate,
      delivery_time: deliveryTimeStillValid ? currentDeliveryTime : (validDeliverySlots[0]?.value || TIME_SLOTS[0].value),
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'pickup_date') {
      setFormData(prev => {
        const validSlots = getValidPickupSlots(value);
        const slotStillValid = validSlots.some(s => s.value === prev.pickup_time);
        const updates = {
          pickup_date: value,
          pickup_time: slotStillValid ? prev.pickup_time : (validSlots[0]?.value || ''),
        };
        return { ...prev, ...updates, ...reconcileDelivery(updates, prev) };
      });
    } else if (name === 'delivery_date') {
      setFormData(prev => {
        const validDeliverySlots = getValidDeliverySlots(prev.pickup_date, prev.pickup_time, value);
        const slotStillValid = validDeliverySlots.some(s => s.value === prev.delivery_time);
        return {
          ...prev,
          delivery_date: value,
          delivery_time: slotStillValid ? prev.delivery_time : (validDeliverySlots[0]?.value || TIME_SLOTS[0].value),
        };
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePickupTimeChange = (value) => {
    setFormData(prev => {
      const updates = { pickup_time: value };
      return { ...prev, ...updates, ...reconcileDelivery(updates, prev) };
    });
  };

  // Closure dates: 19 Apr - 25 Apr 2026
  const closureStart = '2026-04-19';
  const closureEnd = '2026-04-25';

  const isDateInClosure = (dateStr) => {
    if (!dateStr) return false;
    return dateStr >= closureStart && dateStr <= closureEnd;
  };

  const pickupInClosure = isDateInClosure(formData.pickup_date);
  const deliveryInClosure = isDateInClosure(formData.delivery_date);

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = promoApplied ? +(totalAmount * promoDiscount / 100).toFixed(2) : 0;
  const afterDiscount = totalAmount - discount;
  const deliveryCharge = afterDiscount >= 30 ? 0 : 4.45;
  const grandTotal = afterDiscount + deliveryCharge;

  const applyPromoCode = async () => {
    if (!promoCode.trim()) return;
    setPromoLoading(true);
    setPromoError('');
    try {
      const res = await api.post('/promo/validate', { code: promoCode.trim() });
      setPromoDiscount(res.data.discount_percent);
      setPromoApplied(true);
      toast.success(`Promo code applied! ${res.data.discount_percent}% off your order.`);
    } catch (err) {
      setPromoApplied(false);
      setPromoDiscount(0);
      setPromoError(err.response?.data?.detail || 'Invalid promo code');
    } finally {
      setPromoLoading(false);
    }
  };

  const removePromoCode = () => {
    setPromoDiscount(0);
    setPromoCode('');
    setPromoApplied(false);
    setPromoError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (totalAmount < 15) {
      toast.error('Minimum order value is £15. Please add more items to continue.');
      return;
    }
    setLoading(true);

    try {
      const orderData = {
        items: cart,
        ...formData,
        total_amount: grandTotal,
        delivery_charge: deliveryCharge,
        promo_code: promoApplied ? 'WELCOME20' : '',
        discount_amount: discount,
      };

      // Handle Stripe payment
      if (formData.payment_method === 'stripe') {
        if (!stripe || !elements) {
          toast.error('Stripe not loaded. Please refresh the page.');
          setLoading(false);
          return;
        }

        // Create payment intent
        const intentResponse = await api.post('/payment/create-intent', {
          amount: grandTotal,
          order_id: 'temp_' + Date.now()
        });

        // Confirm card payment
        const { error, paymentIntent } = await stripe.confirmCardPayment(
          intentResponse.data.client_secret,
          {
            payment_method: {
              card: elements.getElement(CardElement),
            },
          }
        );

        if (error) {
          toast.error(error.message || 'Payment failed');
          setLoading(false);
          return;
        }

        if (paymentIntent.status === 'succeeded') {
          // Create order after successful payment
          const response = await api.post('/orders', orderData);
          toast.success('Payment successful! Order placed.');
          localStorage.removeItem('cart');
          navigate(`/order-confirmation/${response.data.order_id}`);
        }
      } else {
        // Handle COD payment
        const response = await api.post('/orders', orderData);
        toast.success('Order placed successfully!');
        localStorage.removeItem('cart');
        navigate(`/order-confirmation/${response.data.order_id}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    navigate('/services');
    return null;
  }

  const validPickupSlots = getValidPickupSlots(formData.pickup_date);
  const validDeliverySlots = getValidDeliverySlots(formData.pickup_date, formData.pickup_time, formData.delivery_date);
  const minDeliveryDate = getMinDeliveryDate(formData.pickup_date, formData.pickup_time);

  return (
    <div className="min-h-screen bg-slate-50" data-testid="checkout-page">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-semibold">Collection Date & Time</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="pickup_date">Collection Date *</Label>
                    <DatePickerField
                      id="pickup_date"
                      name="pickup_date"
                      value={formData.pickup_date}
                      onChange={handleChange}
                      min={getMinPickupDate()}
                      className={`h-12 rounded-xl mt-2 ${pickupInClosure ? 'border-red-400 bg-red-50' : ''}`}
                      data-testid="pickup-date-input"
                    />
                    {pickupInClosure && (
                      <p className="text-red-600 text-sm mt-1 font-medium" data-testid="pickup-closure-warning">
                        We are closed 19th-25th April for scheduled maintenance. Please select a date after 25th April.
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="pickup_time">Collection Slot *</Label>
                    <Select
                      value={formData.pickup_time}
                      onValueChange={handlePickupTimeChange}
                      required
                    >
                      <SelectTrigger className="h-12 rounded-xl mt-2" data-testid="pickup-slot-select">
                        <SelectValue placeholder="- Select Slot -" />
                      </SelectTrigger>
                      <SelectContent>
                        {validPickupSlots.map(slot => (
                          <SelectItem key={slot.value} value={slot.value}>{slot.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="pickup_instruction">Collection Instruction *</Label>
                    <Select
                      value={formData.pickup_instruction || ''}
                      onValueChange={(value) => setFormData({ ...formData, pickup_instruction: value })}
                      required
                    >
                      <SelectTrigger className="h-12 rounded-xl mt-2" data-testid="pickup-instruction-select">
                        <SelectValue placeholder="— How should driver collect? —" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in-person">Driver collects from you (in person)</SelectItem>
                        <SelectItem value="doorstep">Leave outside (doorstep/mailbox)</SelectItem>
                        <SelectItem value="reception">Leave at reception/porter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <div className="flex items-center gap-2 mb-6">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-semibold">Delivery Date & Time</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="delivery_date">Delivery Date *</Label>
                    <DatePickerField
                      id="delivery_date"
                      name="delivery_date"
                      value={formData.delivery_date}
                      min={minDeliveryDate}
                      onChange={handleChange}
                      className={`h-12 rounded-xl mt-2 ${deliveryInClosure ? 'border-red-400 bg-red-50' : ''}`}
                      data-testid="delivery-date-input"
                    />
                    {deliveryInClosure && (
                      <p className="text-red-600 text-sm mt-1 font-medium" data-testid="delivery-closure-warning">
                        We are closed 19th-25th April for scheduled maintenance. Please select a date after 25th April.
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="delivery_time">Delivery Slot *</Label>
                    <Select
                      value={formData.delivery_time}
                      onValueChange={(value) => setFormData({ ...formData, delivery_time: value })}
                      required
                    >
                      <SelectTrigger className="h-12 rounded-xl mt-2" data-testid="delivery-slot-select">
                        <SelectValue placeholder="- Select Slot -" />
                      </SelectTrigger>
                      <SelectContent>
                        {validDeliverySlots.map(slot => (
                          <SelectItem key={slot.value} value={slot.value}>{slot.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="delivery_instruction">Delivery Instruction *</Label>
                    <Select
                      value={formData.delivery_instruction || ''}
                      onValueChange={(value) => setFormData({ ...formData, delivery_instruction: value })}
                      required
                    >
                      <SelectTrigger className="h-12 rounded-xl mt-2" data-testid="delivery-instruction-select">
                        <SelectValue placeholder="— How should driver deliver? —" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ring-wait">Ring bell and wait</SelectItem>
                        <SelectItem value="ring-leave">Ring bell and leave</SelectItem>
                        <SelectItem value="reception">Leave at reception/porter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <div className="flex items-center gap-2 mb-6">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-semibold">Delivery Address</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address">Full Address</Label>
                    <Input
                      id="address"
                      name="address"
                      type="text"
                      placeholder="Enter your full address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="h-12 rounded-xl mt-2"
                      data-testid="address-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pin_code">Postcode</Label>
                    <Input
                      id="pin_code"
                      name="pin_code"
                      type="text"
                      value={formData.pin_code}
                      onChange={handleChange}
                      required
                      className="h-12 rounded-xl mt-2"
                      data-testid="pincode-input"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <div className="flex items-center gap-2 mb-6">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-semibold">Additional Notes</h2>
                </div>
                <div>
                  <Label htmlFor="customer_note">Any special instructions? (Optional)</Label>
                  <textarea
                    id="customer_note"
                    name="customer_note"
                    placeholder="E.g. stain on collar of blue shirt, handle with care, use fragrance-free detergent..."
                    value={formData.customer_note}
                    onChange={handleChange}
                    rows={3}
                    className="w-full mt-2 px-3 py-2 border border-slate-200 rounded-xl text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
                    data-testid="customer-note-input"
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-semibold">Payment Method</h2>
                </div>
                <RadioGroup
                  value={formData.payment_method}
                  onValueChange={(value) => setFormData({ ...formData, payment_method: value })}
                  data-testid="payment-method-group"
                >
                  <div className={`flex items-center space-x-2 p-4 border-2 rounded-xl ${formData.payment_method === 'cod' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                    <RadioGroupItem value="cod" id="cod" data-testid="payment-method-cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="font-semibold text-slate-800">Cash on Delivery</div>
                      <div className="text-sm text-slate-600 mt-1">Pay when your order is delivered</div>
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-2 p-4 border-2 rounded-xl ${formData.payment_method === 'stripe' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                    <RadioGroupItem value="stripe" id="stripe" data-testid="payment-method-stripe" />
                    <Label htmlFor="stripe" className="flex-1 cursor-pointer">
                      <div className="font-semibold text-slate-800">Credit/Debit Card</div>
                      <div className="text-sm text-slate-600 mt-1">Secure payment via Stripe</div>
                    </Label>
                  </div>
                </RadioGroup>

                {formData.payment_method === 'stripe' && (
                  <div className="mt-6 p-4 border-2 border-slate-200 rounded-xl">
                    <Label className="mb-3 block text-sm font-medium">Card Details</Label>
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: '16px',
                            color: '#1e293b',
                            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                            '::placeholder': {
                              color: '#94a3b8',
                            },
                          },
                          invalid: {
                            color: '#ef4444',
                          },
                        },
                      }}
                    />
                    <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      <span>Secured by Stripe</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center gap-6 py-3 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">🔒 Secure Payment</span>
                <span className="flex items-center gap-1.5">🌿 Eco-Friendly</span>
                <span className="flex items-center gap-1.5">✅ DBS-Checked Staff</span>
              </div>

              <Button
                type="submit"
                disabled={loading || pickupInClosure || deliveryInClosure}
                className="w-full h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 transition-all disabled:opacity-50"
                data-testid="place-order-button"
              >
                {loading ? 'Processing...' : formData.payment_method === 'stripe' ? `Pay £${grandTotal.toFixed(2)}` : `Place Order - £${grandTotal.toFixed(2)}`}
              </Button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {cart.map(item => (
                  <div key={item.product_id} className="flex justify-between text-sm" data-testid={`summary-item-${item.product_id}`}>
                    <span className="text-slate-600">
                      {item.product_name} × {item.quantity}
                    </span>
                    <span className="font-medium">£{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-200 pt-4 space-y-3">
                {/* Promo Code */}
                <div className="pb-3">
                  {promoApplied ? (
                    <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-3 py-2" data-testid="promo-applied">
                      <div className="flex items-center gap-2">
                        <span className="text-green-700 font-semibold text-sm">{promoCode.toUpperCase()}</span>
                        <span className="text-green-600 text-xs">(-{promoDiscount}%)</span>
                      </div>
                      <button
                        type="button"
                        onClick={removePromoCode}
                        className="text-red-500 hover:text-red-700 text-xs font-medium"
                        data-testid="remove-promo-button"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Promo code"
                          value={promoCode}
                          onChange={(e) => { setPromoCode(e.target.value); setPromoError(''); }}
                          className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          data-testid="promo-code-input"
                        />
                        <button
                          type="button"
                          onClick={applyPromoCode}
                          disabled={promoLoading}
                          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60"
                          data-testid="apply-promo-button"
                        >
                          {promoLoading ? '...' : 'Apply'}
                        </button>
                      </div>
                      {promoError && <p className="text-red-500 text-xs mt-1" data-testid="promo-error">{promoError}</p>}
                    </div>
                  )}
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-medium" data-testid="checkout-subtotal">£{totalAmount.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Discount ({promoDiscount}%)</span>
                    <span className="font-medium text-green-600" data-testid="checkout-discount">-£{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Delivery</span>
                  {deliveryCharge > 0 ? (
                    <span className="font-medium text-amber-600" data-testid="checkout-delivery-charge">£{deliveryCharge.toFixed(2)}</span>
                  ) : (
                    <span className="font-medium text-green-600" data-testid="checkout-delivery-charge">FREE</span>
                  )}
                </div>
                <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold text-blue-600" data-testid="checkout-total">£{grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};