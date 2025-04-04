"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Calendar } from "../ui/calendar";
import { Pencil, Search, GraduationCap } from "lucide-react";

const TeacherDashboard = () => {
    const router = useRouter();

    // Navigate to Edit Course page
    const handleEditCourse = () => {
        router.push('/editcourse');
    };

    return (
        <div className="bg-gray-100 min-h-screen p-15">
            {/* First row: New Course and Calendar side by side */}
            <div className="flex flex-wrap justify-between gap-10 mb-6">
                {/* New Course Card (48% width) */}
                <Card className="w-full md:w-[45%] p-6 bg-green-50 border border-green-100 rounded-xl shadow-sm">
                    <div className="flex gap-4">
                        {/* Left Section */}
                        <div className="bg-white rounded-lg p-4 w-1/2 shadow-sm">
                            <div className="flex justify-between items-center mb-2">
                                <span className="bg-blue-900 text-white text-xs px-3 py-1 rounded-md">New Course</span>
                                <span className="text-xs text-gray-400">04/06/2025</span>
                            </div>
                            <div className="text-sm text-gray-500 mb-1">6 weeks</div>
                            <h3 className="text-lg font-semibold">MERN Stack Development</h3>
                            <div className="text-sm text-gray-500">Batch 10</div>
                        </div>

                        {/* Right Section */}
                        <div className="flex flex-col gap-4 w-1/2 px-4">
                            <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm cursor-pointer" onClick={handleEditCourse}>
                                <div className="bg-green-200 p-2 rounded-md">
                                    <Pencil className="h-4 w-4 text-green-700" />
                                </div>
                                <span className="text-sm font-medium">Edit Course</span>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                                <div className="bg-green-200 p-2 rounded-md">
                                    <Search className="h-4 w-4 text-green-700" />
                                </div>
                                <span className="text-sm font-medium">Manage Course</span>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                                <div className="bg-green-200 p-2 rounded-md">
                                    <GraduationCap className="h-4 w-4 text-green-700" />
                                </div>
                                <span className="text-sm font-medium">Attendance</span>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Calendar (48% width) */}
                <div className="w-full md:w-[30%] p-6 bg-white rounded-xl shadow-sm border border-gray-200 pr-50">
                    <Calendar />
                </div>
            </div>

            <div className="flex flex-wrap justify-between gap-10 mb-6">
                {/* Completed Course Card 1 */}
                <Card className="w-full md:w-[45%] p-6 bg-blue-50 border border-blue-100 rounded-xl shadow-sm">
                    <div className="flex gap-4">
                        {/* Left Section */}
                        <div className="bg-white rounded-lg p-4 w-1/2 shadow-sm">
                            <div className="flex justify-between items-center mb-2">
                                <span className="bg-blue-900 text-white text-xs px-3 py-1 rounded-md">Completed</span>
                                <span className="text-xs text-gray-400">04/06/2025</span>
                            </div>
                            <div className="text-sm text-gray-500 mb-1">6 weeks</div>
                            <h3 className="text-lg font-semibold">MERN Stack Development</h3>
                            <div className="text-sm text-gray-500">Batch 9</div>
                        </div>

                        {/* Right Section */}
                        <div className="flex flex-col gap-4 w-1/2 px-4">
                            <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm cursor-pointer" onClick={handleEditCourse}>
                                <div className="bg-green-200 p-2 rounded-md">
                                    <Pencil className="h-4 w-4 text-green-700" />
                                </div>
                                <span className="text-sm font-medium">Edit Course</span>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                                <div className="bg-green-200 p-2 rounded-md">
                                    <Search className="h-4 w-4 text-green-700" />
                                </div>
                                <span className="text-sm font-medium">Manage Course</span>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                                <div className="bg-green-200 p-2 rounded-md">
                                    <GraduationCap className="h-4 w-4 text-green-700" />
                                </div>
                                <span className="text-sm font-medium">Attendance</span>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Completed Course Card 2 */}
                <Card className="w-full md:w-[45%] p-6 bg-yellow-50 border border-yellow-100 rounded-xl shadow-sm">
                    <div className="flex gap-4">
                        {/* Left Section */}
                        <div className="bg-white rounded-lg p-4 w-1/2 shadow-sm">
                            <div className="flex justify-between items-center mb-2">
                                <span className="bg-blue-900 text-white text-xs px-3 py-1 rounded-md">Completed</span>
                                <span className="text-xs text-gray-400">04/06/2025</span>
                            </div>
                            <div className="text-sm text-gray-500 mb-1">6 weeks</div>
                            <h3 className="text-lg font-semibold">MERN Stack Development</h3>
                            <div className="text-sm text-gray-500">Batch 8</div>
                        </div>

                        {/* Right Section */}
                        <div className="flex flex-col gap-4 w-1/2 px-4">
                            <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm cursor-pointer" onClick={handleEditCourse}>
                                <div className="bg-green-200 p-2 rounded-md">
                                    <Pencil className="h-4 w-4 text-green-700" />
                                </div>
                                <span className="text-sm font-medium">Edit Course</span>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                                <div className="bg-green-200 p-2 rounded-md">
                                    <Search className="h-4 w-4 text-green-700" />
                                </div>
                                <span className="text-sm font-medium">Manage Course</span>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                                <div className="bg-green-200 p-2 rounded-md">
                                    <GraduationCap className="h-4 w-4 text-green-700" />
                                </div>
                                <span className="text-sm font-medium">Attendance</span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default TeacherDashboard;