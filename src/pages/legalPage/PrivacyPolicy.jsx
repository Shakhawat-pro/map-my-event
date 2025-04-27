import React from 'react';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy = () => {
    const { t } = useTranslation();
  
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 bg-base-100 mt-15">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">
          <span className="inline-block bg-blue-50 text-primary rounded-full w-12 h-12  items-center justify-center mr-3">🔒</span>
          {t('privacy_policy.title')}
        </h1>
        <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>
        <p className="text-gray-500">{t('privacy_policy.last_updated')}</p>
      </div>

      <div className="space-y-8">
        <section className="border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center">
            <span className="mr-2">📌</span> {t('privacy_policy.data_controller.title')}
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>{t('privacy_policy.data_controller.company_name')}</strong></li>
            <li>{t('privacy_policy.data_controller.address')}</li>
            <li>{t('privacy_policy.data_controller.email_label')}: <a href="mailto:contact@confmap.fr" className="text-primary hover:underline">contact@confmap.fr</a></li>
          </ul>
        </section>

        <section>
          <div className="space-y-6">
            {[
              {
                title: t('privacy_policy.sections.information_collect.title'),
                content: (
                  <>
                    <p>{t('privacy_policy.sections.information_collect.intro')}</p>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      <li><strong>{t('privacy_policy.sections.information_collect.account_info')}:</strong> {t('privacy_policy.sections.information_collect.account_info_detail')}</li>
                      <li><strong>{t('privacy_policy.sections.information_collect.event_info')}:</strong> {t('privacy_policy.sections.information_collect.event_info_detail')}</li>
                      <li><strong>{t('privacy_policy.sections.information_collect.usage_data')}:</strong> {t('privacy_policy.sections.information_collect.usage_data_detail')}</li>
                    </ul>
                  </>
                )
              },
              {
                title: t('privacy_policy.sections.data_use.title'),
                content: (
                  <>
                    <p>{t('privacy_policy.sections.data_use.intro')}</p>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      <li>{t('privacy_policy.sections.data_use.provide_services')}</li>
                      <li>{t('privacy_policy.sections.data_use.process_submissions')}</li>
                      <li>{t('privacy_policy.sections.data_use.improve_experience')}</li>
                      <li>{t('privacy_policy.sections.data_use.analyze_usage')}</li>
                      <li>{t('privacy_policy.sections.data_use.communicate_updates')}</li>
                    </ul>
                  </>
                )
              },
              {
                title: t('privacy_policy.sections.data_sharing.title'),
                content: t('privacy_policy.sections.data_sharing.content')
              },
              {
                title: t('privacy_policy.sections.data_retention.title'),
                content: t('privacy_policy.sections.data_retention.content')
              },
              {
                title: t('privacy_policy.sections.your_rights.title'),
                content: (
                  <>
                    <p>{t('privacy_policy.sections.your_rights.intro')}</p>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      <li>{t('privacy_policy.sections.your_rights.access')}</li>
                      <li>{t('privacy_policy.sections.your_rights.object')}</li>
                      <li>{t('privacy_policy.sections.your_rights.withdraw')}</li>
                      <li>{t('privacy_policy.sections.your_rights.complaint')}</li>
                    </ul>
                    <p className="mt-2">{t('privacy_policy.sections.your_rights.contact')}</p>
                  </>
                )
              },
              {
                title: t('privacy_policy.sections.security.title'),
                content: t('privacy_policy.sections.security.content')
              },
              {
                title: t('privacy_policy.sections.international_transfers.title'),
                content: t('privacy_policy.sections.international_transfers.content')
              },
              {
                title: t('privacy_policy.sections.policy_changes.title'),
                content: t('privacy_policy.sections.policy_changes.content')
              },
              {
                title: t('privacy_policy.sections.contact.title'),
                content: t('privacy_policy.sections.contact.content')
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
      </div>
    </div>
  );
};

export default PrivacyPolicy;