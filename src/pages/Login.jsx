import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { loginSuccess } from '../features/authSlice'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (user) navigate('/')
  }, [user, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find((u) => u.email === email && u.password === password)
    if (!user) {
      toast.error('Invalid email or password')
      return
    }
    dispatch(loginSuccess({ user, token: 'local-token' }))
    toast.success('Logged in')
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950 px-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg p-6 shadow">
        <h2 className="text-2xl font-semibold mb-4">Sign in to your account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            type="email"
            className="w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-800 text-sm"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            type="password"
            className="w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-800 text-sm"
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">Sign in</button>
        </form>
        <p className="mt-4 text-sm">Don't have an account? <Link to="/signup" className="text-blue-600">Sign up</Link></p>
      </div>
    </div>
  )
}

export default Login
