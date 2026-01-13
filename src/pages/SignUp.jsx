import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { registerSuccess } from '../features/authSlice'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (user) navigate('/')
  }, [user, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirm) {
      toast.error('Passwords do not match')
      return
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if (users.find((u) => u.email === email)) {
      toast.error('Email already in use')
      return
    }
    const newUser = { id: Date.now(), name, email, password }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    dispatch(registerSuccess({ user: newUser, token: 'local-token' }))
    toast.success('Account created')
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950 px-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg p-6 shadow">
        <h2 className="text-2xl font-semibold mb-4">Create an account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Full name" className="w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-800 text-sm" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" type="email" className="w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-800 text-sm" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" type="password" className="w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-800 text-sm" />
          <input value={confirm} onChange={(e) => setConfirm(e.target.value)} required placeholder="Confirm password" type="password" className="w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-800 text-sm" />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">Create account</button>
        </form>
        <p className="mt-4 text-sm">Already have an account? <Link to="/login" className="text-blue-600">Sign in</Link></p>
      </div>
    </div>
  )
}

export default SignUp
