import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const RequireAuth = ({ roles }) => {
  const { auth } = useAuth();

  const userRoles = Array.isArray(auth?.roles) ? auth.roles : [auth.roles];

  const isAuthorized = userRoles.some((role) => roles.includes(role));

  if (!isAuthorized) {
    toast.info("You are not authorized to access this page.", {
      toastId: "info",
    });
  }

  return isAuthorized ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default RequireAuth;
