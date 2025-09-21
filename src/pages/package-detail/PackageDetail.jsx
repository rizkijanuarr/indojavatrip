import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from "../../components/navbar/Navbar";
import PackageDetailSection from "./PackageDetailSection";
import FooterSection from "../home/footer/FooterSection";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import Meta from '../../components/Meta/Meta';

export default function PackageDetail() {
    const { id } = useParams();
    const { t } = useTranslation();

    return (
        <div className="app-root-fullscreen">
            <Meta 
                title={t('meta.packages.title')}
                description={t('meta.packages.description')}
                type="article"
            />
            {/* Navbar Background Area */}
            <div className="navbar-background-area" style={{ height: '120px', backgroundColor: '#000' }}></div>
            
            <div className="w-full absolute top-0 left-0 z-[99999]">
                <Navbar />
            </div>

            <PackageDetailSection />
            <FooterSection />

            {/* Scroll to Top Button */}
            <ScrollToTop />
        </div>
    );
}
