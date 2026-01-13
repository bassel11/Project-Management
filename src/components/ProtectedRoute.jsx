import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { user, isAuthenticated, token } = useSelector((state) => state.auth)
  const isAuth = Boolean(isAuthenticated || token || user)
  if (!isAuth) return <Navigate to="/login" replace />
  return children
}

export default ProtectedRoute
