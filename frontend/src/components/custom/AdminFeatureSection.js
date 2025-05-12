'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import { FaTrash } from 'react-icons/fa';

const AdminFeatureSection = () => {
  const [featureCards, setFeatureCards] = useState([]);
  const [imagePreview, setImagePreview] = useState('');
  const [featureImage, setFeatureImage] = useState(null);
  const [newFeatureCard, setNewFeatureCard] = useState({
    title: '',
    text: '',
  });

  const fetchFeatureCards = async () => {
    try {
      const response = await axios.get('https://back.bishalpantha.com.np/api/feature-cards');
      setFeatureCards(response.data.featureCards || []);
    } catch (error) {
      console.error('Error fetching feature cards:', error);
      toast.error('Failed to fetch feature cards');
    }
  };

  useEffect(() => {
    fetchFeatureCards();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFeatureImage(file);
    }
  };

  const handleAddFeatureCard = async () => {
    const formData = new FormData();
    formData.append('title', newFeatureCard.title);
    formData.append('text', newFeatureCard.text);
    formData.append('image', featureImage);

    try {
      await axios.post('https://back.bishalpantha.com.np/api/feature-card/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Feature card added successfully!');
      setImagePreview('');
      setNewFeatureCard({ title: '', text: '' });
      fetchFeatureCards();
    } catch (error) {
      console.error('Error adding feature card:', error);
      toast.error('Failed to add feature card');
    }
  };

  const handleDeleteFeatureCard = async (id) => {
    try {
      await axios.delete(`https://back.bishalpantha.com.np/api/feature-card/delete/${id}`);
      toast.success('Feature card deleted successfully!');
      fetchFeatureCards();
    } catch (error) {
      console.error('Error deleting feature card:', error);
      toast.error('Failed to delete feature card');
    }
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-4">Manage Feature Cards</h3>

      {/* Add Feature Card Section */}
      <div className="mb-6">
        <h4 className="text-xl font-semibold">Add New Feature Card</h4>
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-md w-full my-2"
          placeholder="Feature Title"
          value={newFeatureCard.title}
          onChange={(e) => setNewFeatureCard({ ...newFeatureCard, title: e.target.value })}
        />
        <textarea
          className="p-2 border border-gray-300 rounded-md w-full my-2"
          placeholder="Feature Description"
          rows="4"
          value={newFeatureCard.text}
          onChange={(e) => setNewFeatureCard({ ...newFeatureCard, text: e.target.value })}
        />

        <div className="relative">
          <input
            type="file"
            id="featureImage"
            name="featureImage"
            className="hidden"
            onChange={handleImageChange}
          />
          <label
            htmlFor="featureImage"
            className="cursor-pointer rounded-full border-4 border-gray-300 w-24 h-24 flex items-center justify-center"
          >
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Feature Image Preview"
                width={96}
                height={96}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                Upload Image
              </div>
            )}
          </label>
        </div>

        <Button
          onClick={handleAddFeatureCard}
          className="mt-4 bg-blue-600 text-white p-2 rounded-md"
        >
          Add Feature Card
        </Button>
      </div>

      {/* Feature Card List */}
      <div className="mt-6">
        <h4 className="text-xl font-semibold">Existing Feature Cards</h4>
        <div className="flex gap-6 mt-4">
          {featureCards.length === 0 ? (
            <div className="text-center text-gray-500">No feature cards available</div>
          ) : (
            featureCards.map((card) => (
              <div key={card._id} className="w-[30%] bg-[#F6FFEB] p-4 rounded-lg shadow-lg">
                <Image
                  src={`https://back.bishalpantha.com.np/${card.image}`}
                  alt={`Feature Image`}
                  width={100}
                  height={100}
                  className="object-contain rounded-lg"
                />
                <h5 className="text-lg font-semibold mt-4">{card.title}</h5>
                <p className="text-gray-600">{card.text}</p>
                <div className="flex space-x-4 mt-4">
                  <Button
                    onClick={() => handleDeleteFeatureCard(card._id)}
                    className="bg-red-500 text-white p-2 rounded-md"
                  >
                    <FaTrash size={18} className="mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default AdminFeatureSection;
