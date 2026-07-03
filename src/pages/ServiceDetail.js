import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, Clock, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/button';

const SITE_URL = 'https://www.laundry-express.co.uk';

const SERVICES = {
  'laundry': {
    title: 'Laundry Service Colchester',
    metaTitle: 'Laundry Service Colchester | Wash & Fold Collection — Laundry Express',
    metaDescription: 'Professional wash and fold laundry service in Colchester with free doorstep collection. Eco-friendly detergents, 24–48 hour turnaround. Book online.',
    image: 'https://images.unsplash.com/photo-1586284359445-2e1d8db7f4cd?crop=entropy&cs=srgb&fm=jpg&q=85',
    tagline: 'Professional wash, dry & fold with free collection from your door',
    intro: [
      'Our laundry service handles everything from everyday clothing to bulkier items like bedding and towels. We collect from your door, wash, dry, and return your clothes neatly folded — typically within 24 to 48 hours.',
      'We separate each load carefully: whites are kept apart from coloureds, delicates are handled on a gentle cycle, and everything is washed at the correct temperature for the fabric type. We use eco-friendly, skin-safe detergents that are kind to sensitive skin and the environment.',
      'Whether you need a one-off collection before a busy week or a regular weekly service, Laundry Express makes it simple. Enter your postcode, choose a slot, and leave the rest to us.',
    ],
    categories: [
      { name: 'Standard Wash', desc: 'Everyday clothing washed at 30°–40°C, dried and folded.' },
      { name: 'Delicate Wash', desc: 'Silk, lace, fine knitwear and synthetic blends on a gentle cycle.' },
      { name: 'Bulky Items', desc: 'Towels, bed sheets, and light bedding alongside clothing loads.' },
    ],
    turnaround: '24–48 hours (express same-day available)',
    benefits: [
      { title: 'Sorted by garment type', text: 'We separate darks, lights, and delicates so colours stay true and fabrics stay intact.' },
      { title: 'Eco-friendly detergents', text: 'Skin-safe, fragrance-free options available on request — suitable for babies and sensitive skin.' },
      { title: 'Neatly folded return', text: 'Clothes come back folded and ready to put away, not in a jumbled pile.' },
    ],
    faqs: [
      { q: 'Do I need to sort my laundry before collection?', a: 'No — our team sorts everything on arrival. You can put it all in one bag and we\'ll separate it correctly at the facility.' },
      { q: 'What detergent do you use?', a: 'We use eco-friendly, dermatologically tested detergents. If you have a preference or sensitivity, let us know in the order notes.' },
      { q: 'Is there a minimum order?', a: 'We have a small minimum weight threshold to make the collection worthwhile. Details are shown at checkout when you enter your postcode.' },
    ],
  },
  'dry-cleaning': {
    title: 'Dry Cleaning Colchester',
    metaTitle: 'Dry Cleaning Colchester | Suits, Dresses & Delicate Fabrics — Laundry Express',
    metaDescription: 'Expert dry cleaning in Colchester for suits, dresses, coats and delicate garments. Free doorstep collection and delivery. 48–72 hour turnaround.',
    image: 'https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    tagline: 'Expert care for suits, formal wear, and delicate fabrics',
    intro: [
      'Dry cleaning uses specialist solvents rather than water to clean garments that cannot withstand a normal wash cycle. This makes it the right choice for suits, tailored jackets, evening dresses, silk blouses, wool coats, and any garment labelled "dry clean only".',
      'Our Colchester dry cleaning service is collected from your door and handled by experienced professionals who inspect each garment for stains, fabric type, and care label instructions before treatment. We pre-treat stubborn stains individually, then press and return items on hangers — ready to hang directly in your wardrobe.',
      'Regular dry cleaning keeps formal wear looking its best for longer, preserving the shape of structured garments and preventing the build-up of odours that water-based washing can sometimes set in.',
    ],
    categories: [
      { name: 'Tops', desc: 'Blouses, shirts, jumpers, and knitwear requiring specialist care.' },
      { name: 'Bottoms', desc: 'Tailored trousers, skirts, and formal shorts.' },
      { name: 'Outerwear', desc: 'Suits, jackets, wool coats, and structured blazers.' },
      { name: 'Dresses', desc: 'Evening gowns, occasionwear, and silk or embellished dresses.' },
      { name: 'Accessories', desc: 'Scarves, ties, waistcoats, and delicate fabric accessories.' },
    ],
    turnaround: '48–72 hours (24-hour express on request)',
    benefits: [
      { title: 'Stain pre-treatment', text: 'Each garment is inspected and stained areas are pre-treated individually before the main cleaning cycle.' },
      { title: 'Pressed and returned on hangers', text: 'Dry cleaned items are pressed and returned ready to wear — no ironing needed after collection.' },
      { title: 'Fabric-safe solvents', text: 'Professional-grade solvents safe for silk, wool, and structured fabrics that water would damage.' },
    ],
    faqs: [
      { q: 'How do I know if a garment needs dry cleaning?', a: 'Check the care label. A circle symbol means dry clean only. If in doubt, contact us and we\'ll advise before you book.' },
      { q: 'Can you remove old or set-in stains?', a: 'We treat most stains including wine, grease, and ink. Older stains are harder to remove fully, but we\'ll give them the best possible treatment.' },
      { q: 'Do you clean wedding dresses?', a: 'Yes. Wedding dress cleaning is a specialist service — please contact us before booking so we can advise on turnaround time and packaging.' },
    ],
  },
  'wash-iron': {
    title: 'Wash & Iron Service Colchester',
    metaTitle: 'Wash & Iron Service Colchester | Clean & Pressed Collection — Laundry Express',
    metaDescription: 'Wash and iron service in Colchester — we collect, wash, dry and professionally iron your clothes. Free doorstep pickup. Ready to wear in 24–48 hours.',
    image: 'https://images.unsplash.com/photo-1758279744970-b32360a5e907?crop=entropy&cs=srgb&fm=jpg&q=85',
    tagline: 'Washed, dried, and professionally ironed — returned ready to wear',
    intro: [
      'Our wash and iron service is the complete laundry solution. We collect your clothes, wash and dry them at the correct temperature for each fabric, then professionally iron every item before returning them neatly to your door.',
      'The ironing is done using steam irons and professional pressing boards, giving a finish that\'s difficult to achieve at home. Shirts come back with crisp collars and cuffs, trousers with a sharp crease, and dresses hanging perfectly straight. Everything is returned on hangers or neatly folded, depending on garment type.',
      'Rather than building up a pile of ironing that never quite gets done, you can hand over a laundry bag and get everything back clean, pressed, and wardrobe-ready within 48 hours.',
    ],
    categories: [
      { name: 'Standard Wash & Iron', desc: 'All everyday garments washed, dried, and professionally steam pressed.' },
    ],
    turnaround: '24–48 hours',
    benefits: [
      { title: 'Professional steam finish', text: 'Steam ironing removes creases more effectively than dry ironing, leaving garments looking freshly pressed.' },
      { title: 'Returned wardrobe-ready', text: 'Shirts and dresses come back on hangers. Folded items are stacked cleanly — nothing needs touching up at home.' },
      { title: 'Saves hours every week', text: 'The average household spends 3–4 hours a week on ironing. Our service gives that time back completely.' },
    ],
    faqs: [
      { q: 'Are shirts ironed by hand or on a press?', a: 'Shirts are ironed on professional pressing boards with steam irons, giving a result equivalent to a dry cleaner\'s shirt press.' },
      { q: 'Do you return clothes on hangers?', a: 'Shirts, blouses, dresses, and suits are returned on hangers. T-shirts and casual items are folded.' },
      { q: 'What if something isn\'t ironed to my standard?', a: 'Let us know and we\'ll sort it — your satisfaction is guaranteed.' },
    ],
  },
  'ironing': {
    title: 'Ironing Service Colchester',
    metaTitle: 'Ironing Service Colchester | Doorstep Collection & Delivery — Laundry Express',
    metaDescription: 'Professional ironing service in Colchester. We collect your clothes, iron them to a crisp finish, and deliver back to your door. Book online today.',
    image: 'https://images.unsplash.com/photo-1740684589228-54b6fba08985?crop=entropy&cs=srgb&fm=jpg&q=85',
    tagline: 'Crisp, wrinkle-free results for shirts, trousers and everyday wear',
    intro: [
      'Our ironing service is designed for when your clothes are already clean but need a professional finish. Simply bag up your dry, wrinkle-prone garments and we\'ll collect, iron, and deliver them back to your door — typically within 24 hours.',
      'We iron shirts, trousers, blouses, dresses, school uniforms, and most everyday garments using professional steam irons. Each piece is carefully finished on a padded ironing board to prevent shine, with collars, cuffs, and hems given specific attention.',
      'Whether you\'ve just returned from holiday with a suitcase full of creased clothes, or you\'re simply tired of the ironing pile growing every week, our doorstep ironing service in Colchester is the easiest solution.',
    ],
    categories: [
      { name: 'Shirts & Blouses', desc: 'Collar, cuffs, and body pressed to a sharp, professional finish.' },
      { name: 'Trousers', desc: 'Sharp crease down the leg, waistband and pocket areas pressed flat.' },
      { name: 'Dresses & Others', desc: 'Dresses, skirts, T-shirts, and casual tops ironed to order.' },
    ],
    turnaround: '24 hours',
    benefits: [
      { title: 'No washing required', text: 'This service is for items that are already clean and just need pressing — ideal for post-holiday or weekly ironing.' },
      { title: 'Collected and returned to your door', text: 'We pick up and drop off at an agreed time, Mon–Sat 8am–8pm and Sunday 9am–5pm.' },
      { title: 'School uniforms welcome', text: 'Shirts, trousers, skirts, and polo shirts are all standard items — great for keeping children\'s uniforms smart.' },
    ],
    faqs: [
      { q: 'Do my clothes need to be washed before ironing?', a: 'Yes — our ironing service is for pre-washed, dry garments only. If you also need washing, choose our Wash & Iron service instead.' },
      { q: 'Can you iron school uniforms?', a: 'Absolutely. School shirts, trousers, skirts, and polo shirts are all standard items for our ironing service.' },
      { q: 'How should I package my clothes?', a: 'Any bag or basket is fine. Loosely packed is better than tightly stuffed — it reduces extra creasing before we collect.' },
    ],
  },
  'household': {
    title: 'Household Laundry Colchester',
    metaTitle: 'Duvet & Household Laundry Colchester | Bedding & Curtain Cleaning — Laundry Express',
    metaDescription: 'Professional household laundry in Colchester — duvets, curtains, bedding, and towels cleaned and returned to your door. Free collection. Book online.',
    image: 'https://images.unsplash.com/photo-1614045963521-189262b3c60b?crop=entropy&cs=srgb&fm=jpg&q=85',
    tagline: 'Duvets, bedding, curtains and towels — cleaned and returned fresh',
    intro: [
      'Household items like duvets, bed sheets, curtains, and large towels are awkward to wash at home. Most domestic machines aren\'t large enough to wash a double or king-size duvet properly, and even when they are, drying takes days. Our household laundry service in Colchester handles all of it.',
      'We collect your household items, wash them in large-capacity professional machines at the right temperature for the fill type — down, synthetic, or hollow fibre — dry them fully, and return them fresh and ready to use. Curtains are washed on the appropriate programme to prevent shrinkage and returned flat-folded.',
      'Most households benefit from a duvet and pillow clean at least twice a year. Regular cleaning removes dust mites, allergens, and bacteria that build up inside bedding — particularly important for allergy sufferers and young children.',
    ],
    categories: [
      { name: 'Duvets & Pillows', desc: 'Single, double, king, and super-king duvets. Down and synthetic fills.' },
      { name: 'Bedding', desc: 'Bed sheets, fitted sheets, duvet covers, and pillowcases.' },
      { name: 'Curtains', desc: 'Washed to care label specifications to avoid shrinkage.' },
      { name: 'Towels', desc: 'Bath, hand, and gym towels washed at high temperature for hygiene.' },
    ],
    turnaround: '48–72 hours',
    benefits: [
      { title: 'Commercial-grade machines', text: 'Our large-capacity washers handle king-size duvets and full curtain sets that won\'t fit in a home machine.' },
      { title: 'Allergen reduction', text: 'High-temperature washing reduces dust mites and allergens in bedding — ideal for asthma and allergy sufferers.' },
      { title: 'Fully dried before return', text: 'Duvets and pillows are thoroughly dried in large tumble dryers — no damp patches or mould risk.' },
    ],
    faqs: [
      { q: 'Can you clean a king-size duvet?', a: 'Yes. We have commercial-sized machines capable of washing any duvet up to super-king. Please note the size in your order.' },
      { q: 'Will my curtains shrink?', a: 'We check the care label and wash on the appropriate programme. Most machine-washable curtains are washed at 30°C or on a delicate cycle.' },
      { q: 'How often should I get my duvet cleaned?', a: 'We recommend at least twice a year — once in spring and once in autumn. More often if you have allergies or pets sleep on the bed.' },
    ],
  },
  'alteration-repairs': {
    title: 'Clothing Alterations & Repairs Colchester',
    metaTitle: 'Clothing Alterations & Repairs Colchester | Hemming & Resizing — Laundry Express',
    metaDescription: 'Expert clothing alterations and repairs in Colchester — hemming, resizing, zip replacement and more. Collected and delivered from your door.',
    image: 'https://images.pexels.com/photos/4614223/pexels-photo-4614223.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    tagline: 'Expert tailoring for alterations and repairs, collected from your door',
    intro: [
      'Our alteration and repair service means you no longer need to visit a tailor in person. We collect your garments, carry out the required alterations or repairs at our Colchester facility, and return them to your door — ready to wear.',
      'Common alterations include hemming trousers and dresses, taking in or letting out waists and seams, shortening or lengthening sleeves, and adjusting the fit of jackets and coats. On the repairs side, we handle zip replacements, seam splitting, button reattachment, and small tears or holes.',
      'All work is carried out by experienced seamstresses with close attention to detail and a focus on preserving the original look of the garment. We match thread colours precisely and use techniques appropriate to the fabric.',
    ],
    categories: [
      { name: 'Hemming', desc: 'Shortening or lengthening trousers, skirts, dresses, and sleeves.' },
      { name: 'Resizing', desc: 'Taking in or letting out seams to adjust the overall fit.' },
      { name: 'Repairs', desc: 'Zip replacement, seam repair, button reattachment, and patching.' },
    ],
    turnaround: '3–5 working days',
    benefits: [
      { title: 'No need to visit a tailor', text: 'We collect and return to your door — all the convenience of a local tailor without travelling.' },
      { title: 'Precise colour matching', text: 'We match thread and fabric closely so repairs and alterations blend seamlessly with the original garment.' },
      { title: 'All garment types', text: 'We work on everyday clothing, formal wear, school uniforms, sportswear, and occasionwear.' },
    ],
    faqs: [
      { q: 'How do I tell you what alterations I need?', a: 'Add a note to your order with the alteration details. For complex changes, we may call you to confirm measurements before starting.' },
      { q: 'How long do alterations take?', a: 'Most standard alterations are completed within 3–5 working days. Urgent requests can sometimes be accommodated — contact us to check.' },
      { q: 'What if I\'m not happy with the result?', a: 'We discuss the alteration with you beforehand and won\'t proceed if anything is unclear. If the result isn\'t right, we\'ll fix it.' },
    ],
  },
  'shoe-cleaning': {
    title: 'Shoe Cleaning Colchester',
    metaTitle: 'Shoe Cleaning Colchester | Trainer & Leather Shoe Care — Laundry Express',
    metaDescription: 'Professional shoe cleaning in Colchester for trainers, leather shoes and suede footwear. Deep clean, deodorising and polish. Free doorstep collection.',
    image: 'https://images.unsplash.com/photo-1626964613814-945c5c13dbd1?crop=entropy&cs=srgb&fm=jpg&q=85',
    tagline: 'Deep clean, deodorise and restore your trainers, leather and suede',
    intro: [
      'Our professional shoe cleaning service in Colchester covers trainers, leather shoes, suede footwear, and most casual and dress shoes. We collect from your door, deep clean and treat each pair appropriately for the material, and return them looking significantly fresher.',
      'For trainers, we remove laces and insoles, hand-scrub the uppers, clean the soles, and dry them carefully away from direct heat to maintain shape. White trainers are a particular speciality — we use specialist products to brighten uppers and midsoles without yellowing. For leather shoes, we clean, condition, and polish to a proper shine. For suede, we brush and treat with a suede-specific cleaner and protector.',
      'Regular shoe care extends the life of your footwear considerably. A professional clean removes embedded dirt, bacteria, and odour that surface wiping cannot reach — and keeps your favourite shoes looking their best for longer.',
    ],
    categories: [
      { name: 'Trainers & Sneakers', desc: 'Deep clean, sole scrub, lace wash, and drying. White trainer restoration available.' },
      { name: 'Leather Shoes', desc: 'Cleaned, conditioned, and polished by hand to a professional finish.' },
      { name: 'Suede & Nubuck', desc: 'Brushed, treated, and protected with suede-specific cleaning products.' },
    ],
    turnaround: '48–72 hours',
    benefits: [
      { title: 'Material-specific treatment', text: 'Trainers, leather, and suede are each cleaned with products designed for that material — no one-size-fits-all approach.' },
      { title: 'White trainer restoration', text: 'Specialist products brighten midsoles and uppers without the yellowing that household cleaners cause.' },
      { title: 'Deodorised as standard', text: 'All shoes are deodorised during cleaning — important for trainers worn without socks or in warm conditions.' },
    ],
    faqs: [
      { q: 'Can you restore badly stained white trainers?', a: 'In most cases yes — significant improvement is achievable. Heavily yellowed or very old staining may not fully reverse, but we\'ll give you an honest assessment.' },
      { q: 'Do you clean the insoles?', a: 'Yes. Insoles are removed, cleaned separately, and deodorised before being replaced.' },
      { q: 'What shoes can\'t you clean?', a: 'We\'re unable to clean shoes with significant structural damage or broken soles. If in doubt, contact us before booking.' },
    ],
  },
};

export const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = SERVICES[slug];

  if (!service) {
    navigate('/services');
    return null;
  }

  const pageUrl = `${SITE_URL}/services/${slug}`;
  const [openFaq, setOpenFaq] = React.useState(null);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* React 19 head hoisting */}
      <title>{service.metaTitle}</title>
      <meta name="description" content={service.metaDescription} />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:title" content={service.metaTitle} />
      <meta property="og:description" content={service.metaDescription} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={service.image} />
      <meta name="twitter:title" content={service.metaTitle} />
      <meta name="twitter:description" content={service.metaDescription} />
      <meta name="twitter:image" content={service.image} />

      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-4 sm:px-8 pb-10 max-w-7xl mx-auto">
          <Link to="/services" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-4 transition-colors w-fit">
            <ArrowLeft className="h-4 w-4" /> All services
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">{service.title}</h1>
          <p className="text-white/80 mt-2 text-base md:text-lg max-w-2xl">{service.tagline}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Turnaround badge */}
        <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-5 py-2.5 w-fit mb-10">
          <Clock className="h-4 w-4 text-blue-600 shrink-0" />
          <span className="text-sm font-medium text-blue-700">Turnaround: {service.turnaround}</span>
        </div>

        {/* Intro */}
        <div className="space-y-4 mb-12">
          {service.intro.map((para, i) => (
            <p key={i} className="text-slate-600 leading-relaxed text-base md:text-lg">{para}</p>
          ))}
        </div>

        {/* What's included */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-10">
          <h2 className="text-xl font-bold text-slate-800 mb-6">What's included</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.categories.map((cat) => (
              <div key={cat.name} className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{cat.name}</p>
                  <p className="text-slate-500 text-sm">{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Why choose Laundry Express for {service.title.toLowerCase()}?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.benefits.map((b) => (
              <div key={b.title} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-slate-800 mb-2">{b.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Frequently asked questions</h2>
          <div className="space-y-3">
            {service.faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="font-medium text-slate-800">{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-slate-400 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Ready to book?</h2>
          <p className="text-blue-100 mb-6 max-w-md mx-auto">Free doorstep collection across Colchester. Use code <span className="font-bold text-white">WELCOME20</span> for 20% off your first order.</p>
          <Button
            onClick={() => navigate('/order')}
            className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 rounded-full h-auto"
          >
            Book a collection <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
