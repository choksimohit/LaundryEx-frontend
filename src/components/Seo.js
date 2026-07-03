import React from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://www.laundry-express.co.uk';
const OG_IMAGE = 'https://www.laundry-express.co.uk/hero-laundry.webp';

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
  '/faq': {
    title: 'FAQs | Laundry Express Colchester',
    description: 'Answers to common questions about our doorstep laundry service — collection areas, turnaround times, pricing, dry cleaning, and more.',
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

  // These page types manage their own head tags (title, canonical, og:*)
  const isBlogPost = path.startsWith('/blog/');
  const isServiceDetail = /^\/services\/.+/.test(path);
  const isAreaPage = /^\/laundry-collection-.+/.test(path);
  const isPageOwned = isBlogPost || isServiceDetail || isAreaPage;

  const meta = PAGE_META[path];

  const canonicalUrl = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;

  return (
    <>
      {!isPageOwned && <link rel="canonical" href={canonicalUrl} />}
      {/* Global OG tags */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Laundry Express" />
      <meta name="twitter:card" content="summary_large_image" />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {meta && !isPageOwned && (
        <>
          <title>{meta.title}</title>
          <meta name="description" content={meta.description} />
          <meta property="og:title" content={meta.title} />
          <meta property="og:description" content={meta.description} />
          <meta property="og:url" content={canonicalUrl} />
          <meta property="og:image" content={OG_IMAGE} />
          <meta name="twitter:title" content={meta.title} />
          <meta name="twitter:description" content={meta.description} />
          <meta name="twitter:image" content={OG_IMAGE} />
        </>
      )}
    </>
  );
};
