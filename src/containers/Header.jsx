import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white flex flex-wrap items-center justify-between py-[18px] px-[50px]">
      <a
        href="#"
        className="text-royal-purple text-5xl md:text-6xl font-bold tracking-wide font-monserrat"
      >
        hubbify
      </a>

      <Link
        to={"/"}
        className="rounded-full bg-gray-100 py-3 px-5 border border-gray-300"
      >
        <p className="relative">Username</p>
      </Link>
    </header>
  );
};

export default Header;
