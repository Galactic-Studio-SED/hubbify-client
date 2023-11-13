import React from "react";
import { BsArrowUpRight } from 'react-icons/bs';


const CallToActionButton = () => {
    return (
        <div className='bg-black w-auto rounded-3xl font-normal my-6 mx-auto px-7 py-3 text-white text-lg hover:bg-indigo-400 duration-500 inline-flex justify-between items-center'>
            <button >Join the <span className="font-extrabold">hubbify</span> Community</button>  
             <BsArrowUpRight></BsArrowUpRight>
        </div>
    );
}

export default CallToActionButton;