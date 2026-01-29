import React from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useAppSelector } from '@/core/context/hooks';

interface IProps {
  children: React.ReactNode;
}

const RequireBranch = ({ children }: IProps) => {
  const { branchIds } = useAppSelector((state) => state.dashboard);
  const { branchId } = useParams<{ branchId: string }>();
  const location = useLocation();

  return branchIds.includes(Number(branchId)) ? (
    children
  ) : (
    <Navigate to="/dashboard" replace state={{ path: location.pathname }} />
  );
};

export default RequireBranch;
