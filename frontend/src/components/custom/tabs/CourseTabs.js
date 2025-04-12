'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';

import OverviewTab from './OverviewTab';
import ResourcesTab from './ResourcesTab';
import StudyMaterialTab from './StudyMaterialTab';
import TaskTab from './TaskTab';

const tabs = ['Overview', 'Resources', 'Study Material', 'Task'];

export default function CourseTabs() {
  const [activeTab, setActiveTab] = useState('Overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <OverviewTab />;
      case 'Resources':
        return <ResourcesTab />;
      case 'Study Material':
        return <StudyMaterialTab />;
      case 'Task':
        return <TaskTab />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full mt-8">
      {/* Tab Switcher */}
      <Card className="bg-green-50 py-3 px-4 rounded-2xl shadow-sm w-fit">
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-lg px-4 py-2 transition-colors duration-200 ${
                activeTab === tab
                  ? 'font-bold text-black'
                  : 'font-normal text-black'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </Card>

      {/* Tab Content */}
      <div className="mt-6">{renderTabContent()}</div>
    </div>
  );
}
