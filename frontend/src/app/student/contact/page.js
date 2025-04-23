import ContactForm from '@/components/custom/ContactForm'
import ContactUs from '@/components/custom/contactus'
import CourseBanner from '@/components/custom/CourseBanner'
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