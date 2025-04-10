"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Grid3X3, LayoutList, Trash2 } from "lucide-react";

const files = [
  { name: "Design & Art", type: "xls" },
  { name: "Articles.pdf", type: "pdf" },
  { name: "Payment.xls", type: "pdf" },
  { name: "Brief.doc", type: "doc" },
  { name: "Lession.doc", type: "doc" },
  { name: "Revenue.xls", type: "xls" },
  { name: "Class 1st.doc", type: "doc" },
  { name: "Budget.xls", type: "xls" },
];


const StudyMaterialSection = () => {
  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <div className="text-sm text-gray-500 mb-4">Home &gt; Files & Resources</div>
      {/* Search & Actions */}
      <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-md shadow-sm">
        <Input placeholder="Search..." className="w-1/3" />
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Trash2 className="h-5 w-5 text-gray-500" />
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Grid3X3 className="h-5 w-5 text-gray-500" />
            </Button>
            <Button variant="ghost" size="icon">
              <LayoutList className="h-5 w-5 text-gray-500" />
            </Button>
          </div>
          <Button className="bg-blue-900 text-white">Upload File</Button>
        </div>
      </div>

      {/* File Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-white rounded-md p-3 shadow-sm text-center"
          >
            <input type="checkbox" className="mb-2" />
            <img src={`/icons/${file.type}.png`} alt={file.type} className="h-12 mb-2" />
            <p className="text-sm font-medium text-gray-700 truncate w-full">{file.name}</p>
            <span className="text-xs text-gray-400">32 Files</span>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2 py-4">
        <Button variant="ghost" className="text-sm">
          &larr; Previous
        </Button>
        <div className="flex gap-1">
          {[...Array(10)].map((_, i) => (
            <Button
              key={i}
              variant={i === 0 ? "default" : "ghost"}
              className="h-8 w-8 p-0 text-sm"
            >
              {i + 1}
            </Button>
          ))}
        </div>
        <Button variant="ghost" className="text-sm">
          Next &rarr;
        </Button>
      </div>
    </div>
  );
};

export default StudyMaterialSection;
