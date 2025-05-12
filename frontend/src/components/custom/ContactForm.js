'use client'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function ContactForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        message: '',
    });
    const [status, setStatus] = useState(null); 
    const [isLoading, setIsLoading] = useState(false);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus(null);
        console.log(formData); 

        try {
            const response = await fetch('https://back.bishalpantha.com.np/api/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (response.ok) {
                setFormData({
                    fullName: '',
                    email: '',
                    message: '',
                });
                setStatus('Message sent successfully!');
            } else {
                setStatus(`Error: ${data.message || 'Something went wrong.'}`);
            }
        } catch (error) {
            setStatus('Error: Could not connect to the server.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="bg-[#f5f5f5] py-16 px-4 border-t border-gray-300">
            <div className="max-w-4xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold mb-4"
                >
                    HAVE ANY QUESTION?
                </motion.h2>
                <p className="text-gray-600 mb-10">
                    Your email address will not be published. Required fields are marked *
                </p>

                {status && (
                    <div className={`mb-6 ${status.startsWith('Error') ? 'text-red-500' : 'text-green-500'}`}>
                        {status}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Full name *"
                            className="border-0 border-b border-black rounded-none"
                            required
                        />
                        <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email address *"
                            className="border-0 border-b border-black rounded-none"
                            required
                        />
                    </div>
                    <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Write your message *"
                        className="border-0 border-b border-black rounded-none"
                        required
                    />

                    <div className="text-center pt-4">
                        <Button
                            type="submit"
                            className="bg-[#00C853] text-white px-6 py-2 rounded hover:opacity-90"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Sending...' : 'Send Message'}
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
}
