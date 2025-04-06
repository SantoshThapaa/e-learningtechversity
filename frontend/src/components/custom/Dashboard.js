'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChartBig, BookOpenCheck, CalendarDays, Star } from 'lucide-react';
import Image from 'next/image';

const Dashboard = () => {
    return (
        <div className="p-4 bg-[#f5f8ff] min-h-screen space-y-8">
            {/* Top Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                <Card className="flex items-center justify-between p-4">
                    <div>
                        <h2 className="text-xl font-semibold">155+</h2>
                        <p className="text-sm text-muted-foreground">Completed Courses</p>
                    </div>
                    <Image
                        src="/Background-11.png"
                        alt="Icon"
                        width={24}
                        height={24}
                        className="w-6 h-6"
                    />

                </Card>

                <Card className="flex items-center justify-between p-4">
                    <div>
                        <h2 className="text-xl font-semibold">25+</h2>
                        <p className="text-sm text-muted-foreground">Course in Progress</p>
                    </div>
                    <Image
                        src="/Background-12.png"
                        alt="Icon"
                        width={24}
                        height={24}
                        className="w-6 h-6"
                    />

                </Card>
            </div>

            {/* Chart Section */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Students Enrolled Statistics</h3>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">Student</span>
                            <select className="text-sm border rounded-md px-2 py-1">
                                <option>Yearly</option>
                                <option>Monthly</option>
                            </select>
                        </div>
                    </div>
                    <div className="w-full h-64 bg-gradient-to-t from-blue-100 to-transparent rounded-md flex items-end">
                        {/* Placeholder for Chart */}
                        <div className="text-center w-full text-sm text-muted-foreground pb-2">[Chart Here]</div>
                    </div>
                </CardContent>
            </Card>

            {/* Recently Added Courses */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Recently Added Course</h3>
                <Button variant="ghost" className="text-sm text-blue-600 hover:underline">See All</Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array(3).fill(0).map((_, i) => (
                    <Card key={i} className="p-3">
                        <div className="relative">
                            <Image
                                src="/c1.png"
                                alt="Course"
                                width={500}
                                height={300}
                                className="rounded-md w-full h-40 object-cover"
                            />
                            <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs font-semibold rounded-full">
                                $39
                            </div>
                        </div>
                        <CardContent className="p-2">
                            <Badge variant="outline" className="text-green-600 border-green-600 mb-2">
                                Social
                            </Badge>
                            <h4 className="font-semibold text-sm mb-1">
                                Increasing Engagement With Instagram & Facebook
                            </h4>
                            <div className="text-xs text-muted-foreground flex flex-col space-y-1">
                                <div className="flex items-center gap-2">
                                    <BookOpenCheck className="w-4 h-4" />
                                    5 Lessons
                                </div>
                                <div className="flex items-center gap-2">
                                    <CalendarDays className="w-4 h-4" />
                                    4 weeks
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    4.7
                                </div>
                                <div className="flex items-center gap-2">
                                    <CalendarDays className="w-4 h-4" />
                                    21 Seats Available
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