import "./ContactStyleSection.css"
import { useTranslation } from 'react-i18next';
import HeaderSection from "../../components/HeaderSection/HeaderSection"

export default function ContactSection() {
    const { t } = useTranslation();
    return (
        <section className="contact-package-section">
            <HeaderSection
                title={t('contact.title')}
            />

            <div className="container">
                <div className="contact-content">
                    <div className="contact-info">
                        <div className="contact-item">
                            <h3>📍 {t('contact.address')}</h3>
                            <p>{t('contact.addressText')}</p>
                        </div>

                        <div className="contact-item">
                            <h3>📞 {t('contact.phone')}</h3>
                            <p>{t('contact.phoneText')}</p>
                        </div>

                        <div className="contact-item">
                            <h3>✉️ {t('contact.email')}</h3>
                            <p>{t('contact.emailText')}</p>
                        </div>

                        <div className="contact-item">
                            <h3>🕒 {t('contact.hours')}</h3>
                            <p dangerouslySetInnerHTML={{ __html: t('contact.hoursText') }}></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}