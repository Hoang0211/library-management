import React from 'react';
import { BiUpArrow } from 'react-icons/bi';

import './_pageWrapper.scss';

type PageWrapperProps = {
  className: string;
  children: JSX.Element | JSX.Element[];
};

const PageWrapper = ({ className, children }: PageWrapperProps) => {
  const scrollToTopHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // for smoothly scrolling
    });
  };

  return (
    <main className={className}>
      {children}
      <button className='btn-top' onClick={scrollToTopHandler}>
        <BiUpArrow />
      </button>
    </main>
  );
};

export default PageWrapper;
