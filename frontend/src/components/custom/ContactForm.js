'use client'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function ContactForm() {
  return (
    <section className="bg-[#f5f5f5] py-16 px-4 border-t border-gray-300">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          HAVE ANY QUESTION?
        </motion.h2>
        <p className="text-gray-600 mb-10">
          Your email address will not be published. Required fields are marked *
        </p>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input placeholder="Full name *" className="border-0 border-b border-black rounded-none" />
            <Input placeholder="Email address *" className="border-0 border-b border-black rounded-none" />
          </div>
          <Textarea placeholder="Write your message *" className="border-0 border-b border-black rounded-none" />

          <div className="text-center pt-4">
            <Button className="bg-[#00C853] text-white px-6 py-2 rounded hover:opacity-90">
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
