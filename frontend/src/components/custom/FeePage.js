"use client";

import { useState } from "react";
import FullPaid from "./FullPaid";
import EMI from "./EMI";

export default function FeePage() {
    const [isFullPaid, setIsFullPaid] = useState(true);

    return (
        <div className="p-6 ml-60 sm:ml-16 md:ml-10">
            <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-muted-foreground mb-4">
                    <span className="text-gray-500">Home</span> {'>'} <span className="text-blue-500">Fees</span>
                </div>
            </div>

            {/* Toggle Buttons */}
            <div className="w-[400px] flex mb-6 overflow-hidden rounded-md border border-gray-200">
                <button
                    className={`w-1/2 py-2 ${isFullPaid ? 'bg-[#00C853] text-white' : 'bg-white text-black'} rounded-none hover:bg-[#00C853] hover:text-white transition duration-300 ease-in-out`}
                    onClick={() => setIsFullPaid(true)}
                >
                    Full Paid
                </button>
                <button
                    className={`w-1/2 py-2 ${!isFullPaid ? 'bg-[#00C853] text-white' : 'bg-white text-black'} rounded-none hover:bg-[#00C853] hover:text-white transition duration-300 ease-in-out`}
                    onClick={() => setIsFullPaid(false)}
                >
                    EMI
                </button>
            </div>
            {/* Tab Content */}
            {isFullPaid ? <FullPaid /> : <EMI />}
        </div>
    );
}
