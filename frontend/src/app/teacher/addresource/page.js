
import AddResource from '@/components/custom/AddResource';
import TeacherSidebar from '@/components/custom/navbar/TeacherSidebar';
import React from 'react'

const Page = () => {
  return (
    <div className="flex">
          <TeacherSidebar />
          <main className="ml-60 w-full p-6 bg-gray-100 min-h-screen">
            <AddResource/>
          </main>
        </div>
  )
}

export default Page;