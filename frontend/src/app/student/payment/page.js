'use client'
import React, { Suspense } from 'react';
import ContactForm from '@/components/custom/ContactForm';
import CourseBanner from '@/components/custom/CourseBanner';
import Footer from '@/components/custom/Footer/StudentFooter';
import StudentNavbar from '@/components/custom/navbar/StudentNavbar';
import Section from '@/components/custom/scetion';
import dynamic from 'next/dynamic';

const PaymentPlan = dynamic(() => import('@/components/custom/paymentPlan'), {
  ssr: false,
});

const Payment = () => {
  return (
    <>
      <StudentNavbar />
      <CourseBanner />
      <Section />
      <Suspense fallback={<div>Loading payment options...</div>}>
        <PaymentPlan />
      </Suspense>
      <ContactForm />
      <Footer />
    </>
  );
};

export default Payment;
