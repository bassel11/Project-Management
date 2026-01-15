import { useState } from 'react'
import api from '../../services/api'
import toast from 'react-hot-toast'

const EnableMFAForm = () => {
  const [form, setForm] = useState({ userId: '', deliveryMethod: 2 })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/api/Auth/enable-mfa', form)
      toast.success('MFA enabled (or request sent)')
      setForm({ userId: '', deliveryMethod: 2 })
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Enable MFA failed'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="userId" value={form.userId} onChange={handleChange} required placeholder="User ID" className="w-full p-2 border rounded" />
      <select name="deliveryMethod" value={form.deliveryMethod} onChange={handleChange} className="w-full p-2 border rounded">
        <option value={1}>Email</option>
        <option value={2}>SMS</option>
      </select>
      <div className="flex justify-end">
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
          {loading ? 'Enabling...' : 'Enable MFA'}
        </button>
      </div>
    </form>
  )
}

export default EnableMFAForm
