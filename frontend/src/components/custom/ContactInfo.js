'use client'
import CourseCard from "@/components/custom/CourseCard"
import CourseFilter from "@/components/custom/CourseFilter"

const courses = [
    {
        title: 'Basic Fundamentals Of Interior & Graphics Design',
        price: 49,
        category: 'Arts & Design',
        lessons: 3,
        duration: 6,
        image: '/c1.png.png',
    },
    {
        title: 'Increasing Engagement With Instagram & Facebook',
        price: 39,
        category: 'Social',
        lessons: 5,
        duration: 4,
        image: '/course2.jpg',
    },
    {
        title: 'Introduction To Color Theory & Basic UI/UX',
        price: 29,
        category: 'Design',
        lessons: 4,
        duration: 8,
        image: '/course3.jpg',
    },
    {
        title: 'Financial Security Thinking And Principles Theory',
        price: 59,
        category: 'Technology',
        lessons: 7,
        duration: 10,
        image: '/course4.jpg',
    },
]

export default function CoursesPage() {
    return (
        <div className="py-20 px-2 bg-gray-100">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
                {/* Left: Filter Section */}
                <CourseFilter />

                {/* Right: Course Grid */}
                <div className="flex-1 w-full px-4 lg:px-6">
                    {/* Flex container with flex-wrap for responsive layout */}
                    <div className="flex flex-wrap gap-4 justify-start">
                        {courses.map((course, idx) => (
                            <div key={idx} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3">
                                <CourseCard course={course} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
