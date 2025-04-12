'use client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PB5UvBTLGU4hBnY76iV1ZDcAAaTS4qKMvoI4GJ0o833RmRr7GDuKePTSLSkq88QyVcjo8UYkWzhQNM8nttrqEMQ00cT5rejSj');

const ElementsWrapper = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default ElementsWrapper;
