import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white bg-transparent'>
      <h1 className='w-1/2 text-3xl font-bold'>hubbify.</h1>
      <ul className='hidden md:flex md:align-center' >
        
        <li className='p-3'>
          <Link to="/login">
            Log In
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            className='block text-center bg-royal-purple text-white w-[150px] h-auto rounded-md font-medium p-2 hover:bg-indigo-400 duration-500 ml-1'
          >
            Sign Up
          </Link>
        </li>

      </ul>
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <ul className={nav ? 'fixed left-0 top-0 w-[60%] h-full  bg-royal-purple ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
        <h1 className='w-full text-3xl font-bold text-white m-4 '>hubbify</h1>
        <li className='p-4'>
          <Link to="/login">
            Log In
          </Link>
        </li>
        <li className='p-4'>
          <Link to="/register">
            Sign Up
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
