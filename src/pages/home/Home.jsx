import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import HeroSection from "./hero/HeroSection";
import PackageSection from "./package/PackageSection";
import TourPackageSection from "./tour-package/TourPackageSection";
import GallerySection from "./gallery/GallerySection";
import TestimonialSection from "./testimonial/TestimonialSection";
import FooterSection from "./footer/FooterSection";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

export default function Home() {
    const [showGrid, setShowGrid] = useState(false);

    const toggleGrid = () => {
        setShowGrid(!showGrid);
    };

    return (
        <div className="app-root-fullscreen">

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