import React from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const { isLogged, logout } = useAuth();
  const navigateTo = useNavigate();

  const handleLogout = () => {
    logout();
    navigateTo("/login");
  };

  return (
    <header className="bg-white flex flex-wrap items-center justify-between py-[18px] px-[50px]">
      <Link
        to={`/`}
        className="text-royal-purple text-4xl md:text-5xl font-bold tracking-wide font-monserrat"
      >
        hubbify
      </Link>
      {isLogged() && (
        <div className="flex gap-3">
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
