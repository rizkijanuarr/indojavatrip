import { useTranslation } from 'react-i18next';
import HeaderSection from './HeaderSection';
import PackageGrid from './PackageGrid';
import MyButton from './MyButton';
import { useNavigate } from 'react-router-dom';

export default function PackageSection() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const newPackages = [
        // ...your package data
    ];

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
                        navigate(`/package-detail/${packageData.id}`)
                    }}
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