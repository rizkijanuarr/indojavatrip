import { useTranslation } from 'react-i18next';
import React from 'react';

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="footer-package-section">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-column logo-column">
                        {/* ...existing logo code... */}
                        <div className="footer-description">
                            <p>{t('footer.description')}</p>
                        </div>
                        {/* ...existing social icons... */}
                    </div>

                    <div className="contain-footer-column">
                        <div className="footer-column">
                            <div className="footer-title">
                                <h4>{t('footer.quickLinks')}</h4>
                            </div>
                            {/* ...existing footer links... */}
                        </div>
                        {/* ...existing footer sections... */}
                    </div>
                </div>
            </div>
        </footer>
    )
}