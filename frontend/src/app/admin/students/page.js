import AdminSidebar from '@/components/custom/navbar/AdminSidebar'
import StudentTable from '@/components/custom/StudentTable'
import React from 'react'

const page = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="ml-60 w-full p-6 bg-gray-100 min-h-screen">
        <StudentTable/>
      </main>
    </div>

  )
}

export default page