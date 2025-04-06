import DashboardLayout from '@/components/custom/DashboardLayout'
import AdminSidebar from '@/components/custom/navbar/AdminSidebar'
import React from 'react'

const page = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="ml-60 w-full p-6 bg-gray-100 min-h-screen">
        <DashboardLayout />
      </main>
    </div>

  )
}

export default page