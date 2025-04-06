"use client";
import { Button } from "@/components/ui/button";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const AdminTopNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md px-6 flex items-center justify-between rounded-lg border border-gray-200 z-100">
      {/* Left Side: Logo */}
      <div className="flex items-center space-x-4">
        <img
          src="/logo.png"
          alt="Logo"
          className="w-15 h-15"
        />
      </div>

      <div className="relative flex items-center space-x-3">
        {/* Notifications Icon */}
        <Button variant="outline" className="text-blue-600 border-0 p-0">
          <FontAwesomeIcon icon={faBell} />
        </Button>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 cursor-pointer" onClick={toggleDropdown}>
          <img
            src="/path-to-avatar-image.jpg"
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-40 w-48 bg-white shadow-lg rounded-lg border border-gray-100">
            <div className="py-2 px-4 cursor-pointer hover:bg-gray-100 rounded-t-lg">Profile</div>
            <div className="py-2 px-4 cursor-pointer hover:bg-gray-100 rounded-b-lg">Logout</div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminTopNavbar;
