import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '../../../core/context/store';

interface IProps {
  children: React.ReactNode;
}

const RequireAuth = ({ children }: IProps) => {
  const { authUser } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  return authUser ? children : <Navigate to="/auth" replace state={{ path: location.pathname }} />;
};

export default RequireAuth;
