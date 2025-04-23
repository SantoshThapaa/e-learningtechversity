'use client';

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { GraduationCap, Code2, Share2 } from "lucide-react";

const getIconForAssignment = (title) => {
  if (title.includes("Research")) return <GraduationCap className="text-indigo-500" />;
  if (title.includes("PHP")) return <Code2 className="text-indigo-500" />;
  return <Share2 className="text-indigo-500" />;
};

export default function AdminRightSidebar() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/assignment/assignments");
        const data = await response.json();
        setAssignments(data.assignments.slice(0, 6));
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <div className="right-0 top-16 w-full lg:w-[320px] h-full p-2  bg-[#f5f8ff] rounded-l-lg shadow-sm z-50 mb-20">
      <Card className="rounded-xl space-y-6">
        <CardContent>
          <Calendar
            mode="single"
            selected={new Date(2025, 0, 28)}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      <Card className="rounded-xl mt-10">
        <CardHeader className="text-lg font-semibold text-gray-800">
          Assignments
        </CardHeader>
        <CardContent className="space-y-3">
          {assignments.map((assignment, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-md">
                  {getIconForAssignment(assignment.title)}
                </div>
                <div>
                  <p className="font-medium text-sm">{assignment.title}</p>
                  <p className="text-xs text-muted-foreground">
                    By {assignment.createdBy?.name || "Unknown"}
                  </p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
