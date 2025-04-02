import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';

const AdminRightSidebar = () => {
    return (
        <div className='w-80 h-screen text-black p-4'>
            {/* Right Section: Calendar and Assignments */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Calendar */}
                <div className="w-full lg:w-2/3 p-4">
                    <Calendar />
                </div>
            </div>

            {/* Assignments */}
            <div className="w-full lg:w-1/3 p-4">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Assignments</h3>
                    <div className="space-y-4">
                        <div className="p-3 bg-gray-50 rounded-md shadow-sm">
                            <div className="font-semibold text-blue-600">Do The Research</div>
                            <div className="text-gray-500">By Teacher 1</div>
                            <Button className="text-blue-500 mt-4">View</Button>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-md shadow-sm">
                            <div className="font-semibold text-blue-600">PHP Development</div>
                            <div className="text-gray-500">By Teacher 2</div>
                            <Button className="text-blue-500 mt-4">View</Button>
                        </div>
                        {/* Add more assignments here */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminRightSidebar;
