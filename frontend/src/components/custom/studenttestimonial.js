'use client'
import Image from 'next/image';
import { motion } from 'framer-motion'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'

export const StudentTestimonial = () => {
  const testimonials = [
    {
      name: 'Caryn Zoeller',
      role: 'Ex-Student',
      feedback:
        'Techyversity made learning so easy! The hands-on projects helped me land my first tech job.',
      image: '/user1.jpg.png',
    },
    {
      name: 'Jill Brooks',
      role: 'Ex-Student',
      feedback:
        'The courses are structured perfectly, and the instructors are amazing. I upskilled and got promoted!',
      image: '/user2.jpg.png',
    },
    {
      name: 'Fredric Kilgore',
      role: 'Ex-Student',
      feedback:
        'I love the flexibility! I can learn at my own pace while balancing work and studies.',
      image: '/user3.jpg.png',
    },
    {
        name: 'Fredric Kilgore',
        role: 'Ex-Student',
        feedback:
          'I love the flexibility! I can learn at my own pace while balancing work and studies.',
        image: '/user3.jpg.png',
      },
  ]

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
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="w-[320px] h-full text-left bg-white shadow-md rounded-xl p-6">
              {/* Stars */}
              <div className="flex mb-4 text-blue-600">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
              </div>

              {/* Feedback */}
              <p className="text-sm text-gray-700 mb-6 leading-relaxed">
                {t.feedback}
              </p>

              {/* Avatar */}
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={t.image} />
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

      {/* Pagination Indicator */}
      <div className="mt-10 flex justify-center">
        <span className="w-20 h-[6px] bg-gray-300 rounded-full relative">
          <span className="absolute left-0 top-0 h-full w-[40%] bg-blue-500 rounded-full"></span>
        </span>
      </div>
    </section>
  )
}
