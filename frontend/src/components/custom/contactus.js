'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
export default function ContactUs() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-100 py-10 px-6"
        >
            {/* Main Contact Section with Image and Offices */}
            <div className="flex flex-col lg:flex-row gap-8 m-10">
                {/* Office Info Section (65% width) */}
                <div className="lg:w-2/3 p-8 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {/* New York Office */}
                        <div className="bg-black p-6 shadow-md rounded-lg">
                            <h3 className="text-xl font-semibold mb-2 text-white">New York Office</h3>
                            <p className="text-white mb-4">387 Rhode Island Avenue, Beltsville, DC 20705</p>
                            <p className="text-white mb-2">📧 <a href="mailto:newyorkoff@email.com">newyorkoff@email.com</a></p>
                            <p className="text-white mb-2">📞 +123 456 7890</p>
                        </div>
                        {/* Nepal Office  */}
                        <div className="bg-black p-6 shadow-md rounded-lg">
                            <h3 className="text-xl font-semibold mb-2 text-white">Nepal Office</h3>
                            <p className="text-white mb-4">Putalisadak, Kathmandu 44600, Nepal</p>
                            <p className="text-white mb-2">📧 <a href="mailto:nepaloffice@email.com">nepaloffice@email.com</a></p>
                            <p className="text-white mb-2">📞 +977 1 5101122</p>
                        </div>
                    </div>
                </div>

                {/* Image Section (35% width) */}
                <div className="lg:w-1/3 bg-gray-50 rounded-lg shadow-lg flex justify-center items-center">
                    <Image
                        src="/contact.png"
                        alt="Woman with whiteboard"
                        className="w-full h-auto rounded-lg"
                        width={500}
                        height={300}
                        layout="intrinsic"
                    />
                </div>
            </div>
        </motion.div>
    );
}
