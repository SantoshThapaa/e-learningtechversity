'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, VideoIcon, Plus, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'react-toastify';
import AddTitleOverlay from './AddTitleOverlay';
import { getUserIdFromToken } from '@/utils/authUtils';

export default function ResourceViewer() {
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState('');
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editedTitles, setEditedTitles] = useState({});
  const [showOverlay, setShowOverlay] = useState(false);
  const [sectionTitle, setSectionTitle] = useState('');

  const router = useRouter();

  const fetchResources = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`https://back.bishalpantha.com.np/api/resources/${id}`);
      setSections(res.data.sections || []);
    } catch (err) {
      setSections([]);
      toast.error('Failed to fetch course resources.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (sectionTitle, subHeadingTitle) => {
    try {
      await axios.delete('https://back.bishalpantha.com.np/api/resources/delete', {
        data: { courseId, sectionTitle, subHeadingTitle },
      });
      toast.success('Subheading deleted');
      fetchResources(courseId);
    } catch (error) {
      toast.error('Failed to delete subheading');
    }
  };

  const handleEditToggle = (index, title) => {
    setEditIndex(index);
    setEditedTitles((prev) => ({ ...prev, [index]: title }));
  };

  const handleEditChange = (index, newTitle) => {
    setEditedTitles((prev) => ({ ...prev, [index]: newTitle }));
  };

  const handleSaveEdit = async (oldTitle, index) => {
    const newTitle = editedTitles[index];
    try {
      await axios.put('https://back.bishalpantha.com.np/api/resources/update-title', {
        courseId,
        oldTitle,
        newTitle,
      });
      toast.success('Title updated');
      setEditIndex(null);
      fetchResources(courseId);
    } catch (error) {
      toast.error('Failed to update title');
    }
  };

  const handleAddSubHeading = (sectionTitle) => {
    localStorage.setItem('sectionTitle', sectionTitle);
    localStorage.setItem('courseId', courseId);
    router.push('/teacher/addresource');
  };

  const handleOverlayClose = () => setShowOverlay(false);

  const handleTitleAdded = () => {
    fetchResources(courseId);
    setShowOverlay(false);
  };

  const handleCourseChange = (e) => {
    const selectedId = e.target.value;
    setCourseId(selectedId);
    localStorage.setItem('courseId', selectedId);
    setSections([]);
    fetchResources(selectedId);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const teacherId = getUserIdFromToken();
        const res = await axios.get(`https://back.bishalpantha.com.np/api/assigned-courses/${teacherId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (Array.isArray(res.data.courses) && res.data.courses.length > 0) {
          setCourses(res.data.courses);
          const storedCourseId = localStorage.getItem('courseId');
          if (storedCourseId) {
            setCourseId(storedCourseId);
            fetchResources(storedCourseId);
          } else {
            setCourseId(res.data.courses[0]._id);
            fetchResources(res.data.courses[0]._id);
          }
        } else {
          toast.warning('No courses assigned');
        }
      } catch (error) {
        toast.error('Failed to fetch assigned courses');
      }
    };
  
    fetchCourses();
  }, []);
  

  return (
    <div className="space-y-4 relative mt-10">
      <div className="flex justify-between items-center mb-4">
        <select
          className="border border-gray-300 rounded px-4 py-2 text-sm"
          value={courseId}
          onChange={handleCourseChange}
        >
          <option value="" disabled>Select a course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>
        {courseId && (
          <Button className="bg-blue-900 text-white px-6 py-2" onClick={() => setShowOverlay(true)}>
            Add title
          </Button>
        )}
      </div>

      {loading ? (
        <div className="text-center text-gray-600">Loading resources...</div>
      ) : (
        courseId && (
          sections.length === 0 ? (
            <div className="text-center mt-10 text-gray-600">No titles created yet for this course.</div>
          ) : (
            sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="border rounded-lg overflow-hidden mt-4">
                <div className="bg-green-100 px-6 py-4 flex items-center justify-between">
                  <div className="text-xl font-semibold">
                    {editIndex === sectionIndex ? (
                      <Input
                        className="w-[300px]"
                        value={editedTitles[sectionIndex] || ''}
                        onChange={(e) => handleEditChange(sectionIndex, e.target.value)}
                      />
                    ) : (
                      section.title
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-green-800">
                      {section.subSections.length} Lectures
                    </span>
                    <Button size="icon" variant="ghost" onClick={() => handleAddSubHeading(section.title)}>
                      <Plus size={18} />
                    </Button>
                    {editIndex === sectionIndex ? (
                      <Button size="icon" variant="ghost" onClick={() => handleSaveEdit(section.title, sectionIndex)}>
                        <Save size={18} />
                      </Button>
                    ) : (
                      <Button size="icon" variant="ghost" onClick={() => handleEditToggle(sectionIndex, section.title)}>
                        <Pencil size={18} />
                      </Button>
                    )}
                    <Button size="icon" variant="ghost" className="text-red-500" onClick={() => handleDelete(section.title, section.subSections[0]?.title)}>
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>

                <div className="divide-y">
                  {section.subSections.map((sub, subIndex) => (
                    <div key={subIndex} className="flex items-center justify-between px-6 py-3">
                      <div className="flex items-center gap-2">
                        <VideoIcon size={18} />
                        <span>{sub.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-red-500"
                          onClick={() => handleDelete(section.title, sub.title)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )
        )
      )}

      {showOverlay && (
        <AddTitleOverlay
          courseId={courseId}
          onClose={handleOverlayClose}
          onTitleAdded={handleTitleAdded}
        />
      )}
    </div>
  );
}
