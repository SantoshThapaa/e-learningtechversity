import AdminBlog from '@/components/custom/AdminBlog';
import AdminTestimonial from '@/components/custom/AdminTestimonial';
import AdminSidebar from '@/components/custom/navbar/AdminSidebar';
import React from 'react';

const Page = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="ml-60 mt-10 w-full p-6 bg-gray-100 min-h-screen">
        <div className="mt-12"> 
          <AdminTestimonial />
        </div>
      </main>
    </div>
  );
};

export default Page;
