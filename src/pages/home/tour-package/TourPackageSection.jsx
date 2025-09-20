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

    // Create tour data from packages data with picsum images
    const provinceKeys = Object.keys(packagesData);
    const tourData = provinceKeys.map((key, index) => ({
        id: index + 1,
        title: getProvinceTitle(key),
        imageUrl: `https://picsum.photos/400/300?random=${index + 1}`
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
                            imageUrl={tour.imageUrl}
                            showButton={false}
                            // onButtonClick={() => {
                            //     navigate(`/package/${tour.id}`);
                            // }}
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
