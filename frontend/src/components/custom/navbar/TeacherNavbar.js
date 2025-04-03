"use client"; 
import { Button } from "@/components/ui/button";
import { useState } from "react"; 

const TeacherNavbar = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const toggleDropdown = () => {
    setIsOpen(!isOpen); 
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between mt-10">
      {/* Left Icon */}
      <div className="flex items-center space-x-2">
        <Button variant="outline" className="text-blue-600">
          <span className="material-icons">notifications</span> 
        </Button>
      </div>

      {/* Right Avatar with Dropdown */}
      <div className="relative flex items-center space-x-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer" onClick={toggleDropdown}>
          <img 
            src="/path-to-avatar-image.jpg" 
            alt="User Avatar" 
            className="w-8 h-8 rounded-full"
          />
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-10 w-40 bg-white shadow-md rounded-lg">
            <div className="py-2 px-4 cursor-pointer hover:bg-gray-200">Profile</div>
            <div className="py-2 px-4 cursor-pointer hover:bg-gray-200">Settings</div>
            <div className="py-2 px-4 cursor-pointer hover:bg-gray-200">Logout</div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TeacherNavbar;
