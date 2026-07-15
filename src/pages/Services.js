import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';

export const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 'laundry',
      title: 'Laundry Service',
      description: 'Standard and delicate wash services. We wash, dry, and fold your clothes with professional care using eco-friendly products.',
      image: 'https://images.unsplash.com/photo-1586284359445-2e1d8db7f4cd?crop=entropy&cs=srgb&fm=jpg&q=85',
      categories: ['Standard Wash', 'Delicate Wash'],
      orderCategory: 'Laundry',
    },
    {
      id: 'dry-cleaning',
      title: 'Dry Clean Service',
      description: 'Expert dry cleaning for delicate fabrics and formal wear. We handle everything from suits to evening dresses with the utmost care.',
      image: 'https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      categories: ['Accessories', 'Bottoms', 'Tops', 'Outerwear', 'Dresses'],
      orderCategory: 'Dry Cleaning',
    },
    {
      id: 'wash-iron',
      title: 'Wash & Iron Service',
      description: 'Complete service including washing, drying, and professional ironing. Your clothes come back fresh, crisp, and ready to wear.',
      image: 'https://images.unsplash.com/photo-1758279744970-b32360a5e907?crop=entropy&cs=srgb&fm=jpg&q=85',
      categories: ['Standard Wash & Iron'],
      orderCategory: 'Wash & Iron',
    },
    {
      id: 'ironing',
      title: 'Ironing Service',
      description: 'Professional ironing for crisp, wrinkle-free results. Perfect for shirts, blouses, trousers, and all your everyday garments.',
      image: 'https://images.unsplash.com/photo-1740684589228-54b6fba08985?crop=entropy&cs=srgb&fm=jpg&q=85',
      categories: ['Shirts', 'Trousers', 'Dresses & Others'],
      orderCategory: 'Ironing',
    },
    {
      id: 'household',
      title: 'Household',
      description: 'Professional cleaning for household items including duvets, curtains, towels, and bedding of all sizes. Fresh and spotless every time.',
      image: 'https://images.unsplash.com/photo-1614045963521-189262b3c60b?crop=entropy&cs=srgb&fm=jpg&q=85',
      categories: ['Bedding', 'Curtains', 'Towels'],
      orderCategory: 'Household & Bulk Laundry',
    },
    {
      id: 'alteration-repairs',
      title: 'Alteration & Repairs',
      description: 'Expert tailoring services for all your clothing alterations and repairs. From hemming to resizing, we bring your garments back to perfection.',
      image: 'https://images.pexels.com/photos/4614223/pexels-photo-4614223.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      categories: ['Hemming', 'Resizing', 'Repairs'],
      orderCategory: 'Alteration & Repairs',
    },
    {
      id: 'shoe-cleaning',
      title: 'Shoe Cleaning',
      description: 'Professional shoe care including deep cleaning, polishing, and restoration. Give your favourite footwear a brand new lease of life.',
      image: 'https://images.unsplash.com/photo-1626964613814-945c5c13dbd1?crop=entropy&cs=srgb&fm=jpg&q=85',
      categories: ['Trainers', 'Leather', 'Suede'],
      orderCategory: 'Shoe Cleaning',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50" data-testid="services-page">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Laundry & Dry Cleaning Services in Colchester</h1>
          <p className="text-base md:text-lg lg:text-xl text-blue-100 max-w-3xl">
            Premium laundry and dry cleaning services in Colchester with free doorstep collection and delivery. Professional care for every garment.
          </p>
        </div>
      </div>

      {/* Intro Text */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Colchester's Trusted Laundry & Dry Cleaning Service</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Laundry Express is Colchester's doorstep laundry and dry cleaning service, serving homes and businesses across CO1, CO2, CO3, CO4, CO6, CO7 and surrounding areas. Whether you need a regular wash and fold, professional ironing, specialist dry cleaning, or household item cleaning, we handle it all — collected and delivered directly to your door.
          </p>
          <p className="text-slate-600 leading-relaxed">
            We use eco-friendly, skin-safe detergents and treat every garment according to its care label. Delicate fabrics, formal wear, duvets, and everyday essentials all receive the same professional attention. Our aim is simple: give your clothes back cleaner, fresher, and better cared for than if you'd done them yourself — saving you time every single week.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-2xl font-bold text-slate-800 mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              data-testid={`service-card-${service.id}`}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-slate-800">{service.title}</h3>
                <p className="text-slate-600 mb-4 leading-relaxed">{service.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-slate-700 mb-2">Categories:</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.categories.map((category, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Link
                    to={`/services/${service.id}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg h-12 font-semibold border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors text-sm"
                  >
                    Learn more
                  </Link>
                  <Button
                    onClick={() => navigate('/order')}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-lg h-12 font-semibold"
                    data-testid={`order-${service.id}`}
                  >
                    Book now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="mt-16 bg-blue-600 rounded-2xl p-10 text-white">
          <h2 className="text-2xl font-bold mb-8 text-center">How Our Collection Service Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Book Online', text: 'Choose your service and select a collection slot that suits you — morning, afternoon, or evening.' },
              { step: '2', title: 'We Collect', text: 'Our driver comes to your door at the agreed time. No need to go anywhere — just hand over your laundry bag.' },
              { step: '3', title: 'We Clean', text: 'Your clothes are professionally laundered, dried, folded, or ironed at our Colchester facility, sorted by garment type.' },
              { step: '4', title: 'We Deliver', text: 'Clean, fresh laundry is delivered back to your door — usually within 24–48 hours, packed neatly and ready to put away.' },
            ].map(({ step, title, text }) => (
              <div key={step} className="text-center">
                <div className="bg-white text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">{step}</div>
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-blue-100 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Turnaround Times */}
        <div className="mt-12 bg-white rounded-2xl p-10 shadow-lg">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Turnaround Times</h2>
          <p className="text-slate-600 mb-6">We offer standard and express turnaround options across all services.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { service: 'Wash & Fold / Wash & Iron', standard: '24–48 hours', express: 'Same day (order before 9am)' },
              { service: 'Dry Cleaning', standard: '48–72 hours', express: '24 hours (on request)' },
              { service: 'Household Items (duvets, curtains)', standard: '48–72 hours', express: 'Contact us to confirm' },
            ].map(({ service, standard, express }) => (
              <div key={service} className="border border-slate-100 rounded-xl p-5">
                <h3 className="font-semibold text-slate-800 mb-3">{service}</h3>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-500">Standard</span>
                  <span className="text-slate-700 font-medium">{standard}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Express</span>
                  <span className="text-blue-600 font-medium">{express}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Area */}
        <div className="mt-12 bg-slate-100 rounded-2xl p-10">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Our Service Area</h2>
          <p className="text-slate-600 leading-relaxed mb-3">
            Laundry Express collects and delivers across Colchester and the surrounding area. We currently cover CO1–CO4, CO6, and CO7 postcodes — including Stanway, Highwoods, Lexden, Shrub End, Mile End, Wivenhoe, West Mersea, and Coggeshall.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Not sure if we cover your postcode? Enter it on our <a href="/order" className="text-blue-600 underline hover:text-blue-700">order page</a> to check instantly. We're continually expanding — if you're just outside our current zone, get in touch and we'll do our best to accommodate you.
          </p>
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-12 bg-white rounded-2xl p-12 shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Laundry Express?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Turnaround</h3>
              <p className="text-slate-600">Standard 24–48 hour turnaround on laundry. Express same-day service available for orders placed before 9am.</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-slate-600">Eco-friendly, skin-safe detergents. Every garment handled according to its care label. 4.7★ rated by our customers.</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Pickup & Delivery</h3>
              <p className="text-slate-600">No extra charge for collection or delivery. We come to your door Monday to Saturday 8am–8pm and Sunday 9am–5pm.</p>
            </div>
          </div>
        </div>

        {/* Pricing from */}
        <div className="bg-white py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-800 mb-3">Indicative Pricing</h2>
              <p className="text-slate-500 max-w-xl mx-auto">Prices shown are starting rates. Enter your postcode on the order page to see exact pricing for your area. Orders over £30 include free collection and delivery.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="px-5 py-3 text-sm font-semibold text-slate-700 rounded-tl-xl">Service</th>
                    <th className="px-5 py-3 text-sm font-semibold text-slate-700">Starting from</th>
                    <th className="px-5 py-3 text-sm font-semibold text-slate-700">Turnaround</th>
                    <th className="px-5 py-3 text-sm font-semibold text-slate-700 rounded-tr-xl">Book</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { name: 'Wash & Fold', from: '£12.00', time: '24–48 hrs', slug: 'laundry' },
                    { name: 'Wash & Iron', from: '£15.00', time: '24–48 hrs', slug: 'wash-iron' },
                    { name: 'Ironing Only', from: '£10.00', time: '24–48 hrs', slug: 'ironing' },
                    { name: 'Dry Cleaning', from: '£8.50', time: '48–72 hrs', slug: 'dry-cleaning' },
                    { name: 'Household Items', from: '£14.00', time: '48–72 hrs', slug: 'household' },
                    { name: 'Shoe Cleaning', from: '£8.00', time: '48–72 hrs', slug: 'shoe-cleaning' },
                    { name: 'Alterations & Repairs', from: '£5.00', time: 'Quote on inspection', slug: 'alteration-repairs' },
                  ].map(row => (
                    <tr key={row.slug} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4 font-medium text-slate-800">{row.name}</td>
                      <td className="px-5 py-4 text-blue-600 font-semibold">{row.from}</td>
                      <td className="px-5 py-4 text-slate-500 text-sm">{row.time}</td>
                      <td className="px-5 py-4">
                        <Link to="/order" className="text-sm text-blue-600 font-medium hover:underline">Book →</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-xs text-slate-400 mt-4">Delivery charge of £4.45 applies to orders under £30.</p>
          </div>
        </div>
      </div>
    </div>
  );
};