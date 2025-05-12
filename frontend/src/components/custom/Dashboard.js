'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChartBig, BookOpenCheck, CalendarDays, Star } from 'lucide-react';
import Image from 'next/image';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement
);

const Dashboard = () => {
    const [userStats, setUserStats] = useState([]);
    const [period, setPeriod] = useState("Yearly");
    const [loading, setLoading] = useState(false);
    const [completedCourses, setCompletedCourses] = useState(0);
    const [inProgressCourses, setInProgressCourses] = useState(0);
    const [courses, setCourses] = useState([]);
    const [showAllCourses, setShowAllCourses] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('https://back.bishalpantha.com.np/api/allcourses');
                const data = await response.json();
                setCourses(data.courses);
            } catch (error) {
                console.error("Error fetching courses:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);


    useEffect(() => {
        const fetchCoursesStatus = async () => {
            try {
                const response = await fetch('https://back.bishalpantha.com.np/api/courses/status');
                const data = await response.json();
                setCompletedCourses(data.completedCourses);
                setInProgressCourses(data.inProgressCourses);
            } catch (error) {
                console.error("Error fetching course status:", error);
            }
        };

        fetchCoursesStatus();
    }, []);

    useEffect(() => {
        const fetchUserStats = async () => {
            try {
                const response = await fetch(`https://back.bishalpantha.com.np/api/stats?period=${period}`);
                const data = await response.json();
                setUserStats(data.stats);
            } catch (error) {
                console.error("Error fetching user statistics:", error);
                setUserStats([]);
            } finally {
                setLoading(false);
            }
        };

        fetchUserStats();
    }, [period]);

    const chartData = {
        labels: userStats.map((stat) => stat.date),
        datasets: [
            {
                label: 'Users Registered',
                data: userStats.map((stat) => stat.count),
                borderColor: '#4f46e5',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                fill: true,
            },
        ],
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleSeeAllClick = () => {
        setShowAllCourses((prev) => !prev);
    };

    const displayedCourses = showAllCourses ? courses : courses.slice(0, 3);


    return (
        <div className="p-4 bg-[#f5f8ff] min-h-screen space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                <Card className="flex items-center justify-between p-4">
                    <div>
                        <h2 className="text-xl font-semibold">{completedCourses}+</h2>
                        <p className="text-sm text-muted-foreground">Completed Courses</p>
                    </div>
                    <Image src="/Background-11.png" alt="Icon" width={24} height={24} className="w-6 h-6" />
                </Card>

                <Card className="flex items-center justify-between p-4">
                    <div>
                        <h2 className="text-xl font-semibold">{inProgressCourses}+</h2>
                        <p className="text-sm text-muted-foreground">Course in Progress</p>
                    </div>
                    <Image src="/Background-12.png" alt="Icon" width={24} height={24} className="w-6 h-6" />
                </Card>
            </div>
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Students Enrolled Statistics</h3>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">Student</span>
                            <select
                                className="text-sm border rounded-md px-2 py-1"
                                value={period}
                                onChange={(e) => setPeriod(e.target.value)}
                            >
                                <option>Yearly</option>
                                <option>Monthly</option>
                            </select>
                        </div>
                    </div>
                    <div className="w-full h-64 bg-gradient-to-t from-blue-100 to-transparent rounded-md">
                        <Line data={chartData} />
                    </div>
                </CardContent>
            </Card>

            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Recently Added Course</h3>
                <Button variant="ghost" className="text-sm text-blue-600 hover:underline" onClick={handleSeeAllClick}>
                    {showAllCourses ? 'Show Less' : 'See All'}
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayedCourses.map((course) => (
                    <Card key={course._id} className="p-3">
                        <div className="relative">
                            <Image
                                src={`https://back.bishalpantha.com.np/${course.image}`}
                                alt={course.title}
                                width={500}
                                height={300}
                                className="rounded-md w-full h-40 object-cover"
                            />
                            <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs font-semibold rounded-full">
                                ${course.price}
                            </div>
                        </div>
                        <CardContent className="p-2">
                            <h4 className="font-semibold text-sm mb-1">{course.title}</h4>
                            <p className="text-xs text-muted-foreground mb-2">{course.description}</p>
                            <div className="text-xs text-muted-foreground flex flex-col space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="w-4 h-4">🗓️</span>
                                    {course.duration}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-4 h-4">📂</span>
                                    {course.category}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
