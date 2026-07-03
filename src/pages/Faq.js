import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';

const FAQS = [
  {
    category: 'Collection & Delivery',
    items: [
      {
        q: 'How does the collection service work?',
        a: 'You book online, choose a collection slot, and our driver comes to your door at the agreed time. You hand over your laundry bag — no need to go anywhere. We take it to our Colchester facility, professionally clean everything, and deliver it back to your door within the agreed turnaround.',
      },
      {
        q: 'What areas do you cover?',
        a: 'We cover Colchester and surrounding areas including Stanway (CO3 0, CO3 8), Highwoods (CO4 9), Lexden (CO3 3, CO3 4), Shrub End (CO2 7–9), Mile End (CO4 5), Wivenhoe (CO7 9), West Mersea (CO5 7), and Coggeshall (CO6 1). Enter your postcode on our order page to confirm coverage instantly.',
      },
      {
        q: 'What are your collection hours?',
        a: 'We collect Monday to Saturday 8am–8pm and Sunday 9am–5pm. You can choose a morning, afternoon, or evening slot when you book.',
      },
      {
        q: 'Is there a charge for collection and delivery?',
        a: 'No — collection and delivery are always free, regardless of your location within our service area or the size of your order.',
      },
      {
        q: 'How long does it take to get my laundry back?',
        a: 'Standard turnaround is 24–48 hours for wash and fold, wash and iron, and ironing. Dry cleaning and household items (duvets, curtains) take 48–72 hours. Same-day express service is available for laundry orders placed before 9am.',
      },
    ],
  },
  {
    category: 'Our Services',
    items: [
      {
        q: 'What services do you offer?',
        a: 'We offer laundry (wash & fold), wash & iron, ironing only, dry cleaning, household item cleaning (duvets, bedding, curtains, towels), clothing alterations and repairs, and shoe cleaning. All services include free doorstep collection and delivery.',
      },
      {
        q: 'What is the difference between wash & fold and wash & iron?',
        a: 'Wash & fold means we wash, dry, and return your clothes neatly folded. Wash & iron includes professional steam ironing of every item before return, so everything comes back wrinkle-free and ready to wear or hang directly in your wardrobe.',
      },
      {
        q: 'Do you offer dry cleaning?',
        a: 'Yes. Our dry cleaning service handles suits, jackets, dresses, silk, wool coats, and any garment labelled "dry clean only". Items are inspected for stains, pre-treated individually, dry cleaned, pressed, and returned on hangers.',
      },
      {
        q: 'Can you clean duvets and bedding?',
        a: 'Yes. We clean all sizes of duvet — single, double, king, and super-king — along with pillows, bed sheets, duvet covers, and curtains. We use commercial-grade machines capable of handling large items that won\'t fit in a domestic washer.',
      },
      {
        q: 'Do you offer clothing alterations?',
        a: 'Yes. We handle hemming, resizing (taking in or letting out), zip replacement, seam repair, button reattachment, and patching. Add a note to your order with the details and we\'ll confirm before starting.',
      },
    ],
  },
  {
    category: 'Your Laundry',
    items: [
      {
        q: 'Do I need to sort my laundry before handing it over?',
        a: 'No. Our team sorts everything at the facility — separating whites from coloureds, delicates from standard loads, and garments by wash temperature. You can put everything in one bag.',
      },
      {
        q: 'What detergent do you use?',
        a: 'We use eco-friendly, dermatologically tested detergents that are safe for sensitive skin. If you have a preference or allergy, add a note to your order and we\'ll accommodate it.',
      },
      {
        q: 'What if a garment gets damaged?',
        a: 'We treat every garment with professional care and follow care label instructions. In the rare event of damage caused by us, please contact us within 48 hours of delivery and we will investigate and make it right.',
      },
      {
        q: 'What items can\'t you clean?',
        a: 'We\'re unable to accept heavily soiled items containing human or animal waste, items with significant mould, or shoes with major structural damage. If you\'re unsure whether an item is suitable, contact us before booking.',
      },
    ],
  },
  {
    category: 'Pricing & Payment',
    items: [
      {
        q: 'How much does the laundry service cost?',
        a: 'Pricing varies by service and quantity. You can see full pricing on our order page after entering your postcode. New customers save 20% on their first order with code WELCOME20.',
      },
      {
        q: 'Is there a minimum order?',
        a: 'Yes, there is a small minimum order value to make each collection worthwhile for both parties. The minimum is shown at checkout after you enter your postcode.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept Visa, Mastercard, and American Express. Payment is taken securely online when you place your order.',
      },
      {
        q: 'Can I get a discount on my first order?',
        a: 'Yes — use code WELCOME20 at checkout to get 20% off your first order. The code is valid once per customer.',
      },
    ],
  },
  {
    category: 'Account & Orders',
    items: [
      {
        q: 'Do I need an account to place an order?',
        a: 'Yes, you\'ll need to register a free account so we can manage your order history, collection address, and delivery preferences. Registration takes under a minute.',
      },
      {
        q: 'Can I cancel or change my order?',
        a: 'You can cancel or amend an order before the collection slot begins. Log in to your dashboard or contact us by phone or WhatsApp to make changes.',
      },
      {
        q: 'How do I track my order?',
        a: 'You can view your order status in your account dashboard. We\'ll also notify you when your laundry has been collected and when it\'s out for delivery.',
      },
    ],
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.flatMap(section =>
    section.items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    }))
  ),
};

export const Faq = () => {
  const [open, setOpen] = useState({});

  const toggle = (catIdx, itemIdx) => {
    const key = `${catIdx}-${itemIdx}`;
    setOpen(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">Frequently Asked Questions</h1>
          <p className="text-blue-100 text-base md:text-lg max-w-2xl">
            Everything you need to know about our doorstep laundry and dry cleaning service in Colchester.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* FAQ categories */}
        {FAQS.map((section, catIdx) => (
          <div key={section.category} className="mb-10">
            <h2 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-slate-200">
              {section.category}
            </h2>
            <div className="space-y-2">
              {section.items.map((faq, itemIdx) => {
                const key = `${catIdx}-${itemIdx}`;
                const isOpen = !!open[key];
                return (
                  <div key={itemIdx} className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <button
                      onClick={() => toggle(catIdx, itemIdx)}
                      className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                    >
                      <span className="font-medium text-slate-800 text-sm md:text-base">{faq.q}</span>
                      <ChevronDown className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Still have a question */}
        <div className="bg-blue-600 rounded-2xl p-8 text-center text-white mt-4">
          <h2 className="text-xl font-bold mb-2">Still have a question?</h2>
          <p className="text-blue-100 mb-5 text-sm">Our team is available Mon–Sat 8am–8pm and Sunday 9am–5pm.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-semibold px-6 py-3 rounded-full hover:bg-blue-50 transition-colors text-sm"
            >
              Contact us <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/order"
              className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-blue-900 font-semibold px-6 py-3 rounded-full hover:bg-yellow-300 transition-colors text-sm"
            >
              Book a collection <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
