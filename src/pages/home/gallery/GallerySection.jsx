import "./GalleryStyleSection.css"
import { useTranslation } from 'react-i18next';
import HeaderSection from "../../../components/HeaderSection/HeaderSection"
import GalleryGrid from "../../../components/GalleryGrid/GalleryGrid"
import { galleryImages } from "../../../data/galleryData"

export default function GallerySection() {
    const { t } = useTranslation();
    
    return (
        <section className="gallery-package-section">
            <HeaderSection
                title={t('gallery.title')}
                subtitle={t('gallery.subtitle')}
            />

            <div className="container">
                <GalleryGrid images={galleryImages} />
            </div>
        </section>
    )
}
