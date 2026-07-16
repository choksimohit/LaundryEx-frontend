import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import api from '../utils/api';
import { setAuth } from '../utils/auth';
import { toast } from 'sonner';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const afterLogin = (data) => {
    setAuth(data.token, data.user);
    toast.success('Login successful!');
    if (data.user.role.includes('admin')) {
      navigate('/admin');
    } else {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      navigate(cart.length > 0 ? '/cart' : '/services');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      afterLogin(response.data);
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await api.post('/auth/google', { token: credentialResponse.credential });
      afterLogin(response.data);
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Google sign-in failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 flex items-center justify-center px-4" data-testid="login-page">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-lg border border-white/20 shadow-2xl shadow-slate-200/50 rounded-3xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold mb-2 text-slate-800">Welcome Back</h2>
            <p className="text-slate-600">Login to your account</p>
          </div>

          {/* Google Sign-In */}
          <div className="flex justify-center mb-6">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error('Google sign-in failed')}
              width="368"
              text="signin_with"
              shape="pill"
              theme="outline"
            />
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs text-slate-400 uppercase tracking-widest">
              <span className="bg-white px-3">or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 rounded-xl mt-2"
                data-testid="email-input"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 rounded-xl mt-2"
                data-testid="password-input"
              />
              <div className="text-right mt-2">
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline" data-testid="forgot-password-link">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-full bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all"
              data-testid="login-submit-button"
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 font-medium hover:underline" data-testid="register-link">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
