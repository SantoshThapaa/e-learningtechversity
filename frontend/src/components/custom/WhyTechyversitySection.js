'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function WhyTechyversitySection() {
    const highlights = [
        {
            title: 'Expert Faculty',
            desc: 'Learn from industry pros',
            icon: '/icon6.png',
        },
        {
            title: 'Practical Learning',
            desc: 'Build real-world practical skills.',
            icon: '/icon7.png',
        },
        {
            title: 'Accessible',
            desc: 'Learn anytime, anywhere.',
            icon: '/icon8.png',
        },
    ]

    return (
        <section className="bg-[#F6FFEB] py-20 px-4">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">

                {/* Top Section */}
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                    {/* Left Image */}
                    <Image
                        src="/why-us2.jpg.png"
                        alt="girl reading"
                        width={500}
                        height={300}
                        className="rounded-xl object-cover"
                    />

                    {/* Right Highlights */}
                    <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black font-unbounded">
                            WHY TECHYVERSITY STANDS OUT <br /> FOR YOUR LEARNING JOURNEY
                        </h2>

                        <div className="flex flex-col md:flex-row justify-between gap-6">
                            {highlights.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.2 }}
                                    viewport={{ once: true }}
                                    className="flex items-start gap-3 max-w-[220px]"
                                >
                                    <Image src={item.icon} alt="icon" width={40} height={40} />
                                    <div>
                                        <h4 className="text-md font-semibold text-black">{item.title}</h4>
                                        <p className="text-sm text-gray-600">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col lg:flex-row items-center">
                    {/* Left Box */}
                    <div className="bg-[#00C853] text-white p-6 rounded-xl w-full lg:w-[35%]">
                        <h2 className="text-4xl font-extrabold font-unbounded mb-4 tracking-wide leading-[38px] outlined-text">
                            <span className="block">OUR</span>
                            <span className="block">JOURNEY</span>
                        </h2>


                        <p className="text-sm leading-relaxed">
                            From a small idea to a growing platform,
                            Techyversity has been empowering learners
                            worldwide with practical, tech-focused
                            education. Our journey is driven by passion,
                            innovation, and a commitment to making
                            learning accessible to everyone.
                        </p>
                    </div>

                    {/* Right Image */}
                    <div className="w-full lg:w-[65%]">
                        <Image
                            src="/why-us3.jpg.png"
                            alt="group of students"
                            width={600}
                            height={450}
                            className="rounded-xl object-cover w-full h-full"
                        />
                    </div>
                </div>

            </div>
        </section>
    )
}
