import React from 'react';
import CustomButton from './CustomButton';
import { HiDocumentText, HiBookOpen, HiLibrary } from 'react-icons/hi';

const ButtonGroup = ({ activeButton, onButtonClick }) => {
  return (
    <div className="flex rounded-lg mb-4">
      <CustomButton 
        isActive={activeButton === 'Study Material'} 
        onClick={() => onButtonClick('Study Material')}
        icon={<HiDocumentText />}
      >
        Study Material
      </CustomButton>
      <CustomButton 
        isActive={activeButton === 'Resources'} 
        onClick={() => onButtonClick('Resources')}
        icon={<HiBookOpen />}
      >
        Resources
      </CustomButton>
      <CustomButton 
        isActive={activeButton === 'Task'} 
        onClick={() => onButtonClick('Task')}
        icon={<HiLibrary />}
      >
        Task
      </CustomButton>
    </div>
  );
};

export default ButtonGroup;
