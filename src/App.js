import { useState } from 'react'
import Sidebar from 'components/Sidebar';

import Content from 'components/Content';
import BottomBar from 'components/BottomBar';

import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from 'views/auth/Login';
import Signup from 'views/auth/Signup';
import { Icon } from 'Icons'

function RequireAuth({ children }) {
  const user = useSelector(state => state.auth.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <div className='wrapper'>
        <button
          type='button'
          onClick={() => setSidebarOpen(prev => !prev)}
          className='md:hidden fixed top-4 left-4 z-50 bg-black/70 text-white p-2 rounded-full'
          aria-label='Toggle sidebar'
        >
          <Icon name='menu' size={24} />
        </button>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <Content />
      </div>
      <BottomBar />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<RequireAuth><MainLayout /></RequireAuth>} />
      </Routes>
    </Router>
  );
}

export default App;