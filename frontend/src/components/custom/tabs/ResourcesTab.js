'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, PlayCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ResourcesTab() {
  const [resources, setResources] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleSection = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const fetchResources = async () => {
    try {
      const courseId = localStorage.getItem('courseId');
      if (!courseId) {
        toast.error('No course selected');
        return;
      }

      const token = localStorage.getItem('token');
      const res = await axios.get(
        `http://localhost:4000/api/resources/${courseId}`,  
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResources(res.data.sections || []);  
    } catch (error) {
      console.error('Error fetching resources:', error);
      toast.error('Failed to load course resources.');
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-16 mb-20">
      <h1 className="text-3xl font-bold mb-2">Course Resources</h1>
      <h2 className="text-xl text-gray-600 mb-6">Structured Lectures</h2>

      <Card className="rounded-xl overflow-hidden divide-y divide-gray-200">
        {resources.length === 0 && (
          <p className="text-center py-6 text-gray-500">No resources found.</p>
        )}

        {resources.map((section, index) => {
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
                <p className="text-sm text-green-700 font-medium">
                  {section.subSections?.length || 0} Lectures 
                </p>
              </div>

              <div
                className={`px-10 overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                  isOpen ? 'max-h-96 py-4' : 'max-h-0'
                }`}
              >
                {isOpen &&
                  (section.subSections || []).map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 py-2 border-b last:border-b-0"
                    >
                      <PlayCircle size={18} className="text-gray-500" />
                      <a 
                        href={`http://localhost:4000${item.videoUrl}`}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sm text-gray-800"
                      >
                        {item.title}
                      </a>
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
