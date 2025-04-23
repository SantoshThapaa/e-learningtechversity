"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { HiOutlinePlus } from 'react-icons/hi';
import { getUserIdFromToken } from '@/utils/authUtils';

const TaskCard = ({ task, onClickView, onClickSubmission }) => (
    <div className="backdrop-blur-md p-6 rounded-lg shadow-md border border-gray-200 w-full">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-green-700">Task {task.taskNumber}</h3>
            <p className="text-sm text-gray-500">{new Date(task.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-3 rounded-sm">
                <Image
                    src="/famicons_book.png"
                    alt="Book"
                    width={80}
                    height={80}
                    className="w-20 h-20"
                />
            </div>
        </div>
        <div className="mb-4 text-center">
            <h4 className="text-md text-gray-800">{task.title}</h4>
        </div>
        <div className="space-y-4 mb-4 items-center justify-between">
            <button
                onClick={() => onClickView(task)}
                className="bg-white text-black w-[95%] mx-auto py-2 px-4 rounded-lg shadow-md border border-gray-300 hover:bg-gray-100 transition-colors"
            >
                View Brief
            </button>
            <button
                onClick={onClickSubmission}
                className="bg-[#2ECA7F] text-black w-[95%] mx-auto py-2 px-4 rounded-lg shadow-md border border-green-300 hover:bg-green-300 transition-colors"
            >
                Student Submission
            </button>
        </div>
        <div className="text-center text-sm text-gray-500">
            Due: {new Date(task.deadline).toLocaleDateString()}
        </div>
    </div>
);

const TaskPage = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem("token");
            const userId = getUserIdFromToken();

            if (!token || !userId) return;

            try {
                const res = await fetch("http://localhost:4000/api/assignment/courseassignments", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                if (res.ok) {
                    setTasks(data.assignments || []);
                } else {
                    alert(data.message || "Failed to fetch tasks");
                }
            } catch (err) {
                console.error("Error fetching assignments:", err.message);
            }
        };

        fetchTasks();
    }, []);

    const closeModal = () => setSelectedTask(null);

    return (
        <div className="min-h-screen bg-gray-100 p-6 relative">
            {/* Add Assignment Button */}
            <div className="absolute -mt-6 right-0 flex justify-center">
                <button
                    className="bg-[#1A2D62] text-white py-2 px-6 rounded-lg flex items-center gap-2 hover:bg-blue-800 transition-colors"
                    onClick={() => router.push("/teacher/assignmentform")}
                >
                    <HiOutlinePlus className="text-xl" />
                    Add Assignment
                </button>
            </div>

            {/* Task Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            onClickView={setSelectedTask}
                            onClickSubmission={() => router.push(`/teacher/assignment/${task._id}`)}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-full">
                        No assignments posted yet.
                    </p>
                )}
            </div>

            {/* View Brief Modal */}
            {selectedTask && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white max-w-lg w-full p-6 rounded-lg shadow-lg relative">
                        <h2 className="text-2xl font-semibold mb-2 text-center">
                            {selectedTask.title}
                        </h2>
                        <p className="text-gray-600 mb-4 text-center">
                            Posted on: {new Date(selectedTask.createdAt).toLocaleDateString()}
                        </p>
                        <div className="text-gray-800 mb-6 whitespace-pre-line">
                            {selectedTask.description}
                        </div>
                        <div className="text-center text-sm text-gray-500 mb-4">
                            Due: {new Date(selectedTask.deadline).toLocaleDateString()}
                        </div>
                        <div className="flex justify-center">
                            <button
                                onClick={closeModal}
                                className="bg-[#1A2D62] text-white px-6 py-2 rounded hover:bg-blue-800 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskPage;

