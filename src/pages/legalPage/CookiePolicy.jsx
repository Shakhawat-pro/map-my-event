import React from 'react';
import { useTranslation } from 'react-i18next';

const CookiePolicy = () => {
  const { t } = useTranslation();
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 bg-base-100 mt-15">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">
          <span className="inline-block bg-blue-50 text-primary rounded-full w-12 h-12  items-center justify-center mr-3">🍪</span>
          {t('cookie_policy.title')}
        </h1>
        <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>
        <p className="text-gray-500">{t('cookie_policy.last_updated')}</p>
      </div>

      <div className="space-y-8">
        <section className="border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center">
            <span className="mr-2">📌</span> {t('cookie_policy.about.title')}
          </h2>
          <p>{t('cookie_policy.about.content')}</p>
        </section>

        <section>
          <div className="space-y-6">
            {[
              {
                title: t('cookie_policy.sections.how_use.title'),
                content: (
                  <>
                    <p>{t('cookie_policy.sections.how_use.intro')}</p>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      <li>{t('cookie_policy.sections.how_use.enable_functionality')}</li>
                      <li>{t('cookie_policy.sections.how_use.remember_preferences')}</li>
                      {/* <li>{t('cookie_policy.sections.how_use.analyze_usage')}</li> */}
                      <li>{t('cookie_policy.sections.how_use.support_security')}</li>
                    </ul>
                  </>
                )
              },
              {
                title: t('cookie_policy.sections.types.title'),
                content: (
                  <>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold">{t('cookie_policy.sections.types.essential.title')}</h4>
                        <p>{t('cookie_policy.sections.types.essential.description')}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold">{t('cookie_policy.sections.types.functional.title')}</h4>
                        <p>{t('cookie_policy.sections.types.functional.description')}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold">{t('cookie_policy.sections.types.analytics.title')}</h4>
                        <p>{t('cookie_policy.sections.types.analytics.description')}</p>
                      </div>
                    </div>
                  </>
                )
              },
              {
                title: t('cookie_policy.sections.third_party.title'),
                content: t('cookie_policy.sections.third_party.content')
              },
              {
                title: t('cookie_policy.sections.managing.title'),
                content: (
                  <>
                    <p>{t('cookie_policy.sections.managing.intro')}</p>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      <li>{t('cookie_policy.sections.managing.delete')}</li>
                      <li>{t('cookie_policy.sections.managing.block')}</li>
                      <li>{t('cookie_policy.sections.managing.set_preferences')}</li>
                    </ul>
                    <p className="mt-2">{t('cookie_policy.sections.managing.note')}</p>
                  </>
                )
              },
              {
                title: t('cookie_policy.sections.changes.title'),
                content: t('cookie_policy.sections.changes.content')
              },
              {
                title: t('cookie_policy.sections.contact.title'),
                content: t('cookie_policy.sections.contact.content')
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

export default CookiePolicy;