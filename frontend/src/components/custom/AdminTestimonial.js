"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

const AdminTestimonial = () => {
  const [testimonial, setTestimonial] = useState('');
  const [testimonialImage, setTestimonialImage] = useState(null);
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [testimonials, setTestimonials] = useState([]);
  const [selectedTestimonialId, setSelectedTestimonialId] = useState(null);

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get('https://back.bishalpantha.com.np/api/allTestimonials');
      setTestimonials(res.data);
    } catch (err) {
      console.error('Failed to fetch testimonials:', err);
      toast.error('Failed to fetch testimonials');
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type.split('/')[0];
      if (fileType !== 'image') {
        toast.error('Please upload a valid image file.');
        return;
      }
      setTestimonialImage(file);
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
    formData.append('image', testimonialImage);
    formData.append('role', role);
    formData.append('name', name);

    try {
      if (selectedTestimonialId) {
        await axios.put(`https://back.bishalpantha.com.np/api/editTestimonial/${selectedTestimonialId}`, 
          formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Testimonial updated successfully!');
      } else {
        await axios.post('https://back.bishalpantha.com.np/api/createTestimonial', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });        
        toast.success('Testimonial submitted successfully!');
      }
      fetchTestimonials();
      setName('');
      setRole('');
      setTestimonial('');
      setRating(0);
      setTestimonialImage(null);
      setSelectedTestimonialId(null);
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      toast.error('Error submitting testimonial. Please try again.');
    }
  };

  const handleRatingClick = (ratingValue) => {
    setRating(ratingValue);
  };

  const handleDelete = async (testimonialId) => {
    try {
      await axios.delete(`https://back.bishalpantha.com.np/api/deleteTestimonial/${testimonialId}`);
      toast.success('Testimonial deleted successfully!');
      fetchTestimonials();
    } catch (err) {
      console.error('Error deleting testimonial:', err);
      toast.error('Error deleting testimonial.');
    }
  };

  const handleEdit = (testimonial) => {
    setSelectedTestimonialId(testimonial._id);
    setName(testimonial.name);
    setRole(testimonial.role);
    setTestimonial(testimonial.review);
    setRating(testimonial.rating);
    setTestimonialImage(testimonial.profilePic);
  };

  const imageUrl = testimonialImage && (testimonialImage instanceof File)
    ? URL.createObjectURL(testimonialImage)
    : testimonialImage ? `/uploads/images/${testimonialImage}` : '/uploads/default-avatar.png';


  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto pt-6 space-y-4">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Testimonial</h2>
      <div className="flex space-x-6 mb-6">
        <div className="w-1/5 flex flex-col items-center mb-4">
          <label htmlFor="image" className="mr-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full border bg-blue-100">
              <Image
                src={imageUrl}
                alt="Testimonial Image"
                className="w-full h-full rounded-full object-cover"
                width={150}
                height={150}
                layout="intrinsic"
              />
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
                  <path d="M12 .587l3.668 7.431L24 9.335l-6 5.858 1.458 8.542-7.458-4.107L3 23.735l1.458-8.542-6-5.858 8.332-1.317L12 .587z" />
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

      <div className="mt-6 space-y-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">All Testimonials</h3>
        {testimonials.length === 0 ? (
          <p>No testimonials available.</p>
        ) : (
          testimonials.map((testimonial) => (
            <div key={testimonial._id} className="flex justify-between items-center border-b py-4">
              <div className="flex items-center gap-4">
                <Image
                  src={`https://back.bishalpantha.com.np/${testimonial.profilePic || 'uploads/default-avatar.png'}`}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                  width={40}
                  height={40}
                  layout="intrinsic"
                />
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{testimonial.review}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={() => handleEdit(testimonial)}
                  className="bg-blue-500 text-white text-sm"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(testimonial._id)}
                  className="bg-red-500 text-black text-sm"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default AdminTestimonial;
