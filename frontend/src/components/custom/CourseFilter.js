'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { motion } from 'framer-motion'

export default function CourseFilter({ onFilterChange, categories, selectedCategories }) {
  const [priceRange, setPriceRange] = useState([10, 500])
  const [localCategories, setLocalCategories] = useState(selectedCategories)

  useEffect(() => {
    setLocalCategories(selectedCategories)
  }, [selectedCategories])

  const handleCategoryChange = (category) => {
    const updated = { ...localCategories, [category]: !localCategories[category] }
    setLocalCategories(updated)
    onFilterChange({ priceRange, selectedCategories: updated })
  }

  const clearFilters = () => {
    const cleared = Object.fromEntries(Object.keys(localCategories).map(key => [key, false]))
    setPriceRange([10, 500])
    setLocalCategories(cleared)
    onFilterChange({
      priceRange: [10, 500],
      selectedCategories: cleared
    })
  }

  const applyFilters = () => {
    onFilterChange({
      priceRange: priceRange,
      selectedCategories: localCategories
    })
  }

  return (
    <section className="py-10 px-4 bg-white w-full max-w-sm">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto lg:max-w-4xl lg:mx-0" 
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
            {categories.map(cat => (
              <label key={cat} className="flex items-center space-x-2 cursor-pointer">
                <Checkbox
                  checked={localCategories[cat]}
                  onCheckedChange={() => handleCategoryChange(cat)}
                />
                <span className="capitalize">{cat.replace(/-/g, ' ')}</span>
              </label>
            ))}
          </div>
        </div>

        {/* <div className="mb-6">
          <h3 className="font-semibold mb-2">Rating</h3>
          <Rating
            style={{ maxWidth: 150 }}
            value={rating}
            onChange={value => setRating(value)}
          />
        </div> */}

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Price</h3>
          <Slider
            min={10}
            max={1000}
            step={10}
            value={priceRange}
            onValueChange={(value) => {
              setPriceRange(value);
              onFilterChange({ priceRange: value, selectedCategories: localCategories });
            }}
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
