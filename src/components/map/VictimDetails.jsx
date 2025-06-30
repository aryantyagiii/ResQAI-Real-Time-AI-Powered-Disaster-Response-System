import React from 'react';
import { FaUser, FaMapMarkerAlt, FaPhoneAlt, FaExclamationCircle, FaImage } from 'react-icons/fa';

function VictimDetails({ victim, darkMode, onClose }) {
  if (!victim) return null;

  return (
    <div className={`p-4 rounded-lg shadow-lg ${
      darkMode ? 'bg-neutral-800 text-white' : 'bg-white text-neutral-900'
    }`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Victim Details</h3>
        <button 
          onClick={onClose}
          className={`p-1 rounded-full ${
            darkMode ? 'hover:bg-neutral-700' : 'hover:bg-neutral-100'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            victim.severity === 'high' 
              ? 'bg-alert-100 text-alert-700' 
              : victim.severity === 'medium'
                ? 'bg-warning-100 text-warning-700'
                : 'bg-safety-100 text-safety-700'
          }`}>
            <FaUser className="w-6 h-6" />
          </div>
          
          <div className="ml-3">
            <h4 className="font-medium text-lg">{victim.name}</h4>
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
        </div>
        
        <div className="border-t border-b py-3 space-y-3 text-sm">
          <div className="flex items-center">
            <FaMapMarkerAlt className={`w-5 h-5 mr-2 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`} />
            <div>
              <div className={`text-xs mb-1 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>Location</div>
              <div>{victim.location}</div>
              <div className="text-xs mt-1 text-primary-500">
                {victim.lat.toFixed(6)}, {victim.lng.toFixed(6)}
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <FaPhoneAlt className={`w-5 h-5 mr-2 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`} />
            <div>
              <div className={`text-xs mb-1 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>Contact</div>
              <div>{victim.phone}</div>
            </div>
          </div>
          
          {victim.notes && (
            <div className="flex items-start">
              <FaExclamationCircle className={`w-5 h-5 mr-2 mt-1 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`} />
              <div>
                <div className={`text-xs mb-1 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>Notes</div>
                <div>{victim.notes}</div>
              </div>
            </div>
          )}
          
          {victim.image && (
            <div className="flex items-start">
              <FaImage className={`w-5 h-5 mr-2 mt-1 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`} />
              <div>
                <div className={`text-xs mb-1 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>Uploaded Image</div>
                <div className="mt-1">
                  <img 
                    src={victim.image} 
                    alt="Uploaded by victim" 
                    className="w-full rounded-lg" 
                  />
                  <div className="mt-1 text-xs text-neutral-500">
                    Uploaded at: {new Date(victim.imageTimestamp).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <h5 className="font-medium">Actions</h5>
          <div className="flex flex-wrap gap-2">
            <button className={`flex-1 py-2 rounded-md ${
              darkMode 
                ? 'bg-primary-700 hover:bg-primary-600 text-white' 
                : 'bg-primary-600 hover:bg-primary-700 text-white'
            }`}>
              Assign Team
            </button>
            <button className={`flex-1 py-2 rounded-md ${
              darkMode 
                ? 'bg-neutral-700 hover:bg-neutral-600 text-white' 
                : 'bg-neutral-200 hover:bg-neutral-300 text-neutral-800'
            }`}>
              Send Message
            </button>
          </div>
          <button className={`w-full py-2 rounded-md ${
            darkMode 
              ? 'bg-alert-700 hover:bg-alert-600 text-white' 
              : 'bg-alert-600 hover:bg-alert-700 text-white'
          }`}>
            Mark as Emergency
          </button>
        </div>
      </div>
    </div>
  );
}

export default VictimDetails;