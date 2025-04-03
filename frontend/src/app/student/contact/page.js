import ContactForm from '@/components/custom/ContactForm'
import ContactInfo from '@/components/custom/ContactInfo'
import ContactUs from '@/components/custom/contactus'
import CourseBanner from '@/components/custom/CourseBanner'
import CourseIntro from '@/components/custom/CourseIntro'
import Footer from '@/components/custom/Footer/StudentFooter'
import StudentNavbar from '@/components/custom/navbar/StudentNavbar'
import React from 'react'

const Contact = () => {
  return (
    <>
    <StudentNavbar/>
    <CourseBanner/>
    <ContactUs/>
    <ContactForm/>
    <Footer/>
    </>
  )
}
export default Contact;