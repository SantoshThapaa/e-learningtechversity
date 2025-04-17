"use client";
import { useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

const AdminTestimonial = () => {
    const [testimonial, setTestimonial] = useState('');
    const [image, setImage] = useState(null);
    const [rating, setRating] = useState(0);
    const [name, setName] = useState('');
    const [role, setRole] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('review', testimonial);
        formData.append('rating', rating);
        formData.append('image', image);
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

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto pt-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Testimonial</h2>

            <div className="flex space-x-6">
                <div className="w-1/5">
                    <div className="flex flex-col items-center mb-4">
                        <label htmlFor="image" className="mr-4">
                            <div className="flex items-center justify-center w-16 h-16 rounded-full border bg-blue-100">
                                {image ? (
                                    <Image
                                    src={URL.createObjectURL(image)}
                                    alt="Testimonial"
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
                            Choose Image
                        </Button>
                    </div>
                    {/* Star Rating */}
                    <div className="flex items-center mb-4">
                        <div className="ml-4 flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className={`cursor-pointer text-xl ${rating >= star ? 'text-yellow-500' : 'text-gray-400'}`}
                                >
                                    ★
                                </span>
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