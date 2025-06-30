import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCamera, FaSpinner, FaCheck, FaTimes, FaImage } from 'react-icons/fa';

function UploadImage({ darkMode, onImageUpload }) {
  const { t } = useTranslation();
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [preview, setPreview] = useState(null);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setStatus('loading');
    
    // Create a preview URL
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target.result);
      setStatus('success');
      if (onImageUpload) onImageUpload(event.target.result);
    };
    reader.onerror = () => {
      setStatus('error');
    };
    reader.readAsDataURL(file);
  };
  
  const triggerFileInput = () => {
    document.getElementById('image-upload').click();
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
          {status === 'idle' && <FaCamera className="w-8 h-8" />}
          {status === 'loading' && <FaSpinner className="w-8 h-8 animate-spin" />}
          {status === 'success' && <FaCheck className="w-8 h-8" />}
          {status === 'error' && <FaTimes className="w-8 h-8" />}
        </div>
        
        <h3 className="text-lg font-medium mb-2">{t('victim.uploadPhoto')}</h3>
        
        {status === 'idle' && (
          <p className={`text-sm mb-3 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Upload a photo of the disaster area to help rescue teams assess the situation
          </p>
        )}
        
        {status === 'loading' && (
          <p className={`text-sm mb-3 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Processing your image...
          </p>
        )}
        
        {status === 'success' && (
          <p className={`text-sm mb-3 ${darkMode ? 'text-safety-400' : 'text-safety-600'}`}>
            Image uploaded successfully! Analyzing damage...
          </p>
        )}
        
        {status === 'error' && (
          <p className={`text-sm mb-3 ${darkMode ? 'text-alert-400' : 'text-alert-600'}`}>
            Failed to upload image. Please try again.
          </p>
        )}
        
        {preview && (
          <div className="w-full mb-3">
            <img 
              src={preview} 
              alt="Uploaded preview" 
              className="w-full h-auto rounded-lg object-cover"
              style={{ maxHeight: '150px' }}
            />
          </div>
        )}
        
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        
        {status !== 'success' && (
          <button
            onClick={triggerFileInput}
            disabled={status === 'loading'}
            className={`w-full py-2 px-4 rounded-md font-medium ${
              status === 'loading'
                ? darkMode ? 'bg-neutral-700 text-neutral-400' : 'bg-neutral-200 text-neutral-500'
                : darkMode 
                  ? 'bg-primary-700 hover:bg-primary-600 text-white' 
                  : 'bg-primary-600 hover:bg-primary-700 text-white'
            }`}
          >
            {status === 'loading' ? 'Uploading...' : 'Take Photo or Upload'}
          </button>
        )}
        
        {status === 'success' && (
          <div className="w-full flex space-x-2">
            <button 
              onClick={triggerFileInput}
              className={`flex-1 py-2 px-4 rounded-md font-medium ${
                darkMode 
                  ? 'bg-neutral-700 hover:bg-neutral-600 text-white' 
                  : 'bg-neutral-200 hover:bg-neutral-300 text-neutral-800'
              }`}
            >
              Upload New
            </button>
            <button 
              className={`flex-1 py-2 px-4 rounded-md font-medium ${
                darkMode 
                  ? 'bg-primary-700 hover:bg-primary-600 text-white' 
                  : 'bg-primary-600 hover:bg-primary-700 text-white'
              }`}
            >
              Send More Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadImage;