import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AdminPage, Application, CreateApplication, HomePage, QueryApplication } from "~/pages";
import { useAuth } from "~/context";

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

export const AppRoutes = () => {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create-application" element={<CreateApplication />} />
      <Route path="/query-application" element={<QueryApplication />} />
      <Route path="/application/:applicationId" element={<Application />} />
      <Route element={<ProtectedRoute isAllowed={user} />}>
        <Route path="/admin" element={<AdminPage />} >
        <Route path=":tab" element={<AdminPage />} />
        </Route>
      </Route>
    </Routes>
  );
};