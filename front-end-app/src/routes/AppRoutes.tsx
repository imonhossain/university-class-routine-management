import UserContainer from 'components/layout/UserContainer';
import RoutingPath from 'enums/RoutingPath';
import CoursePage from 'pages/course/CoursePage';
import DashboardPage from 'pages/dashboard/DashboardPage';
import LoginPage from 'pages/login/Login';
import RoomPage from 'pages/room/RoomPage';
import TeacherPage from 'pages/teacher/TeacherPage';
import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import RedirectDashboard from 'routes/RedirectDashboard';
import RequireAuth from 'routes/RequireAuth';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" />
      <UserContainer>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<RequireAuth />}>
              <Route path={RoutingPath.COURSE} element={<CoursePage />} />
              <Route path={RoutingPath.TEACHER} element={<TeacherPage />} />
              <Route path={RoutingPath.ROOM} element={<RoomPage />} />
            </Route>
            <Route element={<RedirectDashboard />}>
              <Route path={RoutingPath.LOGIN} element={<LoginPage />} />
            </Route>
            <Route path={RoutingPath.HOME} element={<DashboardPage />} />
          </Routes>
        </Suspense>
      </UserContainer>
    </BrowserRouter>
  );
};

export default AppRoutes;
