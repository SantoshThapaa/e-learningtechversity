'use client'

import { useEffect, useState } from 'react'
import CourseCard from '@/components/custom/CourseCard'
import CourseFilter from '@/components/custom/CourseFilter'
import axios from 'axios'

export default function CoursesPage() {
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [availableCategories, setAvailableCategories] = useState([])
  const [filters, setFilters] = useState({
    priceRange: [10, 500],
    rating: 3,
    selectedCategories: {}
  })

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('https://back.bishalpantha.com.np/api/allcourses')
        const allCourses = res.data.courses || []
        setCourses(allCourses)
        setFilteredCourses(allCourses)
        const categories = [
          ...new Set(allCourses.map(course => course.category))
        ]
        const categoryState = {}
        categories.forEach(cat => (categoryState[cat] = false))

        setAvailableCategories(categories)
        setFilters(prev => ({ ...prev, selectedCategories: categoryState }))
      } catch (err) {
        console.error('Error fetching courses:', err)
      }
    }

    fetchCourses()
  }, [])

  const applyFilters = () => {
    const { priceRange, selectedCategories } = filters;
    const filtered = courses.filter(course => {
      const priceCondition = course.price >= priceRange[0] && course.price <= priceRange[1];
      const categoryCondition = Object.keys(selectedCategories).some(
        category => selectedCategories[category] && course.category === category
      );
      return priceCondition && categoryCondition;
    });
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
    <div className="py-20 px-10 lg:px-20 bg-gray-100">
      <div className="max-w-8xl mx-auto flex flex-col lg:flex-row gap-4 ">
        <CourseFilter onFilterChange={handleFilterChange} categories={availableCategories} selectedCategories={filters.selectedCategories} />
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
