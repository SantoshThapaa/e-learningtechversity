import ContactForm from '@/components/custom/ContactForm'
import CourseBanner from '@/components/custom/CourseBanner'
import CourseIntro from '@/components/custom/CourseIntro'
import Footer from '@/components/custom/Footer/StudentFooter'
import StudentNavbar from '@/components/custom/navbar/StudentNavbar'
import PaymentPlan from '@/components/custom/Paymentplan'
import Section from '@/components/custom/scetion'
import React from 'react'

const Payment = () => {
  return (
    <>
    <StudentNavbar/>
    <CourseBanner/>
    <Section/>
    <PaymentPlan/>
    <ContactForm/>
    <Footer/>
    </>
  )
}
export default Payment;