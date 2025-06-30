import React from 'react';
import { FaBolt, FaWater, FaFire, FaExclamationTriangle } from 'react-icons/fa';

function DisasterAlert({ alert, darkMode }) {
  const getIcon = (type) => {
    switch (type) {
      case 'earthquake':
        return <FaExclamationTriangle className="w-5 h-5" />;
      case 'flood':
        return <FaWater className="w-5 h-5" />;
      case 'wildfire':
        return <FaFire className="w-5 h-5" />;
      default:
        return <FaBolt className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'earthquake':
        return 'alert';
      case 'flood':
        return 'primary';
      case 'wildfire':
        return 'warning';
      default:
        return 'neutral';
    }
  };

  const getColorClasses = (type) => {
    const color = getTypeColor(type);
    
    switch (color) {
      case 'alert':
        return darkMode 
          ? 'bg-alert-900 border-alert-700 text-alert-300' 
          : 'bg-alert-50 border-alert-200 text-alert-700';
      case 'primary':
        return darkMode 
          ? 'bg-primary-900 border-primary-700 text-primary-300' 
          : 'bg-primary-50 border-primary-200 text-primary-700';
      case 'warning':
        return darkMode 
          ? 'bg-warning-900 border-warning-700 text-warning-300' 
          : 'bg-warning-50 border-warning-200 text-warning-700';
      default:
        return darkMode 
          ? 'bg-neutral-800 border-neutral-700 text-neutral-300' 
          : 'bg-neutral-50 border-neutral-200 text-neutral-700';
    }
  };

  const iconClass = getTypeColor(alert.type);
  const iconColorClasses = {
    alert: darkMode ? 'text-alert-500' : 'text-alert-500',
    primary: darkMode ? 'text-primary-500' : 'text-primary-500',
    warning: darkMode ? 'text-warning-500' : 'text-warning-500',
    neutral: darkMode ? 'text-neutral-500' : 'text-neutral-500',
  };

  return (
    <div className={`flex items-center p-4 mb-3 rounded-lg border ${getColorClasses(alert.type)}`}>
      <div className={`${iconColorClasses[iconClass]} mr-3`}>
        {getIcon(alert.type)}
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between">
          <h4 className="font-semibold">{alert.title}</h4>
          <span className="text-xs">{alert.time}</span>
        </div>
        <p className="text-sm mt-1">{alert.message}</p>
        
        <div className="flex items-center mt-2">
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-opacity-20 mr-2 inline-flex items-center">
            <span className={`w-2 h-2 rounded-full ${
              alert.severity === 'high' 
                ? 'bg-alert-500' 
                : alert.severity === 'medium'
                  ? 'bg-warning-500'
                  : 'bg-safety-500'
            } mr-1`}></span>
            {alert.severity === 'high' 
              ? 'High' 
              : alert.severity === 'medium'
                ? 'Medium'
                : 'Low'
            } Severity
          </span>
          <span className="text-xs">{alert.location}</span>
        </div>
      </div>
    </div>
  );
}

export default DisasterAlert;