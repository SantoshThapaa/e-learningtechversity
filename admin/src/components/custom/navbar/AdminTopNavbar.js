import { BellIcon, UserCircleIcon } from 'lucide-react';

const AdminTopNavbar = () => (
    <div className="flex justify-between items-center p-4 bg-blue-50 shadow-md fixed top-0 left-64 right-0 z-10">
        <div className="flex space-x-6">
            <div className="text-xl font-bold">Techversity Dashboard</div>
        </div>
        <div className="flex items-center space-x-4">
            <BellIcon className="h-6 w-6 text-gray-600 cursor-pointer" />
            <UserCircleIcon className="h-8 w-8 text-gray-600 cursor-pointer" />
        </div>
    </div>
);
export default AdminTopNavbar;