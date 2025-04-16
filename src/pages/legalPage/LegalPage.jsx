import React from 'react';

const LegalPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 bg-base-100 mt-15">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">
          <span className="inline-block bg-blue-50 text-primary rounded-full w-12 h-12 flex items-center justify-center mr-3">🧾</span>
          Terms of Use – ConfMap
        </h1>
        <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>
        <p className="text-gray-500">Last updated: April 2025</p>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
      <section className="border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center">
            <span className="mr-2">📌</span> Website Publisher
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>ConfMap – HORRIG Adel</strong></li>
            <li>[adresse de domiciliation ou société]</li>
            <li>[SIRET]</li>
            <li>Email: <a href="mailto:contact@confmap.fr" className="text-primary hover:underline">contact@confmap.fr</a></li>
            <li>Director of publication: HORRIG Adel</li>
          </ul>
        </section>

        {/* Hosting Section */}
        <section className="border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center">
            <span className="mr-2">🖥</span> Hosting Provider
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>HOSTINGER operations, UAB</li>
            <li>Švitrigailos str. 34, Vilnius 03230 Lithuania</li>
            <li>Email: <a href="mailto:domains@hostinger.com" className="text-primary hover:underline">domains@hostinger.com</a></li>
          </ul>
        </section>
        {/* Terms Section */}
        <section>
          <div className="space-y-6">
            {[
              {
                title: "1. Object",
                content: "These Terms of Use define the rules for accessing and using the website ConfMap (https://www.confmap.fr). By browsing or using the platform, you agree to comply with these terms."
              },
              {
                title: "2. Access to the platform",
                content: (
                  <>
                    <p>ConfMap is a web-based platform that enables users to:</p>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      <li>Explore scientific events (conferences, colloquia, etc.) on an interactive map</li>
                      <li>Filter events by field, location, date, and other criteria</li>
                      <li>Submit and manage events (subject to moderation)</li>
                      <li>Create a personal account to bookmark or follow events</li>
                    </ul>
                    <p className="mt-2">Access to the website is free. Certain features (such as event submission or saving favorites) may require user registration.</p>
                  </>
                )
              },
              {
                title: "3. User accounts",
                content: (
                  <>
                    <p>Users are responsible for maintaining the confidentiality of their login credentials. Any activity under their account is their responsibility.</p>
                    <p className="mt-2">By creating an account, users agree to:</p>
                    <ul className="list-disc list-inside space-y-1 mt-1">
                      <li>Provide accurate and up-to-date information</li>
                      <li>Refrain from using the site for illegal or abusive purposes</li>
                      <li>Not impersonate another person or entity</li>
                    </ul>
                    <p className="mt-2">ConfMap reserves the right to suspend or delete accounts that violate these terms.</p>
                  </>
                )
              },
              {
                title: "4. Event content & moderation",
                content: (
                  <>
                    <p>ConfMap allows users and partners to submit events. All submissions are subject to manual moderation.</p>
                    <p className="mt-2">ConfMap reserves the right to:</p>
                    <ul className="list-disc list-inside space-y-1 mt-1">
                      <li>Refuse or remove any content that is inaccurate, inappropriate, or violates applicable laws</li>
                      <li>Edit submissions for clarity, accuracy, or format compliance</li>
                    </ul>
                  </>
                )
              },
              {
                title: "5. Intellectual property",
                content: "All content on ConfMap (text, design, logo, structure) is protected by intellectual property laws. Reuse or reproduction without authorization is prohibited. User-submitted events remain the property of their authors, but by submitting, the user grants ConfMap a non-exclusive right to publish and distribute the content on the platform."
              },
              {
                title: "6. Limitation of liability",
                content: "ConfMap strives to provide reliable and up-to-date information but does not guarantee the accuracy or completeness of third-party content. The platform cannot be held liable for any direct or indirect damage resulting from the use of the site or information displayed."
              },
              {
                title: "7. Cookies & personal data",
                content: "ConfMap uses cookies to improve navigation and gather anonymous analytics. For details, please refer to our Privacy Policy."
              },
              {
                title: "8. Modifications",
                content: "These terms may be updated at any time. Users will be notified of significant changes. Continued use of the platform implies acceptance of the updated terms."
              },
              {
                title: "9. Contact",
                content: "For any questions regarding these Terms of Use, please contact: 📧 contact@confmap.fr"
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary mb-3">{item.title}</h3>
                <div className="prose max-w-none">
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GDPR Section */}
        <section>
          <h2 className="text-2xl font-semibold text-primary mb-6 flex items-center">
            <span className="mr-2">📌</span> Legal Basis for Data Processing
          </h2>
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <p className="mb-4">In accordance with Article 6 of the General Data Protection Regulation (EU) 2016/679 (GDPR), ConfMap relies on the following legal bases for processing personal data:</p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">1. Consent</h3>
                <p>Some personal data is collected based on the user's explicit consent, such as:</p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>When creating a user account</li>
                  <li>When submitting an event via a form</li>
                  <li>When accepting cookies used for analytics or functional purposes</li>
                </ul>
                <p className="mt-2">Users can withdraw their consent at any time by contacting us at contact@confmap.fr.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">2. Performance of a contract or pre-contractual measures</h3>
                <p>When users create an account or use our services, data processing is necessary for the performance of those services, including:</p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Accessing and managing a personal account</li>
                  <li>Registering or submitting events</li>
                  <li>Using features such as favorites or event alerts</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LegalPage;
