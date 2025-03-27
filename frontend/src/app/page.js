import AboutSection from '@/components/custom/about'
import Contact from '@/components/custom/contact'
import Footer from '@/components/custom/Footer/StudentFooter'
import HeroBanner from '@/components/custom/Hero'
import LogoContent from '@/components/custom/logoContent'
import TeamSection from '@/components/custom/teamSection'
import { Testimonial } from '@/components/custom/testimonial'
import React from 'react'

const StudentDashboard = () => {
  return (
    <>
    <HeroBanner/>
    <AboutSection/>
    <LogoContent/>
    <Testimonial/>
    <TeamSection/>
    <Contact/>
    <Footer/>
    
    </>
  )
}

export default StudentDashboard