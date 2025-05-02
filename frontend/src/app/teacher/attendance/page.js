"use client"
import AttendancePage from '@/components/custom/AttendancePage';
import TeacherSidebar from '@/components/custom/navbar/TeacherSidebar';

import React from 'react'

const Page = () => {
  return (
    <div className="flex">
      <TeacherSidebar />
      <main className="ml-60 w-full min-h-screen mt-18">
        <AttendancePage/>
      </main>
    </div>
  )
}

export default Page;