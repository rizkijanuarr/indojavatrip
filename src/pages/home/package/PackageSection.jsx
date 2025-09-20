import "./PackageStyleSection.css"
import { useTranslation } from 'react-i18next';
import MyButton from "../../../components/MyButton/MyButton"
import HeaderSection from "../../../components/HeaderSection/HeaderSection"
import PackageGrid from "../../../components/PackageGrid/PackageGrid"
import { packagesData } from "../../../data/packages"
import { useNavigate } from "react-router-dom";

export default function PackageSection() {
    const { t } = useTranslation();
    
    // Get all packages and filter only those with "NEW" badge
    const getAllPackages = () => {
        const allPackages = [];

        // Get East Java packages
        if (packagesData.EAST_JAVA) {
            Object.keys(packagesData.EAST_JAVA).forEach(duration => {
                if (Array.isArray(packagesData.EAST_JAVA[duration])) {
                    allPackages.push(...packagesData.EAST_JAVA[duration]);
                }
            });
        }

        // Get Rinjani packages
        if (packagesData.RINJANI) {
            Object.keys(packagesData.RINJANI).forEach(duration => {
                if (Array.isArray(packagesData.RINJANI[duration])) {
                    allPackages.push(...packagesData.RINJANI[duration]);
                }
            });
        }

        return allPackages;
    };

    // Filter packages to only show those with "NEW" badge
    const newPackages = getAllPackages().filter(pkg => 
        pkg.hasBadge && pkg.badge === "NEW"
    ).slice(0, 6); // Limit to 6 packages

    // Import useNavigate from react-router-dom
    const navigate = useNavigate();

    return (
        <section className="packages-section">
            <HeaderSection
                title={t('package.title')}
                subtitle={t('package.subtitle')}
            />

            <div className="container">
                <PackageGrid
                    packages={newPackages}
                    columns={3}
                    onCardClick={(packageData) => {
                        // Navigate to package detail page
                        navigate(`/package-detail/${packageData.id}`)
                    }}
                    enableTranslation={true}
                />

                <div className="view-all-section">
                    <MyButton
                        variant="outline"
                        color="#1a1a1a"
                        className="view-all-btn"
                        onClick={() => navigate("/packages")}
                    >
                        {t('package.viewAll')}
                    </MyButton>
                </div>
            </div>
        </section>
    )
}
