import { Route, Routes } from 'react-router-dom';

import DashboardPage from './container';

const Dashboard = () => {
  return (
    <Routes>
      <Route path="/" key="dashboard" element={<DashboardPage />} />
    </Routes>
  );
};

export default Dashboard;
