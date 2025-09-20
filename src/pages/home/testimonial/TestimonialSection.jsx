import "./TestimonialStyleSection.css"
import { useTranslation } from 'react-i18next';
import HeaderSection from "../../../components/HeaderSection/HeaderSection"
import Testimonial from "../../../components/Testimonial/Testimonial"

export default function TestimonialSection() {
    const { t } = useTranslation();
    
    return (
        <section className="testimonial-package-section">
            <HeaderSection
                title={t('testimonial.title')}
                subtitle={t('testimonial.subtitle')}
            />

            <div className="container">
                <Testimonial />
            </div>
        </section>
    )
}
