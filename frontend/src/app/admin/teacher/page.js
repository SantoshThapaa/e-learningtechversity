import AdminSidebar from '@/components/custom/navbar/AdminSidebar'
import TeacherPage from '@/components/custom/TeacherPage'
import React from 'react'

const page = () => {
  return (
    <div className="flex">
      <div className=''>
      <AdminSidebar />
      </div>
      <main className="w-full p-6 min-h-screen ml-50">
        <TeacherPage/>
      </main>
    </div>

  )
}

export default page