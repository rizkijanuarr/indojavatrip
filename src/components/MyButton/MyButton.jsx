import "./MyButton.css"

export default function MyButton({ 
  children, 
  variant = "primary", 
  color = "#ff6600", 
  onClick, 
  className = "",
  ...props 
}) {
  return (
    <button 
      className={`my-button my-button--${variant} ${className}`}
      onClick={onClick}
      style={{ "--button-color": color }}
      {...props}
    >
      <span>{children}</span>
    </button>
  )
}