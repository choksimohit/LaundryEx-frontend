import React from 'react';
import { Link } from 'react-router-dom';

export const PaymentSuccess = () => (
  <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center px-4">
    <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Payment Successful!</h1>
      <p className="text-slate-500 mb-8">
        Thank you — your payment has been received. We'll be in touch with updates on your laundry order.
      </p>
      <div className="space-y-3">
        <Link
          to="/login"
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          Track My Order
        </Link>
        <Link
          to="/"
          className="block w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-3 rounded-xl transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  </div>
);
