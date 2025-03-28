'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const cards = [
    {
        id: 0,
        title: 'LEARN MERN STACK',
        text: (
            <>
                Seize the Opportunity to Transform Your Language Skills
                <br />
                and Expand Your Horizons.
            </>
        ),
        image: '/Background-5.png',
    },
    {
        id: 1,
        title: 'EXPAND YOUR HORIZONS',
        text: (
            <>
                Join a global community of learners
                <br />
                and start speaking confidently.
            </>
        ),
        image: '/Background-5.png',
    },
    {
        id: 2,
        title: 'LEARN WITH CONFIDENCE',
        text: (
            <>
                Our platform ensures you grow
                <br />
                with each lesson and interaction.
            </>
        ),
        image: '/Background-5.png',
    },
    ,
    {
        id: 3,
        title: 'LEARN WITH DEDICATION',
        text: (
            <>
                Our platform ensures you grow
                <br />
                with each lesson and dedication.
            </>
        ),
        image: '/Background-5.png',
    }
]


export default function FeaturesSection() {
    const [hoveredId, setHoveredId] = useState(null)

    return (
        <div className="flex w-full max-w-[1600px] h-[500px] gap-4 px-4 m-10">
            {cards.map((card) => {
                const isHovered = hoveredId === card.id
                const isDefault = hoveredId === null && card.id === 0

                return (
                    <motion.div
                        key={card.id}
                        onMouseEnter={() => setHoveredId(card.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        layout
                        transition={{ layout: { duration: 0.6, type: 'spring' } }}
                        className={`relative overflow-hidden rounded-3xl cursor-pointer shadow-lg transition-all duration-500 ${isHovered || isDefault ? 'flex-[3]' : 'flex-[1.1]'
                            }`}
                    >
                        <motion.img
                            src={card.image}
                            alt={`card-${card.id}`}
                            className="w-full h-full object-cover"
                            layout
                        />

                        <AnimatePresence>
                            {(isHovered || isDefault) && card.title && (
                                <motion.div
                                    key="content"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 30 }}
                                    transition={{ duration: 0.4 }}
                                    className="absolute bottom-6 left-6 right-6 text-white z-10"
                                >
                                    <div className=" p-6 backdrop-blur-sm flex items-center justify-between">
                                        {/* Left: Text Section */}
                                        <div className="bg-black/50 w-4/5 pr-4 p-8 rounded-xl">
                                            <h2 className="text-2xl font-bold mb-2 break-words">{card.title}</h2>
                                            <p className="text-sm break-words leading-relaxed">{card.text}</p>
                                        </div>

                                        {/* Right: Enroll Button */}
                                        <div className="w-1/5 flex justify-end">
                                            <a
                                                href="#"
                                                className="bg-green-400 text-black w-30 h-30 rounded-full flex items-center justify-center shadow-xl text-sm font-medium hover:scale-105 transition"
                                            >
                                                Enroll Now ↗
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>

                            )}
                        </AnimatePresence>

                        <motion.div
                            className="absolute inset-0 bg-black/10 z-0"
                            layoutId={`overlay-${card.id}`}
                        />
                    </motion.div>
                )
            })}
        </div>
    )
}
