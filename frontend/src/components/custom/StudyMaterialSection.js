"use client";

import { useEffect, useState } from "react";
import { Grid3X3, LayoutList, Trash2 } from "lucide-react";
import Image from "next/image";
import StudyMaterialUpload from "./StudyMaterialUpload";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import axios from "axios";
import { getUserIdFromToken } from "@/utils/authUtils";
import { toast } from "react-toastify";

export default function StudyMaterialSection() {
  const [files, setFiles] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); 
  const [searchQuery, setSearchQuery] = useState("");

  const fetchStudyMaterials = async () => {
    try {
      const uploaderId = getUserIdFromToken();
      if (!uploaderId) {
        toast.error("You must be logged in.");
        return;
      }

      const res = await axios.get(`https://back.bishalpantha.com.np/api/study-materials/teacher/${uploaderId}`);
      setFiles(res.data.materials || []);
    } catch (err) {
      console.error("Failed to fetch study materials:", err);
      toast.error("Failed to load study materials.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudyMaterials();
  }, []);

  const handleUploadSuccess = () => {
    fetchStudyMaterials();
  };

  const handleFileSelect = (fileId) => {
    setSelectedFiles((prevSelectedFiles) =>
      prevSelectedFiles.includes(fileId)
        ? prevSelectedFiles.filter((id) => id !== fileId)
        : [...prevSelectedFiles, fileId]
    );
  };

  const handleDelete = async () => {
    if (selectedFiles.length === 0) {
      toast.error("No files selected for deletion.");
      return;
    }

    try {
      await axios.delete("https://back.bishalpantha.com.np/api/study-materials/delete", {
        data: { fileIds: selectedFiles },
      });

      toast.success("Files deleted successfully!");
      setSelectedFiles([]);
      fetchStudyMaterials(); 
    } catch (err) {
      console.error("Failed to delete files:", err);
      toast.error("Failed to delete files.");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredFiles = files.filter((file) =>
    file.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-blue-50 min-h-screen relative">
      {showUpload && (
        <StudyMaterialUpload
          onClose={() => setShowUpload(false)}
          onUploadSuccess={handleUploadSuccess}
        />
      )}

      <div className="text-sm text-gray-500 mb-4">Home &gt; Files & Resources</div>

      <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-md shadow-sm">
        <Input
          placeholder="Search..."
          className="w-1/3"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            disabled={selectedFiles.length === 0}
          >
            <Trash2 className="h-5 w-5 text-gray-500" />
          </Button>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-5 w-5 text-gray-500" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <LayoutList className="h-5 w-5 text-gray-500" />
            </Button>
          </div>
          <Button
            className="bg-blue-900 text-white"
            onClick={() => setShowUpload(true)}
          >
            Upload File
          </Button>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading study materials...</p>
      ) : filteredFiles.length === 0 ? (
        <p className="text-center text-gray-500">No study materials uploaded yet.</p>
      ) : (
        <div
          className={`grid ${viewMode === "grid" ? "grid-cols-2 md:grid-cols-4" : "grid-cols-1"} gap-6 mb-6`}
        >
          {filteredFiles.map((file, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center bg-white rounded-md p-3 shadow-sm text-center"
            >
              <input
                type="checkbox"
                className="mb-2"
                onChange={() => handleFileSelect(file._id)}
                checked={selectedFiles.includes(file._id)}
              />
              <Image
                src={`/pdf file.png`}
                alt={file.fileType}
                width={48}
                height={48}
                className="h-12 mb-2"
              />
              <p className="text-sm font-medium text-gray-700 truncate w-full">{file.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
