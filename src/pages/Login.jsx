import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { login, refreshAuth } from '../features/authSlice'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, status } = useSelector((state) => state.auth)

  useEffect(() => {
    if (user) navigate('/')
  }, [user, navigate])

  const isLoading = status === 'loading'

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await dispatch(login({ email, password })).unwrap()
      // If backend did not return user, try to refresh /me
      if (!res?.user) {
        try {
          await dispatch(refreshAuth()).unwrap()
        } catch (err) {
          console.debug('refreshAuth failed', err)
        }
      }
      toast.success('Logged in')
      navigate('/')
    } catch (err) {
      const msg = err?.message || err?.error || 'Invalid email or password'
      toast.error(msg)
    }
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
          <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-2 rounded-md">{isLoading ? 'Signing in...' : 'Sign in'}</button>
        </form>
        <p className="mt-4 text-sm">Don't have an account? <Link to="/signup" className="text-blue-600">Sign up</Link></p>
      </div>
    </div>
  )
}

export default Login
