"use client";
import { useState } from 'react';
import axios from 'axios';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [blogImage, setBlogImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setBlogImage(file);
  };

  const handleSave = async () => {
    if (!title || !content || !blogImage) {
      toast.error("Please provide both title, content, and an image!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", content);
    formData.append("date", new Date().toISOString());
    formData.append("image", blogImage);
    formData.append("readMoreLink", "#");

    try {
      const response = await axios.post('http://localhost:4000/api/blogs/new', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Blog created successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
      setTitle('');
      setContent('');
      setBlogImage(null);
      console.log(response.data);
    } catch (error) {
      console.error('Error creating blog', error);
      toast.error('Error creating blog. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Create Blog</h2>

      <div className="flex space-x-6">
        {/* Left Section for Image (Choose Image) */}
        <div className="w-1/5 flex flex-col items-center mb-4">
          <label htmlFor="image" className="cursor-pointer">
            <div className="flex items-center justify-center w-20 h-20 rounded-full border bg-blue-100">
              {blogImage ? (
                <Image
                  src={URL.createObjectURL(blogImage)}
                  alt="Blog Image"
                  className="w-full h-full rounded-full object-cover"
                  width={80}
                  height={80}
                  layout="intrinsic"
                />
              ) : (
                <span className="text-2xl text-gray-500">+</span>
              )}
            </div>
          </label>
          <input
            type="file"
            id="image"
            name="image"
            className="hidden"
            onChange={handleImageChange}
          />
          <Button className="mt-2" variant="outlined" color="primary">
            Choose Image
          </Button>
        </div>

        {/* Right Section for Blog Inputs */}
        <div className="w-4/5">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Blog Title"
            className="w-full p-3 mb-4 border rounded-md"
          />

          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog content here"
            className="w-full p-3 mb-4 border rounded-md"
            rows={8}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-blue-600 text-white py-2 px-6 rounded-md mt-4">
          Save
        </Button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AdminBlog;
