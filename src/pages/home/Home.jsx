import { useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/navbar/Navbar";
import HeroSection from "./hero/HeroSection";
import PackageSection from "./package/PackageSection";
import TourPackageSection from "./tour-package/TourPackageSection";
import GallerySection from "./gallery/GallerySection";
import TestimonialSection from "./testimonial/TestimonialSection";
import FooterSection from "./footer/FooterSection";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import Meta from "../../components/Meta/Meta";

export default function Home() {
    const [showGrid, setShowGrid] = useState(false);
    const { t } = useTranslation();

    const toggleGrid = () => {
        setShowGrid(!showGrid);
    };

    return (
        <div className="app-root-fullscreen">
            <Meta 
                title={t('meta.home.title')}
                description={t('meta.home.description')}
                type="website"
            />

            <Navbar />

            <HeroSection />
            <PackageSection />
            <TourPackageSection />
            <GallerySection />
            <TestimonialSection />
            <FooterSection />

            {/* Scroll to Top Button */}
            <ScrollToTop />
        </div>
    );
}