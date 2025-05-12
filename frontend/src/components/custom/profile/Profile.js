'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TextEditor } from '../TextEditor';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

export default function ProfilePage() {
  const [coverImage, setCoverImage] = useState('/cover.jpg');
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [activeTab, setActiveTab] = useState('details');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [bio, setBio] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://back.bishalpantha.com.np/api/user/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = res.data.user;
        const fullName = user.name || '';
        const [fName, lName] = fullName.split(' ');

        setFirstName(fName || '');
        setLastName(lName || '');
        setEmail(user.email || '');
        setPhone(user.phone || '');
        setRole(user.role || '');
        setZipCode(user.profile?.zipCode || '');
        setBio(user.profile?.bio || '');
        if (user.profile?.coverImage) {
          setCoverImage(`https://back.bishalpantha.com.np${user.profile.coverImage}`);
        }
        if (user.profile?.profilePicture) {
          setProfileImageUrl(`https://back.bishalpantha.com.np${user.profile.profilePicture}`);
        }


      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

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
        formData.append('coverImage', coverImageFile);
      }

      if (profileImageFile) {
        formData.append('profilePicture', profileImageFile);
      }

      const token = localStorage.getItem('token');
      await axios.put('https://back.bishalpantha.com.np/api/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Profile updated successfully!');
      router.back();
    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile.');
    }
  };
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordVisible, setPasswordVisible] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleChange = (e, field) => {
    setForm({
      ...form,
      [field]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      toast.error("All fields are required!");
      return false;
    }

    if (form.newPassword !== form.confirmPassword) {
      toast.error("New password and confirm password do not match!");
      return false;
    }

    return true;
  };

  const handlePasswordChange = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.put(
        "https://back.bishalpantha.com.np/api/update-password", 
        {
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
          confirmPassword: form.confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, 
          },
        }
      );

      toast.success("Password changed successfully!");
      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Password change failed:", error);
      toast.error("Failed to update password.");
    }
  };

  const handleCancel = () => {
    setForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisible({
      ...passwordVisible,
      [field]: !passwordVisible[field],
    });
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <div className="bg-white rounded-xl overflow-hidden shadow">
        <div
          className="h-52 bg-cover bg-center relative rounded-t-xl"
          style={{
            backgroundImage: `url(${coverImageFile
              ? URL.createObjectURL(coverImageFile)
              : coverImage || '/cover.jpg'
              })`
          }}

        >
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

          <div className="absolute bottom-[-40px] left-6">
            <label className="cursor-pointer relative group">
              <Image
                src={
                  profileImageFile
                    ? URL.createObjectURL(profileImageFile)
                    : profileImageUrl || "/profile-pic.jpg"
                }
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

        <div className="mt-16 px-6">
          <h2 className="text-xl font-semibold">{firstName} {lastName}</h2>
          <p className="text-sm text-gray-500">{role || 'Your role'}</p>
          <p className="text-sm text-gray-500">{bio || 'Your bio'}</p>
        </div>

        <div className="mt-6 px-6 border-b border-gray-200">
          <div className="flex space-x-4 text-sm">
            <div className="mt-6 px-6 border-b border-gray-200">
              <div className="flex space-x-4 text-sm">
                <button
                  className={`pb-2 ${activeTab === 'details' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('details')}
                >
                  My Details
                </button>
                <button
                  className={`pb-2 ${activeTab === 'password' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('password')}
                >
                  Password
                </button>
              </div>
            </div>
          </div>
        </div>
        {activeTab === 'details' && (
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
        )}
        {activeTab === 'password' && (
          <div className="bg-white rounded-xl overflow-hidden shadow">
          <div className="mt-6 px-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Password Settings</h3>
            <p className="text-sm text-gray-500 mb-6">Please fill full details about yourself</p>
    
            {/* Current Password Field */}
            <div className="mb-4">
              <Label>Current Password</Label>
              <div className="relative">
                <Input
                  type={passwordVisible.currentPassword ? "text" : "password"}
                  name="currentPassword"
                  placeholder="Enter Current Password"
                  value={form.currentPassword}
                  onChange={(e) => handleChange(e, "currentPassword")}
                  className="w-full"
                />
                <span
                  className="absolute top-3 right-3 cursor-pointer"
                  onClick={() => togglePasswordVisibility("currentPassword")}
                >
                  {passwordVisible.currentPassword ? (
                    <EyeOffIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-500" />
                  )}
                </span>
              </div>
            </div>
    
            {/* New Password Field */}
            <div className="mb-4">
              <Label>New Password</Label>
              <div className="relative">
                <Input
                  type={passwordVisible.newPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder="Enter New Password"
                  value={form.newPassword}
                  onChange={(e) => handleChange(e, "newPassword")}
                  className="w-full"
                />
                <span
                  className="absolute top-3 right-3 cursor-pointer"
                  onClick={() => togglePasswordVisibility("newPassword")}
                >
                  {passwordVisible.newPassword ? (
                    <EyeOffIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-500" />
                  )}
                </span>
              </div>
            </div>
    
            {/* Confirm Password Field */}
            <div className="mb-4">
              <Label>Confirm Password</Label>
              <div className="relative">
                <Input
                  type={passwordVisible.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Enter Confirm Password"
                  value={form.confirmPassword}
                  onChange={(e) => handleChange(e, "confirmPassword")}
                  className="w-full"
                />
                <span
                  className="absolute top-3 right-3 cursor-pointer"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                >
                  {passwordVisible.confirmPassword ? (
                    <EyeOffIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-500" />
                  )}
                </span>
              </div>
            </div>
    
            {/* Password Requirements */}
            <div className="mb-4">
              <h4 className="text-sm font-medium">Password Requirements:</h4>
              <ul className="text-xs text-gray-500 list-disc pl-5">
                <li>At least one lowercase character</li>
                <li>Minimum 8 characters long - the more, the better</li>
                <li>At least one number, symbol, or whitespace character</li>
              </ul>
            </div>
    
            {/* Actions */}
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={handlePasswordChange}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover />
    </div>
  );
}