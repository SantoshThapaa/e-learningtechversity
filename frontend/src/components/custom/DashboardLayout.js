import Dashboard from "./Dashboard";
import AdminRightSidebar from "./navbar/AdminRightSidebar";



const DashboardLayout = ({ children }) => (
    <div className="flex">
        {/* Main Content Area */}
        <div className="flex-1 p-2 bg-gray-100">
            <Dashboard />
        </div>
        <AdminRightSidebar />
    </div>
);

export default DashboardLayout;
