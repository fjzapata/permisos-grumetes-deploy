import { Navigate, Outlet } from "react-router-dom";
interface Props {
  isAllowed: boolean;
}

export const ProtectedRoutes = ({ isAllowed }: Props) => {
  if (!isAllowed) return <Navigate to="/login" />;

  return <Outlet />;
};

export const ProtectedRoutesAdmin = ({ isAllowed }: Props) => {
  if (!isAllowed) return <Navigate to="/login-admin" />;

  return <Outlet />;
};
