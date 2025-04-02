'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import axios from 'axios'

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const emailFromQuery = searchParams.get('email')
    if (emailFromQuery) {
      setEmail(emailFromQuery)
    } else {
      setError('Email not provided. Please register again.')
    }
  }, [searchParams])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:4000/api/user/verify', {
        email,
        otp,
      })

      setMessage(response.data.message)
      setError('')

      setTimeout(() => {
        router.push('/student/about')
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed')
      setMessage('')
    }
  }

  return (
    <motion.div
      className="max-w-md mx-auto mt-20 p-6 bg-white shadow-xl rounded-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold mb-2 text-center">Email Verification</h2>
      <p className="text-gray-600 text-sm mb-6 text-center">
        Please enter the OTP sent to <span className="font-semibold">{email}</span>
      </p>

      {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
      {message && <p className="text-green-600 text-sm mb-2 text-center">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          required
        />
        <Button type="submit" className="w-full bg-[#2962FF] hover:bg-[#0039cb]">
          Verify OTP
        </Button>
      </form>
    </motion.div>
  )
}
