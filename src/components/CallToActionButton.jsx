import React from "react";
import { BsArrowUpRight } from 'react-icons/bs';


const CallToActionButton = () => {
    return (
        <div className='
        text-lg text-white font-normal 
        bg-black hover:bg-indigo-400 duration-500
        inline-flex justify-between items-center
        w-auto rounded-3xl my-6 mx-auto px-7 py-3 '>
            <button>Join the <span className="font-extrabold">hubbify</span> Community</button>  
             <BsArrowUpRight></BsArrowUpRight>
        </div>
    );
}

export default CallToActionButton;