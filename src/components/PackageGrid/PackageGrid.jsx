import "./PackageGrid.css"
import { useTranslation } from 'react-i18next';
import CardPackage from "../CardPackage/CardPackage"

export default function PackageGrid({ 
  packages = [], 
  onCardClick,
  className = "",
  columns = 3,
  enableTranslation = false
}) {
  // Always initialize useTranslation hook (hooks must be called unconditionally)
  const { t } = useTranslation();

  return (
    <div className={`packages-grid packages-grid--${columns} ${className}`}>
      {packages.map((pkg) => {
        // Get translated values if enableTranslation is true
        const getTranslatedValue = (key, fallback) => {
          if (!enableTranslation || !key) {
            return fallback;
          }
          try {
            const translation = t(key);
            // Check if translation exists and is not the same as the key (which means no translation found)
            return translation && translation !== key ? translation : fallback;
          } catch (error) {
            return fallback;
          }
        };

        // Get button text
        const getButtonText = () => {
          if (enableTranslation) {
            try {
              const translation = t('common.viewDetail');
              return translation && translation !== 'common.viewDetail' ? translation : "Lihat Detail →";
            } catch (error) {
              return "Lihat Detail →";
            }
          }
          return pkg.buttonText || "Lihat Detail →";
        };

        return (
          <CardPackage
            key={pkg.id}
            id={pkg.id}
            title={getTranslatedValue(pkg.titleKey, pkg.title)}
            description={getTranslatedValue(pkg.descriptionKey, pkg.description)}
            price={pkg.price}
            days={getTranslatedValue(pkg.durasiHariKey, pkg.durasiHari)}
            badge={pkg.hasBadge ? getTranslatedValue(pkg.badgeKey, pkg.badge) : null}
            cloudinaryName={pkg.cloudinaryName}
            imageUrl={pkg.imageUrl}
            rating={pkg.rating}
            ratingText={getTranslatedValue(pkg.ratingTextKey, pkg.ratingText)}
            buttonText={getButtonText()}
            buttonVariant={pkg.buttonVariant || "primary"}
            buttonColor={pkg.buttonColor || "#ff6600"}
            onButtonClick={onCardClick}
          />
        );
      })}
    </div>
  )
}