import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  FaHome, 
  FaMap, 
  FaChartBar, 
  FaBell, 
  FaCog, 
  FaTimes,
  FaMobileAlt
} from 'react-icons/fa';

function Sidebar({ sidebarOpen, setSidebarOpen, darkMode }) {
  const location = useLocation();
  const { t } = useTranslation();
  
  const navItems = [
    { path: '/', label: t('nav.dashboard'), icon: <FaHome className="w-5 h-5" /> },
    { path: '/map', label: t('nav.map'), icon: <FaMap className="w-5 h-5" /> },
    { path: '/analytics', label: t('nav.analytics'), icon: <FaChartBar className="w-5 h-5" /> },
    { path: '/alerts', label: t('nav.alerts'), icon: <FaBell className="w-5 h-5" /> },
    { path: '/settings', label: t('nav.settings'), icon: <FaCog className="w-5 h-5" /> },
    { path: '/victim', label: 'Victim App', icon: <FaMobileAlt className="w-5 h-5" /> }
  ];

  return (
    <div>
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 bg-neutral-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`app-transition fixed z-40 inset-y-0 left-0 w-64 lg:w-72 overflow-y-auto lg:overflow-y-auto lg:block lg:translate-x-0 lg:right-auto lg:bottom-0 ${
          darkMode ? 'bg-neutral-800 text-white' : 'bg-white text-neutral-900'
        } lg:shadow-lg ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between items-center px-5 py-6">
          <div className="flex items-center">
            <svg className="w-8 h-8 mr-2 text-primary-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,2L1,21H23M12,6L19.5,21H4.5" />
            </svg>
            <span className="text-xl font-bold">{t('app.name')}</span>
          </div>
          <button
            className="lg:hidden text-neutral-500 hover:text-neutral-400"
            onClick={() => setSidebarOpen(false)}
          >
            <span className="sr-only">Close sidebar</span>
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar content */}
        <div className="px-4 py-4">
          {/* Navigation */}
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? darkMode 
                        ? 'bg-primary-700 text-white' 
                        : 'bg-primary-100 text-primary-800'
                      : darkMode 
                        ? 'text-neutral-300 hover:bg-neutral-700 hover:text-white' 
                        : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                  }`
                }
              >
                <div className="mr-3">{item.icon}</div>
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Sidebar footer */}
        <div className={`absolute bottom-0 w-full p-4 ${darkMode ? 'border-t border-neutral-700' : 'border-t'}`}>
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full mr-2 ${Math.random() > 0.5 ? 'bg-safety-500 animate-pulse' : 'bg-warning-500'}`}></div>
            <span className="text-sm font-medium">
              {Math.random() > 0.5 ? t('status.online') : t('status.offline')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;