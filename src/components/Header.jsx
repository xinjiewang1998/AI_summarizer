import React from "react";


const Header = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='flex justify-between items-center w-full mb-10 pt-3'>

      </nav>

      <h1 className='mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl text-center'>
        Summarize Articles with <br className='max-md:hidden' />
        <span className='bg-gradient-to-r from-blue-500 via-gray-600 to-yellow-500 bg-clip-text text-transparent'>ChatGPT</span>
      </h1>
      <h2 className='desc'>
        Summarize your article to help you have better understanding
      </h2>
    </header>
  );
};

export default Header;
