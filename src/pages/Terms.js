import React from 'react';

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-lg font-bold text-slate-800 mb-3">{title}</h2>
    <div className="text-slate-600 text-sm leading-relaxed space-y-2">{children}</div>
  </div>
);

export const Terms = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-14 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Legal</p>
          <h1 className="text-3xl font-bold text-slate-800">Terms &amp; Conditions</h1>
          <p className="text-slate-400 text-sm mt-2">Last updated: July 2026</p>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-slate-200">
          <Section title="1. About Us">
            <p>Laundry Express ("we", "us", "our") provides doorstep laundry and dry cleaning collection and delivery services in Colchester and surrounding areas, Essex, UK. By placing an order or using our website at laundry-express.co.uk, you agree to these terms.</p>
          </Section>

          <Section title="2. Services">
            <p>We offer wash &amp; fold, ironing, and dry cleaning services. All items are handled with care but we cannot accept liability for pre-existing damage or items that are not suitable for standard cleaning processes.</p>
            <p>We reserve the right to refuse items that are heavily soiled beyond reasonable levels, contaminated, or unsuitable for our processes.</p>
          </Section>

          <Section title="3. Collection &amp; Delivery">
            <p>Collection and delivery times are agreed at the point of booking. While we make every effort to meet scheduled times, delays may occasionally occur due to circumstances beyond our control. We will notify you if a significant delay is expected.</p>
          </Section>

          <Section title="4. Pricing &amp; Payment">
            <p>Prices are as displayed on our website at the time of order. We accept payment via card (Visa, Mastercard, American Express) and cash on delivery where selected.</p>
            <p>Promo codes are subject to their individual terms and may be withdrawn at any time. Codes are typically limited to one use per customer unless stated otherwise.</p>
          </Section>

          <Section title="5. Cancellations">
            <p>Orders may be cancelled or amended up to 2 hours before the scheduled collection time. Cancellations after this point may incur a charge. Please contact us via WhatsApp or email to request a cancellation.</p>
          </Section>

          <Section title="6. Liability">
            <p>We take every precaution with your garments. In the unlikely event of loss or damage caused by our service, our liability is limited to ten times the cost of the cleaning charge for the affected item, up to a maximum of £50 per item.</p>
            <p>We are not liable for damage to items that were not declared as delicate, or items left in pockets or attached to garments.</p>
          </Section>

          <Section title="7. Governing Law">
            <p>These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
          </Section>

          <Section title="8. Contact">
            <p>For any queries regarding these terms, please contact us at <a href="mailto:support@laundry-express.co.uk" className="text-blue-600 hover:underline">support@laundry-express.co.uk</a> or call <a href="tel:+447777367076" className="text-blue-600 hover:underline">+44 7777 367076</a>.</p>
          </Section>
        </div>
      </div>
    </div>
  );
};
