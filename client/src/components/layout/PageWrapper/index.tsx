import React from 'react';

import './_pageWrapper.scss';

type PageWrapperProps = {
  page: string;
  title: string;
  navigations: {
    text: string;
    navigateHandler: () => void;
  }[];
  container: JSX.Element;
};

const PageWrapper = ({
  page,
  title,
  navigations,
  container,
}: PageWrapperProps) => {
  return (
    <main className={`page page-${page}`}>
      <div className='title'>
        <h1>{title}</h1>
        <div className='navigations'>
          {navigations.map((navigation, index) => (
            <button
              key={index}
              className='navigation'
              onClick={navigation.navigateHandler}
            >
              {navigation.text}
            </button>
          ))}
        </div>
      </div>
      <div className='container'>{container}</div>
    </main>
  );
};

export default PageWrapper;
