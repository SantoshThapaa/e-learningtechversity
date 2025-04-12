'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TextEditor } from '../TextEditor';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ProfilePage() {
  const [coverImage, setCoverImage] = useState('/cover.jpg');
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [bio, setBio] = useState('');

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCoverImage(imageUrl);
      setCoverImageFile(file);
    }
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('phone', phone);
      formData.append('bio', bio);
      formData.append('zipCode', zipCode);

      if (coverImageFile) {
        formData.append('image', coverImageFile);
      }

      if (profileImageFile) {
        formData.append('image', profileImageFile);
      }

      const token = localStorage.getItem('token');
      await axios.put('http://localhost:4000/api/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <div className="bg-white rounded-xl overflow-hidden shadow">
        {/* Cover Photo */}
        <div
          className="h-52 bg-cover bg-center relative rounded-t-xl"
          style={{ backgroundImage: `url(${coverImage})` }}
        >
          {/* Edit Cover Button */}
          <div className="absolute top-4 right-4">
            <label className="text-sm text-white bg-black/40 hover:bg-black/60 px-3 py-1 rounded cursor-pointer">
              Edit Cover
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Profile Image */}
          <div className="absolute bottom-[-40px] left-6">
            <label className="cursor-pointer relative group">
              <Image
                src={profileImageFile ? URL.createObjectURL(profileImageFile) : "/profile-pic.jpg"}
                alt="Profile"
                width={80}
                height={80}
                className="rounded-full border-4 border-white shadow"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-full transition">
                <span className="text-white text-xs">Change</span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Profile Header */}
        <div className="mt-16 px-6">
          <h2 className="text-xl font-semibold">Donald Trump</h2>
          <p className="text-sm text-gray-500">UX Designer • Sans Francisco • Join August 2024</p>
        </div>

        {/* Tabs */}
        <div className="mt-6 px-6 border-b border-gray-200">
          <div className="flex space-x-4 text-sm">
            <button className="border-b-2 border-blue-600 text-blue-600 pb-2">My Details</button>
            <button className="text-gray-500 pb-2">Password</button>
            <button className="text-gray-500 pb-2">Assign Course</button>
          </div>
        </div>

        {/* Form Section */}
        <div className="px-6 py-6">
          <h3 className="text-lg font-semibold mb-1">My Details</h3>
          <p className="text-sm text-gray-500 mb-6">Please fill full details about yourself</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input placeholder="Enter First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <Input placeholder="Enter Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <Input placeholder="Enter Email" value={email} readOnly />
            <Input placeholder="Enter Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium text-sm">Your Photo</label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer relative group">
                <Image
                  src={profileImageFile ? URL.createObjectURL(profileImageFile) : "/profile-pic.jpg"}
                  alt="Profile preview"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-full transition">
                  <span className="text-white text-xs">Change</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </label>
              <div className="w-full border-2 border-dashed border-blue-200 p-4 rounded-md text-center text-sm text-gray-500">
                Click image to upload<br />
                <span className="text-xs text-blue-400">SVG, PNG, JPEG or GIF (max 1080x1200px)</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Input placeholder="Enter Role" value={role} onChange={(e) => setRole(e.target.value)} />
            <Input placeholder="Enter ZIP Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
          </div>

          {/* Text Editor for Bio */}
          <div className="mb-6">
            <label className="block mb-2 font-medium text-sm">Bio</label>
            <TextEditor value={bio} onChange={setBio} />
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={handleSubmit}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}