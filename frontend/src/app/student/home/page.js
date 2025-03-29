import AboutSection from '@/components/custom/about'
import Contact from '@/components/custom/contact'
import FeaturesSection from '@/components/custom/featureSection'
import Footer from '@/components/custom/Footer/StudentFooter'
import HeroBanner from '@/components/custom/Hero'
import LogoContent from '@/components/custom/logoContent'
import { StudentTestimonial } from '@/components/custom/studenttestimonial'
import TeamSection from '@/components/custom/teamSection'
import { Testimonial } from '@/components/custom/testimonial'
import WhyTechyversitySection from '@/components/custom/WhyTechyversitySection'
import React from 'react'

const Home = () => {
  return (
    <>
    <HeroBanner/>
    <AboutSection/>
    <LogoContent/>
    <FeaturesSection/>
    <WhyTechyversitySection/>
    <Testimonial/>
    <TeamSection/>
    <StudentTestimonial/>
    <Contact/>
    <Footer/>
    
    </>
  )
}

export default Home;