"use client";
import { useState } from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

const AdminBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file)); 
  };

  const handleSave = () => {
    console.log({ title, content, image });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Blog</h2>
      
      <div className="flex space-x-6">
        {/* Left Section (40%) */}
        <div className="w-1/5">
          <div className="flex flex-col items-center mb-4">
            <label htmlFor="image" className="mr-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-full border bg-blue-100">
                {image ? (
                  <img src={image} alt="Blog" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-lg text-gray-500">+</span>
                )}
              </div>
            </label>
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={handleImageChange}
            />
            <Button className="mt-2" variant="outlined" color="primary">
              Choose Image
            </Button>
          </div>
        </div>

        {/* Right Section (60%) */}
        <div className="w-4/5">
          {/* Blog Title Input */}
          <Input 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Blog Title" 
            className="w-full p-3 mb-4 border rounded-md"
          />
          
          {/* Blog Content Textarea */}
          <Textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            placeholder="More about blog" 
            className="w-full p-3 mb-4 border rounded-md"
            rows={8} // Increased height for the content textarea
          />
        </div>
      </div>

      {/* Save Button positioned to the right */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-blue-600 text-white py-2 px-6 rounded-md mt-4">
          Save
        </Button>
      </div>
    </div>
  );
};

export default AdminBlog;