import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { FaMapMarkerAlt, FaUser, FaPhoneAlt, FaExclamationCircle } from 'react-icons/fa';

// Customize marker icons
const createMarkerIcon = (severity) => {
  return L.divIcon({
    className: `map-marker marker-${severity}`,
    html: `<div class="flex h-full w-full items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
              <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
            </svg>
          </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

const highIcon = createMarkerIcon('high');
const mediumIcon = createMarkerIcon('medium');
const lowIcon = createMarkerIcon('low');

// Map center adjustment component
function MapController({ center }) {
  const map = useMap();
  React.useEffect(() => {
    if (center) {
      map.flyTo(center, map.getZoom());
    }
  }, [center, map]);
  return null;
}

function MapComponent({ victims, selectedVictim, setSelectedVictim, darkMode }) {
  const mapCenter = [20.5937, 78.9629]; // Center of India
  
  const getMarkerIcon = (severity) => {
    switch (severity) {
      case 'high':
        return highIcon;
      case 'medium':
        return mediumIcon;
      default:
        return lowIcon;
    }
  };

  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <MapContainer 
        center={mapCenter} 
        zoom={5} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={darkMode 
            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
        />
        
        <MapController center={selectedVictim ? [selectedVictim.lat, selectedVictim.lng] : null} />
        
        {victims.map((victim) => (
          <Marker
            key={victim.id}
            position={[victim.lat, victim.lng]}
            icon={getMarkerIcon(victim.severity)}
            eventHandlers={{
              click: () => {
                setSelectedVictim(victim);
              },
            }}
          >
            <Popup>
              <div className="w-64">
                <div className="flex items-center mb-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                    victim.severity === 'high' 
                      ? 'bg-alert-100 text-alert-700' 
                      : victim.severity === 'medium'
                        ? 'bg-warning-100 text-warning-700'
                        : 'bg-safety-100 text-safety-700'
                  }`}>
                    <FaUser className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-900">{victim.name}</h3>
                    <div className="flex items-center">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        victim.status === 'pending' 
                          ? 'bg-warning-100 text-warning-800'
                          : victim.status === 'in-progress'
                            ? 'bg-primary-100 text-primary-800'
                            : 'bg-safety-100 text-safety-800'
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
                </div>
                
                <div className="text-sm space-y-1 text-neutral-800">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="w-4 h-4 mr-1 text-neutral-500" />
                    <span>{victim.location}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <FaPhoneAlt className="w-4 h-4 mr-1 text-neutral-500" />
                    <span>{victim.phone}</span>
                  </div>
                  
                  {victim.notes && (
                    <div className="flex items-start">
                      <FaExclamationCircle className="w-4 h-4 mr-1 mt-0.5 text-neutral-500" />
                      <span>{victim.notes}</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-3 flex">
                  <button className="text-xs px-3 py-1 rounded-md bg-primary-600 hover:bg-primary-700 text-white w-full">
                    Assign Rescue Team
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapComponent;