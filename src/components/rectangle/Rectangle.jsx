import "./Rectangle.css"

const Rectangle = ({ 
  orientation = "horizontal", // "horizontal" or "vertical"
  size = "60px", // length of the rectangle
  thickness = "2px", // thickness of the rectangle
  backgroundColor = "white", 
  className = "" 
}) => {
  const isHorizontal = orientation === "horizontal"
  
  return (
    <div 
      className={`rectangle ${className}`}
      style={{
        width: isHorizontal ? size : thickness,
        height: isHorizontal ? thickness : size,
        backgroundColor
      }}
    />
  )
}

export default Rectangle