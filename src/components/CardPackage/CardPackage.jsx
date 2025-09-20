import "./CardPackage.css"
import { useTranslation } from 'react-i18next';
import MyButton from "../MyButton/MyButton"

export default function CardPackage({ 
  id,
  title,
  titleKey,
  description,
  descriptionKey,
  price,
  days,
  daysKey,
  badge,
  badgeKey,
  imageUrl,
  rating = "5.0",
  ratingText = "All guests are satisfied",
  ratingTextKey,
  buttonText = "Lihat Detail →",
  buttonTextKey,
  buttonVariant = "primary",
  buttonColor = "#ff6600",
  onButtonClick,
  className = ""
}) {
  const { t } = useTranslation();
  
  
  
  // Use translation keys if available, otherwise fallback to original values
  const displayTitle = titleKey && t(titleKey) !== titleKey ? t(titleKey) : title;
  const displayDescription = descriptionKey && t(descriptionKey) !== descriptionKey ? t(descriptionKey) : description;
  const displayDays = daysKey && t(daysKey) !== daysKey ? t(daysKey) : days;
  const displayBadge = badgeKey && t(badgeKey) !== badgeKey ? t(badgeKey) : badge;
  const displayRatingText = ratingTextKey && t(ratingTextKey) !== ratingTextKey ? t(ratingTextKey) : ratingText;
  const displayButtonText = buttonTextKey && t(buttonTextKey) !== buttonTextKey ? t(buttonTextKey) : (buttonText || "Pesan Sekarang");
  
  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick({ id, title: displayTitle, price, days: displayDays })
    }
  }

  return (
    <div className={`package-card ${className}`}>
      {badge && <div className="package-badge">{displayBadge}</div>}
      
      <div className="package-image">
        <img 
          src={imageUrl || `https://picsum.photos/300/200?random=${id}`} 
          alt={displayTitle} 
        />
      </div>
      
      <div className="package-content">
        <div className="package-rating">
          <span className="star">★</span>
          <span className="rating-text">{rating} ({displayRatingText})</span>
        </div>
        
        <h3 className="package-title">{displayTitle}</h3>
        <p className="package-description">{displayDescription}</p>
        
        <div className="package-info">
          <div className="package-pricing">
            <span className="package-price">{price}</span>
            <span className="package-per">/ {t('package.person')}</span>
          </div>
          {days && (
            <div className="package-days">
              <span className="days-text">{displayDays}</span>
            </div>
          )}
        </div>
        
        <MyButton 
          variant={buttonVariant} 
          color={buttonColor}
          onClick={handleButtonClick}
        >
          {displayButtonText}
        </MyButton>
      </div>
    </div>
  )
}