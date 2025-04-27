import React from 'react';
import { useTranslation } from 'react-i18next';

const LegalPage = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 bg-base-100 mt-15">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">
          <span className="inline-block bg-blue-50 text-primary rounded-full w-12 h-12  items-center justify-center mr-3">🧾</span>
          {t('legal.title')}
        </h1>
        <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>
        <p className="text-gray-500">{t('legal.last_updated')}</p>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        <section className="border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center">
            <span className="mr-2">📌</span> {t('legal.publisher.title')}
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>{t('legal.publisher.company')}</strong></li>
            {/* <li>{t('legal.publisher.address')}</li>
            <li>{t('legal.publisher.siret')}</li> */}
            <li>{t('legal.publisher.email_prefix')}: <a href={`mailto:${t('legal.publisher.email')}`} className="text-primary hover:underline">{t('legal.publisher.email')}</a></li>
            <li>{t('legal.publisher.director')}</li>
          </ul>
        </section>

        {/* Hosting Section */}
        <section className="border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center">
            <span className="mr-2">🖥</span> {t('legal.hosting.title')}
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>{t('legal.hosting.company')}</li>
            <li>{t('legal.hosting.address')}</li>
            <li>{t('legal.hosting.email_prefix')}: <a href={`mailto:${t('legal.hosting.email')}`} className="text-primary hover:underline">{t('legal.hosting.email')}</a></li>
          </ul>
        </section>

        {/* Terms Section */}
        <section>
          <div className="space-y-6">
            {Object.keys(t('legal.sections', { returnObjects: true })).map((sectionKey) => {
              const section = t(`legal.sections.${sectionKey}`, { returnObjects: true });
              return (
                <div key={sectionKey} className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-primary mb-3">{section.title}</h3>
                  <div className="prose max-w-none">
                    {Array.isArray(section.content) ? (
                      <>
                        {section.content.map((paragraph, i) => (
                          <React.Fragment key={i}>
                            {i === 0 && <p>{paragraph}</p>}
                            {i === 1 && (
                              <ul className="list-disc list-inside space-y-1 mt-2">
                                {section.content.slice(1).map((item, j) => (
                                  <li key={j}>{item}</li>
                                ))}
                              </ul>
                            )}
                          </React.Fragment>
                        ))}
                      </>
                    ) : (
                      <p>{section.content}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* GDPR Section */}
        <section>
          <h2 className="text-2xl font-semibold text-primary mb-6 flex items-center">
            <span className="mr-2">📌</span> {t('legal.gdpr.title')}
          </h2>
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <p className="mb-4">{t('legal.gdpr.intro')}</p>
            
            <div className="space-y-6">
              {Object.keys(t('legal.gdpr.bases', { returnObjects: true })).map((baseKey) => {
                const base = t(`legal.gdpr.bases.${baseKey}`, { returnObjects: true });
                return (
                  <div key={baseKey}>
                    <h3 className="text-lg font-semibold text-primary mb-2">{base.title}</h3>
                    <p>{base.description}</p>
                    {base.items && (
                      <ul className="list-disc list-inside space-y-1 mt-2">
                        {base.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}
                    {base.note && <p className="mt-2">{base.note}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LegalPage;