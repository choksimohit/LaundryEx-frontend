import React from 'react';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white mt-auto" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Contact Us */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4 border-b-2 border-yellow-400 inline-block pb-1">
              Contact Us
            </h3>
            <div className="space-y-4 mt-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-yellow-400 rounded-full p-2">
                    <Phone className="h-4 w-4 text-blue-900" />
                  </div>
                  <span className="font-semibold text-sm md:text-base">Call Us</span>
                </div>
                <a href="tel:+447777367076" className="text-white hover:text-yellow-400 transition-colors ml-10 text-sm md:text-base">
                  +44 7777 367076
                </a>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-yellow-400 rounded-full p-2">
                    <Mail className="h-4 w-4 text-blue-900" />
                  </div>
                  <span className="font-semibold text-sm md:text-base">Email Us</span>
                </div>
                <a href="mailto:support@laundry-express.co.uk" className="text-white hover:text-yellow-400 transition-colors ml-10 break-all text-sm md:text-base">
                  support@laundry-express.co.uk
                </a>
              </div>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4 border-b-2 border-yellow-400 inline-block pb-1">
              Useful Links
            </h3>
            <ul className="space-y-3 mt-6">
              <li>
                <Link to="/" className="hover:text-yellow-400 transition-colors flex items-center gap-2 text-sm md:text-base">
                  <span className="text-yellow-400">→</span> Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-yellow-400 transition-colors flex items-center gap-2 text-sm md:text-base">
                  <span className="text-yellow-400">→</span> Services
                </Link>
              </li>
              <li>
                <Link to="/order" className="hover:text-yellow-400 transition-colors flex items-center gap-2 text-sm md:text-base">
                  <span className="text-yellow-400">→</span> Order Now
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-yellow-400 transition-colors flex items-center gap-2 text-sm md:text-base">
                  <span className="text-yellow-400">→</span> Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-yellow-400 transition-colors flex items-center gap-2 text-sm md:text-base">
                  <span className="text-yellow-400">→</span> FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-yellow-400 transition-colors flex items-center gap-2 text-sm md:text-base">
                  <span className="text-yellow-400">→</span> Contact
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="hover:text-yellow-400 transition-colors flex items-center gap-2 text-sm md:text-base">
                  <span className="text-yellow-400">→</span> Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Working Hours & Service Area */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4 border-b-2 border-yellow-400 inline-block pb-1">
              Working Hours
            </h3>
            <div className="space-y-4 mt-6">
              <div className="flex items-start gap-2">
                <div className="bg-yellow-400 rounded-full p-1 mt-1">
                  <Clock className="h-3 w-3 text-blue-900" />
                </div>
                <div className="text-xs md:text-sm">
                  <p className="font-semibold">Mon-Sat: 8AM - 8PM</p>
                  <p className="mt-1">Sunday: 9AM - 5PM</p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-bold mb-2 flex items-center gap-2 text-sm md:text-base">
                  <div className="bg-yellow-400 rounded-full p-1">
                    <MapPin className="h-3 w-3 text-blue-900" />
                  </div>
                  Areas We Cover:
                </h4>
                <ul className="ml-7 space-y-1">
                  {[
                    ['Stanway', 'stanway'],
                    ['Highwoods', 'highwoods'],
                    ['Lexden', 'lexden'],
                    ['Shrub End', 'shrub-end'],
                    ['Mile End', 'mile-end'],
                    ['Wivenhoe', 'wivenhoe'],
                    ['West Mersea', 'west-mersea'],
                    ['Coggeshall', 'coggeshall'],
                  ].map(([label, slug]) => (
                    <li key={slug}>
                      <Link to={`/laundry-collection-${slug}`} className="text-xs md:text-sm text-blue-200 hover:text-yellow-400 transition-colors">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* Payment logos strip */}
        <div className="border-t border-blue-800 mt-8 md:mt-12 pt-6 md:pt-8">
          <p className="text-center text-[10px] uppercase tracking-widest text-blue-400 mb-4">Secure Payment Methods</p>
          <div className="flex flex-wrap justify-center items-center gap-3 mb-8">
            {/* PayPal */}
            <div className="bg-white rounded-lg px-3 py-2 h-10 flex items-center shadow-sm">
              <svg viewBox="0 0 80 24" height="18" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="18" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="16" fill="#003087">Pay</text>
                <text x="28" y="18" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="16" fill="#009CDE">Pal</text>
              </svg>
            </div>
            {/* Klarna */}
            <div className="bg-[#FFB3C7] rounded-lg px-3 py-2 h-10 flex items-center shadow-sm">
              <svg viewBox="0 0 64 20" height="14" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="15" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="14" fill="#17120F">Klarna.</text>
              </svg>
            </div>
            {/* Visa */}
            <div className="bg-white rounded-lg px-3 py-2 h-10 flex items-center shadow-sm">
              <svg viewBox="0 0 60 22" height="18" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="18" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="20" fill="#1A1F71" letterSpacing="-1">VISA</text>
              </svg>
            </div>
            {/* Mastercard */}
            <div className="bg-white rounded-lg px-3 py-2 h-10 flex items-center gap-1.5 shadow-sm">
              <svg viewBox="0 0 38 24" height="24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="13" cy="12" r="11" fill="#EB001B" />
                <circle cx="25" cy="12" r="11" fill="#F79E1B" />
                <path d="M19 4.8a11 11 0 0 1 0 14.4A11 11 0 0 1 19 4.8z" fill="#FF5F00" />
              </svg>
              <span style={{fontFamily:'Arial,sans-serif',fontSize:'9px',fontWeight:'600',color:'#231F20',letterSpacing:'0.02em'}}>mastercard</span>
            </div>
            {/* Clearpay */}
            <div className="bg-[#B2FCE4] rounded-lg px-3 py-2 h-10 flex items-center gap-1.5 shadow-sm">
              <svg viewBox="0 0 18 18" height="16" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9" cy="9" r="9" fill="#00D6A1"/>
                <path d="M5 9.5l2.5 2.5 5.5-5.5" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
              <span style={{fontFamily:'Arial,sans-serif',fontSize:'10px',fontWeight:'700',color:'#000'}}>clearpay</span>
            </div>
            {/* Apple Pay */}
            <div className="bg-black rounded-lg px-3 py-2 h-10 flex items-center gap-1 shadow-sm">
              <svg viewBox="0 0 14 18" height="16" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.6 9.3c0-2.5 2-3.7 2.1-3.8-1.1-1.6-2.9-1.8-3.5-1.9-1.5-.1-2.9.9-3.7.9-.7 0-1.9-.8-3.1-.8C2.8 3.8.9 5 0 6.9c-1.9 3.3-.5 8.1 1.3 10.8.9 1.3 1.9 2.7 3.2 2.7 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.3.8 1.4 0 2.3-1.3 3.2-2.6.9-1.4 1.3-2.8 1.3-2.9-.1 0-2-.8-2-3.6z" fill="white" transform="scale(0.7) translate(1,1)"/>
                <path d="M10.1 2.2C10.9 1.2 11.4 0 11.3-1.3c-1.2.1-2.6.8-3.4 1.8-.8.9-1.4 2.1-1.2 3.3 1.3.1 2.6-.7 3.4-1.6z" fill="white" transform="scale(0.7) translate(1,1)"/>
              </svg>
              <span style={{fontFamily:'Arial,sans-serif',fontSize:'13px',fontWeight:'500',color:'white',letterSpacing:'-0.3px'}}>Pay</span>
            </div>
            {/* Google Pay */}
            <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 h-10 flex items-center gap-1 shadow-sm">
              <svg viewBox="0 0 18 18" height="16" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.6 9.2c0-.6-.1-1.2-.2-1.8H9v3.4h4.8c-.2 1.1-.9 2-1.9 2.6v2.2h3c1.8-1.6 2.8-4 2.7-6.4z" fill="#4285F4"/>
                <path d="M9 18c2.4 0 4.5-.8 6-2.2l-3-2.2c-.8.5-1.8.9-3 .9-2.3 0-4.3-1.6-5-3.7H.9v2.3C2.4 16 5.5 18 9 18z" fill="#34A853"/>
                <path d="M4 10.7c-.2-.5-.3-1.1-.3-1.7s.1-1.2.3-1.7V5H.9C.3 6.2 0 7.6 0 9s.3 2.8.9 4l3.1-2.3z" fill="#FBBC05"/>
                <path d="M9 3.6c1.3 0 2.5.4 3.4 1.3l2.6-2.6C13.5.9 11.4 0 9 0 5.5 0 2.4 2 .9 5L4 7.3C4.7 5.2 6.7 3.6 9 3.6z" fill="#EA4335"/>
              </svg>
              <span style={{fontFamily:'Arial,sans-serif',fontSize:'13px',fontWeight:'500',color:'#3C4043',letterSpacing:'-0.3px'}}>Pay</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs md:text-sm text-center md:text-left space-y-1">
              <p>© 2025 Laundry Express. All rights reserved.</p>
              <div className="flex flex-wrap gap-3 text-blue-300">
                <Link to="/terms" className="hover:text-yellow-400 transition-colors">Terms &amp; Conditions</Link>
                <span>·</span>
                <Link to="/privacy" className="hover:text-yellow-400 transition-colors">Privacy Policy</Link>
              </div>
              <p className="text-blue-300">
                Designed & Developed by{' '}
                <a href="https://www.techgynt.com" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                  Techgynt Infotech Private Limited
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};