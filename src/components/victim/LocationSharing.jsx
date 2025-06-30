import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaMapMarkerAlt, FaSpinner, FaCheck, FaTimes } from 'react-icons/fa';

function LocationSharing({ darkMode, onLocationShare }) {
  const { t } = useTranslation();
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [location, setLocation] = useState(null);
  
  const shareLocation = () => {
    setStatus('loading');
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setLocation(coords);
          setStatus('success');
          if (onLocationShare) onLocationShare(coords);
        },
        (error) => {
          console.error("Error getting location:", error);
          setStatus('error');
        },
        { enableHighAccuracy: true }
      );
    } else {
      setStatus('error');
    }
  };
  
  return (
    <div className={`p-4 rounded-lg ${
      darkMode ? 'bg-neutral-800' : 'bg-white shadow-md'
    }`}>
      <div className="flex flex-col items-center text-center">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
          status === 'idle' 
            ? darkMode ? 'bg-neutral-700' : 'bg-neutral-100'
            : status === 'loading'
              ? darkMode ? 'bg-primary-900 text-primary-300' : 'bg-primary-100 text-primary-700'
              : status === 'success'
                ? darkMode ? 'bg-safety-900 text-safety-300' : 'bg-safety-100 text-safety-700'
                : darkMode ? 'bg-alert-900 text-alert-300' : 'bg-alert-100 text-alert-700'
        }`}>
          {status === 'idle' && <FaMapMarkerAlt className="w-8 h-8" />}
          {status === 'loading' && <FaSpinner className="w-8 h-8 animate-spin" />}
          {status === 'success' && <FaCheck className="w-8 h-8" />}
          {status === 'error' && <FaTimes className="w-8 h-8" />}
        </div>
        
        <h3 className="text-lg font-medium mb-2">{t('victim.shareLocation')}</h3>
        
        {status === 'idle' && (
          <p className={`text-sm mb-3 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Share your location with rescue teams so they can find you
          </p>
        )}
        
        {status === 'loading' && (
          <p className={`text-sm mb-3 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Getting your current location...
          </p>
        )}
        
        {status === 'success' && (
          <div className="mb-3">
            <p className={`text-sm font-medium ${darkMode ? 'text-safety-400' : 'text-safety-600'}`}>
              Location shared successfully!
            </p>
            <p className="text-xs mt-1">
              Coordinates: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
            </p>
          </div>
        )}
        
        {status === 'error' && (
          <p className={`text-sm mb-3 ${darkMode ? 'text-alert-400' : 'text-alert-600'}`}>
            Could not access your location. Please try again.
          </p>
        )}
        
        {status !== 'success' && (
          <button
            onClick={shareLocation}
            disabled={status === 'loading'}
            className={`w-full py-2 px-4 rounded-md font-medium ${
              status === 'loading'
                ? darkMode ? 'bg-neutral-700 text-neutral-400' : 'bg-neutral-200 text-neutral-500'
                : darkMode 
                  ? 'bg-primary-700 hover:bg-primary-600 text-white' 
                  : 'bg-primary-600 hover:bg-primary-700 text-white'
            }`}
          >
            {status === 'loading' ? 'Sharing...' : 'Share Now'}
          </button>
        )}
        
        {status === 'success' && (
          <div className={`text-xs p-2 rounded ${
            darkMode ? 'bg-neutral-700 text-neutral-300' : 'bg-neutral-100 text-neutral-600'
          }`}>
            Rescue teams have been notified of your location
          </div>
        )}
      </div>
    </div>
  );
}

export default LocationSharing;