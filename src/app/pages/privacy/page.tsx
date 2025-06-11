import React from 'react';

const PrivacyPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-10 text-gray-800 leading-relaxed font-[family-name:var(--font-geist-mono)]">
        <h1 className="text-4xl font-bold text-blue-700 mb-6">Privacy Policy</h1>

        <p className="mb-6">
          Welcome to <span className="font-semibold text-blue-600">ChatApp</span>. Your privacy is our top priority. 
          This Privacy Policy outlines how we handle your information to keep your data safe, secure, and private 
          while using our services.
        </p>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">1. What Information We Collect</h2>
          <ul className="list-disc list-inside mb-6 ml-2 space-y-2">
            <li><strong>Personal Info:</strong> Name, email address, and phone number.</li>
            <li><strong>Chat Content:</strong> Messages, shared media, and files.</li>
            <li><strong>Technical Data:</strong> IP address, browser info, device type, and usage logs.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">2. How We Use Your Data</h2>
          <ul className="list-disc list-inside mb-6 ml-2 space-y-2">
            <li>To provide real-time messaging and support features.</li>
            <li>To personalize your experience and improve app functionality.</li>
            <li>To monitor system performance, prevent abuse, and ensure security.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">3. How We Protect Your Data</h2>
          <p className="mb-6">
            We use advanced security measures like <span className="font-medium">end-to-end encryption</span>, 
            firewalls, and secure servers to protect your conversations and personal details.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">4. Third-Party Tools</h2>
          <p className="mb-6">
            We may integrate third-party services (e.g., analytics tools) to help improve user experience. 
            These tools collect data anonymously and do not access your private messages.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">5. Your Rights & Choices</h2>
          <ul className="list-disc list-inside mb-6 ml-2 space-y-2">
            <li>Request access to your stored data.</li>
            <li>Update or delete your information at any time.</li>
            <li>Opt-out of specific data collection features.</li>
          </ul>
          <p className="mb-6">
            For any privacy-related concerns, reach out to us at{' '}
            <a
              href="mailto:support@chatapp.com"
              className="text-blue-600 underline hover:text-blue-800"
            >
              support@connect.com
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">6. Updates to This Policy</h2>
          <p className="mb-6">
            We may revise this Privacy Policy to reflect updates in our practices. Significant changes 
            will be clearly communicated within the app or on our website.
          </p>
        </section>

        <p className="text-sm text-gray-600">Last updated: June 10, 2025</p>
      </div>
    </div>
  );
};

export default PrivacyPage;
