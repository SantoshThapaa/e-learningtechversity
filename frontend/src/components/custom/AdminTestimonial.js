"use client";
import { useState } from 'react';
import axios from 'axios';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

const AdminTestimonial = () => {
  const [testimonial, setTestimonial] = useState('');
  const [testimonialImage, setTestimonialImage] = useState(null); // Separate state for testimonial image
  const [rating, setRating] = useState(0); // Rating state
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type.split('/')[0];
      if (fileType !== 'image') {
        toast.error('Please upload a valid image file.');
        return;
      }
      setTestimonialImage(file); // Store the actual file in testimonialImage
    }
  };

  const handleSave = async () => {
    if (!name || !role || !testimonial || !testimonialImage) {
      toast.error("Please fill in all fields, including the image!");
      return;
    }

    const formData = new FormData();
    formData.append('review', testimonial);
    formData.append('rating', rating);
    formData.append('image', testimonialImage); // Use testimonialImage here
    formData.append('role', role);
    formData.append('name', name);

    try {
      const response = await axios.post('http://localhost:4000/api/createTestimonial', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);

      toast.success('Testimonial submitted successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      toast.error('Error submitting testimonial. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  // Handle the star rating click
  const handleRatingClick = (ratingValue) => {
    setRating(ratingValue);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto pt-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Testimonial</h2>

      <div className="flex space-x-6">
        <div className="w-1/5 flex flex-col items-center mb-4">
          <label htmlFor="image" className="mr-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full border bg-blue-100">
              {testimonialImage ? (
                <Image
                  src={URL.createObjectURL(testimonialImage)}
                  alt="Testimonial Image"
                  className="w-full h-full rounded-full object-cover"
                  width={150}
                  height={150} 
                  layout="intrinsic" 
                />
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
            Upload Testimonial Image
          </Button>
          <div className="mb-4">
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((starValue) => (
                <svg
                  key={starValue}
                  onClick={() => handleRatingClick(starValue)} 
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={rating >= starValue ? "gold" : "gray"} 
                  className="cursor-pointer"
                >
                  <path d="M12 .587l3.668 7.431L24 9.335l-6 5.858 1.458 8.542-7.458-4.107L3 23.735l1.458-8.542-6-5.858 8.332-1.317L12 .587z"/>
                </svg>
              ))}
            </div>
          </div>
        </div>


        <div className="w-4/5">
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-3 mb-4 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Enter your role"
              className="w-full p-3 mb-4 border rounded-md"
            />
          </div>
          
          <Textarea
            value={testimonial}
            onChange={(e) => setTestimonial(e.target.value)}
            placeholder="Write testimonial"
            className="w-full h-[300px] p-3 mb-4 border rounded-md"
            rows={8}
          />
          <div className="flex justify-end">
            <Button onClick={handleSave} className="bg-blue-600 text-white py-2 px-6 rounded-md mt-4">
              Save
            </Button>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AdminTestimonial;
