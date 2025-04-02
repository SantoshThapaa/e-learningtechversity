"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Card } from "../ui/card";

const TeacherDashboard = () => {
    const router = useRouter();

    // Navigate to Edit Course page
    const handleEditCourse = () => {
        router.push('/teacher/editcourse');
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* New Course Card */}
                <Card className="p-4 bg-green-100 border border-gray-200 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold">New Course</h3>
                        <span className="text-sm text-gray-500">04/06/2025</span>
                    </div>
                    <p className="text-md text-gray-700 mt-2">MERN Stack Development</p>
                    <p className="text-sm text-gray-500">Batch 10 - 6 weeks</p>
                    <div className="mt-4 space-x-4">
                        <Button variant="outline" onClick={handleEditCourse}>Edit Course</Button>
                        <Button variant="outline">Manage Course</Button>
                        <Button variant="outline">Attendance</Button>
                    </div>
                </Card>

                {/* Completed Course Cards */}
                <Card className="p-4 bg-blue-100 border border-gray-200 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold">Completed</h3>
                        <span className="text-sm text-gray-500">04/06/2025</span>
                    </div>
                    <p className="text-md text-gray-700 mt-2">MERN Stack Development</p>
                    <p className="text-sm text-gray-500">Batch 9</p>
                    <div className="mt-4 space-x-4">
                        <Button variant="outline" onClick={handleEditCourse}>Edit Course</Button>
                        <Button variant="outline">Manage Course</Button>
                        <Button variant="outline">Attendance</Button>
                    </div>
                </Card>

                <Card className="p-4 bg-yellow-100 border border-gray-200 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold">Completed</h3>
                        <span className="text-sm text-gray-500">04/06/2025</span>
                    </div>
                    <p className="text-md text-gray-700 mt-2">MERN Stack Development</p>
                    <p className="text-sm text-gray-500">Batch 8</p>
                    <div className="mt-4 space-x-4">
                        <Button variant="outline" onClick={handleEditCourse}>Edit Course</Button>
                        <Button variant="outline">Manage Course</Button>
                        <Button variant="outline">Attendance</Button>
                    </div>
                </Card>

                {/* Calendar */}
                <div className="col-span-1 md:col-span-3 mt-4 md:mt-0">
                    <Calendar />
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
