'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Rating } from '@smastrom/react-rating'
import { motion } from 'framer-motion'
import '@smastrom/react-rating/style.css'

export default function CourseFilter({ onFilterChange }) {
  const [priceRange, setPriceRange] = useState([10, 500])
  const [rating, setRating] = useState(3)
  const [selectedCategories, setSelectedCategories] = useState({
    'web-development': false,
    'business-industries': false,
    'personal-development': false,
    'parenting': false,
    'sport': false,
    'learn-a-language': false
  })

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => {
      const updatedCategories = { ...prev, [category]: !prev[category] }
      onFilterChange({
        priceRange,
        rating,
        selectedCategories: updatedCategories
      })
      return updatedCategories
    })
  }

  const clearFilters = () => {
    setPriceRange([10, 500])
    setRating(3)
    setSelectedCategories({
      'web-development': false,
      'business-industries': false,
      'personal-development': false,
      'parenting': false,
      'sport': false,
      'learn-a-language': false
    })
    onFilterChange({
      priceRange: [10, 500],
      rating: 3,
      selectedCategories: {
        'web-development': false,
        'business-industries': false,
        'personal-development': false,
        'parenting': false,
        'sport': false,
        'learn-a-language': false
      }
    })
  }

  const applyFilters = () => {
    onFilterChange({
      priceRange,
      rating,
      selectedCategories
    })
  }

  return (
    <section className="py-16 px-4 bg-white">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto lg:max-w-4xl lg:mx-0"  // Increased the width of the filter card
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold mb-4">Filter By</h2>
          <Button
            variant="outline"
            className="text-sm text-gray-500 hover:text-black"
            onClick={clearFilters}
          >
            Clear Filter
          </Button>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Category</h3>
          <div className="space-y-2">
            {Object.entries(selectedCategories).map(([key, isChecked]) => (
              <label
                key={key}
                htmlFor={key}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <Checkbox
                  id={key}
                  checked={isChecked}
                  onChange={() => handleCategoryChange(key)}
                  className={`cursor-pointer ${isChecked ? 'text-green-500' : 'text-gray-500'}`}  // Green color when checked
                />
                <span className={`text-gray-700 capitalize ${isChecked ? 'text-green-600' : ''}`}>
                  {key.replace(/-/g, ' ')}
                </span>
              </label>
            ))}
            <Button className="w-full text-sm text-green-600 hover:underline">
              Show all categories
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Rating</h3>
          <Rating
            style={{ maxWidth: 150 }}
            value={rating}
            onChange={value => setRating(value)}
          />
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Price</h3>
          <Slider
            min={10}
            max={1000}
            step={10}
            value={priceRange}
            onValueChange={setPriceRange}
            aria-label="Price Range"
          />
          <div className="flex justify-between text-sm mt-2">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Language</h3>
          <select className="w-full p-2 bg-gray-200 text-left">
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Level</h3>
          {['Pro', 'Expert', 'Intermediate', 'Beginner'].map(level => (
            <label key={level} htmlFor={level} className="flex items-center space-x-2 cursor-pointer">
              <Checkbox id={level.toLowerCase()} />
              <span className="text-gray-700">{level}</span>
            </label>
          ))}
        </div>

        <Button
          className="w-full bg-green-500 text-white hover:bg-green-600"
          onClick={applyFilters}
        >
          Apply Filters
        </Button>
      </motion.div>
    </section>
  )
}
