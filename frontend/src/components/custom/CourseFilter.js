'use client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { useState } from 'react'
import ReactStarRating from 'react-star-rating-component'

export default function CourseFilter() {
    const [priceRange, setPriceRange] = useState([10, 500]) 
    const [rating, setRating] = useState(3) 
    const [selectedCategories, setSelectedCategories] = useState({
        "software-development": false,
        "business-industries": false,
        "personal-development": false,
        "parenting": false,
        "sport": false,
        "learn-a-language": false
    }); 

    const clearFilters = () => {
        setPriceRange([10, 500]); 
        setRating(3);
        setSelectedCategories({
            "software-development": false,
            "business-industries": false,
            "personal-development": false,
            "parenting": false,
            "sport": false,
            "learn-a-language": false
        }); 
    };

    return (
        <section className="py-16 px-4 bg-white">
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="max-w-xs mx-auto lg:max-w-xl lg:mx-0"
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

                {/* Category Filter */}
                <div className="mb-6">
                    <h3 className="font-semibold mb-2">Category</h3>
                    <div className="space-y-2">
                        <label htmlFor="software-development" className="flex items-center space-x-2">
                            <Checkbox id="software-development" />
                            <span className="text-gray-700">Software & Development</span>
                        </label>
                        <label htmlFor="business-industries" className="flex items-center space-x-2">
                            <Checkbox id="business-industries" />
                            <span className="text-gray-700">Business Industries</span>
                        </label>
                        <label htmlFor="personal-development" className="flex items-center space-x-2">
                            <Checkbox id="personal-development" />
                            <span className="text-gray-700">Personal Development</span>
                        </label>
                        <label htmlFor="parenting" className="flex items-center space-x-2">
                            <Checkbox id="parenting" />
                            <span className="text-gray-700">Parenting</span>
                        </label>
                        <label htmlFor="sport" className="flex items-center space-x-2">
                            <Checkbox id="sport" />
                            <span className="text-gray-700">Sport</span>
                        </label>
                        <label htmlFor="learn-a-language" className="flex items-center space-x-2">
                            <Checkbox id="learn-a-language" />
                            <span className="text-gray-700">Learn a Language</span>
                        </label>
                        <Button className="w-full text-sm text-green-600 hover:underline">
                            Show all categories
                        </Button>
                    </div>
                </div>

                {/* Rating Filter (Star Rating) */}
                <div className="mb-6">
                    <h3 className="font-semibold mb-2">Rating</h3>
                    <ReactStarRating
                        name="rating"
                        value={rating} // Set the value of the rating
                        onStarClick={(nextValue) => setRating(nextValue)} // Handle click event to update rating
                        starCount={5} // Number of stars
                        starColor="orange" // Color of filled stars
                        emptyStarColor="gray" // Color of empty stars
                        size={24} // Size of each star
                    />
                </div>

                {/* Price Filter (Slider) */}
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

                {/* Language Filter (Native <select> for Language) */}
                <div className="mb-6">
                    <h3 className="font-semibold mb-2">Language</h3>
                    <select className="w-full p-2 bg-gray-200 text-left">
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                    </select>
                </div>

                {/* Level Filter */}
                <div className="mb-6">
                    <h3 className="font-semibold mb-2">Level</h3>
                    <div className="space-y-2">
                        <label htmlFor="pro" className="flex items-center space-x-2">
                            <Checkbox id="pro" />
                            <span className="text-gray-700">Pro</span>
                        </label>
                        <label htmlFor="expert" className="flex items-center space-x-2">
                            <Checkbox id="expert" />
                            <span className="text-gray-700">Expert</span>
                        </label>
                        <label htmlFor="intermediate" className="flex items-center space-x-2">
                            <Checkbox id="intermediate" />
                            <span className="text-gray-700">Intermediate</span>
                        </label>
                        <label htmlFor="beginner" className="flex items-center space-x-2">
                            <Checkbox id="beginner" />
                            <span className="text-gray-700">Beginner</span>
                        </label>
                    </div>
                </div>

                <Button className="w-full bg-green-500 text-white hover:bg-green-600">
                    Apply Filters
                </Button>
            </motion.div>
        </section>
    )
}
