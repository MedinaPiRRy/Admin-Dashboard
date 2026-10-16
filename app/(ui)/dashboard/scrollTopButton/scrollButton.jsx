'use client'
import { IoIosArrowRoundUp } from 'react-icons/io';

const ScrollButton = () => {

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

   return (
      <button
        className="fixed bottom-0 right-0 rounded-s-full px-4 py-2 mr-6 mb-[71px] z-50 items-center text-xs flex gap-2 bg-[var(--bgSoft)] transition duration-300 transform hover:scale-110"
        onClick={scrollToTop}
      >
        BACK TO TOP
        <IoIosArrowRoundUp className="inline-block h-4 w-4" />
      </button>
   )
};

export default ScrollButton;
