import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const RequireLogin = () => {
  const { isLogged } = useAuth();
  const location = useLocation();

  if (!isLogged()) {
    toast.info("You must be logged in to access this page.", {
      toastId: "info",
    });
  }

  return isLogged() ? (
    <Outlet />
  ) : (
    <Navigate to={`/login?redirect=${location.pathname}`} />
  );
};

export default RequireLogin;
