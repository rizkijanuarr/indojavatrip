import "./TourPackageStyleSection.css"
import { useTranslation } from 'react-i18next';
import HeaderSection from "../../../components/HeaderSection/HeaderSection"
import TourCard from "../../../components/TourCard/TourCard"
import { packagesData } from "../../../data/packages"
import MyButton from "../../../components/MyButton/MyButton"
import { useNavigate } from "react-router-dom";

export default function TourPackageSection() {
    const { t } = useTranslation();
    
    // Get province titles from packages data
    const getProvinceTitle = (key) => {
        switch (key) {
            case 'EAST_JAVA': return t('tour.provinces.eastJava');
            case 'CENTRAL_JAVA': return t('tour.provinces.centralJava');
            case 'LOMBOK_CITY': return t('tour.provinces.lombokCity');
            case 'RINJANI': return t('tour.provinces.rinjani');
            case 'EAST_CENTER': return t('tour.provinces.eastCenter');
            default: return key;
        }
    };

    // Get Cloudinary image name by province
    const getCloudinaryImageByProvince = (key) => {
        switch (key) {
            case 'EAST_JAVA': return 'bromo19_obrkum';
            case 'RINJANI': return 'puncak-gunung-rinjani6_uw13fs';
            case 'LOMBOK_CITY': return 'mt-rinjani3_xvcglf';
            case 'CENTRAL_JAVA': return '31aef41d-gunung-dieng_nga59p';
            case 'EAST_CENTER': return 'istockphoto-1166976621-170667a_xxhdkr';
            default: return '2D1N1_xzaywm'; // fallback
        }
    };

    // Create tour data from packages data with Cloudinary images
    const provinceKeys = Object.keys(packagesData);
    const tourData = provinceKeys.map((key, index) => ({
        id: index + 1,
        title: getProvinceTitle(key),
        cloudinaryName: getCloudinaryImageByProvince(key)
    }));

    // Import useNavigate from react-router-dom
    const navigate = useNavigate();

    return (
        <section className="tour-package-section">
            <HeaderSection
                title={t('tour.title')}
                subtitle={t('tour.subtitle')}
            />

            <div className="container">
                {/* Display province titles */}

                <div className="tour-grid">
                    {tourData.map((tour) => (
                        <TourCard
                            key={tour.id}
                            id={tour.id}
                            title={tour.title}
                            cloudinaryName={tour.cloudinaryName}
                            showButton={false}
                        />
                    ))}
                </div>

                <div className="view-all-section">
                    <MyButton
                        variant="outline"
                        color="#1a1a1a"
                        className="view-all-btn"
                        onClick={() => navigate("/packages")}
                    >
                        {t('tour.viewAllTour')}
                    </MyButton>
                </div>
            </div>
        </section>
    )
}
