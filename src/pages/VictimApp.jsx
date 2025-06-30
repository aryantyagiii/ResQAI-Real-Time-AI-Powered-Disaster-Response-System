import React from 'react';
import { useTranslation } from 'react-i18next';
import PanicButton from '../components/victim/PanicButton';
import LocationSharing from '../components/victim/LocationSharing';
import UploadImage from '../components/victim/UploadImage';
import { FaPhoneAlt } from 'react-icons/fa';

function VictimApp({ darkMode }) {
  const { t } = useTranslation();
  
  const handlePanic = () => {
    console.log('Panic button pressed');
    // In a real app: Send emergency alert to backend
  };
  
  const handleLocationShare = (location) => {
    console.log('Location shared', location);
    // In a real app: Send location data to backend
  };
  
  const handleImageUpload = (imageData) => {
    console.log('Image uploaded');
    // In a real app: Send image to backend for AI analysis
  };
  
  return (
    <div className="max-w-md mx-auto">
      <div className={`p-5 rounded-t-lg shadow-md ${
        darkMode ? 'bg-neutral-800' : 'bg-white'
      }`}>
        <h1 className="text-center text-2xl font-bold mb-2">{t('victim.title')}</h1>
        <p className="text-center text-sm mb-6">
          Use this interface in emergencies to request help and share your location
        </p>
        
        {/* Panic Button */}
        <div className="mb-8 flex justify-center">
          <PanicButton darkMode={darkMode} onPanic={handlePanic} />
        </div>
        
        {/* Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Location Sharing */}
          <LocationSharing darkMode={darkMode} onLocationShare={handleLocationShare} />
          
          {/* Upload Image */}
          <UploadImage darkMode={darkMode} onImageUpload={handleImageUpload} />
        </div>
        
        {/* Emergency Call Button */}
        <div className="mt-6">
          <button 
            className={`w-full py-3 px-4 rounded-md font-medium flex items-center justify-center ${
              darkMode 
                ? 'bg-alert-700 hover:bg-alert-600 text-white' 
                : 'bg-alert-600 hover:bg-alert-700 text-white'
            }`}
          >
            <FaPhoneAlt className="w-4 h-4 mr-2" />
            <span>{t('victim.callHelp')}</span>
          </button>
        </div>
      </div>
      
      {/* Status Section */}
      <div className={`p-5 rounded-b-lg ${
        darkMode ? 'bg-neutral-700' : 'bg-neutral-100'
      }`}>
        <h2 className="font-medium mb-2">{t('victim.statusHeading')}</h2>
        
        <div className={`p-3 rounded-lg ${
          darkMode ? 'bg-primary-800 text-primary-300' : 'bg-primary-100 text-primary-800'
        }`}>
          <p className="font-medium">{t('victim.statusConfirmed')}</p>
          <p className="text-sm mt-1">Estimated arrival: ~15 minutes</p>
          <div className="mt-3 flex items-center">
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div className="bg-primary-500 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <span className="ml-2 text-xs">60%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VictimApp;