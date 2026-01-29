import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../../core/context/hooks';
import { EUserRole } from '../../enums/user-role.enum';

interface IAllowedRoles {
  allowedRoles: EUserRole[];
  children: React.ReactNode;
}

const RequireRole: React.FC<IAllowedRoles> = ({ allowedRoles, children }) => {
  const authState = useAppSelector((state) => state.auth);
  const roles: EUserRole[] = authState.authUser?.roles || [];

  const hasRequiredRole = allowedRoles.some((role: EUserRole) => roles.includes(role));

  if (!hasRequiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
};

export default RequireRole;
