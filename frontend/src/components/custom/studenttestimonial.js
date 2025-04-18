'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import axios from 'axios';

export const StudentTestimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/allTestimonials');
        setTestimonials(res.data);
      } catch (error) {
        setError('Error fetching testimonials.');
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can improve this with a spinner or skeleton loader
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="bg-[#F6FFEB] py-20 px-4">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-unbounded">
          IN THEIR OWN WORDS: <br />
          STUDENT TESTIMONIALS
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {testimonials.map((t, index) => (
          <motion.div
            key={t._id || t.name || index} // Fallback to `index` if both _id and name are unavailable
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }} // Adjusting the delay based on the index
            viewport={{ once: true }}
          >
            <Card className="w-[320px] h-full text-left bg-white shadow-md rounded-xl p-6">
              <div className="flex mb-4 text-blue-600">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
              </div>

              <p className="text-sm text-gray-700 mb-6 leading-relaxed">
                {t.feedback}
              </p>

              <div className="flex items-center gap-3">
                <Avatar>
                  {/* Fallback for Avatar Image */}
                  <AvatarImage
                    src={t.image || '/default-avatar.png'} // Default image if no image is available
                    alt={t.name}
                  />
                  <AvatarFallback>{t.name.split(' ')[0][0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-base font-semibold text-black">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <span className="w-20 h-[6px] bg-gray-300 rounded-full relative">
          <span className="absolute left-0 top-0 h-full w-[40%] bg-blue-500 rounded-full"></span>
        </span>
      </div>
    </section>
  );
};
