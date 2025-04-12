import ContactForm from '@/components/custom/ContactForm'
import CourseBanner from '@/components/custom/CourseBanner'
import CoursesPage from '@/components/custom/CoursesPage'
import Footer from '@/components/custom/Footer/StudentFooter'
import StudentNavbar from '@/components/custom/navbar/StudentNavbar'

import React from 'react'

const Course = () => {
  return (
    <>
    <StudentNavbar/>
    <CourseBanner/>
    <CoursesPage/>
    <ContactForm/>
    <Footer/>
    </>
  )
}
export default Course;