import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const location = useLocation()
  const isPreview = !!(location.state as { isPreview?: boolean } | null)?.isPreview
  return isAuthenticated || isPreview ? <>{children}</> : <Navigate to="/access" replace />
}
