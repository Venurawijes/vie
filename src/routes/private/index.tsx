import React from 'react';

import PrivateLayout from '@/layout/private';
import Loadable from '@/shared/components/loadable';
import RequireAuth from '@/shared/components/require-auth';
import RequireRole from '@/shared/components/require-role';
import { EUserRole } from '@/shared/enums/user-role.enum';

const Dashboard = Loadable(React.lazy(() => import('../../modules/dashboard')));
const Orders = Loadable(React.lazy(() => import('../../modules/orders')));
const Unauthorized = Loadable(React.lazy(() => import('../../shared/pages/unauthorized')));

const PrivateRoutes = {
  path: '/',
  element: (
    <RequireAuth>
      <PrivateLayout />
    </RequireAuth>
  ),
  children: [
    {
      path: 'dashboard/*',
      element: (
        <RequireRole
          allowedRoles={[
            EUserRole.SuperAdmin,
            EUserRole.Admin,
            EUserRole.CompanyOwner,
            EUserRole.BranchManager,
          ]}
        >
          <Dashboard />
        </RequireRole>
      ),
    },
    {
      path: 'orders/*',
      element: (
        <RequireRole
          allowedRoles={[
            EUserRole.SuperAdmin,
            EUserRole.Admin,
            EUserRole.CompanyOwner,
            EUserRole.BranchManager,
          ]}
        >
          <Orders />
        </RequireRole>
      ),
    },
    {
      path: 'unauthorized',
      element: <Unauthorized />,
    },
  ],
};

export default PrivateRoutes;
