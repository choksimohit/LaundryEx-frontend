import React from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://www.laundry-express.co.uk';

const NOINDEX_PATHS = [
  '/cart',
  '/checkout',
  '/order-confirmation',
  '/dashboard',
  '/admin',
  '/forgot-password',
  '/reset-password',
];

const PAGE_META = {
  '/': {
    title: 'Laundry Express | Doorstep Laundry & Dry Cleaning Colchester',
    description: 'Premium laundry and dry cleaning service in Colchester with free collection and delivery. Wash, dry, iron and fold from your door.',
  },
  '/services': {
    title: 'Laundry Services Colchester | Wash, Dry, Iron & Dry Cleaning',
    description: 'Laundry Express offers wash & fold, ironing, and dry cleaning with free doorstep collection and delivery across Colchester and surrounding areas.',
  },
  '/order': {
    title: 'Book a Collection | Doorstep Laundry Colchester — Laundry Express',
    description: 'Enter your postcode to book a doorstep laundry collection in Colchester. Fast, reliable, and professionally handled. Use code WELCOME20 for 20% off your first order.',
  },
  '/blog': {
    title: 'Laundry Tips & News | Laundry Express Blog',
    description: 'Expert laundry tips, stain removal guides, and news from Laundry Express — Colchester\'s doorstep laundry and dry cleaning service.',
  },
  '/login': {
    title: 'Login | Laundry Express',
    description: 'Log in to your Laundry Express account to track orders and manage your laundry collections.',
  },
  '/register': {
    title: 'Create Account | Laundry Express',
    description: 'Sign up for Laundry Express and get 20% off your first order with code WELCOME20. Free doorstep collection and delivery in Colchester.',
  },
  '/contact': {
    title: 'Contact Us | Laundry Express Colchester',
    description: 'Get in touch with Laundry Express by phone, email or WhatsApp. We\'re available Mon–Sat 8am–8pm and Sunday 9am–5pm.',
  },
  '/terms': {
    title: 'Terms & Conditions | Laundry Express',
    description: 'Read the terms and conditions for using Laundry Express doorstep laundry and dry cleaning services in Colchester.',
  },
  '/privacy': {
    title: 'Privacy Policy | Laundry Express',
    description: 'How Laundry Express collects, uses, and protects your personal data in accordance with UK GDPR.',
  },
};

// Renders canonical, per-page title, meta description, and noindex for private pages.
// React 19 hoists <title>/<link>/<meta> rendered anywhere into <head>.
export const Seo = () => {
  const { pathname } = useLocation();

  let path = pathname.replace(/\/+$/, '');
  if (path === '') path = '/';

  const noindex = NOINDEX_PATHS.some(
    (p) => path === p || path.startsWith(`${p}/`)
  );

  // Blog post pages have their own title/description set in BlogPost.js
  const isBlogPost = path.startsWith('/blog/');

  const meta = PAGE_META[path];

  return (
    <>
      <link rel="canonical" href={path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {meta && !isBlogPost && (
        <>
          <title>{meta.title}</title>
          <meta name="description" content={meta.description} />
          <meta property="og:title" content={meta.title} />
          <meta property="og:description" content={meta.description} />
          <meta property="og:url" content={path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`} />
        </>
      )}
    </>
  );
};
