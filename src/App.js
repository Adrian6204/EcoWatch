import './index.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Landing from './view/pages/landing';
import UserManagement from './view/pages/userManagement';
import NotFound from './view/pages/404';
import AppLayout from './view/components/common/layout';
import ForgotPassword from './view/pages/forgotpassword';
import OtpInput from './view/pages/otp';
import { userManagementState } from './zustand/userManagementState';

const PrivateRoute = ({ element: Component }) => {
  const isAuthenticated = userManagementState.getState().isLoggedIn();
  return isAuthenticated ? <Component /> : <Navigate to="/" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/usermanagement" element={<UserManagement />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/otp" element={<OtpInput />} />
        <Route path="/dashboard" element={<PrivateRoute element={AppLayout} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
