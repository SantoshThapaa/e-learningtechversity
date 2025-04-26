"use client"
import TeacherSidebar from '@/components/custom/navbar/TeacherSidebar';
import TeacherDashboard from '@/components/custom/TeacherDashboard';
import React from 'react'

const Page = () => {
  return (
    <div className="flex">
      <TeacherSidebar />
      <main className="ml-60 w-full min-h-screen mt-18">
        <TeacherDashboard />
      </main>
    </div>
  )
}

export default Page;