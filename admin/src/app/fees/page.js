"use client";
import EMI from "@/components/custom/EMI";
import FullPaid from "../../components/custom/FullPaid"; 
import { useState } from "react";

export default function FeePage() {
  const [isFullPaid, setIsFullPaid] = useState(true);

  return (
    <div className="container mx-auto mt-20 ml-60">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Fees</h1>
      </div>

      {/* Toggle Buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-6 py-2 rounded-lg ${isFullPaid ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            } hover:bg-blue-700 transition duration-300 ease-in-out`}
          onClick={() => setIsFullPaid(true)}
        >
          Full Paid
        </button>
        <button
          className={`px-6 py-2 rounded-lg ${!isFullPaid ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            } hover:bg-blue-700 transition duration-300 ease-in-out`}
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
