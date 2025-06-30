import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaExclamationTriangle } from 'react-icons/fa';

function PanicButton({ darkMode, onPanic }) {
  const { t } = useTranslation();
  const [pressed, setPressed] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  
  const handlePanic = () => {
    if (!pressed) {
      setPressed(true);
      setTimeout(() => {
        setConfirmed(true);
        if (onPanic) onPanic();
      }, 3000);
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handlePanic}
        disabled={pressed}
        className={`w-40 h-40 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
          pressed 
            ? confirmed
              ? 'bg-safety-500 text-white scale-95'
              : 'bg-alert-600 text-white scale-110 animate-pulse'
            : 'bg-alert-500 text-white hover:bg-alert-600 active:scale-95'
        }`}
      >
        <div className="flex flex-col items-center">
          <FaExclamationTriangle className="w-12 h-12 mb-2" />
          <span className="font-bold text-lg">
            {confirmed 
              ? 'SENT'
              : pressed 
                ? 'SENDING...'
                : t('victim.panicButton')
            }
          </span>
        </div>
      </button>
      
      <div className="mt-4 text-center">
        {confirmed ? (
          <div className={`p-3 rounded-lg ${
            darkMode ? 'bg-safety-900 text-safety-300' : 'bg-safety-100 text-safety-800'
          }`}>
            <p>Emergency alert sent!</p>
            <p className="text-sm mt-1">Help is on the way.</p>
          </div>
        ) : pressed ? (
          <div className={`p-3 rounded-lg ${
            darkMode ? 'bg-alert-900 text-alert-300' : 'bg-alert-100 text-alert-800'
          }`}>
            <p>Sending emergency alert...</p>
            <p className="text-sm mt-1">Please wait.</p>
          </div>
        ) : (
          <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Press the emergency button to alert rescue teams
          </p>
        )}
      </div>
    </div>
  );
}

export default PanicButton;