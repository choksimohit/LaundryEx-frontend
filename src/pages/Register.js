import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import api from '../utils/api';
import { setAuth } from '../utils/auth';
import { toast } from 'sonner';

export const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/auth/register', formData);
      setAuth(response.data.token, response.data.user);
      toast.success('Registration successful!');
      navigate('/services');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await api.post('/auth/google', { token: credentialResponse.credential });
      setAuth(response.data.token, response.data.user);
      toast.success('Account created with Google!');
      navigate('/services');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Google sign-in failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 flex items-center justify-center px-4" data-testid="register-page">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-lg border border-white/20 shadow-2xl shadow-slate-200/50 rounded-3xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold mb-2 text-slate-800">Create Account</h2>
            <p className="text-slate-600">Join Laundry Express today</p>
          </div>

          {/* Google Sign-Up */}
          <div className="flex justify-center mb-6">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error('Google sign-in failed')}
              width="368"
              text="signup_with"
              shape="pill"
              theme="outline"
            />
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs text-slate-400 uppercase tracking-widest">
              <span className="bg-white px-3">or sign up with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className="h-12 rounded-xl mt-2"
                data-testid="name-input"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="h-12 rounded-xl mt-2"
                data-testid="email-input"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+44 1234 567890"
                value={formData.phone}
                onChange={handleChange}
                required
                className="h-12 rounded-xl mt-2"
                data-testid="phone-input"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
                className="h-12 rounded-xl mt-2"
                data-testid="password-input"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-full bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all"
              data-testid="register-submit-button"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 font-medium hover:underline" data-testid="login-link">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
