import React from 'react';
import { useTranslation } from 'react-i18next';
import StatCard from '../components/dashboard/StatCard';
import DisasterAlert from '../components/dashboard/DisasterAlert';
import RescueCase from '../components/dashboard/RescueCase';
import ChartComponent from '../components/analytics/ChartComponent';
import { 
  FaUsers, 
  FaRunning, 
  FaCheckCircle, 
  FaBell
} from 'react-icons/fa';

// Mock Data
const generateMockAlerts = () => [
  {
    id: 1,
    title: 'Flash Flood Alert',
    message: 'Heavy rainfall expected in Mumbai region over the next 48 hours. Risk of flash floods in low-lying areas.',
    type: 'flood',
    severity: 'high',
    location: 'Mumbai, Maharashtra',
    time: '15 min ago'
  },
  {
    id: 2,
    title: 'Earthquake Warning',
    message: 'Seismic activity detected near Delhi. 5.2 magnitude earthquake possible within 24 hours.',
    type: 'earthquake',
    severity: 'medium',
    location: 'Delhi NCR',
    time: '1 hr ago'
  },
  {
    id: 3,
    title: 'Wildfire Alert',
    message: 'Wildfire reported near Shimla. Residents advised to evacuate immediately.',
    type: 'wildfire',
    severity: 'high',
    location: 'Shimla, Himachal Pradesh',
    time: '3 hrs ago'
  }
];

const generateMockVictims = () => [
  {
    id: 1,
    name: 'Rajesh Kumar',
    location: 'Andheri East, Mumbai',
    phone: '+91 98765 43210',
    notes: 'Trapped in building with 3 family members. Water rising.',
    status: 'pending',
    severity: 'high'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    location: 'Connaught Place, Delhi',
    phone: '+91 87654 32109',
    notes: 'Building damaged. Medical assistance needed.',
    status: 'in-progress',
    severity: 'medium'
  },
  {
    id: 3,
    name: 'Sandeep Singh',
    location: 'Whitefield, Bengaluru',
    phone: '+91 76543 21098',
    notes: null,
    status: 'completed',
    severity: 'low'
  }
];

function Dashboard({ darkMode }) {
  const { t } = useTranslation();
  const alerts = generateMockAlerts();
  const victims = generateMockVictims();
  
  // Chart data for predictions
  const predictionChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Flood Risk',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: '#1e88e5',
        backgroundColor: 'rgba(30, 136, 229, 0.2)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Earthquake Risk',
        data: [28, 48, 40, 19, 86, 27],
        borderColor: '#f44336',
        backgroundColor: 'rgba(244, 67, 54, 0.2)',
        fill: true,
        tension: 0.4
      }
    ],
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-6">{t('dashboard.title')}</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title={t('dashboard.activeCases')} 
            value="127" 
            icon={<FaUsers className="w-5 h-5" />} 
            color="primary" 
            darkMode={darkMode}
            change="+12"
          />
          <StatCard 
            title={t('dashboard.pendingRescues')} 
            value="43" 
            icon={<FaRunning className="w-5 h-5" />} 
            color="warning" 
            darkMode={darkMode}
            change="+8"
          />
          <StatCard 
            title={t('dashboard.completedRescues')} 
            value="84" 
            icon={<FaCheckCircle className="w-5 h-5" />} 
            color="safety" 
            darkMode={darkMode}
            change="+4"
          />
          <StatCard 
            title={t('dashboard.disasterAlerts')} 
            value="7" 
            icon={<FaBell className="w-5 h-5" />} 
            color="alert" 
            darkMode={darkMode}
            change="+2"
          />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Alerts */}
        <div className="lg:col-span-1">
          <div className={`p-5 rounded-lg shadow-md ${
            darkMode ? 'bg-neutral-800' : 'bg-white'
          }`}>
            <h2 className="text-lg font-semibold mb-4">Recent Alerts</h2>
            <div className="space-y-2">
              {alerts.map(alert => (
                <DisasterAlert key={alert.id} alert={alert} darkMode={darkMode} />
              ))}
            </div>
          </div>
        </div>
        
        {/* Right: Predictions and Active Cases */}
        <div className="lg:col-span-2 space-y-6">
          {/* Predictions Chart */}
          <div className={`p-5 rounded-lg shadow-md ${
            darkMode ? 'bg-neutral-800' : 'bg-white'
          }`}>
            <h2 className="text-lg font-semibold mb-4">Disaster Predictions - Next 30 Days</h2>
            <div className="h-64">
              <ChartComponent 
                type="line" 
                data={predictionChartData} 
                darkMode={darkMode}
              />
            </div>
          </div>
          
          {/* Active Cases */}
          <div className={`p-5 rounded-lg shadow-md ${
            darkMode ? 'bg-neutral-800' : 'bg-white'
          }`}>
            <h2 className="text-lg font-semibold mb-4">Active Cases</h2>
            <div className="space-y-2">
              {victims.map(victim => (
                <RescueCase key={victim.id} victim={victim} darkMode={darkMode} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;