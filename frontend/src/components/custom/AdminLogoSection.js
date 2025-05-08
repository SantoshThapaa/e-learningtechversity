'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { FaTrash } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogoSection = () => {
  const [logos, setLogos] = useState([]);
  const [logoImage, setLogoImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const fetchLogos = async () => {
    try {
      const response = await axios.get('https://back.bishalpantha.com.np/api/logos');
      setLogos(response.data.logos || []);
    } catch (error) {
      console.error('Error fetching logos:', error);
      toast.error('Failed to fetch logos');
    }
  };

  useEffect(() => {
    fetchLogos();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setLogoImage(file);
    }
  };

  const handleUploadLogo = async () => {
    const formData = new FormData();
    formData.append('image', logoImage);

    try {
      const response = await axios.post('https://back.bishalpantha.com.np/api/logo/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Logo uploaded successfully!');
      setLogoImage(null);
      setImagePreview('');
      fetchLogos(); 
    } catch (error) {
      console.error('Error uploading logo:', error);
      toast.error('Failed to upload logo');
    }
  };

  const handleDeleteLogo = async (id) => {
    try {
      await axios.delete(`https://back.bishalpantha.com.np/api/logo/delete/${id}`);
      toast.success('Logo deleted successfully!');
      fetchLogos();  
    } catch (error) {
      console.error('Error deleting logo:', error);
      toast.error('Failed to delete logo');
    }
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-4">Upload New Logo</h3>
      
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative">
          <input
            type="file"
            id="image"
            name="image"
            className="hidden"
            onChange={handleImageChange}
          />
          <label
            htmlFor="image"
            className="cursor-pointer rounded-full border-4 border-gray-300 w-24 h-24 flex items-center justify-center"
          >
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Logo Preview"
                width={96}
                height={96}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                Upload
              </div>
            )}
          </label>
        </div>
        <Button
          onClick={handleUploadLogo}
          disabled={!logoImage}
          className="bg-blue-600 text-white p-2 rounded-md"
        >
          Upload Logo
        </Button>
      </div>

      <h3 className="text-2xl font-semibold mb-4">Existing Logos</h3>
      <div className="flex gap-6">
        {logos.map((logo) => (
          <div key={logo._id} className="mb-6 p-4 border rounded-md shadow-md">
            <div className="flex items-center gap-4">
              <Image
                src={`https://back.bishalpantha.com.np/${logo.image}`} 
                alt={`Logo ${logo._id}`}
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
            <div className="mt-4 space-x-4">
              <Button
                onClick={() => handleDeleteLogo(logo._id)}
                className="bg-red-500 text-white p-2 rounded-md"
              >
                <FaTrash size={18} className="mr-2" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default AdminLogoSection;
