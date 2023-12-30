import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AdminPage, Application, CreateApplication, HomePage, QueryApplication, SuccessApplication } from "~/pages";
import { useAuth } from "~/context";
import { lazy } from "react";

const ProtectedRoute = ({
  isAllowed,
  redirectPath = '/',
  children,
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

const LazyAdminPage = lazy(() => import('~/pages/AdminPage'));

export const AppRoutes = () => {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create-application" element={<CreateApplication />} />
      <Route path="/query-application" element={<QueryApplication />} />
      <Route path="/application/:applicationId" element={<Application />} />
      <Route path="/application-success/:applicationId" element={<SuccessApplication />} />
      <Route element={<ProtectedRoute isAllowed={user} />}>
        <Route path="/admin" element={<LazyAdminPage />} >
        <Route path=":tab" element={<LazyAdminPage />} />
        </Route>
      </Route>
    </Routes>
  );
};