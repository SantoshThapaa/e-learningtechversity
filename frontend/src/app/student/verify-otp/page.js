'use client';
import { Suspense } from 'react';
import VerifyOtpPage from "@/components/custom/VerifyComponent";

export default function StudentProfilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpPage />
    </Suspense>
  );
}
