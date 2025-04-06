
import CommunicationPage from '@/components/custom/CommunicationPage'
import AdminSidebar from '@/components/custom/navbar/AdminSidebar'
import React from 'react'

const page = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="ml-60 w-full p-6 bg-gray-100 min-h-screen">
        <CommunicationPage/>
      </main>
    </div>

  )
}

export default page