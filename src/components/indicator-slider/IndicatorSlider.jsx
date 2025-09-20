import "./IndicatorSlider.css"

const IndicatorSlider = ({ 
  totalSlides = 3, 
  activeIndex = 1, 
  onDotClick,
  className = "",
  containerStyle = {}
}) => {
  return (
    <div 
      className={`container-dots ${className}`}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        position: "static",
        bottom: "auto",
        right: "auto",
        ...containerStyle
      }}
    >
      {Array.from({ length: totalSlides }).map((item, index) => (
        <div
          key={index}
          onClick={() => onDotClick && onDotClick(index + 1)}
          className={activeIndex === index + 1 ? "dot dot-active" : "dot"}
        />
      ))}
    </div>
  )
}

export default IndicatorSlider