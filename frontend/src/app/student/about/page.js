import ContactForm from '@/components/custom/ContactForm'
import CourseBanner from '@/components/custom/CourseBanner'
import CourseIntro from '@/components/custom/CourseIntro'
import Footer from '@/components/custom/Footer/StudentFooter'
import Section from '@/components/custom/scetion'
import React from 'react'

const About = () => {
  return (
    <>
    <CourseBanner/>
    <Section/>
    <CourseIntro/>
    <ContactForm/>
    <Footer/>
    </>
  )
}
export default About;