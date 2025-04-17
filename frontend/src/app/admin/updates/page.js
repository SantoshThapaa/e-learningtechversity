import Blog from '@/components/custom/adminBlog'
import Testimonial from '@/components/custom/adminTestimonial'
import AdminSidebar from '@/components/custom/navbar/AdminSidebar'
import React from 'react'

const page = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="w-full p-6 bg-gray-100 min-h-screen">
        <Testimonial/>
        <Blog/>
      </main>
    </div>

  )
}

export default page