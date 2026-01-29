import { Route, Routes } from 'react-router-dom';

import LoginPage from './pages/login';

const Auth = () => {
  return (
    <Routes>
      <Route path="/" key="authLogin" element={<LoginPage />} />
    </Routes>
  );
};

export default Auth;
