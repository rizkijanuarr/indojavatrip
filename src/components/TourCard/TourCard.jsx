import "./TourCard.css"
import MyButton from "../MyButton/MyButton"

export default function TourCard({
  id,
  title,
  imageUrl,
  buttonText = "Lihat Detail",
  onButtonClick,
  className = "",
  layout = "landscape",
  showButton = true
}) {
  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick({ id, title })
    }
  }

  return (
    <div className={`tour-card tour-card--${layout} ${className}`}>
      <div className="tour-card__image">
        <img
          src={imageUrl || `https://picsum.photos/600/400?random=${id}`}
          alt={title}
        />
        <div className="tour-card__overlay">
          <div className="tour-card__content">
            <h3 className="tour-card__title">{title}</h3>
            {showButton && (
              <MyButton
                variant="primary"
                color="#ff6600"
                onClick={handleButtonClick}
                className="tour-card__button"
              >
                {buttonText} →
              </MyButton>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}