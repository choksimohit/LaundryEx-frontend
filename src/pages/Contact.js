import React from 'react';
import { Phone, Mail, MessageCircle, Clock, MapPin } from 'lucide-react';

export const Contact = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-14 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Get in Touch</p>
          <h1 className="text-3xl font-bold text-slate-800">Contact Us</h1>
          <p className="text-slate-500 mt-3">We're here to help. Reach out via any of the options below.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <a href="tel:+447777367076" className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex items-start gap-4">
            <div className="bg-blue-50 rounded-xl p-3 shrink-0">
              <Phone className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-800 mb-1">Call Us</p>
              <p className="text-blue-600 font-medium">+44 7777 367076</p>
              <p className="text-xs text-slate-400 mt-1">Mon–Sat 8am–8pm · Sun 9am–5pm</p>
            </div>
          </a>

          <a href="mailto:support@laundry-express.co.uk" className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex items-start gap-4">
            <div className="bg-blue-50 rounded-xl p-3 shrink-0">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-800 mb-1">Email Us</p>
              <p className="text-blue-600 font-medium break-all">support@laundry-express.co.uk</p>
              <p className="text-xs text-slate-400 mt-1">We typically reply within a few hours</p>
            </div>
          </a>

          <a href="https://wa.me/447777367076" target="_blank" rel="noopener noreferrer" className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-green-300 hover:shadow-md transition-all flex items-start gap-4">
            <div className="bg-green-50 rounded-xl p-3 shrink-0">
              <MessageCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-800 mb-1">WhatsApp</p>
              <p className="text-green-600 font-medium">+44 7777 367076</p>
              <p className="text-xs text-slate-400 mt-1">Chat with us directly for quick answers</p>
            </div>
          </a>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 flex items-start gap-4">
            <div className="bg-blue-50 rounded-xl p-3 shrink-0">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-800 mb-1">Working Hours</p>
              <p className="text-sm text-slate-600">Mon–Sat: <span className="font-medium">8:00am – 8:00pm</span></p>
              <p className="text-sm text-slate-600">Sunday: <span className="font-medium">9:00am – 5:00pm</span></p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-2xl p-6 border border-slate-200 flex items-start gap-4">
          <div className="bg-blue-50 rounded-xl p-3 shrink-0">
            <MapPin className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="font-semibold text-slate-800 mb-1">Service Area</p>
            <p className="text-sm text-slate-600">Colchester &amp; Surrounding Areas, Essex, UK</p>
            <p className="text-xs text-slate-400 mt-1">Enter your postcode on our homepage to check availability in your area.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
