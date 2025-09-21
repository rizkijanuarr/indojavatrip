import "./AboutStyleSection.css"
import { useTranslation } from 'react-i18next';
import HeaderSection from "../../components/HeaderSection/HeaderSection"
import CloudinaryImage from "../../components/CloudinaryImage"
import { border } from "@cloudinary/url-gen/qualifiers/background";

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
                        <CloudinaryImage 
                            imageName="2D1N2_q9bbia" 
                            alt="About Indojavatrip"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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