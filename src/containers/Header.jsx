import React from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const { isLogged, logout, auth } = useAuth();
  const navigateTo = useNavigate();

  const handleLogout = () => {
    logout();
    navigateTo("/login");
  };

  const hasRole = (role) => {
    return auth?.roles?.includes(role);
  };

  return (
    <header className="bg-white flex flex-wrap items-center justify-between py-[18px] px-[50px]">
      <Link
        to={`/`}
        className="text-royal-purple text-4xl md:text-5xl font-bold tracking-wide font-monserrat"
      >
        hubbify
      </Link>
      {hasRole(import.meta.env.VITE_ADMIN_ROLE) && (
        <span className="text-royal-purple">Admin</span>
      )}
      {hasRole(import.meta.env.VITE_SUPER_ADMIN_ROLE) && (
        <span className="text-royal-purple">Super Admin</span>
      )}
      {isLogged() && (
        <div className="flex gap-3">
          {(hasRole(import.meta.env.VITE_ADMIN_ROLE) && (
            <Link
              to={`/users`}
              className="rounded-full bg-gray-100 py-3 px-5 border border-gray-300"
            >
              <p className="relative">List of Users</p>
            </Link>
          )) ||
            (hasRole(import.meta.env.VITE_SUPER_ADMIN_ROLE) && (
              <Link
                to={`/users`}
                className="rounded-full bg-gray-100 py-3 px-5 border border-gray-300"
              >
                <p className="relative">List of Users</p>
              </Link>
            ))}

          <Link
            to={`/profile`}
            className="rounded-full bg-gray-100 py-3 px-5 border border-gray-300"
          >
            <p className="relative">Profile</p>
          </Link>
          <button
            onClick={handleLogout}
            type="button"
            className="rounded-full bg-gray-100 py-3 px-5 border border-gray-300"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
