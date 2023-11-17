import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireLogin = () => {
  const { isLogged } = useAuth();
  const location = useLocation();

  return isLogged() ? (
    <Outlet />
  ) : (
    <Navigate to={`/landing?redirect=${location.pathname}`} />
  );
};

export default RequireLogin;
