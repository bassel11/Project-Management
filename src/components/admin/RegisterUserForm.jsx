import { useState } from 'react'
import api from '../../services/api'
import toast from 'react-hot-toast'

const RegisterUserForm = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', privilageType: 0, role: 'USER' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/api/Auth/register', form)
      toast.success('User registered successfully')
      setForm({ firstName: '', lastName: '', email: '', password: '', privilageType: 0, role: 'USER' })
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Registration failed'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <input name="firstName" value={form.firstName} onChange={handleChange} required placeholder="First name" className="p-2 border rounded" />
        <input name="lastName" value={form.lastName} onChange={handleChange} required placeholder="Last name" className="p-2 border rounded" />
      </div>
      <input name="email" value={form.email} onChange={handleChange} required type="email" placeholder="Email" className="w-full p-2 border rounded" />
      <input name="password" value={form.password} onChange={handleChange} required type="password" placeholder="Password" className="w-full p-2 border rounded" />
      <div className="grid grid-cols-2 gap-3">
        <select name="privilageType" value={form.privilageType} onChange={handleChange} className="p-2 border rounded">
          <option value={0}>Standard</option>
          <option value={1}>Privileged</option>
        </select>
        <select name="role" value={form.role} onChange={handleChange} className="p-2 border rounded">
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </div>

      <div className="flex justify-end">
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
          {loading ? 'Registering...' : 'Register New User'}
        </button>
      </div>
    </form>
  )
}

export default RegisterUserForm
