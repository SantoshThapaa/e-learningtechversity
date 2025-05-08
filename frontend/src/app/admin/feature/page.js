import AdminFeatureSection from '@/components/custom/AdminFeatureSection'
import AdminSidebar from '@/components/custom/navbar/AdminSidebar'
import React from 'react'

const page = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="ml-50 mt-10 w-full p-6 bg-gray-100 min-h-screen">
        <AdminFeatureSection/>
      </main>
    </div>

  )
}

export default page