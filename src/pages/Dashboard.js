import React, { useEffect, useState } from 'react';
import { Package, Clock, MapPin, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import api from '../utils/api';
import { toast } from 'sonner';

const STEPS = [
  { key: 'pending', label: 'Booked' },
  { key: 'ready_for_pickup', label: 'Ready for Pickup' },
  { key: 'pickup_completed', label: 'Picked Up' },
  { key: 'ready_to_wash', label: 'Washing' },
  { key: 'ready_for_drop', label: 'Out for Drop' },
  { key: 'drop_completed', label: 'Delivered' },
];

export const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-amber-50 text-amber-700 border-amber-200',
      confirmed: 'bg-amber-50 text-amber-700 border-amber-200',
      processing: 'bg-amber-50 text-amber-700 border-amber-200',
      ready_for_pickup: 'bg-blue-50 text-blue-700 border-blue-200',
      pickup_completed: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      ready_to_wash: 'bg-purple-50 text-purple-700 border-purple-200',
      ready_for_drop: 'bg-teal-50 text-teal-700 border-teal-200',
      drop_completed: 'bg-green-50 text-green-700 border-green-200',
      completed: 'bg-green-50 text-green-700 border-green-200',
      cancelled: 'bg-red-50 text-red-700 border-red-200',
    };
    return colors[status] || colors.pending;
  };

  const getStepIndex = (status) => {
    const idx = STEPS.findIndex(s => s.key === status);
    if (idx !== -1) return idx;
    if (status === 'confirmed' || status === 'processing') return 0;
    return -1;
  };

  const isActiveOrder = (status) => !['drop_completed', 'completed', 'cancelled'].includes(status);
  const isCompletedOrder = (status) => ['drop_completed', 'completed'].includes(status);

  const reorder = (order) => {
    const cartItems = order.items.map(item => ({
      product_id: item.product_id,
      product_name: item.product_name,
      category: item.category || '',
      subcategory: item.subcategory || '',
      business_id: item.business_id || '',
      business_name: item.business_name || '',
      price: item.price,
      quantity: item.quantity,
    }));
    localStorage.setItem('cart', JSON.stringify(cartItems));
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-600">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50" data-testid="dashboard-page">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-16" data-testid="no-orders">
            <Package className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600">No orders yet</p>
          </div>
        ) : (
          <div className="space-y-6" data-testid="orders-list">
            {orders.map(order => {
              const stepIndex = getStepIndex(order.status);
              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200"
                  data-testid={`order-${order.id}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2" data-testid={`order-id-${order.id}`}>Order #{order.order_number || order.id.slice(0, 8)}</h3>
                      <p className="text-sm text-slate-600">
                        {new Date(order.created_at).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <div>
                      <span
                        className={`inline-block px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}
                        data-testid={`order-status-${order.id}`}
                      >
                        {order.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </div>

                  {isActiveOrder(order.status) && stepIndex >= 0 && (
                    <div className="mb-4 overflow-x-auto">
                      <div className="flex items-center min-w-max gap-0">
                        {STEPS.map((step, i) => {
                          const done = i <= stepIndex;
                          return (
                            <React.Fragment key={step.key}>
                              <div className="flex flex-col items-center">
                                <div className={`w-3 h-3 rounded-full ${done ? 'bg-blue-600' : 'bg-slate-300'}`} />
                                <span className={`text-xs mt-1 whitespace-nowrap ${done ? 'text-blue-700 font-medium' : 'text-slate-400'}`}>
                                  {step.label}
                                </span>
                              </div>
                              {i < STEPS.length - 1 && (
                                <div className={`h-0.5 w-8 mb-4 ${i < stepIndex ? 'bg-blue-600' : 'bg-slate-200'}`} />
                              )}
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="bg-slate-50 rounded-xl p-4 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-slate-700">Address</span>
                    </div>
                    <p className="text-sm text-slate-800 ml-6">{order.address || 'N/A'}</p>
                    <p className="text-sm text-slate-500 ml-6">Postcode: {order.pin_code || 'N/A'}</p>
                  </div>

                  {order.customer_note && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <MessageSquare className="h-4 w-4 text-amber-600" />
                        <span className="text-sm font-medium text-amber-800">Your Note</span>
                      </div>
                      <p className="text-sm text-amber-700 ml-6 italic">{order.customer_note}</p>
                    </div>
                  )}

                  <div className="border-t border-slate-200 pt-4 mb-4">
                    <h4 className="text-sm font-medium text-slate-700 mb-2">Order Items:</h4>
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <div key={index} className="text-sm text-slate-600">
                          • {item.product_name} × {item.quantity} - £{(item.price * item.quantity).toFixed(2)}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-3.5 w-3.5 text-blue-600" />
                        <span className="text-blue-700 font-medium">Pickup</span>
                      </div>
                      <span className="block text-slate-800 font-medium">{order.pickup_date} at {order.pickup_time}</span>
                      {order.pickup_instruction && (
                        <div className="flex items-start gap-1.5 mt-1.5">
                          <MessageSquare className="h-3.5 w-3.5 text-slate-400 mt-0.5 shrink-0" />
                          <span className="text-slate-500 italic">{order.pickup_instruction}</span>
                        </div>
                      )}
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-3.5 w-3.5 text-green-600" />
                        <span className="text-green-700 font-medium">Delivery</span>
                      </div>
                      <span className="block text-slate-800 font-medium">{order.delivery_date} at {order.delivery_time}</span>
                      {order.delivery_instruction && (
                        <div className="flex items-start gap-1.5 mt-1.5">
                          <MessageSquare className="h-3.5 w-3.5 text-slate-400 mt-0.5 shrink-0" />
                          <span className="text-slate-500 italic">{order.delivery_instruction}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Total</span>
                      <div className="flex items-center gap-3">
                        {isCompletedOrder(order.status) && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => reorder(order)}
                            className="text-blue-600 border-blue-200 hover:bg-blue-50"
                          >
                            Reorder
                          </Button>
                        )}
                        <span className="text-xl font-bold text-blue-600" data-testid={`order-amount-${order.id}`}>
                          £{order.total_amount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
