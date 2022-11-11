import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from 'services/AuthenticationService';

const RedirectDashboard = () => {
  return !getToken() ? <Outlet /> : <Navigate to="/dashboard" />;
};
export default RedirectDashboard;
