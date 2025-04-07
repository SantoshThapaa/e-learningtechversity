import AdminSidebar from '@/components/custom/navbar/AdminSidebar'
import TeacherPage from '@/components/custom/TeacherPage'
import React from 'react'

const page = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="w-full p-6 bg-gray-100 min-h-screen">
        <TeacherPage/>
      </main>
    </div>

  )
}

export default page