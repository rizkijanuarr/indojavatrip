import "./HoverEffect.css"

function HoverEffect({ children, className = "" }) {
  return (
    <div className={`hover-effect ${className}`}>
      {children}
    </div>
  )
}

export default HoverEffect
