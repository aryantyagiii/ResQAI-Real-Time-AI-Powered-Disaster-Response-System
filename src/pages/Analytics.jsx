import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ChartComponent from '../components/analytics/ChartComponent';
import { FaChartLine, FaChartPie, FaChartBar, FaMapMarkedAlt } from 'react-icons/fa';

function Analytics({ darkMode }) {
  const { t } = useTranslation();
  const [timeRange, setTimeRange] = useState('month');
  
  // Chart data for disaster predictions
  const predictionChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Flood Risk',
        data: [65, 59, 80, 81, 56, 55, 40, 45, 60, 70, 65, 59],
        borderColor: '#1e88e5',
        backgroundColor: 'rgba(30, 136, 229, 0.2)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Earthquake Risk',
        data: [28, 48, 40, 19, 86, 27, 30, 35, 25, 20, 28, 48],
        borderColor: '#f44336',
        backgroundColor: 'rgba(244, 67, 54, 0.2)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Wildfire Risk',
        data: [15, 25, 30, 45, 60, 65, 70, 75, 60, 50, 40, 30],
        borderColor: '#ff9800',
        backgroundColor: 'rgba(255, 152, 0, 0.2)',
        fill: true,
        tension: 0.4
      }
    ],
  };
  
  // Chart data for rescue efficiency
  const rescueChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Response Time (mins)',
        data: [45, 40, 38, 35, 33, 30],
        backgroundColor: '#1e88e5',
      },
      {
        label: 'Cases Resolved',
        data: [120, 150, 180, 200, 220, 250],
        backgroundColor: '#4caf50',
      }
    ],
  };
  
  // Chart data for victim distribution by disaster type
  const victimDistributionData = {
    labels: ['Flood', 'Earthquake', 'Wildfire', 'Landslide', 'Other'],
    datasets: [
      {
        label: 'Victim Distribution',
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          'rgba(30, 136, 229, 0.8)',
          'rgba(244, 67, 54, 0.8)',
          'rgba(255, 152, 0, 0.8)',
          'rgba(76, 175, 80, 0.8)',
          'rgba(158, 158, 158, 0.8)',
        ],
        borderColor: darkMode ? '#424242' : '#ffffff',
        borderWidth: 2,
      },
    ],
  };
  
  // Chart data for response time by location
  const responseTimeData = {
    labels: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'],
    datasets: [
      {
        label: 'Avg. Response Time (mins)',
        data: [32, 45, 28, 38, 42, 30],
        backgroundColor: 'rgba(30, 136, 229, 0.8)',
        borderColor: 'rgba(30, 136, 229, 1)',
        borderWidth: 1,
      },
      {
        label: 'Target Response Time',
        data: [30, 30, 30, 30, 30, 30],
        backgroundColor: 'rgba(255, 152, 0, 0.5)',
        borderColor: 'rgba(255, 152, 0, 1)',
        type: 'line',
        fill: false,
        tension: 0.4
      }
    ],
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <h1 className="text-2xl font-bold">{t('analytics.title')}</h1>
        
        <div className="mt-4 md:mt-0">
          <div className={`inline-flex rounded-md shadow-sm ${
            darkMode ? 'bg-neutral-800' : 'bg-white'
          }`}>
            <button
              onClick={() => setTimeRange('week')}
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                timeRange === 'week'
                  ? darkMode 
                    ? 'bg-primary-700 text-white' 
                    : 'bg-primary-100 text-primary-800'
                  : darkMode 
                    ? 'text-neutral-300 hover:bg-neutral-700' 
                    : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`px-4 py-2 text-sm font-medium ${
                timeRange === 'month'
                  ? darkMode 
                    ? 'bg-primary-700 text-white' 
                    : 'bg-primary-100 text-primary-800'
                  : darkMode 
                    ? 'text-neutral-300 hover:bg-neutral-700' 
                    : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setTimeRange('year')}
              className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                timeRange === 'year'
                  ? darkMode 
                    ? 'bg-primary-700 text-white' 
                    : 'bg-primary-100 text-primary-800'
                  : darkMode 
                    ? 'text-neutral-300 hover:bg-neutral-700' 
                    : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              Year
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Disaster Predictions */}
        <div className={`p-5 rounded-lg shadow-md ${
          darkMode ? 'bg-neutral-800' : 'bg-white'
        }`}>
          <div className="flex items-center mb-4">
            <FaChartLine className="w-5 h-5 text-primary-500 mr-2" />
            <h2 className="text-lg font-semibold">{t('analytics.disasterPredictions')}</h2>
          </div>
          <div className="h-64">
            <ChartComponent 
              type="line" 
              data={predictionChartData} 
              darkMode={darkMode}
            />
          </div>
        </div>
        
        {/* Victim Distribution */}
        <div className={`p-5 rounded-lg shadow-md ${
          darkMode ? 'bg-neutral-800' : 'bg-white'
        }`}>
          <div className="flex items-center mb-4">
            <FaChartPie className="w-5 h-5 text-primary-500 mr-2" />
            <h2 className="text-lg font-semibold">{t('analytics.victimDensity')}</h2>
          </div>
          <div className="h-64">
            <ChartComponent 
              type="doughnut" 
              data={victimDistributionData} 
              darkMode={darkMode}
            />
          </div>
        </div>
        
        {/* Rescue Efficiency */}
        <div className={`p-5 rounded-lg shadow-md ${
          darkMode ? 'bg-neutral-800' : 'bg-white'
        }`}>
          <div className="flex items-center mb-4">
            <FaChartBar className="w-5 h-5 text-primary-500 mr-2" />
            <h2 className="text-lg font-semibold">{t('analytics.rescueEfficiency')}</h2>
          </div>
          <div className="h-64">
            <ChartComponent 
              type="bar" 
              data={rescueChartData} 
              darkMode={darkMode}
            />
          </div>
        </div>
        
        {/* Response Time */}
        <div className={`p-5 rounded-lg shadow-md ${
          darkMode ? 'bg-neutral-800' : 'bg-white'
        }`}>
          <div className="flex items-center mb-4">
            <FaMapMarkedAlt className="w-5 h-5 text-primary-500 mr-2" />
            <h2 className="text-lg font-semibold">{t('analytics.responseTime')}</h2>
          </div>
          <div className="h-64">
            <ChartComponent 
              type="bar" 
              data={responseTimeData} 
              darkMode={darkMode}
            />
          </div>
        </div>
      </div>
      
      {/* Heatmap (Placeholder) */}
      <div className={`p-5 rounded-lg shadow-md ${
        darkMode ? 'bg-neutral-800' : 'bg-white'
      }`}>
        <h2 className="text-lg font-semibold mb-4">Disaster Risk Heatmap</h2>
        <div className="aspect-video bg-neutral-200 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className={`text-lg font-medium ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
              Heatmap Visualization
            </div>
            <p className={`text-sm ${darkMode ? 'text-neutral-500' : 'text-neutral-500'}`}>
              Regional risk assessment based on historical data and predictive models
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;