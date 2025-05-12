import AdminPage from '@/components/custom/AdminPage'
import AdminSidebar from '@/components/custom/navbar/AdminSidebar'

import React from 'react'

const page = () => {
  return (
    <div className="flex">
      <div className=''>
      <AdminSidebar />
      </div>
      <main className="w-full mt-10 p-6 min-h-screen ml-50">
        <AdminPage/>
      </main>
    </div>

  )
}

export default page