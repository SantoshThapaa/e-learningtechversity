'use client'

import { useEffect, useState } from 'react'
import CourseCard from '@/components/custom/CourseCard'
import CourseFilter from '@/components/custom/CourseFilter'
import axios from 'axios'

export default function CoursesPage() {
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])

  const [filters, setFilters] = useState({
    priceRange: [10, 500],
    rating: 3,
    selectedCategories: {
      'Web Development': false,
      'business-industries': false,
      'personal-development': false,
      'parenting': false,
      'sport': false,
      'learn-a-language': false
    }
  })

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/allcourses')
        setCourses(res.data.courses || [])
        setFilteredCourses(res.data.courses || [])
      } catch (err) {
        console.error('Error fetching courses:', err)
      }
    }

    fetchCourses()
  }, [])

  const applyFilters = () => {
    const { priceRange, rating, selectedCategories } = filters;

    const filtered = courses.filter(course => {
      const priceCondition = course.price >= priceRange[0] && course.price <= priceRange[1];

      // Log the course rating to see if it's a number and how it compares with the filter
      console.log("Course Rating:", course.rating);
      console.log("Applied Rating Filter:", rating);

      const ratingCondition = parseFloat(course.rating) >= rating;  // Ensure it’s a number

      // Log category and selected category for debugging
      console.log("Course Category:", course.category);
      console.log("Selected Categories:", selectedCategories);

      const categoryCondition = Object.keys(selectedCategories).some(
        category => selectedCategories[category] && course.category === category
      );

      console.log("Price Condition:", priceCondition);
      console.log("Rating Condition:", ratingCondition);
      console.log("Category Condition:", categoryCondition);

      return priceCondition && ratingCondition && categoryCondition;
    });

    console.log("Filtered Courses:", filtered);

    setFilteredCourses(filtered);
  }



  const handleFilterChange = updatedFilters => {
    setFilters(prev => {
      const newFilters = { ...prev, ...updatedFilters }
      applyFilters()
      return newFilters
    })
  }

  return (
    <div className="py-20 px-2 bg-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4">
        <CourseFilter onFilterChange={handleFilterChange} />
        <div className="w-full px-4 lg:px-4">
          {filteredCourses.length === 0 ? (
            <p>No courses match your filters</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, idx) => (
                <CourseCard key={idx} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
