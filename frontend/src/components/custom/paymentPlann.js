'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button'
import { useStripe, useElements, CardElement, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import Detailed from './Detailed'
import { getCourseIdFromLocalStorage, getUserIdFromToken } from '@/utils/authUtils';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Paymentplan() {
    const [isFullPay, setIsFullPay] = useState(true);
    const [course, setCourse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [localCourseId, setLocalCourseId] = useState(null);

    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();
    const postalRef = useRef();

    // Step 1: Get courseId from localStorage safely on client
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const id = getCourseIdFromLocalStorage();
            if (id) {
                setLocalCourseId(id);
            } else {
                console.error("Course ID not found in localStorage.");
            }
        }
    }, []);

    // Step 2: Fetch course and check access once localCourseId is ready
    useEffect(() => {
        if (!localCourseId) return;

        const fetchCourse = async () => {
            try {
                const res = await fetch(`https://back.bishalpantha.com.np/api/course/${localCourseId}`);
                const data = await res.json();
                setCourse(data.course);
                setIsLoading(false);

                const userId = getUserIdFromToken();
                const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

                const accessRes = await fetch('https://back.bishalpantha.com.np/api/check-access', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token ? `Bearer ${token}` : '',
                    },
                    body: JSON.stringify({ userId, courseId: localCourseId }),
                });

                const accessData = await accessRes.json();
                if (accessRes.status === 200 && accessData.message === 'Access granted') {
                    toast.info('You already purchased this course. Redirecting...');
                    setTimeout(() => {
                        router.push(`/student/coursepage/${localCourseId}`);
                    }, 1500);
                }
            } catch (err) {
                console.error('Error fetching course:', err);
                setIsLoading(false);
            }
        };

        fetchCourse();
    }, [localCourseId, router]);

    // Step 3: Handle Payment
    const handlePayment = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardNumberElement),
        });

        if (error) {
            console.error(error);
            alert(error.message);
            return;
        }

        const userId = getUserIdFromToken();
        if (!userId) {
            alert('User not logged in');
            return;
        }

        if (!course?.price) {
            alert('Course price not available.');
            return;
        }

        setIsProcessing(true);

        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

        const response = await fetch('https://back.bishalpantha.com.np/api/createpayments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token ? `Bearer ${token}` : '',
            },
            body: JSON.stringify({
                paymentMethodToken: paymentMethod.id,
                userId,
                courseId: course?._id,
                paymentPlan: isFullPay ? 'Full Pay' : 'EMI',
                amount: course.price,
            }),
        });

        const data = await response.json();
        setIsProcessing(false);

        if (data.message === 'Payment successful') {
            toast.success('Payment Successful');
            elements.getElement(CardNumberElement)?.clear();
            elements.getElement(CardExpiryElement)?.clear();
            elements.getElement(CardCvcElement)?.clear();
            if (postalRef.current) postalRef.current.value = '';
            setTimeout(() => {
                router.push(`/student/coursepage/${course._id}`);
            }, 100);
        } else if (data.message === 'Further action required') {
            toast.warn('Additional authentication needed');
        } else {
            toast.error('Payment Failed');
        }
    };
    return (
        <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">

                <div className="w-full lg:w-[40%] shadow-lg rounded-xl p-6 bg-white">
                    <div className='text-center'>
                        <h2 className="text-xl font-semibold">Payment Plan</h2>
                        <p className="mb-4 text-gray-600">Which one works for you..</p>
                    </div>
                    <div className="flex mb-6 overflow-hidden rounded-md border border-gray-200">
                        <Button
                            onClick={() => setIsFullPay(true)}
                            className={`rounded-none w-1/2 ${isFullPay ? 'bg-[#00C853] text-black' : 'bg-white text-black'} hover:bg-white hover:text-black`}
                        >
                            Full Pay
                        </Button>
                        <Button
                            onClick={() => setIsFullPay(false)}
                            className={`rounded-none w-1/2 ${!isFullPay ? 'bg-[#00C853] text-white' : 'bg-white text-black'} hover:bg-white hover:text-black`}
                        >
                            EMI
                        </Button>
                    </div>
                    {isFullPay ? (
                        <div className="text-center">
                            <div className="mb-6">
                                <div className="border p-4 rounded-md">
                                    <div className="flex">
                                        <div className="border border-[#2ECA7F] w-[30%] items-left pl-4 pt-2">
                                            <div className="flex items-center gap-2">
                                                <Image
                                                    src="/Vector.png"
                                                    alt="Stripe Logo"
                                                    width={24}
                                                    height={24}
                                                    className="w-6 h-6"
                                                />
                                                <p className="text-sm mb-2 text-[#2ECA7F] text-left">Stripe</p>
                                            </div>
                                        </div>
                                        <div className='text-lg font-semibold w-[40%] text-right right-0 justify-end'>
                                            {isLoading ? 'Loading...' : `$ ${course?.price ?? N / A}`}
                                        </div>
                                    </div>

                                    <p className="text-sm text-left text-gray-600 mt-4">Card Number</p>
                                    <div className="flex items-center mb-4 relative w-full">
                                        <CardNumberElement
                                            options={{
                                                style: {
                                                    base: {
                                                        fontSize: '16px',
                                                        color: '#424770',
                                                        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                                                        '::placeholder': { color: '#aab7c4' }
                                                    },
                                                    invalid: {
                                                        color: '#9e2146'
                                                    }
                                                }
                                            }}
                                            className="w-full p-2 border rounded-md"
                                        />
                                        <Image
                                            src="/banks.png"
                                            alt="Card Icons"
                                            className="absolute right-0 top-1/2 transform -translate-y-1/2 w-15 h-4 pr-1"
                                            width={60}
                                            height={16}
                                            layout="intrinsic"
                                        />
                                    </div>

                                    <div className="flex gap-4 mb-4">
                                        <div className="w-full">
                                            <p className="text-sm text-left text-gray-600">MM / YY</p>
                                            <CardExpiryElement
                                                options={{
                                                    style: {
                                                        base: {
                                                            fontSize: '16px',
                                                            color: '#424770',
                                                            '::placeholder': { color: '#aab7c4' }
                                                        }
                                                    }
                                                }}
                                                className="w-full p-2 border rounded-md"
                                            />
                                        </div>

                                        <div className="w-full">
                                            <p className="text-sm text-left text-gray-600">CVC</p>
                                            <CardCvcElement
                                                options={{
                                                    style: {
                                                        base: {
                                                            fontSize: '16px',
                                                            color: '#424770',
                                                            '::placeholder': { color: '#aab7c4' }
                                                        }
                                                    }
                                                }}
                                                className="w-full p-2 border rounded-md"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-4 mb-4">
                                        <select className="w-full p-2 border rounded-md">
                                            <option>United States</option>
                                            <option>Canada</option>
                                            <option>Australia</option>
                                        </select>
                                        <input
                                            ref={postalRef}
                                            type="text"
                                            placeholder="Postal code"
                                            className="w-full p-2 border rounded-md"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                onClick={handlePayment}
                                className="w-full bg-blue-500 text-white py-2 rounded-lg"
                                disabled={isProcessing}
                            >
                                {isProcessing ? 'Processing...' : 'Pay'}
                            </button>
                        </div>
                    ) : (
                        <div className="text-center">
                            <div className="mb-6">
                                <div className="border p-4 rounded-md">
                                    <div className="flex">
                                        <div className="border border-[#2ECA7F] w-[30%] items-left pl-4 pt-2">
                                            <div className="flex items-center gap-2">
                                                <Image
                                                    src="/Vector.png"
                                                    alt="Stripe Logo"
                                                    width={24}
                                                    height={24}
                                                    className="w-6 h-6"
                                                />
                                                <p className="text-sm mb-2 text-[#2ECA7F] text-left">Stripe</p>
                                            </div>
                                        </div>
                                        <div className='w-[40%] text-right right-0 justify-end'>
                                            <h1 className="text-lg font-semibold ml-2">
                                                {course ? `$${Math.round(course.price / 4)}` : 'Loading...'}
                                            </h1>
                                            <p className="text-sm text-gray-600">For 4 months</p>
                                        </div>
                                    </div>

                                    <p className="text-sm text-left text-gray-600 mt-4">Card Number</p>
                                    <div className="flex items-center mb-4 relative w-full">
                                        <CardNumberElement
                                            options={{
                                                style: {
                                                    base: {
                                                        fontSize: '16px',
                                                        color: '#424770',
                                                        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                                                        '::placeholder': { color: '#aab7c4' }
                                                    },
                                                    invalid: {
                                                        color: '#9e2146'
                                                    }
                                                }
                                            }}
                                            className="w-full p-2 border rounded-md"
                                        />
                                        <Image
                                            src="/banks.png"
                                            alt="Card Icons"
                                            className="absolute right-0 top-1/2 transform -translate-y-1/2 w-15 h-4 pr-1"
                                            width={60}
                                            height={16}
                                            layout="intrinsic"
                                        />
                                    </div>

                                    <div className="flex gap-4 mb-4">
                                        <div className="w-full">
                                            <p className="text-sm text-left text-gray-600">MM / YY</p>
                                            <CardExpiryElement
                                                options={{
                                                    style: {
                                                        base: {
                                                            fontSize: '16px',
                                                            color: '#424770',
                                                            '::placeholder': { color: '#aab7c4' }
                                                        }
                                                    }
                                                }}
                                                className="w-full p-2 border rounded-md"
                                            />
                                        </div>

                                        <div className="w-full">
                                            <p className="text-sm text-left text-gray-600">CVC</p>
                                            <CardCvcElement
                                                options={{
                                                    style: {
                                                        base: {
                                                            fontSize: '16px',
                                                            color: '#424770',
                                                            '::placeholder': { color: '#aab7c4' }
                                                        }
                                                    }
                                                }}
                                                className="w-full p-2 border rounded-md"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-4 mb-4">
                                        <select className="w-full p-2 border rounded-md">
                                            <option>United States</option>
                                            <option>Canada</option>
                                            <option>Australia</option>
                                        </select>
                                        <input
                                            ref={postalRef}
                                            type="text"
                                            placeholder="Postal code"
                                            className="w-full p-2 border rounded-md"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                onClick={handlePayment}
                                className="w-full bg-blue-500 text-white py-2 rounded-lg"
                                disabled={isProcessing}
                            >
                                {isProcessing ? 'Processing...' : 'Pay'}
                            </button>
                        </div>
                    )}
                </div>
                <Detailed />
            </div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        </section>
    )
}
