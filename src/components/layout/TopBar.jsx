import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FaBars, 
  FaSun, 
  FaMoon, 
  FaBell, 
  FaUser,
  FaGlobe
} from 'react-icons/fa';

function TopBar({ sidebarOpen, setSidebarOpen, darkMode, toggleDarkMode }) {
  const { t, i18n } = useTranslation();
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className={`sticky top-0 z-30 ${
      darkMode ? 'bg-neutral-800 border-b border-neutral-700' : 'bg-white border-b border-neutral-200'
    }`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Left: Hamburger button */}
          <div className="flex lg:hidden">
            <button
              className={`text-neutral-500 hover:text-neutral-600 ${darkMode && 'text-white hover:text-neutral-300'}`}
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="sr-only">Open sidebar</span>
              <FaBars className="w-6 h-6" />
            </button>
          </div>

          {/* Center: Page title */}
          <div className="flex-1 text-center lg:text-left lg:ml-2">
            <h1 className="text-xl font-bold">
              {t('app.name')} <span className="hidden sm:inline-block text-sm font-normal text-neutral-500">{t('app.tagline')}</span>
            </h1>
          </div>

          {/* Right: Top bar actions */}
          <div className="flex items-center space-x-3">
            {/* Language selector */}
            <div className="relative">
              <button className={`p-2 rounded-full ${
                darkMode ? 'hover:bg-neutral-700' : 'hover:bg-neutral-100'
              }`}>
                <FaGlobe className="w-5 h-5" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                <button 
                  onClick={() => changeLanguage('en')}
                  className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 w-full text-left"
                >
                  English
                </button>
                <button 
                  onClick={() => changeLanguage('es')}
                  className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 w-full text-left"
                >
                  Español
                </button>
                <button 
                  onClick={() => changeLanguage('hi')}
                  className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 w-full text-left"
                >
                  हिन्दी
                </button>
              </div>
            </div>
            
            {/* Theme toggle */}
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${
                darkMode ? 'hover:bg-neutral-700' : 'hover:bg-neutral-100'
              }`}
            >
              {darkMode ? (
                <FaSun className="w-5 h-5" />
              ) : (
                <FaMoon className="w-5 h-5" />
              )}
            </button>
            
            {/* Notifications */}
            <button className={`p-2 rounded-full ${
              darkMode ? 'hover:bg-neutral-700' : 'hover:bg-neutral-100'
            }`}>
              <div className="relative">
                <FaBell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-alert-500 rounded-full text-xs flex items-center justify-center text-white">
                  3
                </div>
              </div>
            </button>
            
            {/* User */}
            <button className={`p-2 rounded-full ${
              darkMode ? 'hover:bg-neutral-700' : 'hover:bg-neutral-100'
            }`}>
              <FaUser className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopBar;