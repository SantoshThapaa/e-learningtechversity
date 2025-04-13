'use client'
import VerifyComponent from "@/components/custom/VerifyComponent";
import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyComponent/>
    </Suspense>
  )
}
