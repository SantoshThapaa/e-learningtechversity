'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios from 'axios'

export default function Register({ variants }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      const response = await axios.post('http://localhost:4000/api/user/register', {
        name,
        email,
        password,
        confirmPassword,
      })

      setSuccessMessage(response.data.message)
      setError(null)

      // Redirect to OTP verification with email
      router.push(`/student/verify-otp?email=${encodeURIComponent(email)}`)

    } catch (err) {
      setError(err.response ? err.response.data.message : 'An error occurred')
      setSuccessMessage('')
    }
  }

  return (
    <motion.div
      key="register"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold mb-1">Hey,</h2>
      <p className="text-lg font-semibold mb-4">Please Register.</p>
      <p className="text-sm mb-6 text-gray-500">We are very happy to see you!</p>

      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="mb-4" />
        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="mb-4" />
        <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="mb-4" />
        <Input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" type="password" className="mb-4" />
        <Button type="submit" className="w-full mt-2 bg-[#00C853]">
          Register
        </Button>
      </form>
    </motion.div>
  )
}
