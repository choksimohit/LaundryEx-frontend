import React from 'react';

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-lg font-bold text-slate-800 mb-3">{title}</h2>
    <div className="text-slate-600 text-sm leading-relaxed space-y-2">{children}</div>
  </div>
);

export const Privacy = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-14 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Legal</p>
          <h1 className="text-3xl font-bold text-slate-800">Privacy Policy</h1>
          <p className="text-slate-400 text-sm mt-2">Last updated: July 2026</p>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-slate-200">
          <Section title="1. Who We Are">
            <p>Laundry Express operates the website laundry-express.co.uk and provides doorstep laundry and dry cleaning services in Colchester, Essex, UK. We are committed to protecting your personal data in accordance with the UK GDPR and the Data Protection Act 2018.</p>
          </Section>

          <Section title="2. Data We Collect">
            <p>We collect and process the following personal data:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Account data:</strong> name, email address, phone number</li>
              <li><strong>Order data:</strong> delivery address, postcode, pickup and delivery preferences</li>
              <li><strong>Payment data:</strong> processed securely via Stripe — we do not store card details</li>
              <li><strong>Communication data:</strong> emails and WhatsApp messages you send us</li>
              <li><strong>Usage data:</strong> pages visited, device type, browser (via Google Analytics and PostHog)</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Data">
            <p>We use your data to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Process and manage your laundry orders</li>
              <li>Send order confirmations and updates by email</li>
              <li>Send promotional offers where you have opted in</li>
              <li>Improve our website and service using analytics</li>
              <li>Meet our legal and regulatory obligations</li>
            </ul>
          </Section>

          <Section title="4. Legal Basis for Processing">
            <p>We process your data on the following legal bases:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Contract:</strong> to fulfil your orders</li>
              <li><strong>Legitimate interests:</strong> to improve our service and communicate with customers</li>
              <li><strong>Consent:</strong> for marketing emails (you may withdraw consent at any time)</li>
            </ul>
          </Section>

          <Section title="5. Data Sharing">
            <p>We do not sell your personal data. We share it only with trusted third parties who help us deliver our service:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Stripe</strong> — payment processing</li>
              <li><strong>Resend</strong> — transactional email delivery</li>
              <li><strong>Meta WhatsApp Cloud API</strong> — WhatsApp notifications</li>
              <li><strong>MongoDB Atlas</strong> — secure cloud database</li>
              <li><strong>Google Analytics / PostHog</strong> — anonymous usage analytics</li>
            </ul>
            <p>All third parties are required to handle your data securely and only for the purposes we specify.</p>
          </Section>

          <Section title="6. Data Retention">
            <p>We retain your account and order data for up to 3 years after your last order, or as required by law. You may request deletion of your data at any time by contacting us.</p>
          </Section>

          <Section title="7. Your Rights">
            <p>Under UK GDPR you have the right to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Access the personal data we hold about you</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict our processing</li>
              <li>Data portability</li>
              <li>Withdraw consent for marketing at any time</li>
            </ul>
            <p>To exercise any of these rights, contact us at <a href="mailto:support@laundry-express.co.uk" className="text-blue-600 hover:underline">support@laundry-express.co.uk</a>.</p>
          </Section>

          <Section title="8. Cookies">
            <p>We use cookies for analytics (Google Analytics, PostHog) and to keep you logged in. You can disable cookies in your browser settings, though this may affect site functionality.</p>
          </Section>

          <Section title="9. Contact &amp; Complaints">
            <p>For any privacy queries contact us at <a href="mailto:support@laundry-express.co.uk" className="text-blue-600 hover:underline">support@laundry-express.co.uk</a>. If you are unhappy with how we handle your data, you have the right to lodge a complaint with the <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Information Commissioner's Office (ICO)</a>.</p>
          </Section>
        </div>
      </div>
    </div>
  );
};
