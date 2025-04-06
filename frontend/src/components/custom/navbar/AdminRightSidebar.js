'use client';

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { GraduationCap, Code2, Share2 } from "lucide-react";

const assignments = [
  {
    title: "Do The Research",
    teacher: "Teacher 1",
    icon: <GraduationCap className="text-indigo-500" />,
  },
  {
    title: "PHP Development",
    teacher: "Teacher 2",
    icon: <Code2 className="text-indigo-500" />,
  },
  {
    title: "Graphic Design",
    teacher: "Teacher 3",
    icon: <Share2 className="text-indigo-500" />,
  },
  {
    title: "Graphic Design",
    teacher: "Teacher 3",
    icon: <Share2 className="text-indigo-500" />,
  },
  {
    title: "Graphic Design",
    teacher: "Teacher 3",
    icon: <Share2 className="text-indigo-500" />,
  },
  {
    title: "Graphic Design",
    teacher: "Teacher 3",
    icon: <Share2 className="text-indigo-500" />,
  },
];

export default function AdminRightSidebar() {
  return (
    <div className="right-0 top-16 w-full lg:w-[320px] h-full p-2  bg-[#f5f8ff] rounded-l-lg shadow-sm z-50">
      {/* Calendar */}
      <Card className="rounded-xl space-y-6">
        <CardHeader className="text-center font-semibold text-gray-800">
          January 2025
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={new Date(2025, 0, 28)}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      {/* Assignments */}
      <Card className="rounded-xl">
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
                  {assignment.icon}
                </div>
                <div>
                  <p className="font-medium text-sm">{assignment.title}</p>
                  <p className="text-xs text-muted-foreground">
                    By {assignment.teacher}
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
