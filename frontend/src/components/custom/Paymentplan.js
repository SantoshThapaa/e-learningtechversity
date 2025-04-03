'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Details from './Details'

export default function PaymentPlan() {
    const [isFullPay, setIsFullPay] = useState(true)

    return (
        <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">

                <div className="w-full lg:w-[40%] shadow-lg rounded-xl p-6 bg-white">

                    <div className="flex mb-6 overflow-hidden rounded-md border border-gray-200">
                        <Button
                            onClick={() => setIsFullPay(true)}
                            className={`rounded-none w-1/2 ${isFullPay ? 'bg-[#00C853] text-white' : 'bg-white text-black'}`}
                        >
                            Full Pay
                        </Button>
                        <Button
                            onClick={() => setIsFullPay(false)}
                            className={`rounded-none w-1/2 ${!isFullPay ? 'bg-[#00C853] text-white' : 'bg-white text-black'}`}
                        >
                            EMI
                        </Button>
                    </div>


                    {isFullPay ? (
                        <div className="text-center">
                            <h2 className="text-xl font-semibold">Payment Plan</h2>
                            <p className="mb-4 text-gray-600">Which one works for you..</p>
                            <div className="flex justify-center items-center mb-6">
                                <div className="flex flex-col items-center">
                                    <p className="text-lg font-semibold">$4,000</p>
                                    <p className="text-sm text-gray-600">Full Pay</p>
                                </div>
                            </div>


                            <div className="mb-6">
                                <div className="border p-4 rounded-md">
                                    <p className="text-sm mb-2 text-gray-600">Stripe</p>
                                    <input
                                        type="text"
                                        placeholder="Card number"
                                        className="w-full p-2 border mb-2 rounded-md"
                                    />
                                    <div className="flex gap-4 mb-2">
                                        <input
                                            type="text"
                                            placeholder="MM / YY"
                                            className="w-full p-2 border rounded-md"
                                        />
                                        <input
                                            type="text"
                                            placeholder="CVC"
                                            className="w-full p-2 border rounded-md"
                                        />
                                    </div>
                                    <div className="flex gap-4 mb-2">
                                        <select className="w-full p-2 border rounded-md">
                                            <option>United States</option>
                                            <option>Canada</option>
                                            <option>Australia</option>
                                        </select>
                                        <input
                                            type="text"
                                            placeholder="Postal code"
                                            className="w-full p-2 border rounded-md"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Pay Button */}
                            <Button className="w-full bg-blue-500 text-white py-2 rounded-lg">
                                Pay
                            </Button>
                        </div>
                    ) : (
                        <div className="text-center">
                            <h2 className="text-xl font-semibold">Payment Plan</h2>
                            <p className="mb-4 text-gray-600">Which one works for you..</p>
                            <div className="flex justify-center items-center mb-6">
                                <div className="flex flex-col items-center">
                                    <p className="text-lg font-semibold">$1,000 / Month</p>
                                    <p className="text-sm text-gray-600">For 4 months</p>
                                </div>
                            </div>

                            {/* Stripe Payment Form */}
                            <div className="mb-6">
                                <div className="border p-4 rounded-md">
                                    <p className="text-sm mb-2 text-gray-600">Stripe</p>
                                    <input
                                        type="text"
                                        placeholder="Card number"
                                        className="w-full p-2 border mb-2 rounded-md"
                                    />
                                    <div className="flex gap-4 mb-2">
                                        <input
                                            type="text"
                                            placeholder="MM / YY"
                                            className="w-full p-2 border rounded-md"
                                        />
                                        <input
                                            type="text"
                                            placeholder="CVC"
                                            className="w-full p-2 border rounded-md"
                                        />
                                    </div>
                                    <div className="flex gap-4 mb-2">
                                        <select className="w-full p-2 border rounded-md">
                                            <option>United States</option>
                                            <option>Canada</option>
                                            <option>Australia</option>
                                        </select>
                                        <input
                                            type="text"
                                            placeholder="Postal code"
                                            className="w-full p-2 border rounded-md"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Pay Button */}
                            <Button className="w-full bg-blue-500 text-white py-2 rounded-lg">
                                Pay
                            </Button>
                        </div>
                    )}
                </div>
                {/* Right: Course Info */}
                <Details/>
            </div>
        </section>
    )
}
