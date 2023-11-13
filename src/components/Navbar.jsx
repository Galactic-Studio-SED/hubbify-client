import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white bg-black'>
      <h1 className='w-1/2 text-3xl font-bold'>hubbify.</h1>
      <ul className='hidden md:flex w-1/3 ' >
        <li className='p-3'>Log In</li>
        <li><button className='bg-royal-purple text-white w-[140px] h-auto rounded-md font-medium  ml-4 p-3'>Sign Up</button></li>
      </ul>
      <div onClick={handleNav} className='block md:hidden'>
          {nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20} />}
      </div>
      <ul className={nav ? 'fixed left-0 top-0 w-[60%] h-full  bg-royal-purple ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
        <h1 className='w-full text-3xl font-bold text-white m-4 '>hubbify</h1>
          <li className='p-4'>Log In</li>
          <li className='p-4'>Sign Up</li>
      </ul>
    </div>
  );
};

export default Navbar;
