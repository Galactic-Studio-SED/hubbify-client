import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();

  toast.info("You are not authorized to access this page.", {
    toastId: "info",
  });

  return auth?.roles?.find((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" />
  );
};

export default RequireAuth;
