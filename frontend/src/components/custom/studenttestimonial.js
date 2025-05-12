'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';
import axios from 'axios';

export const StudentTestimonial = ({id}) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get('https://back.bishalpantha.com.np/api/allTestimonials');
      const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).reverse();
      setTestimonials(sorted.slice(0, 4));
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
    const interval = setInterval(fetchTestimonials, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Loading testimonials...</div>;

  return (
    <section className="bg-[#F6FFEB] py-20 px-4">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-unbounded">
          IN THEIR OWN WORDS: <br /> STUDENT TESTIMONIALS
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {testimonials.map((t, index) => (
          <motion.div
            key={t._id || index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="w-[320px] h-[250px] bg-white shadow-md rounded-xl p-6">
              <div className="flex mb-4 text-yellow-500">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill={i < t.rating ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    className={i < t.rating ? 'text-yellow-500' : 'text-gray-300'}
                  />
                ))}
              </div>

              <p className="text-sm text-gray-700 mb-6 leading-relaxed">{t.review}</p>

              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={
                      t.profilePic
                        ? `https://back.bishalpantha.com.np${t.profilePic.replace(/\\/g, '/')}`
                        : '/default-avatar.png'
                    }
                    alt={t.name}
                  />
                  <AvatarFallback>{t.name?.[0]}</AvatarFallback>
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

      <div className="mt-10 flex justify-center overflow-x-auto">
        <span className="w-max h-[6px] bg-gray-300 rounded-full relative">
          <span className="absolute left-0 top-0 h-full w-[40%] bg-blue-500 rounded-full"></span>
        </span>
      </div>

    </section>
  );
};
