import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types/user';

interface PrivateRouteProps {
  children: React.ReactNode;
  roles?: UserRole[];
}

export const PrivateRoute = ({ children, roles }: PrivateRouteProps) => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!user) {
    return <Navigate to="/onboarding" replace />;
  }

  if (roles && profile && !roles.includes(profile.role)) {
    switch (profile.role) {
      case 'coordinator':
        return <Navigate to="/" replace />;
      case 'technician':
        return <Navigate to="/medical-equipment" replace />;
      case 'doctor':
        return <Navigate to="/patients" replace />;
      default:
        return <Navigate to="/onboarding" replace />;
    }
  }

  return <>{children}</>;
};

export default PrivateRoute;