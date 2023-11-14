import React from 'react';
import CallToActionButton from './CallToActionButton';

const Hero = () => {
  return (
    <div className='text-white'>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center items-center'>
        <h1 className='text-4xl	font-extrabold py-4 '>Join the Chatevolution</h1>
        <h4 className='font-light text-sm'>Ask questions, share ideas, and build connections with each other.</h4>
        <CallToActionButton></CallToActionButton>
    
      </div>
    </div>
  );
};

export default Hero;