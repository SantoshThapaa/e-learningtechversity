import AdminRightSidebar from "./navbar/AdminRightSidebar";



const DashboardLayout = ({ children }) => (
    <div className="flex">        
        {/* Main Content Area */}
        <div className="flex-1 p-10 bg-gray-100 ml-64">
            {children}
        </div>
        
        {/* Admin Right Sidebar (Calendar and Assignments) */}
        <div className="w-80 h-screen fixed right-0 top-0 p-4 bg-white shadow-lg">
            <AdminRightSidebar />
        </div>
    </div>
);

export default DashboardLayout;
