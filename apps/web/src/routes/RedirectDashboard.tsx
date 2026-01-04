import RoutingPath from 'enums/RoutingPath';
import { Navigate, Outlet } from 'react-router-dom';
import { useGetToken } from 'services/AuthenticationService';

const RedirectDashboard = () => {
  return !useGetToken() ? <Outlet /> : <Navigate to={RoutingPath.HOME} />;
};
export default RedirectDashboard;
