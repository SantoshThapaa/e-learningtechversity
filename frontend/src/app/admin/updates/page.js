
import AdminBlog from '@/components/custom/adminBlog';
import AdminTestimonial from '@/components/custom/adminTestimonial';
import TeacherSidebar from '@/components/custom/navbar/TeacherSidebar';
import React from 'react'

const Page = () => {
  return (
    <div className="flex">
      <TeacherSidebar />
      <main className="ml-60 w-full p-6 bg-gray-100 min-h-screen">
        <AdminBlog/>
        <AdminTestimonial/>
      </main>
    </div>
  )
}

export default Page;