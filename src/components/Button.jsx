import React from 'react'

const Button = ({ btnName, bgColor, color, isBorder, borderRadius, width, action, fontSize, fontWeight, padding }) => {
  return (
    <div>
        <button type='submit' style={{ backgroundColor: bgColor || "white", color: color, border: isBorder ? `1px solid ${color}` : "none", borderRadius: borderRadius, width: width, padding: padding || "1rem 0", fontSize: fontSize || "20px", fontWeight: fontWeight }} onClick={action}>{btnName}</button>
    </div>
  )
}

export default Button