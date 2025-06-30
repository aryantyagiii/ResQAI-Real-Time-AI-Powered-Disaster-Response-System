import React from 'react';

function StatCard({ title, value, icon, color, darkMode, change }) {
  const colorClasses = {
    primary: darkMode ? 'bg-primary-800 text-primary-200' : 'bg-primary-100 text-primary-700',
    alert: darkMode ? 'bg-alert-800 text-alert-200' : 'bg-alert-100 text-alert-700',
    warning: darkMode ? 'bg-warning-800 text-warning-200' : 'bg-warning-100 text-warning-700',
    safety: darkMode ? 'bg-safety-800 text-safety-200' : 'bg-safety-100 text-safety-700',
  };
  
  const IconWrapper = ({ color }) => (
    <div className={`flex items-center justify-center p-3 rounded-lg ${colorClasses[color]}`}>
      {icon}
    </div>
  );

  return (
    <div className={`rounded-lg shadow-md p-5 ${
      darkMode ? 'bg-neutral-800 text-white' : 'bg-white text-neutral-900'
    } transition-all duration-200 hover:shadow-lg`}>
      <div className="flex items-center">
        <IconWrapper color={color} />
        <div className="ml-4">
          <h3 className={`text-sm font-medium ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>{title}</h3>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold">{value}</p>
            {change && (
              <p className={`ml-2 text-sm font-medium ${
                change.startsWith('+') 
                  ? 'text-safety-500' 
                  : change.startsWith('-') 
                    ? 'text-alert-500' 
                    : 'text-neutral-500'
              }`}>
                {change}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatCard;