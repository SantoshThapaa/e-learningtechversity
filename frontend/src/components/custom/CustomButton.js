import React from 'react';

const CustomButton = ({ children, icon, isActive, onClick, ...props }) => {
  return (
    <button
      {...props}
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-sm 
        ${isActive ? 'bg-[#1A2D62] text-white' : 'bg-white text-black-700'} 
        hover:bg-[#1A2D62] hover:text-white focus:outline-none transition-colors`}
    >
      {icon && <span className="text-xl">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default CustomButton;
