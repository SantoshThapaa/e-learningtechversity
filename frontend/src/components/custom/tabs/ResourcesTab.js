'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, PlayCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

const dummyData = [
  {
    title: 'Basic Of UI/UX',
    lectures: [
      'Introduction Of UI',
      'Introduction Of UX',
      'Introduction Of UI/UX Tools',
    ],
  },
  {
    title: 'Using Figma Tool',
    lectures: [
      'Introduction Of UI',
      'Introduction Of UX',
      'Introduction Of UI/UX Tools',
    ],
  },
  {
    title: 'Colour Theory for UI',
    lectures: [
      'Introduction Of UI',
      'Introduction Of UX',
      'Introduction Of UI/UX Tools',
    ],
  },
  { title: 'UX laws', lectures: [] },
  {
    title: 'Responsive Design in figma',
    lectures: [
      'Introduction Of UI',
      'Introduction Of UX',
      'Introduction Of UI/UX Tools',
    ],
  },
];

export default function ResourcesTab() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleSection = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="max-w-7xl mx-auto mt-16">
      <h1 className="text-3xl font-bold mb-2">UI/UX Design Mater Course</h1>
      <h2 className="text-xl text-gray-600 mb-6">Begining to Advance</h2>

      <Card className="rounded-xl overflow-hidden divide-y divide-gray-200">
        {dummyData.map((section, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={index} className="transition-all duration-300 ease-in-out">
              <div
                className={`flex items-center justify-between px-6 py-4 cursor-pointer transition-colors ${
                  isOpen ? 'bg-green-50' : 'bg-white'
                }`}
                onClick={() => toggleSection(index)}
              >
                <div className="flex items-center gap-3">
                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  <h3 className="text-lg font-semibold">{section.title}</h3>
                </div>
                <p className="text-sm text-green-700 font-medium">{section.lectures.length} Lectures</p>
              </div>

              <div
                className={`px-10 overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                  isOpen ? 'max-h-96 py-4' : 'max-h-0'
                }`}
              >
                {isOpen &&
                  section.lectures.map((lecture, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 py-2 border-b last:border-b-0"
                    >
                      <PlayCircle size={18} className="text-gray-500" />
                      <p className="text-sm text-gray-800">{lecture}</p>
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </Card>
    </div>
  );
}