import React from "react";

const CustomButton = ({
  textColor = "text-white",
  bgColor = "bg-white",
  hoverBgColor = "hover:bg-blue-700",
  hoverTextColor = "hover:text-white",
  borderColor = "border-transparent",
  buttonName = "Click Me",
  onClick,
  className = "", // optional additional custom styles
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-5 py-2 rounded-md font-semibold transition-all duration-300 ease-in-out
        ${bgColor} ${textColor} ${hoverBgColor} ${hoverTextColor} border ${borderColor}
        shadow-sm hover:shadow-md active:scale-[0.98]
        ${className}
      `}
    >
      {buttonName}
    </button>
  );
};

export default CustomButton;
