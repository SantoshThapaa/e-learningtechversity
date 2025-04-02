import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import DashboardLayout from "./DashboardLayout";


const Dashboard = () => {
    return (
        <DashboardLayout>
            {/* Dashboard Stats */}
            <div className="flex flex-wrap justify-between mb-6 mt-20">
                <div className="w-full sm:w-1/2 lg:w-1/3 p-2">
                    <Card>
                        <CardHeader className="font-bold">155+ Completed Courses</CardHeader>
                        <CardContent>
                            <div className="text-3xl">Completed Courses</div>
                        </CardContent>
                    </Card>
                </div>
                <div className="w-full sm:w-1/2 lg:w-1/3 p-2">
                    <Card>
                        <CardHeader className="font-bold">25+ Courses in Progress</CardHeader>
                        <CardContent>
                            <div className="text-3xl">Courses in Progress</div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Students Enrolled Statistics (Graph) */}
            <div className="mb-6">
                <h3 className="text-xl font-bold mb-4">Students Enrolled Statistics</h3>
                <div className="bg-white p-6 border rounded-lg">
                    <div className="w-full h-64 bg-gray-300">[Chart Here]</div> {/* Replace with your chart */}
                </div>
            </div>

            {/* Middle Section: Recently Added Courses */}
            <div className="w-full lg:w-2/3 p-4 mb-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Recently Added Courses</h3>
                    <div className="space-y-4">
                        {/* Repeat for each course */}
                        <div className="p-3 bg-gray-50 rounded-md shadow-sm">
                            <div className="font-semibold text-blue-600">Increasing Engagement With Instagram & Facebook</div>
                            <div className="text-gray-500">Social | 5 Lessons | 4 Weeks</div>
                            <Button className="bg-green-500 text-white mt-4">Enroll Now</Button>
                        </div>
                        {/* Add more courses */}
                    </div>
                </div>
            </div>

            

        </DashboardLayout>
    );
};


export default Dashboard;
