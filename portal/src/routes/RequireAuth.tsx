import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from 'services/AuthenticationService';

const RequireAuth = () => {
  return getToken() ? <Outlet /> : <Navigate to="/login" />;
};
export default RequireAuth;
