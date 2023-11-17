import React from "react";
import { BsArrowUpRight } from 'react-icons/bs';
import { Link } from "react-router-dom";

const CallToActionButton = () => {
    return (
        <Link 
            to="/login"
            className='
            text-lg text-white font-normal 
            bg-black hover:bg-indigo-400 duration-500
            inline-flex justify-between items-center
            w-auto rounded-3xl my-6 mx-auto px-7 py-3 '>
            <button>Join the <span className="font-extrabold">hubbify</span> Community </button>
            <BsArrowUpRight></BsArrowUpRight>
        </Link>
    );
}

export default CallToActionButton;