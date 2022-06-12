import React from 'react';

import './_pageWrapper.scss';

type PageWrapperProps = {
  className: string;
  children: JSX.Element | JSX.Element[];
};

const PageWrapper = ({ className, children }: PageWrapperProps) => {
  return <main className={className}>{children}</main>;
};

export default PageWrapper;
