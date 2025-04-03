import React from 'react';
import Dashboard from './student/page';
import StudentNavbar from '@/components/custom/navbar/StudentNavbar';

const Page = () => {
  return (
    <>
      <StudentNavbar/>
     <Dashboard/>
    </>
  );
};

export default Page;
