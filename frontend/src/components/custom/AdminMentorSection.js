"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";

const AdminMentorSection = () => {
  const [mentors, setMentors] = useState([]);
  const [mentorImage, setMentorImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [newMentor, setNewMentor] = useState({
    title: "",
    number: "",
    description: "",
    instructor: "",
  });

  const fetchMentors = async () => {
    try {
      const response = await axios.get("https://back.bishalpantha.com.np/api/mentors");
      setMentors(response.data.mentors || []);
    } catch (error) {
      console.error("Error fetching mentors:", error);
      toast.error("Failed to fetch mentors");
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setMentorImage(file);
    }
  };

  const handleAddMentor = async () => {
    const formData = new FormData();
    formData.append("title", newMentor.title);
    formData.append("number", newMentor.number);
    formData.append("description", newMentor.description);
    formData.append("instructor", newMentor.instructor);
    formData.append("image", mentorImage);
  
    try {
      console.log('FormData being sent: ', formData);  
      const response = await axios.post(
        "https://back.bishalpantha.com.np/api/mentor/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Mentor added successfully!");
      setMentorImage(null);
      setImagePreview("");
      setNewMentor({
        title: "",
        number: "",
        description: "",
        instructor: "",
      });
      fetchMentors();
    } catch (error) {
      console.error("Error adding mentor:", error.response || error); 
      toast.error("Failed to add mentor");
    }
  };
  
  const handleDeleteMentor = async (id) => {
    try {
      await axios.delete(`https://back.bishalpantha.com.np/api/mentor/delete/${id}`);
      toast.success("Mentor deleted successfully!");
      fetchMentors();
    } catch (error) {
      console.error("Error deleting mentor:", error);
      toast.error("Failed to delete mentor");
    }
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-4">Manage Mentors</h3>

      {/* Add Mentor Section */}
      <div className="mb-6">
        <h4 className="text-xl font-semibold">Add New Mentor</h4>
        <label
            htmlFor="mentorImage"
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
                Upload Image
              </div>
            )}
          </label>
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-md w-full my-2"
          placeholder="Mentor Title"
          value={newMentor.title}
          onChange={(e) => setNewMentor({ ...newMentor, title: e.target.value })}
        />
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-md w-full my-2"
          placeholder="Mentor Number"
          value={newMentor.number}
          onChange={(e) => setNewMentor({ ...newMentor, number: e.target.value })}
        />
        <textarea
          className="p-2 border border-gray-300 rounded-md w-full my-2"
          placeholder="Mentor Description"
          rows="4"
          value={newMentor.description}
          onChange={(e) => setNewMentor({ ...newMentor, description: e.target.value })}
        />
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-md w-full my-2"
          placeholder="Instructor Name"
          value={newMentor.instructor}
          onChange={(e) => setNewMentor({ ...newMentor, instructor: e.target.value })}
        />

        <div className="relative">
          <input
            type="file"
            id="mentorImage"
            name="mentorImage"
            className="hidden"
            onChange={handleImageChange}
          />
          
        </div>

        <Button
          onClick={handleAddMentor}
          className="mt-4 bg-blue-600 text-white p-2 rounded-md"
        >
          Add Mentor
        </Button>
      </div>

      {/* Mentor List */}
      <div className="mt-6">
        <h4 className="text-xl font-semibold">Existing Mentors</h4>
        {mentors.length === 0 ? (
          <p>No mentors available.</p>
        ) : (
          <div className="flex gap-6 mt-4">
            {mentors.map((mentor) => (
              <div key={mentor._id} className="w-[30%] bg-[#F6FFEB] p-4 rounded-lg shadow-lg">
                <Image
                  src={`https://back.bishalpantha.com.np/${mentor.image}`}
                  alt={`Mentor Image`}
                  width={100}
                  height={100}
                  className="object-contain rounded-lg"
                />
                <h5 className="text-lg font-semibold mt-4">{mentor.title}</h5>
                <p className="text-gray-600">{mentor.instructor}</p>
                <div className="flex space-x-4 mt-4">
                  <Button
                    onClick={() => handleDeleteMentor(mentor._id)}
                    className="bg-red-500 text-white p-2 rounded-md"
                  >
                    <FaTrash size={18} className="mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default AdminMentorSection;
