'use client';

import dynamic from 'next/dynamic';

const PaymentClient = dynamic(() => import('@/components/custom/PaymentClient'), {
  ssr: false,
});

export default function Page() {
  return <PaymentClient />;
}
