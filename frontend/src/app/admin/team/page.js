import AdminTeamSection from '@/components/custom/AdminTeamSection'
import AdminSidebar from '@/components/custom/navbar/AdminSidebar'
import React from 'react'

const page = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="ml-60 mt-10 w-full p-6 bg-gray-100 min-h-screen">
        <AdminTeamSection/>
      </main>
    </div>

  )
}

export default page