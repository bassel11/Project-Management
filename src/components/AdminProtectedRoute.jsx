import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AdminProtectedRoute = ({ children }) => {
  const { user, isAuthenticated, token } = useSelector((state) => state.auth)
  const isAuth = Boolean(isAuthenticated || token || user)
  if (!isAuth) return <Navigate to="/login" replace />
  if (!user || user.role !== 'ADMIN') return <Navigate to="/app" replace />
  return children
}

export default AdminProtectedRoute
