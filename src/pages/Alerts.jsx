import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AlertForm from '../components/alerts/AlertForm';
import { FaBell, FaWater, FaExclamationTriangle, FaFire, FaUser, FaUsers } from 'react-icons/fa';

// Mock alert history data
const generateAlertHistory = () => [
  {
    id: 1,
    title: 'Flash Flood Alert',
    message: 'Heavy rainfall expected in Mumbai region over the next 48 hours. Risk of flash floods in low-lying areas.',
    type: 'flood',
    area: 'Mumbai',
    recipients: 15467,
    status: 'sent',
    time: '2023-07-10 14:25',
    channels: ['sms', 'push']
  },
  {
    id: 2,
    title: 'Earthquake Warning',
    message: 'Seismic activity detected near Delhi. 5.2 magnitude earthquake possible within 24 hours.',
    type: 'earthquake',
    area: 'Delhi NCR',
    recipients: 23589,
    status: 'sent',
    time: '2023-07-09 08:35',
    channels: ['sms', 'push']
  },
  {
    id: 3,
    title: 'Wildfire Alert',
    message: 'Wildfire reported near Shimla. Residents advised to evacuate immediately.',
    type: 'wildfire',
    area: 'Shimla, Himachal Pradesh',
    recipients: 3742,
    status: 'sent',
    time: '2023-07-08 17:15',
    channels: ['push']
  },
  {
    id: 4,
    title: 'Cyclone Warning',
    message: 'Cyclone approaching coastal regions of Tamil Nadu. Expected landfall within 48 hours.',
    type: 'cyclone',
    area: 'Coastal Tamil Nadu',
    recipients: 8976,
    status: 'sent',
    time: '2023-07-05 09:45',
    channels: ['sms', 'push']
  },
  {
    id: 5,
    title: 'Landslide Alert',
    message: 'Heavy rainfall increasing risk of landslides in hilly regions of Uttarakhand.',
    type: 'landslide',
    area: 'Uttarakhand',
    recipients: 6254,
    status: 'sent',
    time: '2023-07-02 13:20',
    channels: ['sms']
  }
];

function Alerts({ darkMode }) {
  const { t } = useTranslation();
  const [alertHistory, setAlertHistory] = useState(generateAlertHistory());
  
  const getAlertIcon = (type) => {
    switch (type) {
      case 'flood':
        return <FaWater className="w-5 h-5" />;
      case 'earthquake':
        return <FaExclamationTriangle className="w-5 h-5" />;
      case 'wildfire':
        return <FaFire className="w-5 h-5" />;
      default:
        return <FaBell className="w-5 h-5" />;
    }
  };
  
  const getTypeColor = (type) => {
    switch (type) {
      case 'flood':
        return 'primary';
      case 'earthquake':
        return 'alert';
      case 'wildfire':
        return 'warning';
      default:
        return 'neutral';
    }
  };
  
  const handleSubmitAlert = (formData) => {
    const newAlert = {
      id: Date.now(),
      title: `${formData.type.charAt(0).toUpperCase() + formData.type.slice(1)} Alert`,
      message: formData.message,
      type: formData.type,
      area: formData.area,
      recipients: Math.floor(Math.random() * 10000) + 5000,
      status: 'sending',
      time: new Date().toISOString().slice(0, 16).replace('T', ' '),
      channels: formData.channel === 'both' ? ['sms', 'push'] : [formData.channel]
    };
    
    setAlertHistory([newAlert, ...alertHistory]);
    
    // Simulate sending
    setTimeout(() => {
      setAlertHistory(prev => 
        prev.map(alert => 
          alert.id === newAlert.id 
            ? { ...alert, status: 'sent' } 
            : alert
        )
      );
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('alerts.title')}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alert Form */}
        <div className="lg:col-span-1">
          <AlertForm darkMode={darkMode} onSubmit={handleSubmitAlert} />
        </div>
        
        {/* Alert History */}
        <div className="lg:col-span-2">
          <div className={`p-5 rounded-lg shadow-md ${
            darkMode ? 'bg-neutral-800' : 'bg-white'
          }`}>
            <h2 className="text-lg font-semibold mb-4">Alert History</h2>
            
            <div className="space-y-4">
              {alertHistory.map(alert => {
                const color = getTypeColor(alert.type);
                const colorClasses = {
                  primary: darkMode 
                    ? 'bg-primary-900 border-primary-700 text-primary-300' 
                    : 'bg-primary-50 border-primary-200 text-primary-700',
                  alert: darkMode 
                    ? 'bg-alert-900 border-alert-700 text-alert-300' 
                    : 'bg-alert-50 border-alert-200 text-alert-700',
                  warning: darkMode 
                    ? 'bg-warning-900 border-warning-700 text-warning-300' 
                    : 'bg-warning-50 border-warning-200 text-warning-700',
                  neutral: darkMode 
                    ? 'bg-neutral-800 border-neutral-700 text-neutral-300' 
                    : 'bg-neutral-50 border-neutral-200 text-neutral-700',
                };
                
                return (
                  <div 
                    key={alert.id} 
                    className={`p-4 rounded-lg border ${colorClasses[color]}`}
                  >
                    <div className="flex">
                      <div className="mr-3">
                        {getAlertIcon(alert.type)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-semibold">{alert.title}</h3>
                          <div className="flex items-center">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              alert.status === 'sending'
                                ? darkMode ? 'bg-primary-800 text-primary-300 animate-pulse' : 'bg-primary-100 text-primary-800 animate-pulse'
                                : darkMode ? 'bg-safety-800 text-safety-300' : 'bg-safety-100 text-safety-800'
                            }`}>
                              {alert.status === 'sending' ? 'Sending...' : 'Sent'}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-sm mt-1">{alert.message}</p>
                        
                        <div className="flex flex-wrap items-center mt-2 text-xs">
                          <div className="mr-3 flex items-center">
                            <FaUsers className="w-3 h-3 mr-1" />
                            <span>{alert.recipients.toLocaleString()} recipients</span>
                          </div>
                          
                          <div className="mr-3">
                            <span>Area: {alert.area}</span>
                          </div>
                          
                          <div className="mr-3">
                            <span>Time: {alert.time}</span>
                          </div>
                          
                          <div className="flex space-x-1 mt-1 md:mt-0">
                            <span>Via:</span>
                            {alert.channels.includes('sms') && (
                              <span className={`px-1 rounded ${
                                darkMode ? 'bg-neutral-700' : 'bg-neutral-200'
                              }`}>SMS</span>
                            )}
                            {alert.channels.includes('push') && (
                              <span className={`px-1 rounded ${
                                darkMode ? 'bg-neutral-700' : 'bg-neutral-200'
                              }`}>Push</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Alerts;