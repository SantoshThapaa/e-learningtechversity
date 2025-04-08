"use client"
import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { TextEditor } from "@/components/custom/TextEditor";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const EditCoursePage = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [videoLink, setVideoLink] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailImage(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      setThumbnailImage(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    console.log("Course Saved:", {
      courseTitle,
      courseDuration,
      courseDescription,
      thumbnailImage,
      videoLink,
      hashtags,
      language,
      level,
    });
  };

  return (
    <div className="min-h-screen bg-[#F2F6FF] p-8">
      <h2 className="text-xl font-semibold mb-2">Edit Course</h2>
      <p className="text-sm text-muted-foreground mb-6">Home &gt; Edit Course</p>

      {/* Save Button at the top */}
      <div className="flex justify-end mb-4">
        <Button className="px-6 py-2 bg-blue-600 text-white rounded-md" onClick={handleSave}>
          Save
        </Button>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-6">Course Details</h3>

        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {/* Left 35% */}
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
                  accept="image/*"
                  className="absolute inset-0 opacity-0"
                  onChange={handleThumbnailChange}
                />
              </div>
              {thumbnailImage && (
                <img
                  src={thumbnailImage}
                  alt="Thumbnail"
                  className="mt-4 w-32 h-32 object-cover"
                />
              )}
            </div>

            <div>
              <Label>Intro Video Link</Label>
              <Input placeholder="www.youtube674849.com" />
            </div>

            <div>
              <Label>Hashtags</Label>
              <Input placeholder="Enter course category" />
            </div>

            <div>
              <Label>Language</Label>
              <Select defaultValue="english">
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
              <Select defaultValue="advance">
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

          {/* Right Remaining Width */}
          <div className="flex-1 space-y-4">
            <div>
              <Label htmlFor="title">Course Title <span className="text-red-500">(Required)</span></Label>
              <Input id="title" placeholder="Full Stack Development" />
              <div className="text-right text-sm text-muted-foreground">18 / 100</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Course Join Link <span className="text-muted-foreground">(Gmeet or Zoom)</span></Label>
                <Input placeholder="Paste meeting link here" />
              </div>
              <div>
                <Label>Course Time</Label>
                <Input placeholder="time picker" />
              </div>
              <div>
                <Label>Course Duration</Label>
                <Input placeholder="6 weeks" />
              </div>
            </div>

            <div>
              <Label>About Course</Label>
              <TextEditor defaultValue="Here will be a text editor. Student will be allowed to submit their task from here." />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EditCoursePage;
