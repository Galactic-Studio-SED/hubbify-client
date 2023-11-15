import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.roles?.find((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" />
    // <Navigate
    //   to={`/login?redirect=${location.pathname}`}
    //   replace={true}
    // />
  );
};

export default RequireAuth;
