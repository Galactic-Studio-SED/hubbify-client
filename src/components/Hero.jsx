import React from 'react';
import CallToActionButton from './CallToActionButton';

const Hero = () => {
  return (
    <div className='text-black'>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center items-center'>
        <h1 className=''>Join the Chatvolution</h1>
        <h4>Ask questions, share ideas, and build connections with each other.</h4>
        <CallToActionButton></CallToActionButton>
    
      </div>
    </div>
  );
};

export default Hero;