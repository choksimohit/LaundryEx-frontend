import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, MapPin, Clock, CheckCircle, Star, Search } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';
import api from '../utils/api';

const SITE_URL = 'https://www.laundry-express.co.uk';

const AREAS = {
  stanway: {
    name: 'Stanway',
    postcodes: ['CO3 0', 'CO3 8'],
    metaTitle: 'Laundry Collection Stanway | Free Pickup & Delivery',
    metaDescription: 'Doorstep laundry and dry cleaning collection in Stanway, Colchester (CO3 0, CO3 8). Free pickup and delivery. Wash, fold, iron and dry cleaning from your door.',
    headline: 'Laundry Collection in Stanway, Colchester',
    tagline: 'Free doorstep laundry and dry cleaning service across CO3 0 and CO3 8',
    intro: [
      'Stanway is the largest residential estate west of Colchester, spread across the CO3 0 and CO3 8 postcode sectors. With thousands of family homes, school runs, sports kits, and a constant cycle of washing to manage, laundry quickly becomes one of the most time-consuming tasks in a busy Stanway household.',
      'Laundry Express collects from your door anywhere in Stanway, handles everything professionally at our facility, and delivers it back clean and ready within 24 to 48 hours. Wash and fold, professional ironing, dry cleaning for smarter garments, duvet and bedding cleaning — we cover the full range, with no minimum contract and no trip to a launderette required.',
      'We offer flexible morning, afternoon, and evening collection slots Monday to Saturday, with Sunday collections also available. Book online in under two minutes, choose your slot, and leave the rest to us.',
    ],
    highlights: [
      'Serving all of CO3 0 and CO3 8 including residential estates and new builds',
      'Ideal for busy families with school uniforms, sports kits, and large weekly loads',
      'Same-day express service available on orders placed before 9am',
    ],
  },
  highwoods: {
    name: 'Highwoods',
    postcodes: ['CO4 9'],
    metaTitle: 'Laundry Collection Highwoods | Free Pickup & Delivery',
    metaDescription: 'Doorstep laundry and dry cleaning in Highwoods, Colchester (CO4 9). Free collection and delivery. Professional wash, iron and dry clean from your door.',
    headline: 'Laundry Collection in Highwoods, Colchester',
    tagline: 'Serving north Colchester\'s largest residential area across CO4 9',
    intro: [
      'Highwoods is north Colchester\'s biggest residential district, home to more than 10,000 residents in the CO4 9 postcode area. The area is made up almost entirely of family homes and busy households — and laundry is one of the chores that eats the most time each week.',
      'Laundry Express offers free doorstep collection and delivery throughout Highwoods, handling everything from everyday wash and fold loads to dry cleaning, ironing, duvets, and shoe cleaning. Each order is sorted by garment type and fabric, treated with eco-friendly detergents, and returned neatly within 48 hours.',
      'Collection slots are available Monday to Saturday 8am–8pm and Sunday 9am–5pm. Whether you want a regular weekly collection or a one-off, just enter your postcode below to check availability and book your slot.',
    ],
    highlights: [
      'Full coverage of CO4 9 across all Highwoods streets and cul-de-sacs',
      'Perfect for large family households with high weekly laundry volumes',
      'Evening and weekend slots available to fit around work and school',
    ],
  },
  wivenhoe: {
    name: 'Wivenhoe',
    postcodes: ['CO7 9'],
    metaTitle: 'Laundry Collection Wivenhoe | Free Pickup & Delivery',
    metaDescription: 'Doorstep laundry collection and delivery in Wivenhoe (CO7 9). Serving students and residents near University of Essex. Wash, iron and dry clean from your door.',
    headline: 'Laundry Collection in Wivenhoe',
    tagline: 'Doorstep laundry service for Wivenhoe residents and University of Essex students',
    intro: [
      'Wivenhoe is a riverside town just east of Colchester in the CO7 9 postcode area, home to a mix of long-term residents, young professionals, and students at the nearby University of Essex campus. For many people here, managing laundry alongside work or study is one of the most repetitive and frustrating weekly tasks.',
      'Laundry Express collects from your door anywhere in Wivenhoe and returns everything clean, dry, and ready within 24 to 48 hours. Students without access to machines, or professionals with no time to spare, can replace the launderette trip entirely. We handle all loads — everyday washing, ironing, dry cleaning for smarter items, and larger household loads like duvets and bedding.',
      'Enter your postcode below to check availability and book a slot. New customers get 20% off their first order with code WELCOME20.',
    ],
    highlights: [
      'Ideal for University of Essex students and campus-area residents',
      'Covers all of CO7 9 including Wivenhoe village and surrounding streets',
      'No machine required — we collect, professionally clean, and return everything',
    ],
  },
  'west-mersea': {
    name: 'West Mersea',
    postcodes: ['CO5 7'],
    metaTitle: 'Laundry Collection West Mersea | Free Pickup & Delivery',
    metaDescription: 'Doorstep laundry and dry cleaning collection in West Mersea (CO5 7). The only collection laundry service on Mersea Island. Free pickup and delivery.',
    headline: 'Laundry Collection in West Mersea',
    tagline: 'The only doorstep laundry collection service on Mersea Island — CO5 7',
    intro: [
      'West Mersea is an island community in the CO5 7 postcode area, connected to the mainland by the Strood causeway. With no local launderette or dry cleaner on the island, residents have traditionally had to travel into Colchester for professional laundry — or manage everything at home. Laundry Express changes that.',
      'We collect directly from your door in West Mersea, handle your laundry at our Colchester facility, and deliver it back fresh and clean. Standard wash and fold, professional ironing, dry cleaning for occasion wear, duvet and bedding cleaning — all available with free collection and no minimum contract.',
      'West Mersea\'s island setting means saltier air, heavier bedding in winter, and properties that cycle through guest bedding regularly. Whether you\'re a permanent resident, holiday let owner, or seasonal visitor, we accommodate all of it.',
    ],
    highlights: [
      'The only doorstep laundry collection service serving Mersea Island',
      'Covers all of West Mersea (CO5 7)',
      'Particularly useful for holiday let owners — fast turnaround on bedding between guests',
    ],
  },
  'shrub-end': {
    name: 'Shrub End',
    postcodes: ['CO2 7', 'CO2 8', 'CO2 9'],
    metaTitle: 'Laundry Collection Shrub End | Free Pickup & Delivery',
    metaDescription: 'Doorstep laundry collection and delivery in Shrub End, Colchester (CO2 7, CO2 8, CO2 9). Wash, iron, dry cleaning and more. Free collection from your door.',
    headline: 'Laundry Collection in Shrub End, Colchester',
    tagline: 'Serving south Colchester residential streets across CO2 7, CO2 8 and CO2 9',
    intro: [
      'Shrub End covers a large, densely residential stretch of south Colchester across the CO2 7, CO2 8, and CO2 9 postcodes. It\'s home to a high proportion of working families and commuters — people whose evenings and weekends are already full, and who shouldn\'t have to spend them catching up on laundry.',
      'Laundry Express provides free doorstep collection and delivery across all three Shrub End postcode sectors. We wash, dry, fold, iron, and dry clean — collecting from your front door and returning everything clean and sorted within 24 to 48 hours, depending on the service type.',
      'South Colchester has fewer local laundry options than other parts of the city, so we\'ve made sure Shrub End is fully covered. Enter your postcode below to confirm coverage and book your first slot.',
    ],
    highlights: [
      'Full coverage across CO2 7, CO2 8, and CO2 9',
      'Morning, afternoon, and evening collection slots available',
      'Regular weekly collections available for high-volume households',
    ],
  },
  'mile-end': {
    name: 'Mile End',
    postcodes: ['CO4 5'],
    metaTitle: 'Laundry Collection Mile End | Free Pickup & Delivery',
    metaDescription: 'Doorstep laundry and dry cleaning collection in Mile End, Colchester (CO4 5). Free pickup and delivery. Professional laundry service from your door.',
    headline: 'Laundry Collection in Mile End, Colchester',
    tagline: 'Doorstep laundry service across the CO4 5 postcode area',
    intro: [
      'Mile End sits on the northern edge of Colchester in the CO4 5 postcode area — a large, mainly residential community that connects north Colchester to the wider city. With a growing number of families and working households, demand for time-saving doorstep services continues to increase.',
      'Laundry Express serves Mile End with free collection and delivery, offering the full range of laundry services. Wash and fold, wash and iron, ironing only, dry cleaning, household items including duvets and curtains, clothing alterations, and shoe cleaning — everything is collected from your door and returned within the agreed turnaround.',
      'There\'s no need to set aside time for laundry when we can handle it for you. Enter your postcode to check availability. New customers save 20% on their first order with code WELCOME20.',
    ],
    highlights: [
      'Full coverage of the CO4 5 postcode area',
      'Fast routes from our Lexden Road base mean reliable turnarounds',
      'All services available including dry cleaning and household items',
    ],
  },
  lexden: {
    name: 'Lexden',
    postcodes: ['CO3 3', 'CO3 4'],
    metaTitle: 'Laundry Collection Lexden | Free Pickup & Delivery',
    metaDescription: 'Doorstep laundry and dry cleaning in Lexden, Colchester (CO3 3, CO3 4). Local laundry service based on Lexden Road. Free collection and delivery.',
    headline: 'Laundry Collection in Lexden, Colchester',
    tagline: 'Your most local laundry service — based on Lexden Road, covering CO3 3 and CO3 4',
    intro: [
      'Lexden is a residential area west of Colchester city centre covering the CO3 3 and CO3 4 postcode sectors. It\'s also home to Laundry Express — our facility is based on Lexden Road, making Lexden the area we serve fastest, with the shortest collection and return routes of anywhere we cover.',
      'For Lexden residents, this means same-day collection and return is frequently possible. We handle everyday laundry wash and fold, professional steam ironing, dry cleaning for suits and formal wear, duvet and bedding cleaning, and clothing alterations and repairs. All collected from your front door and returned when agreed.',
      'Lexden has a high proportion of professional households that value quality and reliability. That\'s what we\'re here for. Enter your postcode below to get started.',
    ],
    highlights: [
      'Our facility is on Lexden Road — fastest turnarounds of any area we cover',
      'Covers CO3 3 and CO3 4 across all main Lexden residential streets',
      'Same-day collection and return possible for Lexden bookings',
    ],
  },
  coggeshall: {
    name: 'Coggeshall',
    postcodes: ['CO6 1'],
    metaTitle: 'Laundry Collection Coggeshall | Free Pickup & Delivery',
    metaDescription: 'Doorstep laundry and dry cleaning collection in Coggeshall (CO6 1). Free pickup and return. Professional wash, iron and dry clean from your home.',
    headline: 'Laundry Collection in Coggeshall',
    tagline: 'Professional doorstep laundry and dry cleaning for Coggeshall — CO6 1',
    intro: [
      'Coggeshall is a historic market town in the CO6 1 postcode area, around eight miles west of Colchester. It\'s a thriving community with independent businesses, period properties, and a strong sense of local identity — but no local laundry or dry cleaning service. Laundry Express fills that gap.',
      'We collect from your door in Coggeshall, handle your laundry and dry cleaning at our Colchester facility, and return everything cleaned and neatly packed. Whether you need a weekly wash and fold, occasional dry cleaning for formal or woollen garments, or a one-off duvet and bedding clean, the same professional service that Colchester residents use is now available in Coggeshall with no extra charge.',
      'Living in a market town shouldn\'t mean making compromises on convenience. Enter your postcode below to book your first collection.',
    ],
    highlights: [
      'One of the only doorstep laundry collection services reaching Coggeshall (CO6 1)',
      'Full service including dry cleaning, ironing, and household items',
      'No surcharge for Coggeshall collections — same pricing as central Colchester',
    ],
  },
};

const SERVICES_LIST = [
  { name: 'Laundry Service', slug: 'laundry' },
  { name: 'Dry Cleaning', slug: 'dry-cleaning' },
  { name: 'Wash & Iron', slug: 'wash-iron' },
  { name: 'Ironing Service', slug: 'ironing' },
  { name: 'Household Items', slug: 'household' },
  { name: 'Shoe Cleaning', slug: 'shoe-cleaning' },
];

export const AreaDetail = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const areaSlug = pathname.replace('/laundry-collection-', '');
  const area = AREAS[areaSlug];

  const [postcode, setPostcode] = useState('');
  const [checking, setChecking] = useState(false);

  if (!area) {
    navigate('/');
    return null;
  }

  const pageUrl = `${SITE_URL}/laundry-collection-${areaSlug}`;

  const checkPostcode = async () => {
    if (!postcode || postcode.length < 3) {
      toast.error('Please enter a valid postcode');
      return;
    }
    setChecking(true);
    try {
      const res = await api.post('/pincode/check', { pin_code: postcode.toUpperCase() });
      if (res.data.available) {
        toast.success('Great news — we cover your area!');
        sessionStorage.setItem('pinCode', postcode.toUpperCase());
        sessionStorage.setItem('businesses', JSON.stringify(res.data.businesses));
        navigate('/order');
      } else {
        toast.error('Sorry, we don\'t cover that postcode yet');
      }
    } catch {
      toast.error('Could not check postcode — please try again');
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* React 19 head hoisting */}
      <title>{area.metaTitle}</title>
      <meta name="description" content={area.metaDescription} />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:title" content={area.metaTitle} />
      <meta property="og:description" content={area.metaDescription} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content="https://www.laundry-express.co.uk/HeroBanner1.png" />
      <meta name="twitter:title" content={area.metaTitle} />
      <meta name="twitter:description" content={area.metaDescription} />
      <meta name="twitter:image" content="https://www.laundry-express.co.uk/HeroBanner1.png" />
      <script type="application/ld+json">{JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
          { '@type': 'ListItem', position: 2, name: `Laundry Collection ${area.name}`, item: pageUrl },
        ],
      })}</script>
      <script type="application/ld+json">{JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: `Laundry Collection in ${area.name}`,
        description: area.metaDescription,
        url: pageUrl,
        provider: {
          '@type': 'LocalBusiness',
          name: 'Laundry Express',
          url: SITE_URL,
          telephone: '+447777367076',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Lexden Rd',
            addressLocality: 'Colchester',
            postalCode: 'CO3 4BH',
            addressRegion: 'Essex',
            addressCountry: 'GB',
          },
        },
        areaServed: [
          { '@type': 'City', name: area.name },
          ...area.postcodes.map(pc => ({ '@type': 'PostalAddress', postalCode: pc, addressCountry: 'GB' })),
        ],
      })}</script>

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white py-12 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-1.5 text-blue-200 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Laundry Express
          </Link>
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="h-5 w-5 text-yellow-400" />
            <div className="flex flex-wrap gap-2">
              {area.postcodes.map(pc => (
                <span key={pc} className="bg-yellow-400 text-blue-900 text-xs font-bold px-2.5 py-1 rounded-full">{pc}</span>
              ))}
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3">{area.headline}</h1>
          <p className="text-blue-100 text-base md:text-lg max-w-2xl mb-6">{area.tagline}</p>
          <div className="flex items-center gap-2 mb-8">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm text-blue-100">Rated 4.7 by Colchester customers · Free collection & delivery</span>
          </div>

          {/* Postcode checker in hero */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 max-w-md">
            <p className="text-sm font-semibold text-white mb-3">Check if we cover your postcode</p>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="e.g. CO3 4BH"
                value={postcode}
                onChange={e => setPostcode(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && checkPostcode()}
                className="h-11 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 uppercase"
              />
              <Button
                onClick={checkPostcode}
                disabled={checking}
                className="h-11 px-4 bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-semibold shrink-0"
              >
                {checking ? '...' : <Search className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Intro */}
        <div className="space-y-4 mb-12">
          {area.intro.map((para, i) => (
            <p key={i} className="text-slate-600 leading-relaxed text-base md:text-lg">{para}</p>
          ))}
        </div>

        {/* Highlights */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-12">
          <h2 className="font-bold text-slate-800 mb-4">Coverage highlights</h2>
          <ul className="space-y-3">
            {area.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <span className="text-slate-700 text-sm">{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Services available */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-slate-800 mb-2">Services available in {area.name}</h2>
          <p className="text-slate-500 text-sm mb-6">All services include free doorstep collection and delivery.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {SERVICES_LIST.map(({ name, slug: serviceSlug }) => (
              <Link
                key={serviceSlug}
                to={`/services/${serviceSlug}`}
                className="bg-white border border-slate-100 rounded-xl p-4 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 transition-colors flex items-center gap-2 shadow-sm"
              >
                <ArrowRight className="h-4 w-4 text-blue-400 shrink-0" />
                {name}
              </Link>
            ))}
          </div>
        </div>

        {/* Turnaround & hours */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-800 text-sm">Turnaround times</p>
              <p className="text-slate-500 text-sm mt-1">Laundry & ironing: 24–48 hrs<br />Dry cleaning & household: 48–72 hrs</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-800 text-sm">Collection hours</p>
              <p className="text-slate-500 text-sm mt-1">Mon–Sat: 8am–8pm<br />Sunday: 9am–5pm</p>
            </div>
          </div>
        </div>

        {/* CTA with postcode checker */}
        <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Ready to book in {area.name}?</h2>
          <p className="text-blue-100 mb-6 max-w-md mx-auto">
            Enter your postcode to get started. New customers get <span className="font-bold text-white">20% off</span> their first order with code WELCOME20.
          </p>
          <div className="flex gap-2 max-w-sm mx-auto mb-4">
            <Input
              type="text"
              placeholder="Enter your postcode"
              value={postcode}
              onChange={e => setPostcode(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && checkPostcode()}
              className="h-12 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 uppercase"
            />
            <Button
              onClick={checkPostcode}
              disabled={checking}
              className="h-12 px-5 bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-semibold shrink-0"
            >
              {checking ? '...' : 'Check'}
            </Button>
          </div>
          <p className="text-blue-200 text-xs">Postcodes covered: {area.postcodes.join(', ')}</p>
        </div>

      </div>
    </div>
  );
};
