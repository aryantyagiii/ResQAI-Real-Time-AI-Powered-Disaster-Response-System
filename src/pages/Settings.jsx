import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGlobe, FaBell, FaUser, FaMapMarkedAlt, FaDatabase, FaServer, FaCog } from 'react-icons/fa';

function Settings({ darkMode }) {
  const { t, i18n } = useTranslation();
  const [settings, setSettings] = useState({
    language: i18n.language,
    notificationsEnabled: true,
    smsNotifications: true,
    pushNotifications: true,
    emailNotifications: false,
    mapDefaultView: 'satellite',
    apiKeys: {
      openWeather: '•••••••••••••••',
      twilio: '•••••••••••••••',
      googleMaps: '•••••••••••••••'
    },
    dataRetention: 90
  });
  
  const handleSettingChange = (key, value) => {
    setSettings({
      ...settings,
      [key]: value
    });
    
    // Handle language change
    if (key === 'language') {
      i18n.changeLanguage(value);
    }
  };
  
  const handleNestedSettingChange = (parentKey, childKey, value) => {
    setSettings({
      ...settings,
      [parentKey]: {
        ...settings[parentKey],
        [childKey]: value
      }
    });
  };
  
  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-2xl font-bold">{t('nav.settings')}</h1>
      
      {/* General Settings */}
      <div className={`p-5 rounded-lg shadow-md ${
        darkMode ? 'bg-neutral-800' : 'bg-white'
      }`}>
        <div className="flex items-center mb-4">
          <FaCog className="w-5 h-5 text-primary-500 mr-2" />
          <h2 className="text-lg font-semibold">General Settings</h2>
        </div>
        
        <div className="space-y-4">
          {/* Language */}
          <div>
            <div className="flex items-center mb-2">
              <FaGlobe className={`w-4 h-4 mr-2 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`} />
              <label className="text-sm font-medium">System Language</label>
            </div>
            <select
              value={settings.language}
              onChange={(e) => handleSettingChange('language', e.target.value)}
              className={`block w-full rounded-md shadow-sm ${
                darkMode 
                  ? 'bg-neutral-700 border-neutral-600 text-white' 
                  : 'bg-white border-neutral-300 text-neutral-900'
              } focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>
          
          {/* Data Retention */}
          <div>
            <div className="flex items-center mb-2">
              <FaDatabase className={`w-4 h-4 mr-2 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`} />
              <label className="text-sm font-medium">Data Retention Period (days)</label>
            </div>
            <select
              value={settings.dataRetention}
              onChange={(e) => handleSettingChange('dataRetention', parseInt(e.target.value))}
              className={`block w-full rounded-md shadow-sm ${
                darkMode 
                  ? 'bg-neutral-700 border-neutral-600 text-white' 
                  : 'bg-white border-neutral-300 text-neutral-900'
              } focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
            >
              <option value="30">30 days</option>
              <option value="60">60 days</option>
              <option value="90">90 days</option>
              <option value="180">180 days</option>
              <option value="365">1 year</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Notification Settings */}
      <div className={`p-5 rounded-lg shadow-md ${
        darkMode ? 'bg-neutral-800' : 'bg-white'
      }`}>
        <div className="flex items-center mb-4">
          <FaBell className="w-5 h-5 text-primary-500 mr-2" />
          <h2 className="text-lg font-semibold">Notification Settings</h2>
        </div>
        
        <div className="space-y-4">
          {/* Enable Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <label className="text-sm font-medium">Enable Notifications</label>
            </div>
            <div className="relative inline-block w-10 align-middle select-none">
              <input
                type="checkbox"
                id="toggle-notifications"
                className="sr-only"
                checked={settings.notificationsEnabled}
                onChange={(e) => handleSettingChange('notificationsEnabled', e.target.checked)}
              />
              <label
                htmlFor="toggle-notifications"
                className={`block h-6 rounded-full ${
                  settings.notificationsEnabled
                    ? 'bg-primary-500'
                    : darkMode ? 'bg-neutral-600' : 'bg-neutral-300'
                } cursor-pointer`}
              >
                <span
                  className={`absolute left-0 top-0 block h-6 w-6 rounded-full bg-white border border-neutral-300 transition-transform duration-200 ease-in-out ${
                    settings.notificationsEnabled ? 'transform translate-x-4' : ''
                  }`}
                ></span>
              </label>
            </div>
          </div>
          
          {/* Notification Channels */}
          <fieldset className="space-y-2" disabled={!settings.notificationsEnabled}>
            <legend className="text-sm font-medium mb-1">Notification Channels</legend>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="sms-notifications"
                checked={settings.smsNotifications}
                onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
                className={`h-4 w-4 rounded ${
                  darkMode ? 'bg-neutral-700 border-neutral-600' : 'bg-white border-neutral-300'
                } ${!settings.notificationsEnabled ? 'opacity-50' : ''}`}
              />
              <label htmlFor="sms-notifications" className="ml-2 text-sm">
                SMS Notifications
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="push-notifications"
                checked={settings.pushNotifications}
                onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                className={`h-4 w-4 rounded ${
                  darkMode ? 'bg-neutral-700 border-neutral-600' : 'bg-white border-neutral-300'
                } ${!settings.notificationsEnabled ? 'opacity-50' : ''}`}
              />
              <label htmlFor="push-notifications" className="ml-2 text-sm">
                Push Notifications
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="email-notifications"
                checked={settings.emailNotifications}
                onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                className={`h-4 w-4 rounded ${
                  darkMode ? 'bg-neutral-700 border-neutral-600' : 'bg-white border-neutral-300'
                } ${!settings.notificationsEnabled ? 'opacity-50' : ''}`}
              />
              <label htmlFor="email-notifications" className="ml-2 text-sm">
                Email Notifications
              </label>
            </div>
          </fieldset>
        </div>
      </div>
      
      {/* Map Settings */}
      <div className={`p-5 rounded-lg shadow-md ${
        darkMode ? 'bg-neutral-800' : 'bg-white'
      }`}>
        <div className="flex items-center mb-4">
          <FaMapMarkedAlt className="w-5 h-5 text-primary-500 mr-2" />
          <h2 className="text-lg font-semibold">Map Settings</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-2">Default Map View</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                className={`p-3 rounded-md text-sm text-center ${
                  settings.mapDefaultView === 'standard'
                    ? darkMode 
                      ? 'bg-primary-700 text-white' 
                      : 'bg-primary-100 text-primary-800 border-primary-300'
                    : darkMode 
                      ? 'bg-neutral-700 text-neutral-300' 
                      : 'bg-white text-neutral-700 border border-neutral-300'
                }`}
                onClick={() => handleSettingChange('mapDefaultView', 'standard')}
              >
                Standard
              </button>
              <button
                className={`p-3 rounded-md text-sm text-center ${
                  settings.mapDefaultView === 'satellite'
                    ? darkMode 
                      ? 'bg-primary-700 text-white' 
                      : 'bg-primary-100 text-primary-800 border-primary-300'
                    : darkMode 
                      ? 'bg-neutral-700 text-neutral-300' 
                      : 'bg-white text-neutral-700 border border-neutral-300'
                }`}
                onClick={() => handleSettingChange('mapDefaultView', 'satellite')}
              >
                Satellite
              </button>
              <button
                className={`p-3 rounded-md text-sm text-center ${
                  settings.mapDefaultView === 'terrain'
                    ? darkMode 
                      ? 'bg-primary-700 text-white' 
                      : 'bg-primary-100 text-primary-800 border-primary-300'
                    : darkMode 
                      ? 'bg-neutral-700 text-neutral-300' 
                      : 'bg-white text-neutral-700 border border-neutral-300'
                }`}
                onClick={() => handleSettingChange('mapDefaultView', 'terrain')}
              >
                Terrain
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* API Settings */}
      <div className={`p-5 rounded-lg shadow-md ${
        darkMode ? 'bg-neutral-800' : 'bg-white'
      }`}>
        <div className="flex items-center mb-4">
          <FaServer className="w-5 h-5 text-primary-500 mr-2" />
          <h2 className="text-lg font-semibold">API Settings</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">OpenWeather API Key</label>
            <div className="flex">
              <input
                type="password"
                value={settings.apiKeys.openWeather}
                onChange={(e) => handleNestedSettingChange('apiKeys', 'openWeather', e.target.value)}
                className={`flex-1 rounded-l-md ${
                  darkMode 
                    ? 'bg-neutral-700 border-neutral-600 text-white' 
                    : 'bg-white border-neutral-300 text-neutral-900'
                } focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
              />
              <button
                className={`px-3 py-2 rounded-r-md ${
                  darkMode 
                    ? 'bg-neutral-700 border-neutral-600 hover:bg-neutral-600 text-neutral-300' 
                    : 'bg-neutral-200 hover:bg-neutral-300 text-neutral-700'
                }`}
              >
                Edit
              </button>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium block mb-1">Twilio API Key</label>
            <div className="flex">
              <input
                type="password"
                value={settings.apiKeys.twilio}
                onChange={(e) => handleNestedSettingChange('apiKeys', 'twilio', e.target.value)}
                className={`flex-1 rounded-l-md ${
                  darkMode 
                    ? 'bg-neutral-700 border-neutral-600 text-white' 
                    : 'bg-white border-neutral-300 text-neutral-900'
                } focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
              />
              <button
                className={`px-3 py-2 rounded-r-md ${
                  darkMode 
                    ? 'bg-neutral-700 border-neutral-600 hover:bg-neutral-600 text-neutral-300' 
                    : 'bg-neutral-200 hover:bg-neutral-300 text-neutral-700'
                }`}
              >
                Edit
              </button>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium block mb-1">Google Maps API Key</label>
            <div className="flex">
              <input
                type="password"
                value={settings.apiKeys.googleMaps}
                onChange={(e) => handleNestedSettingChange('apiKeys', 'googleMaps', e.target.value)}
                className={`flex-1 rounded-l-md ${
                  darkMode 
                    ? 'bg-neutral-700 border-neutral-600 text-white' 
                    : 'bg-white border-neutral-300 text-neutral-900'
                } focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
              />
              <button
                className={`px-3 py-2 rounded-r-md ${
                  darkMode 
                    ? 'bg-neutral-700 border-neutral-600 hover:bg-neutral-600 text-neutral-300' 
                    : 'bg-neutral-200 hover:bg-neutral-300 text-neutral-700'
                }`}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Account Settings */}
      <div className={`p-5 rounded-lg shadow-md ${
        darkMode ? 'bg-neutral-800' : 'bg-white'
      }`}>
        <div className="flex items-center mb-4">
          <FaUser className="w-5 h-5 text-primary-500 mr-2" />
          <h2 className="text-lg font-semibold">Account Settings</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div>
              <h3 className="font-medium">Admin Account</h3>
              <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>admin@resqai.com</p>
            </div>
            <div className="mt-2 sm:mt-0">
              <button className={`text-sm px-3 py-1 rounded-md ${
                darkMode 
                  ? 'bg-neutral-700 hover:bg-neutral-600' 
                  : 'bg-neutral-200 hover:bg-neutral-300'
              }`}>
                Change Password
              </button>
            </div>
          </div>
          
          <div className="pt-3 flex justify-end">
            <button className={`px-4 py-2 rounded-md font-medium text-white ${
              darkMode 
                ? 'bg-primary-700 hover:bg-primary-600' 
                : 'bg-primary-600 hover:bg-primary-700'
            }`}>
              Save All Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;