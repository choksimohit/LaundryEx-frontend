import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, Clock, MapPin, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import api from '../utils/api';
import { toast } from 'sonner';

export const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all fields');
      return;
    }
    setSubmitting(true);
    try {
      await api.post('/contact/enquiry', form);
      setSent(true);
      setForm({ name: '', email: '', phone: '', message: '' });
      toast.success("Message sent! We'll get back to you soon.");
    } catch {
      toast.error('Failed to send message. Please try again or email us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-14 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Get in Touch</p>
          <h1 className="text-3xl font-bold text-slate-800">Contact Us</h1>
          <p className="text-slate-500 mt-3">We're here to help. Send us a message and we'll get back to you shortly.</p>
        </div>

        {/* Form — shown first */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-50 rounded-xl p-3 shrink-0">
              <Send className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-800">Send us a message</p>
              <p className="text-xs text-slate-500">We'll reply within a few hours</p>
            </div>
          </div>

          {sent ? (
            <div className="text-center py-8">
              <p className="text-2xl mb-2">✅</p>
              <p className="font-semibold text-slate-800">Message sent!</p>
              <p className="text-sm text-slate-500 mt-1">We'll get back to you at your email address soon.</p>
              <button onClick={() => setSent(false)} className="mt-4 text-sm text-blue-600 hover:underline">
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact-name" className="text-slate-700 font-medium text-sm">Your name</Label>
                  <Input
                    id="contact-name"
                    type="text"
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="mt-1 bg-white text-slate-900 border-slate-300 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contact-phone" className="text-slate-700 font-medium text-sm">
                    Phone <span className="text-slate-400 font-normal">(optional)</span>
                  </Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    placeholder="+44 7700 900000"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="mt-1 bg-white text-slate-900 border-slate-300 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="contact-email" className="text-slate-700 font-medium text-sm">Email address</Label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="mt-1 bg-white text-slate-900 border-slate-300 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <Label htmlFor="contact-message" className="text-slate-700 font-medium text-sm">Message</Label>
                <textarea
                  id="contact-message"
                  rows={5}
                  placeholder="How can we help you?"
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  style={{ WebkitTextFillColor: '#0f172a', boxShadow: '0 0 0px 1000px #ffffff inset' }}
                  className="mt-1 w-full rounded-md border border-slate-300 bg-white text-slate-900 px-3 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={submitting}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                {submitting ? 'Sending…' : 'Send Message'}
              </Button>
            </form>
          )}
        </div>

        {/* Contact details — below the form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a href="tel:+447777367076" className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex items-start gap-4">
            <div className="bg-blue-50 rounded-xl p-3 shrink-0">
              <Phone className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-800 mb-0.5">Call Us</p>
              <p className="text-blue-600 font-medium text-sm">+44 7777 367076</p>
              <p className="text-xs text-slate-400 mt-1">Mon–Sat 8am–8pm · Sun 9am–5pm</p>
            </div>
          </a>

          <a href="mailto:support@laundry-express.co.uk" className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex items-start gap-4">
            <div className="bg-blue-50 rounded-xl p-3 shrink-0">
              <Mail className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-800 mb-0.5">Email Us</p>
              <p className="text-blue-600 font-medium text-sm break-all">support@laundry-express.co.uk</p>
              <p className="text-xs text-slate-400 mt-1">We typically reply within a few hours</p>
            </div>
          </a>

          <a href="https://wa.me/447777367076" target="_blank" rel="noopener noreferrer" className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-green-300 hover:shadow-md transition-all flex items-start gap-4">
            <div className="bg-green-50 rounded-xl p-3 shrink-0">
              <MessageCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-800 mb-0.5">WhatsApp</p>
              <p className="text-green-600 font-medium text-sm">+44 7777 367076</p>
              <p className="text-xs text-slate-400 mt-1">Chat with us for quick answers</p>
            </div>
          </a>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 flex items-start gap-4">
            <div className="bg-blue-50 rounded-xl p-3 shrink-0">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-800 mb-0.5">Working Hours</p>
              <p className="text-sm text-slate-600">Mon–Sat: <span className="font-medium text-slate-800">8:00am – 8:00pm</span></p>
              <p className="text-sm text-slate-600">Sunday: <span className="font-medium text-slate-800">9:00am – 5:00pm</span></p>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-white rounded-2xl p-5 border border-slate-200 flex items-start gap-4">
          <div className="bg-blue-50 rounded-xl p-3 shrink-0">
            <MapPin className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="font-semibold text-slate-800 mb-0.5">Service Area</p>
            <p className="text-sm text-slate-600">Colchester &amp; Surrounding Areas, Essex, UK</p>
            <p className="text-xs text-slate-400 mt-1">Enter your postcode on our homepage to check availability in your area.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
