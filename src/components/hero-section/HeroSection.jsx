import { useTranslation } from 'react-i18next';
import React from 'react';

export default function HeroSection() {
    const { t } = useTranslation();

    return (
        <section className="hero-section">
            <div className="hero-content">
                <h2 className="hero-subtitle">
                    {t('hero.subtitle')}
                </h2>
                <p className="hero-description">
                    {t('hero.description')}
                </p>
            </div>
        </section>
    )
}