'use client';

import ContactForm from '@/components/custom/ContactForm';
import CourseBanner from '@/components/custom/CourseBanner';
import Footer from '@/components/custom/Footer/StudentFooter';
import StudentNavbar from '@/components/custom/navbar/StudentNavbar';
import Paymentplan from '@/components/custom/paymentPlann';
import Section from '@/components/custom/scetion';
import React from 'react';

const PaymentClient = () => {
  return (
    <>
      <StudentNavbar />
      <CourseBanner />
      <Section />
      <Paymentplan />
      <ContactForm />
      <Footer />
    </>
  );
};

export default PaymentClient;
