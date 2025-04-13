"use client";
import React, { useState } from 'react';
import ButtonGroup from './ButtonGroup';
import StudyMaterialSection from './StudyMaterialSection';
import ResourcesSection from './ResourcesSection';
import TaskSection from './TaskSection';

const ButtonPage = () => {
  const [activeButton, setActiveButton] = useState('Study Material');
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="p-4">
      <ButtonGroup activeButton={activeButton} onButtonClick={handleButtonClick} />
      <div className="content mt-4">
        {activeButton === 'Study Material' && <StudyMaterialSection />}
        {activeButton === 'Resources' && <ResourcesSection />}
        {activeButton === 'Task' && <TaskSection />}
      </div>
    </div>
  );
};

export default ButtonPage;
