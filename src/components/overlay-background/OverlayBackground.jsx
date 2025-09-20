import "./OverlayBackground.css"

const OverlayBackground = ({ 
  opacity = 0.5, 
  backgroundColor = "black", 
  className = "",
  zIndex = 10 
}) => {
  return (
    <div 
      className={`overlay-background ${className}`}
      style={{
        background: `rgba(0, 0, 0, ${opacity})`,
        zIndex
      }}
    />
  )
}

export default OverlayBackground