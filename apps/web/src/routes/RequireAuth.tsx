import { Navigate, Outlet } from 'react-router-dom';
import { useGetToken } from 'services/AuthenticationService';

const RequireAuth = () => {
  return useGetToken() ? <Outlet /> : <Navigate to="/login" />;
};
export default RequireAuth;
