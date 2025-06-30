import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaBell, FaSms, FaMobile, FaGlobe } from 'react-icons/fa';

function AlertForm({ darkMode, onSubmit }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    area: '',
    type: 'flood',
    message: '',
    language: 'en',
    channel: 'both'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className={`p-5 rounded-lg shadow-md ${
      darkMode ? 'bg-neutral-800' : 'bg-white'
    }`}>
      <div className="flex items-center mb-4">
        <FaBell className="w-5 h-5 text-primary-500 mr-2" />
        <h3 className="text-lg font-medium">{t('alerts.newAlert')}</h3>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Area Selection */}
          <div>
            <label className={`block text-sm font-medium mb-1 ${
              darkMode ? 'text-neutral-300' : 'text-neutral-700'
            }`}>
              {t('alerts.selectArea')}
            </label>
            <select
              name="area"
              value={formData.area}
              onChange={handleChange}
              className={`block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 ${
                darkMode 
                  ? 'bg-neutral-700 border-neutral-600 text-white' 
                  : 'bg-white border-neutral-300 text-neutral-900'
              }`}
              required
            >
              <option value="">Select an area</option>
              <option value="mumbai">Mumbai</option>
              <option value="delhi">Delhi</option>
              <option value="bengaluru">Bengaluru</option>
              <option value="chennai">Chennai</option>
              <option value="kolkata">Kolkata</option>
            </select>
          </div>
          
          {/* Alert Type */}
          <div>
            <label className={`block text-sm font-medium mb-1 ${
              darkMode ? 'text-neutral-300' : 'text-neutral-700'
            }`}>
              {t('alerts.alertType')}
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 ${
                darkMode 
                  ? 'bg-neutral-700 border-neutral-600 text-white' 
                  : 'bg-white border-neutral-300 text-neutral-900'
              }`}
              required
            >
              <option value="flood">{t('disasters.flood')}</option>
              <option value="earthquake">{t('disasters.earthquake')}</option>
              <option value="hurricane">{t('disasters.hurricane')}</option>
              <option value="wildfire">{t('disasters.wildfire')}</option>
              <option value="tsunami">{t('disasters.tsunami')}</option>
              <option value="landslide">{t('disasters.landslide')}</option>
            </select>
          </div>
          
          {/* Alert Message */}
          <div>
            <label className={`block text-sm font-medium mb-1 ${
              darkMode ? 'text-neutral-300' : 'text-neutral-700'
            }`}>
              {t('alerts.alertMessage')}
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="3"
              className={`block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 ${
                darkMode 
                  ? 'bg-neutral-700 border-neutral-600 text-white' 
                  : 'bg-white border-neutral-300 text-neutral-900'
              }`}
              required
              placeholder="Enter alert message..."
            ></textarea>
          </div>
          
          {/* Language */}
          <div>
            <label className={`block text-sm font-medium mb-1 ${
              darkMode ? 'text-neutral-300' : 'text-neutral-700'
            }`}>
              {t('alerts.alertLanguage')}
            </label>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, language: 'en' })}
                className={`flex-1 py-2 px-3 rounded-md flex items-center justify-center ${
                  formData.language === 'en'
                    ? darkMode 
                      ? 'bg-primary-700 text-white' 
                      : 'bg-primary-100 text-primary-800 border-primary-300'
                    : darkMode 
                      ? 'bg-neutral-700 text-neutral-300' 
                      : 'bg-white text-neutral-700 border border-neutral-300'
                }`}
              >
                <FaGlobe className="w-4 h-4 mr-1" />
                <span>English</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, language: 'es' })}
                className={`flex-1 py-2 px-3 rounded-md flex items-center justify-center ${
                  formData.language === 'es'
                    ? darkMode 
                      ? 'bg-primary-700 text-white' 
                      : 'bg-primary-100 text-primary-800 border-primary-300'
                    : darkMode 
                      ? 'bg-neutral-700 text-neutral-300' 
                      : 'bg-white text-neutral-700 border border-neutral-300'
                }`}
              >
                <FaGlobe className="w-4 h-4 mr-1" />
                <span>Español</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, language: 'hi' })}
                className={`flex-1 py-2 px-3 rounded-md flex items-center justify-center ${
                  formData.language === 'hi'
                    ? darkMode 
                      ? 'bg-primary-700 text-white' 
                      : 'bg-primary-100 text-primary-800 border-primary-300'
                    : darkMode 
                      ? 'bg-neutral-700 text-neutral-300' 
                      : 'bg-white text-neutral-700 border border-neutral-300'
                }`}
              >
                <FaGlobe className="w-4 h-4 mr-1" />
                <span>हिन्दी</span>
              </button>
            </div>
          </div>
          
          {/* Channel */}
          <div>
            <label className={`block text-sm font-medium mb-1 ${
              darkMode ? 'text-neutral-300' : 'text-neutral-700'
            }`}>
              {t('alerts.alertChannel')}
            </label>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, channel: 'sms' })}
                className={`flex-1 py-2 px-3 rounded-md flex items-center justify-center ${
                  formData.channel === 'sms'
                    ? darkMode 
                      ? 'bg-primary-700 text-white' 
                      : 'bg-primary-100 text-primary-800 border-primary-300'
                    : darkMode 
                      ? 'bg-neutral-700 text-neutral-300' 
                      : 'bg-white text-neutral-700 border border-neutral-300'
                }`}
              >
                <FaSms className="w-4 h-4 mr-1" />
                <span>{t('alerts.sms')}</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, channel: 'push' })}
                className={`flex-1 py-2 px-3 rounded-md flex items-center justify-center ${
                  formData.channel === 'push'
                    ? darkMode 
                      ? 'bg-primary-700 text-white' 
                      : 'bg-primary-100 text-primary-800 border-primary-300'
                    : darkMode 
                      ? 'bg-neutral-700 text-neutral-300' 
                      : 'bg-white text-neutral-700 border border-neutral-300'
                }`}
              >
                <FaMobile className="w-4 h-4 mr-1" />
                <span>{t('alerts.push')}</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, channel: 'both' })}
                className={`flex-1 py-2 px-3 rounded-md flex items-center justify-center ${
                  formData.channel === 'both'
                    ? darkMode 
                      ? 'bg-primary-700 text-white' 
                      : 'bg-primary-100 text-primary-800 border-primary-300'
                    : darkMode 
                      ? 'bg-neutral-700 text-neutral-300' 
                      : 'bg-white text-neutral-700 border border-neutral-300'
                }`}
              >
                <FaBell className="w-4 h-4 mr-1" />
                <span>{t('alerts.both')}</span>
              </button>
            </div>
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-md font-medium text-white ${
              darkMode 
                ? 'bg-primary-700 hover:bg-primary-600' 
                : 'bg-primary-600 hover:bg-primary-700'
            }`}
          >
            {t('alerts.sendAlertButton')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AlertForm;