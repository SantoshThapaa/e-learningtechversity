import AdminMentorSection from '@/components/custom/AdminMentorSection';
import AdminSidebar from '@/components/custom/navbar/AdminSidebar';
import React from 'react';

const Page = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="ml-50 mt-10 w-full p-6 bg-gray-100 min-h-screen">
        <div className='mt-10'>
          <AdminMentorSection/>
        </div>
      </main>
    </div>
  );
};

export default Page;
