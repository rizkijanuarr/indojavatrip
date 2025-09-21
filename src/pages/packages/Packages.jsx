import Navbar from "../../components/navbar/Navbar";
import PackageSection from "./PackageSection";
import FooterSection from "../home/footer/FooterSection";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import React from 'react';
import { useTranslation } from 'react-i18next';
import Meta from '../../components/Meta/Meta';

export default function Packages() {
    const { t } = useTranslation();

    return (
        <div className="app-root-fullscreen">
            <Meta 
                title={t('meta.packages.title')}
                description={t('meta.packages.description')}
            />
            {/* Navbar Background Area */}
            <div className="navbar-background-area" style={{ height: '120px', backgroundColor: '#000' }}></div>
            
            <div className="w-full absolute top-0 left-0 z-[99999]">
                <Navbar />
            </div>

            <PackageSection />
            <FooterSection />

            {/* Scroll to Top Button */}
            <ScrollToTop />
        </div>
    );
}