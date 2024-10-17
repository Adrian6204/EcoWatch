import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './view/pages/landing';
import UserManagement from './view/pages/userManagement';
import NotFound from './view/pages/404';
import AppLayout from './view/components/common/layout';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/usermanagement" element={<UserManagement />} />
          <Route path="/dashboard" element={<AppLayout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
