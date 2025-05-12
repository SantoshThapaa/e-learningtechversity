import AboutSection from '@/components/custom/about'
import Contact from '@/components/custom/contact'
import FeaturesSection from '@/components/custom/featureSection'
import Footer from '@/components/custom/Footer/StudentFooter'
import HeroBanner from '@/components/custom/Hero'
import LogoContent from '@/components/custom/logoContent'
import StudentNavbar from '@/components/custom/navbar/StudentNavbar'
import { StudentTestimonial } from '@/components/custom/studenttestimonial'
import TeamSection from '@/components/custom/teamSection'
import { Testimonial } from '@/components/custom/testimonial'
import WhyTechyversitySection from '@/components/custom/WhyTechyversitySection'
import React from 'react'

const Home = () => {
  return (
    <>
    <StudentNavbar/>
    <HeroBanner/>
    <AboutSection/>
    <Testimonial />
    <LogoContent id="logo"/>
    <FeaturesSection/>
    <WhyTechyversitySection/>
    <TeamSection/>
    <StudentTestimonial id="testimonials" />
    <Contact/>
    <Footer/>
    
    </>
  )
}

export default Home;