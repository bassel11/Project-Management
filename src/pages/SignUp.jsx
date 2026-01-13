import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { register } from '../features/authSlice'
import { setToken, setRefreshToken } from '../services/tokenService'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [authType, setAuthType] = useState(0)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { status, isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      console.debug('auth: isAuthenticated true — redirecting to /')
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const isLoading = status === 'loading'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirm) {
      toast.error('Passwords do not match')
      return
    }
    try {
      const res = await dispatch(register({ username, email, password, authType })).unwrap()
      // store tokens synchronously to ensure refresh uses them
      if (res?.token) setToken(res.token)
      if (res?.refreshToken) setRefreshToken(res.refreshToken)

      // Registration succeeded; redirect immediately to dashboard
      toast.success('Account created')
      navigate('/')
    } catch (err) {
      const msg = err?.message || err?.error || 'Error creating account'
      toast.error(msg)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950 px-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg p-6 shadow">
        <h2 className="text-2xl font-semibold mb-4">Create an account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Username" className="w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-800 text-sm" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" type="email" className="w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-800 text-sm" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" type="password" className="w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-800 text-sm" />
          <input value={confirm} onChange={(e) => setConfirm(e.target.value)} required placeholder="Confirm password" type="password" className="w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-800 text-sm" />

          <label className="flex items-center gap-2 text-sm">
            <span className="text-sm">Auth type:</span>
            <select value={authType} onChange={(e) => setAuthType(Number(e.target.value))} className="ml-2 px-2 py-1 border rounded-md bg-white dark:bg-zinc-800 text-sm">
              <option value={0}>0 (default)</option>
              <option value={1}>1</option>
            </select>
          </label>

          <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-2 rounded-md">{isLoading ? 'Creating...' : 'Create account'}</button>
        </form>
        <p className="mt-4 text-sm">Already have an account? <Link to="/login" className="text-blue-600">Sign in</Link></p>
      </div>
    </div>
  )
}

export default SignUp
