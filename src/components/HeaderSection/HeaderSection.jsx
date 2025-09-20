import "./HeaderSection.css"

export default function HeaderSection({ 
  title, 
  subtitle, 
  className = "",
  titleClassName = "",
  subtitleClassName = ""
}) {
  return (
    <div className={`section-header ${className}`}>
      <h2 className={`section-title ${titleClassName}`}>{title}</h2>
      <p className={`section-subtitle ${subtitleClassName}`}>{subtitle}</p>
    </div>
  )
}