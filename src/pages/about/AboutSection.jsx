import "./AboutStyleSection.css"
import { useTranslation } from 'react-i18next';
import HeaderSection from "../../components/HeaderSection/HeaderSection"

export default function AboutSection() {
    const { t } = useTranslation();
    return (
        <section className="about-package-section">
            <HeaderSection
                title={t('about.title')}
            />

            <div className="container">
                <div className="about-content">
                    <div className="about-image">
                        <img 
                            src="https://picsum.photos/400/300?random=1" 
                            alt="About Indojavatrip" 
                            className="about-img"
                        />
                    </div>
                    <div className="about-text">
                        <p>
                            {t('about.paragraph1')}
                        </p>
                        <p>
                            {t('about.paragraph2')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}