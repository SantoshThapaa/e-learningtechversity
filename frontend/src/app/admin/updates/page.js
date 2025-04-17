
import AdminBlog from '@/components/custom/AdminBlog';
import AdminTestimonial from '@/components/custom/AdminTestimonial';
import React from 'react'

const Page = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="ml-60 w-full p-6 bg-gray-100 min-h-screen">
        <AdminTestimonial/>
        <AdminBlog/>
        
      </main>
    </div>
  )
}

export default Page;