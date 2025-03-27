'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

const stats = [
    { value: "10+", label: "Years of experience" },
    { value: "22k+", label: "Students worldwide" },
    { value: "30+", label: "Tech Courses" },
];

export default function HeroBanner() {
    return (
        <div className="relative z-10 mt-10">
            {/* Hero Section */}
            <section className="w-full bg-white py-20 relative overflow-hidden">
                <div className="container mx-auto px-6 text-center">
                    {/* Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 3 }}
                        className="flex flex-col items-center justify-center"
                    >
                        <h1 className="text-[56px] md:text-[64px] leading-[68px] text-black font-unbounded font-bold text-center">
                            Empowering the Next Generation
                            <br />
                            of Tech Talent
                        </h1>
                        <div className="flex items-center justify-center gap-2 bg-[url('/sparkle.png')] bg-[length:80%] bg-center bg-no-repeat min-h-[250px] w-full">
                            <p className="max-w-2xl mx-auto text-lg text-gray-700 bg-white bg-opacity-75 p-4 rounded-lg">
                                Whether you’re a beginner or an experienced professional, we bring you industry-relevant courses designed to boost your career and future-proof your skills.
                            </p>
                        </div>
                        <div className="flex justify-center gap-4">
                            <a
                                href="/contact"
                                className="px-6 py-3 rounded-md bg-[#00C853] text-white font-medium hover:bg-green-600 transition"
                            >
                                Get In Touch
                            </a>
                            <a
                                href="/courses"
                                className="px-6 py-3 rounded-md border border-black text-black font-medium hover:bg-black hover:text-white transition"
                            >
                                Enroll Now
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="mt-10 bg-white">
                <div className="text-center relative">
                    {/* Student Image Slightly Moved Up */}
                    <div className="absolute top-[-230px] left-1/2 -translate-x-1/2 w-full flex justify-center">
                        <Image
                            src="/bg2.png"
                            alt="Student Image"
                            width={1400}
                            height={900}
                            className="max-w-none object-cover"
                        />
                    </div>
                    <div className="mt-32 relative">
                        <Image
                            src="/Background-4.png"
                            alt="Color Background"
                            width={1800}
                            height={500}
                            className="w-full h-[450px] object-cover"
                        />

                        {/* Content Layer */}
                        <div className="absolute inset-0 flex flex-col justify-center text-white px-4 z-30 mt-30">
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 items-center text-left sm:text-center">

                                {/* Left: Heading */}
                                <div className="col-span-1 sm:col-span-1">
                                    <h2 className="text-2xl md:text-3xl font-bold leading-snug">
                                        DIVE INTO PRACTICAL <br />
                                        PROJECTS AND BUILD <br />
                                        JOB-READY SKILLS
                                    </h2>
                                </div>
                                {/* Right: Stats with Animation */}
                                {stats.map((item, idx) => (
                                    <motion.div
                                        key={item.value}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 * (idx + 1), duration: 0.6 }}
                                        className="flex flex-col items-start sm:items-center justify-center gap-1"
                                    >
                                        <h3 className="text-4xl font-bold text-green-300">{item.value}</h3>
                                        <p className="text-md">{item.label}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>








        </div>
    )
}
