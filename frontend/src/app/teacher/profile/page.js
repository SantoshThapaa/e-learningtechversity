"use client"
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export default function ProfilePage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bio, setBio] = useState('');
  const [role, setRole] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleSaveChanges = () => {
    // Handle save changes logic
    console.log({
      firstName,
      lastName,
      email,
      phoneNumber,
      bio,
      role,
      zipCode,
      photo,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Avatar src="/path/to/avatar.jpg" alt="Profile" className="w-16 h-16 mr-4" />
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Donald Trump</h1>
              <p className="text-sm text-gray-500">UX Designer | Sans Francisco</p>
            </div>
          </div>
          <Button variant="outline" className="text-sm">Edit Cover</Button>
        </div>

        {/* Profile Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4">My Details</h2>
          <p className="text-sm text-gray-600 mb-6">Please fill full details about yourself</p>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Input
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter First Name"
            />
            <Input
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter Last Name"
            />
            <Input
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
            />
            <Input
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter Phone Number"
            />
          </div>

          {/* Photo Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">Your Photo</label>
            <div className="border-2 border-dashed p-4 text-center cursor-pointer">
              <input
                type="file"
                accept=".jpg, .jpeg, .png, .svg, .gif"
                onChange={(e) => setPhoto(e.target.files[0])}
                className="hidden"
              />
              <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
            </div>
          </div>

          {/* Role and ZIP Code */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Input
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Enter Role"
            />
            <Input
              label="ZIP Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="Enter ZIP Code"
            />
          </div>

          {/* Bio */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">Bio</label>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Enter your bio"
              rows={4}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Button variant="outline" className="text-sm">Cancel</Button>
            <Button variant="solid" onClick={handleSaveChanges} className="text-sm">Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
