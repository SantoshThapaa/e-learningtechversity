'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const AdminTeamSection = () => {
  const [team, setTeam] = useState([]);
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    image: '',
    facebook: '',
    linkedin: '',
    twitter: '',
  });
  const [editMember, setEditMember] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const fetchTeam = async () => {
    try {
      const response = await axios.get('https://back.bishalpantha.com.np/api/team/all');
      setTeam(response.data);
    } catch (error) {
      console.error('Error fetching team:', error);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setEditMember({ ...editMember, image: file });
    }
  };

  const handleAddTeamMember = async () => {
    const formData = new FormData();
    formData.append('name', newMember.name);
    formData.append('role', newMember.role);
    formData.append('image', newMember.image);
    formData.append('facebook', newMember.facebook);
    formData.append('linkedin', newMember.linkedin);
    formData.append('twitter', newMember.twitter);

    try {
      const response = await axios.post('https://back.bishalpantha.com.np/api/team/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setTeam([...team, response.data.team]);
      setNewMember({
        name: '',
        role: '',
        image: '',
        facebook: '',
        linkedin: '',
        twitter: '',
      });
      setImagePreview('');
    } catch (error) {
      console.error('Error adding team member:', error);
    }
  };

  const handleUpdateTeamMember = async () => {
    const formData = new FormData();
    formData.append('name', editMember.name);
    formData.append('role', editMember.role);
    if (editMember.image instanceof File) {
      formData.append('image', editMember.image);
    } else {
      formData.append('existingImage', editMember.image);  
    }
    formData.append('facebook', editMember.facebook);
    formData.append('linkedin', editMember.linkedin);
    formData.append('twitter', editMember.twitter);

    try {
      const response = await axios.put(
        `https://back.bishalpantha.com.np/api/team/update/${editMember._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setTeam(team.map((member) => (member._id === editMember._id ? response.data.team : member)));
      setEditMember(null);
      setImagePreview('');
    } catch (error) {
      console.error('Error updating team member:', error);
    }
  };

  const handleDeleteTeamMember = async (id) => {
    try {
      await axios.delete(`https://back.bishalpantha.com.np/api/delete/${id}`);
      setTeam(team.filter((member) => member._id !== id));
    } catch (error) {
      console.error('Error deleting team member:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">{editMember ? 'Edit' : 'Add'} Team Member</h3>
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
                  alt="Image Preview"
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
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-md"
              placeholder="Enter name"
              value={editMember ? editMember.name : newMember.name}
              onChange={(e) =>
                editMember
                  ? setEditMember({ ...editMember, name: e.target.value })
                  : setNewMember({ ...newMember, name: e.target.value })
              }
            />
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-md"
              placeholder="Enter role"
              value={editMember ? editMember.role : newMember.role}
              onChange={(e) =>
                editMember
                  ? setEditMember({ ...editMember, role: e.target.value })
                  : setNewMember({ ...newMember, role: e.target.value })
              }
            />
          </div>
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-md w-full"
            placeholder="Facebook URL"
            value={editMember ? editMember.facebook : newMember.facebook}
            onChange={(e) =>
              editMember
                ? setEditMember({ ...editMember, facebook: e.target.value })
                : setNewMember({ ...newMember, facebook: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-md w-full"
            placeholder="LinkedIn URL"
            value={editMember ? editMember.linkedin : newMember.linkedin}
            onChange={(e) =>
              editMember
                ? setEditMember({ ...editMember, linkedin: e.target.value })
                : setNewMember({ ...newMember, linkedin: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-md w-full"
            placeholder="Twitter URL"
            value={editMember ? editMember.twitter : newMember.twitter}
            onChange={(e) =>
              editMember
                ? setEditMember({ ...editMember, twitter: e.target.value })
                : setNewMember({ ...newMember, twitter: e.target.value })
            }
          />
        </div>
        <button
          onClick={editMember ? handleUpdateTeamMember : handleAddTeamMember}
          className="bg-blue-600 text-white p-2 rounded-md"
        >
          {editMember ? 'Update' : 'Add'} Member
        </button>
      </div>
      <div className='flex gap-6'>
        {team.map((member) => (
          <div key={member._id} className="mb-6 p-4 border rounded-md shadow-md">
            <div className="flex space-x-4">
              <Image
                src={`https://back.bishalpantha.com.np/${member.image}`} 
                alt={member.name}
                width={100}
                height={100}
                className="rounded-full object-cover"
              />
              <div>
                <h4 className="text-lg font-semibold">{member.name}</h4>
                <p>{member.role}</p>
                <div className="mt-2 flex">
                  {member.facebook && (
                    <a
                      href={member.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 mr-2"
                    >
                      <FaFacebookF size={18} />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 mr-2"
                    >
                      <FaLinkedinIn size={18} />
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      <FaTwitter size={18} />
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4 space-x-4">
              <button
                onClick={() => setEditMember(member)}
                className="bg-yellow-500 text-white p-2 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTeamMember(member._id)}
                className="bg-red-500 text-white p-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTeamSection;
