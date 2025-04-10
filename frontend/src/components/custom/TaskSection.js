// pages/index.js
import { useState } from 'react';
import { HiOutlinePlus } from 'react-icons/hi';

const TaskCard = ({ task, onClickView, onClickSubmission }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full">
            {/* Task Number and Date */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-green-700">Task {task.id}</h3>
                <p className="text-sm text-gray-500">{task.date}</p>
            </div>

            {/* Book Icon (Center Image) */}
            <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-3 rounded-sm">
                    <img src="/famicons_book.png" alt="Book" className="w-20 h-20" />
                </div>
            </div>


            {/* Task Name */}
            <div className="mb-4 text-center">
                <h4 className="text-md text-gray-800">{task.description}</h4>
            </div>

            {/* View Brief and Student Submission Buttons */}
            <div className="space-y-4 mb-4 items-center justify-between">
                {/* View Brief Button */}
                <button
                    onClick={onClickView}
                    className="bg-white text-black w-[95%] mx-auto py-2 px-4 rounded-lg shadow-md border border-gray-300 hover:bg-gray-100 transition-colors"
                >
                    View Brief
                </button>

                {/* Student Submission Button */}
                <button
                    onClick={onClickSubmission}
                    className="bg-[#2ECA7F] text-black w-[95%] mx-auto py-2 px-4 rounded-lg shadow-md border border-green-300 hover:bg-green-300 transition-colors"
                >
                    Student Submission
                </button>
            </div>

            {/* Due Date */}
            <div className="text-center text-sm text-gray-500">Due: {task.dueDate}</div>
        </div>
    );
};

const TaskPage = () => {
    const [activeTab, setActiveTab] = useState('Task');

    const tasks = [
        { id: 1, date: '2024/06/17', description: 'Prototype Setup Task', dueDate: '2024/06/24' },
        { id: 2, date: '2024/06/17', description: 'Prototype Setup Task', dueDate: '2024/06/24' },
        { id: 3, date: '2024/06/17', description: 'Prototype Setup Task', dueDate: '2024/06/24' },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-6 relative">
            {/* Add Assignment Button */}
            <div className="absolute -mt-6 right-0 flex justify-center">
                <button className="bg-[#1A2D62] text-white py-2 px-6 rounded-lg flex items-center gap-2 hover:bg-blue-800 transition-colors">
                    <HiOutlinePlus className="text-xl" />
                    Add Assignment
                </button>
            </div>
            {/* Task Section */}
            {activeTab === 'Task' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onClickView={() => alert(`Viewing Brief for Task ${task.id}`)}
                            onClickSubmission={() => alert(`Submitting Task ${task.id}`)}
                        />
                    ))}
                </div>
            )}

            
        </div>
    );
};

export default TaskPage;
