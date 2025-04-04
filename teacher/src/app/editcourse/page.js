"use client";
import { useState } from 'react';

const EditCoursePage = () => {
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDuration, setCourseDuration] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [videoLink, setVideoLink] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [language, setLanguage] = useState('');
  const [level, setLevel] = useState('');

  const handleThumbnailChange = (e) => {
    setThumbnailImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSave = () => {
    console.log('Course Saved:', {
      courseTitle,
      courseDuration,
      courseDescription,
      thumbnailImage,
      videoLink,
      hashtags,
      language,
      level
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {/* Save Button at the top */}
        <div className="flex justify-end mb-4">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-md"
            onClick={handleSave}
          >
            Save
          </button>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="text-sm text-gray-500 mb-4">
          <span>Home</span> &gt; <span>Edit Course</span>
        </div>

        {/* Course Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Left Column: 40% width for Course Details */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Thumbnail Image (Required)</label>
              <input
                type="file"
                accept="image/*"
                className="mt-1 block w-full text-sm text-gray-700"
                onChange={handleThumbnailChange}
              />
              {thumbnailImage && (
                <img src={thumbnailImage} alt="Thumbnail" className="mt-4 w-32 h-32 object-cover" />
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Course Title (Required)</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                placeholder="Enter course title"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Course Join Link (Gmeet or Zoom)</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
                placeholder="Enter course link"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Course Duration</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                value={courseDuration}
                onChange={(e) => setCourseDuration(e.target.value)}
                placeholder="e.g., 6 weeks"
              />
            </div>
          </div>

          {/* Right Column: Remaining width for the About Course text editor */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">About Course</label>
              <textarea
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                placeholder="Enter course description"
                rows="6"
              ></textarea>
            </div>

            {/* Extra Fields Section (Hashtags, Language, and Level) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Hashtags</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={hashtags}
                  onChange={(e) => setHashtags(e.target.value)}
                  placeholder="Enter course hashtags"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Language</label>
                <select
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Level</label>
                <select
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCoursePage;