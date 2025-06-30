import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MapComponent from '../components/map/MapComponent';
import VictimDetails from '../components/map/VictimDetails';
import { FaFilter, FaSearch, FaSortAmountDown } from 'react-icons/fa';

// Mock data for victims
const generateMockVictims = () => [
  {
    id: 1,
    name: 'Rajesh Kumar',
    location: 'Andheri East, Mumbai',
    phone: '+91 98765 43210',
    lat: 19.1176,
    lng: 72.8694,
    notes: 'Trapped in building with 3 family members. Water rising.',
    status: 'pending',
    severity: 'high',
    imageTimestamp: Date.now() - 3600000,
    image: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    location: 'Connaught Place, Delhi',
    phone: '+91 87654 32109',
    lat: 28.6315,
    lng: 77.2167,
    notes: 'Building damaged. Medical assistance needed.',
    status: 'in-progress',
    severity: 'medium',
    imageTimestamp: Date.now() - 7200000,
    image: 'https://images.pexels.com/photos/544966/pexels-photo-544966.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  },
  {
    id: 3,
    name: 'Sandeep Singh',
    location: 'Whitefield, Bengaluru',
    phone: '+91 76543 21098',
    lat: 12.9698,
    lng: 77.7500,
    notes: 'Area flooded, need evacuation',
    status: 'pending',
    severity: 'medium',
    imageTimestamp: null,
    image: null
  },
  {
    id: 4,
    name: 'Anjali Patel',
    location: 'Alipore, Kolkata',
    phone: '+91 65432 10987',
    lat: 22.5300,
    lng: 88.3311,
    notes: 'Power outage, medical devices need electricity',
    status: 'pending',
    severity: 'high',
    imageTimestamp: Date.now() - 10800000,
    image: 'https://images.pexels.com/photos/1390403/pexels-photo-1390403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  },
  {
    id: 5,
    name: 'Vikram Reddy',
    location: 'Begumpet, Hyderabad',
    phone: '+91 54321 09876',
    lat: 17.4400,
    lng: 78.4689,
    notes: null,
    status: 'in-progress',
    severity: 'low',
    imageTimestamp: null,
    image: null
  },
  {
    id: 6,
    name: 'Meera Joshi',
    location: 'Shivaji Nagar, Pune',
    phone: '+91 43210 98765',
    lat: 18.5308,
    lng: 73.8478,
    notes: 'Family of 5, including 2 children',
    status: 'pending',
    severity: 'medium',
    imageTimestamp: Date.now() - 14400000,
    image: 'https://images.pexels.com/photos/1446160/pexels-photo-1446160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  },
  {
    id: 7,
    name: 'Kabir Malhotra',
    location: 'Aundh, Pune',
    phone: '+91 32109 87654',
    lat: 18.5590,
    lng: 73.8070,
    notes: 'Needs medical assistance',
    status: 'completed',
    severity: 'low',
    imageTimestamp: null,
    image: null
  },
  {
    id: 8,
    name: 'Neha Verma',
    location: 'Kandivali, Mumbai',
    phone: '+91 21098 76543',
    lat: 19.2023,
    lng: 72.8518,
    notes: 'Building partially collapsed',
    status: 'pending',
    severity: 'high',
    imageTimestamp: Date.now() - 18000000,
    image: 'https://images.pexels.com/photos/276514/pexels-photo-276514.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  }
];

function RescueMap({ darkMode }) {
  const { t } = useTranslation();
  const victims = generateMockVictims();
  const [selectedVictim, setSelectedVictim] = useState(null);
  const [filters, setFilters] = useState({
    severity: 'all',
    status: 'all',
    search: ''
  });
  
  const filteredVictims = victims.filter(victim => {
    // Filter by severity
    if (filters.severity !== 'all' && victim.severity !== filters.severity) {
      return false;
    }
    
    // Filter by status
    if (filters.status !== 'all' && victim.status !== filters.status) {
      return false;
    }
    
    // Filter by search
    if (filters.search && !victim.name.toLowerCase().includes(filters.search.toLowerCase()) && 
        !victim.location.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  const handleSearchChange = (e) => {
    setFilters({
      ...filters,
      search: e.target.value
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <h1 className="text-2xl font-bold">{t('map.title')}</h1>
        
        <div className="mt-4 md:mt-0 flex space-x-2">
          <div className={`relative flex-1 md:w-64 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-neutral-400" />
            </div>
            <input
              type="text"
              className={`block w-full pl-10 pr-3 py-2 rounded-md ${
                darkMode 
                  ? 'bg-neutral-700 border-neutral-600 placeholder-neutral-400' 
                  : 'bg-white border-neutral-300 placeholder-neutral-500'
              } focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
              placeholder={t('map.searchPlaceholder')}
              value={filters.search}
              onChange={handleSearchChange}
            />
          </div>
          
          <select
            value={filters.severity}
            onChange={(e) => setFilters({ ...filters, severity: e.target.value })}
            className={`rounded-md ${
              darkMode 
                ? 'bg-neutral-700 border-neutral-600 text-white' 
                : 'bg-white border-neutral-300 text-neutral-900'
            } focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
          >
            <option value="all">All Severity</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className={`rounded-md ${
              darkMode 
                ? 'bg-neutral-700 border-neutral-600 text-white' 
                : 'bg-white border-neutral-300 text-neutral-900'
            } focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left: Victim List */}
        <div className="lg:col-span-1 h-[calc(100vh-200px)] overflow-y-auto pr-2">
          <div className={`p-3 rounded-lg mb-3 ${
            darkMode ? 'bg-neutral-800 text-white' : 'bg-white shadow-md text-neutral-900'
          }`}>
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Victims ({filteredVictims.length})</h3>
              <button className={`p-1 rounded ${
                darkMode ? 'hover:bg-neutral-700' : 'hover:bg-neutral-100'
              }`}>
                <FaSortAmountDown className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="space-y-3">
            {filteredVictims.map(victim => (
              <div 
                key={victim.id}
                onClick={() => setSelectedVictim(victim)}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  selectedVictim && selectedVictim.id === victim.id
                    ? darkMode 
                      ? 'bg-primary-800 text-white ring-2 ring-primary-500 ring-opacity-50' 
                      : 'bg-primary-100 text-primary-900 ring-2 ring-primary-500 ring-opacity-50'
                    : darkMode 
                      ? 'bg-neutral-800 text-white hover:bg-neutral-700' 
                      : 'bg-white shadow-md text-neutral-900 hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    victim.severity === 'high' 
                      ? 'bg-alert-500' 
                      : victim.severity === 'medium'
                        ? 'bg-warning-500'
                        : 'bg-safety-500'
                  }`}></div>
                  <span>{victim.name}</span>
                </div>
                <div className="text-sm mt-1 truncate">{victim.location}</div>
                <div className="flex justify-between items-center mt-2">
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
                  <button className={`text-xs hover:underline ${
                    darkMode ? 'text-primary-400' : 'text-primary-600'
                  }`}>
                    {t('map.viewDetails')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right: Map & Details */}
        <div className="lg:col-span-3 h-[calc(100vh-200px)] relative">
          <div className="h-full rounded-lg overflow-hidden">
            <MapComponent 
              victims={filteredVictims} 
              selectedVictim={selectedVictim}
              setSelectedVictim={setSelectedVictim}
              darkMode={darkMode}
            />
          </div>
          
          {/* Victim Details Overlay */}
          {selectedVictim && (
            <div className="absolute top-4 right-4 w-full max-w-sm">
              <VictimDetails 
                victim={selectedVictim} 
                darkMode={darkMode} 
                onClose={() => setSelectedVictim(null)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RescueMap;