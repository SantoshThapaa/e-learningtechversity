'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud } from "lucide-react";
import { TextEditor } from "@/components/custom/TextEditor";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { getUserIdFromToken, getCourseIdFromLocalStorage } from "@/utils/authUtils";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCoursePage = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [videoLink, setVideoLink] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [editorValue, setEditorValue] = useState("");
  const [userId, setUserId] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [meetLink, setMeetLink] = useState("");
  const [courseTime, setCourseTime] = useState("");


  const router = useRouter();

  useEffect(() => {
    const userIdFromToken = getUserIdFromToken();
    if (userIdFromToken) {
      setUserId(userIdFromToken);
    } else {
      alert("Please log in first.");
      router.push("/login");
    }

    const storedCourseId = getCourseIdFromLocalStorage();
    if (storedCourseId) {
      setCourseId(storedCourseId);
      console.log("Course ID from localStorage: ", storedCourseId);
    } else {
      alert("Course ID is missing. Please select a course first.");
      router.push("/teacher/dashboard");
    }
  }, [router]);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 150 * 1024 * 1024) {
        toast.error("File size exceeds 150MB. Please select a smaller image.");
        return;
      }
      setThumbnailImage(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];


    if (file.type.startsWith('image/')) {
      if (file.size > 150 * 1024 * 1024) {
        toast.error("Image file size exceeds 150MB. Please select a smaller image.");
        return;
      }
      setThumbnailImage(file);
    } else {
      toast.error("Invalid file type. Please select an image or video.");
    }

  };


  const handleSave = async () => {
    if (!userId || !courseId) {
      toast.error("Please log in first or select a course.");
      return;
    }
    if (!editorValue.trim()) {
      toast.error("Description is required.");
      return;
    }
    const formData = new FormData();
    formData.append("title", courseTitle);
    formData.append("courseDuration", courseDuration);
    formData.append("videoLink", videoLink);
    formData.append("hashtags", hashtags);
    formData.append("language", language);
    formData.append("level", level);
    formData.append("description", editorValue);
    formData.append("meetLink", meetLink);
    formData.append("courseTime", courseTime);
    if (thumbnailImage) {
      formData.append("thumbnail", thumbnailImage);
    }
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Please log in first");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:4000/api/course/${courseId}/lecture`,
        formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Lecture created successfully!");
      console.log("Lecture created successfully:", response.data);
      setCourseTitle("");
      setCourseDuration("");
      setVideoLink("");
      setHashtags("");
      setLanguage("");
      setLevel("");
      setEditorValue("");
      setMeetLink("");
      setCourseTime("");
      setThumbnailImage("");
    } catch (error) {
      console.error("Error creating lecture:", error.response ? error.response.data : error.message);
      toast.error("Failed to create lecture. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F6FF] p-8">
      <h2 className="text-xl font-semibold mb-2">Edit Course</h2>
      <p className="text-sm text-muted-foreground mb-6">Home &gt; Edit Course</p>

      <div className="flex justify-end mb-4">
        <Button className="px-6 py-2 bg-blue-600 text-white rounded-md" onClick={handleSave}>
          Save
        </Button>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-6">Course Details</h3>

        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="md:w-[35%] w-full space-y-4">
            <div>
              <Label>Thumbnail Image <span className="text-red-500">(Required)</span></Label>
              <div
                className="border border-dashed border-gray-400 rounded-lg h-40 flex flex-col items-center justify-center text-center bg-white relative"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <UploadCloud className="w-8 h-8 text-gray-500 mb-2" />
                <span>Drag or <span className="text-blue-600 cursor-pointer">Browse</span></span>
                <p className="text-sm text-muted-foreground">PNG, JPEG (max 5mb size)</p>
                <input
                  type="file"
                  name="thumbnail"
                  accept="image/*"
                  className="absolute inset-0 opacity-0"
                  onChange={handleThumbnailChange}
                />
              </div>
              {thumbnailImage && (
                <img
                  src={URL.createObjectURL(thumbnailImage)}
                  alt="Thumbnail"
                  className="mt-4 w-32 h-32 object-cover"
                />
              )}
            </div>

            <div>
              <Label>Intro Video Link</Label>
              <Input
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
                placeholder="video link"
              />
            </div>

            <div>
              <Label>Hashtags</Label>
              <Input
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
                placeholder="Enter course category"
              />
            </div>

            <div>
              <Label>Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="nepali">Nepali</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Level</Label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advance">Advance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <Label htmlFor="title">Course Title <span className="text-red-500">(Required)</span></Label>
              <Input
                id="title"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                placeholder="Full Stack Development"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Course Join Link <span className="text-muted-foreground">(Gmeet or Zoom)</span></Label>
                <Input
                  value={meetLink}
                  onChange={(e) => setMeetLink(e.target.value)}
                  placeholder="Paste meeting link here"
                />
              </div>

              <div>
                <Label>Course Time</Label>
                <Input
                  value={courseTime}
                  onChange={(e) => setCourseTime(e.target.value)}
                  placeholder="e.g. 8:00 PM"
                />
              </div>

              <div>
                <Label>Course Duration</Label>
                <Input
                  value={courseDuration}
                  onChange={(e) => setCourseDuration(e.target.value)}
                  placeholder="6 weeks"
                />
              </div>
            </div>

            <div>
              <Label>About Course</Label>
              <TextEditor defaultValue={courseDescription} onChange={setEditorValue} />
            </div>
          </div>
        </div>
      </Card>

      <ToastContainer />
    </div>
  );
};

export default EditCoursePage;
