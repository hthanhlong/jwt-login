import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth()
  const location = useLocation()
  if (!auth || !Object.keys(auth).length)
    return <Navigate to="/login" state={{ from: location }} replace />
  const isRole = auth?.roles?.find((role) => allowedRoles?.includes(role))
  console.log(
    '🚀 ~ file: RequireAuth.js ~ line 9 ~ RequireAuth ~ isRole',
    isRole,
  )

  if (isRole) return <Outlet />
  return <Navigate to="/unauthorized" state={{ from: location }} replace />
}

export default RequireAuth
