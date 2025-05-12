"use client"
import AttendancePage from '@/components/custom/AttendancePage';
import TeacherSidebar from '@/components/custom/navbar/TeacherSidebar';
import React, { Suspense } from 'react';

const Page = () => {
  return (
    <div className="flex">
      <TeacherSidebar />
      <main className="ml-60 w-full min-h-screen mt-18">
        <Suspense fallback={<div>Loading attendance page...</div>}>
          <AttendancePage />
        </Suspense>
      </main>
    </div>
  );
};

export default Page;
