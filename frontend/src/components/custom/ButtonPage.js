"use client";
import React, { useState } from 'react';
import ButtonGroup from './ButtonGroup';
import StudyMaterialSection from './StudyMaterialSection';
// import ResourcesSection from './ResourcesSection';
import TaskSection from './TaskSection';
import ResourceViewer from './ResourceViewer';

const ButtonPage = () => {
  const [activeButton, setActiveButton] = useState('Study Material');
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="p-4 mt-20">
      <ButtonGroup activeButton={activeButton} onButtonClick={handleButtonClick} />
      <div className="content mt-4">
        {activeButton === 'Study Material' && <StudyMaterialSection />}
        {activeButton === 'Resources' && <ResourceViewer />}
        {activeButton === 'Task' && <TaskSection />}
      </div>
    </div>
  );
};

export default ButtonPage;
