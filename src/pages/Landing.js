import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import api from '../utils/api';
import { toast } from 'sonner';
import { GoogleReviews } from '../components/GoogleReviews';

export const Landing = () => {
  const [pinCode, setPinCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [notifyState, setNotifyState] = useState({ show: false, email: '', submitting: false, done: false });
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/blog').then(res => {
      setBlogPosts((res.data || []).slice(0, 3));
    }).catch(() => {});
  }, []);

  const checkAvailability = async () => {
    if (!pinCode || pinCode.length < 3) {
      toast.error('Please enter a valid postcode');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/pincode/check', { pin_code: pinCode.toUpperCase() });
      if (response.data.available) {
        toast.success('Service is available!');
        sessionStorage.setItem('pinCode', pinCode.toUpperCase());
        sessionStorage.setItem('businesses', JSON.stringify(response.data.businesses));
        navigate('/order');
      } else {
        setNotifyState({ show: true, email: '', submitting: false, done: false });
      }
    } catch (error) {
      toast.error('Failed to check availability');
    } finally {
      setLoading(false);
    }
  };

  const submitNotify = async () => {
    if (!notifyState.email) return;
    setNotifyState(s => ({ ...s, submitting: true }));
    try {
      await api.post('/leads/out-of-area', { email: notifyState.email, postcode: pinCode.toUpperCase() });
      setNotifyState(s => ({ ...s, submitting: false, done: true }));
    } catch {
      toast.error('Failed to save. Please try again.');
      setNotifyState(s => ({ ...s, submitting: false }));
    }
  };

  return (
    <>
      <div className="relative min-h-screen" data-testid="landing-page">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/hero-laundry.webp)',
            filter: 'brightness(0.4)'
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-4 md:mb-6 text-white" data-testid="hero-title">
              Colchester's Premium
              <br />
              Doorstep Laundry &
              <br />
              Dry Cleaning
            </h1>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 sm:p-6 shadow-2xl mt-6 md:mt-8 max-w-md" data-testid="pincode-checker">
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-white">Add your Postcode</h3>
              <p className="text-xs text-white/80 mb-3">Please add postcode (eg: CO27FQ)</p>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter postcode"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkAvailability()}
                  className="h-10 sm:h-12 bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:border-white/50 text-sm sm:text-base"
                  data-testid="pincode-input"
                />
                <Button
                  onClick={checkAvailability}
                  disabled={loading}
                  className="h-10 sm:h-12 px-4 sm:px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium whitespace-nowrap text-sm sm:text-base"
                  data-testid="check-availability-button"
                >
                  Check
                </Button>
              </div>
            </div>

            {notifyState.show && (
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 sm:p-6 shadow-2xl mt-3 max-w-md">
                {notifyState.done ? (
                  <p className="text-white text-sm font-medium">✅ Got it! We'll let you know when we reach {pinCode.toUpperCase()}.</p>
                ) : (
                  <>
                    <p className="text-white text-sm font-semibold mb-1">We don't cover {pinCode.toUpperCase()} yet</p>
                    <p className="text-white/70 text-xs mb-3">Leave your email and we'll notify you when we expand to your area.</p>
                    <div className="flex gap-2">
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={notifyState.email}
                        onChange={e => setNotifyState(s => ({ ...s, email: e.target.value }))}
                        onKeyPress={e => e.key === 'Enter' && submitNotify()}
                        className="h-10 bg-white/20 border-white/30 text-white placeholder:text-white/60 text-sm"
                      />
                      <Button
                        onClick={submitNotify}
                        disabled={notifyState.submitting}
                        className="h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm whitespace-nowrap"
                      >
                        {notifyState.submitting ? '...' : 'Notify me'}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="mt-5 max-w-md animate-pulse-slow" data-testid="offer-banner">
              <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-lg p-4 shadow-lg border border-emerald-400/40 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/5 rounded-lg" />
                <div className="relative flex items-center gap-3">
                  <div className="text-center shrink-0">
                    <span className="text-3xl sm:text-4xl font-black text-white drop-shadow-md leading-none">20%</span>
                    <p className="text-xs font-bold text-white/90 tracking-widest uppercase">OFF</p>
                  </div>
                  <div className="border-l-2 border-white/40 pl-3">
                    <p className="text-sm sm:text-base font-bold text-white">On Your First Order!</p>
                    <p className="text-xs text-white/90 mt-0.5">Use code <span className="font-bold bg-white/25 px-1.5 py-0.5 rounded tracking-wider">WELCOME20</span> at checkout</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {blogPosts.length > 0 && (
        <section className="py-14 px-6 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">From the Blog</p>
                <h2 className="text-2xl font-bold text-slate-800">Laundry Tips & News</h2>
              </div>
              <Link to="/blog" className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post, i) => (
                <Link
                  key={i}
                  to={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all duration-200 overflow-hidden flex flex-col"
                >
                  {post.cover_image_url && (
                    <img src={post.cover_image_url} alt={post.title} className="w-full h-44 object-cover" />
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-semibold text-slate-800 text-base leading-snug mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>
                    )}
                    <div className="flex items-center gap-1 mt-4 text-xs font-medium text-blue-600">
                      Read more <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <GoogleReviews />

      <a
        href="https://wa.me/447777367076"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl z-50 flex items-center gap-2"
        data-testid="whatsapp-button"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="font-medium">Chat on WhatsApp</span>
      </a>
    </>
  );
};
