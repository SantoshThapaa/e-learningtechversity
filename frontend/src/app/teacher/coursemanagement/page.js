
import ButtonPage from '@/components/custom/ButtonPage';
import TeacherSidebar from '@/components/custom/navbar/TeacherSidebar';
import React from 'react'

const Page = () => {
  return (
    <div className="flex">
          <TeacherSidebar />
          <main className="ml-60 w-full bg-gray-100 min-h-screen">
            <ButtonPage/>
          </main>
        </div>
  )
}

export default Page;