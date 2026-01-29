import { Route, Routes } from 'react-router-dom';

import OrdersPage from './container';
import RequireBranch from '@/shared/components/require-branch';

const Orders = () => {
  return (
    <Routes>
      <Route
        path="/:branchId"
        key="orders"
        element={
          <RequireBranch>
            <OrdersPage />
          </RequireBranch>
        }
      />
    </Routes>
  );
};

export default Orders;
