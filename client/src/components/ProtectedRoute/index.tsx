import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AppState, Role } from '../../types';

type ProtectedRouteProps = {
  adminOnly: boolean;
  children: JSX.Element;
};

const ProtectedRoute = ({ adminOnly, children }: ProtectedRouteProps) => {
  const { user } = useSelector((state: AppState) => state.user);

  if (!user || (adminOnly && user.role !== Role.Admin)) {
    // user is not authenticated or not admin and navigating to admin only pages
    return <Navigate to='/' />;
  }

  return children;
};

export default ProtectedRoute;
