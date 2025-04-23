
import Blog from '@/components/custom/Blog';
import CourseBanner from '@/components/custom/CourseBanner';
import Footer from '@/components/custom/Footer/StudentFooter';
import StudentNavbar from '@/components/custom/navbar/StudentNavbar';
import WhyTechyversitySection from '@/components/custom/WhyTechyversitySection';
import React from 'react'

const page = () => {
  return (
    <>
    <CourseBanner/>
    <StudentNavbar/>
    <WhyTechyversitySection/>
    <Blog/>
    <Footer/>
    
    </>
  )
}

export default page;