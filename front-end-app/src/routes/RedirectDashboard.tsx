import { Navigate, Outlet } from 'react-router-dom';
import { useGetToken } from 'services/AuthenticationService';

const RedirectDashboard = () => {
  return !useGetToken() ? <Outlet /> : <Navigate to="/dashboard" />;
};
export default RedirectDashboard;
