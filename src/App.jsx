import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';
import Dashboard from './pages/Dashboard';
import RescueMap from './pages/RescueMap';
import Analytics from './pages/Analytics';
import Alerts from './pages/Alerts';
import Settings from './pages/Settings';
import VictimApp from './pages/VictimApp';
import Login from './pages/Login';
import Chatbot from './components/chat/Chatbot';
import { useTranslation } from 'react-i18next';

// Protected Route Component
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function AppContent() {
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { user } = useAuth();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (!user) {
    return <Login darkMode={darkMode} />;
  }

  return (
    <div className={`app-transition ${darkMode ? 'dark bg-neutral-900 text-white' : 'bg-neutral-50 text-neutral-900'}`}>
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} darkMode={darkMode} />
        
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <TopBar 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen} 
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
          
          <main className="flex-grow p-4 sm:p-6">
            <Routes>
              <Route path="/login" element={<Login darkMode={darkMode} />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Dashboard darkMode={darkMode} />
                </ProtectedRoute>
              } />
              <Route path="/map" element={
                <ProtectedRoute>
                  <RescueMap darkMode={darkMode} />
                </ProtectedRoute>
              } />
              <Route path="/analytics" element={
                <ProtectedRoute>
                  <Analytics darkMode={darkMode} />
                </ProtectedRoute>
              } />
              <Route path="/alerts" element={
                <ProtectedRoute>
                  <Alerts darkMode={darkMode} />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings darkMode={darkMode} />
                </ProtectedRoute>
              } />
              <Route path="/victim" element={<VictimApp darkMode={darkMode} />} />
            </Routes>
          </main>
        </div>
      </div>
      
      <Chatbot darkMode={darkMode} />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;