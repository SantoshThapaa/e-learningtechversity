'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Login({ variants }) {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleLogin = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await axios.post('https://back.bishalpantha.com.np/api/user/login', {
        email: formData.email.trim(),
        password: formData.password.trim(),
      })

      const { token, name, photoUrl, role } = response.data

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify({ name, photo: photoUrl, role }))
      toast.success('Login successful!')

      if (role === 'admin') {
        router.push('/admin/home')
      } else if (role === 'teacher') {
        router.push('/teacher/home')
      } else {
        router.push('/student/courses')
      }      

    } catch (err) {
      const message = err.response?.data?.message || 'Login failed'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      key="login"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold mb-1">Hey,</h2>
      <p className="text-lg font-semibold mb-4">Please Log In</p>
      <p className="text-sm mb-6 text-gray-500">We are very happy to see you back!</p>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <Input
        name="email"
        placeholder="Email"
        className="mb-4"
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        name="password"
        placeholder="Password"
        type="password"
        className="mb-2"
        value={formData.password}
        onChange={handleChange}
      />
      <Button className="w-full mt-4 bg-[#00C853]" onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </Button>

      <div className="my-4 text-center text-sm text-gray-500">OR</div>
      <div className="flex gap-4 justify-center">
        <Button variant="outline">Signup with Google</Button>
        <Button variant="outline">Signup with Microsoft</Button>
      </div>
    </motion.div>
  )
}
