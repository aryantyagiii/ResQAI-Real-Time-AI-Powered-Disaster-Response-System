import React from 'react';
import { FaUser, FaMapMarkerAlt, FaPhoneAlt, FaExclamationCircle } from 'react-icons/fa';

function RescueCase({ victim, darkMode }) {
  return (
    <div className={`p-4 rounded-lg shadow-sm mb-3 border transition-all duration-200 hover:shadow ${
      darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'
    }`}>
      <div className="flex items-center">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          victim.severity === 'high' 
            ? 'bg-alert-100 text-alert-700' 
            : victim.severity === 'medium'
              ? 'bg-warning-100 text-warning-700'
              : 'bg-safety-100 text-safety-700'
        }`}>
          <FaUser className="w-5 h-5" />
        </div>
        
        <div className="ml-3 flex-1">
          <div className="flex justify-between">
            <h4 className="font-medium">{victim.name}</h4>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              victim.status === 'pending' 
                ? darkMode ? 'bg-warning-800 text-warning-300' : 'bg-warning-100 text-warning-800'
                : victim.status === 'in-progress'
                  ? darkMode ? 'bg-primary-800 text-primary-300' : 'bg-primary-100 text-primary-800'
                  : darkMode ? 'bg-safety-800 text-safety-300' : 'bg-safety-100 text-safety-800'
            }`}>
              {victim.status === 'pending' 
                ? 'Pending' 
                : victim.status === 'in-progress'
                  ? 'In Progress'
                  : 'Rescued'
              }
            </span>
          </div>
          
          <div className="mt-2 text-sm space-y-1">
            <div className="flex items-center">
              <FaMapMarkerAlt className={`w-4 h-4 mr-1 ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`} />
              <span>{victim.location}</span>
            </div>
            
            <div className="flex items-center">
              <FaPhoneAlt className={`w-4 h-4 mr-1 ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`} />
              <span>{victim.phone}</span>
            </div>
            
            {victim.notes && (
              <div className="flex items-start">
                <FaExclamationCircle className={`w-4 h-4 mr-1 mt-0.5 ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`} />
                <span>{victim.notes}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-3 flex justify-end">
        <button className={`text-xs px-3 py-1 rounded-md mr-2 ${
          darkMode ? 'bg-neutral-700 hover:bg-neutral-600' : 'bg-neutral-100 hover:bg-neutral-200'
        }`}>
          View Details
        </button>
        <button className={`text-xs px-3 py-1 rounded-md ${
          darkMode ? 'bg-primary-700 hover:bg-primary-600 text-white' : 'bg-primary-600 hover:bg-primary-700 text-white'
        }`}>
          Assign Team
        </button>
      </div>
    </div>
  );
}

export default RescueCase;