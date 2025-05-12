'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

export default function FeaturesSection() {
  const [hoveredId, setHoveredId] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchFeatureCards = async () => {
      try {
        const response = await axios.get('https://back.bishalpantha.com.np/api/feature-cards'); 
        setCards(response.data.featureCards); 
      } catch (error) {
        console.error('Error fetching feature cards:', error);
      }
    };

    fetchFeatureCards();
  }, []); 

  return (
    <div className="flex w-full max-w-[1600px] h-[500px] gap-4 px-4 m-10">
      {cards.map((card) => {
        const isHovered = hoveredId === card.id;
        const isDefault = hoveredId === null && card.id === 0;

        return (
          <motion.div
            key={card._id}  
            onMouseEnter={() => setHoveredId(card.id)}
            onMouseLeave={() => setHoveredId(null)}
            layout
            transition={{ layout: { duration: 0.6, type: 'spring' } }}
            className={`relative overflow-hidden rounded-3xl cursor-pointer shadow-lg transition-all duration-500 ${isHovered || isDefault ? 'flex-[3]' : 'flex-[1.1]'}`}
          >
            <motion.img
              src={`https://back.bishalpantha.com.np/${card.image}`}  
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
                  <div className="p-6 backdrop-blur-sm flex items-center justify-between">
                    {/* Left: Text Section */}
                    <div className="bg-black/50 w-4/5 pr-4 p-8 rounded-xl">
                      <h2 className="text-2xl font-bold mb-2 break-words">{card.title}</h2>
                      <p className="text-sm break-words leading-relaxed">{card.text}</p>
                    </div>

                    {/* Right: Enroll Button */}
                    <div className="w-1/5 flex justify-end">
                      <a
                        href="/student/enrollnow"
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
        );
      })}
    </div>
  );
}
