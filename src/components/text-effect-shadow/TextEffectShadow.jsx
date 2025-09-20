import "./TextEffectShadow.css"

const TextEffectShadow = ({ children, className = "", tag = "span" }) => {
  const Tag = tag
  
  return (
    <Tag className={`text-effect-shadow ${className}`}>
      {children}
    </Tag>
  )
}

export default TextEffectShadow