import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

function ChartComponent({ type, data, options, darkMode }) {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: darkMode ? '#e0e0e0' : '#212121',
          font: {
            family: "'Inter', sans-serif",
          }
        }
      },
      tooltip: {
        backgroundColor: darkMode ? '#424242' : '#fff',
        titleColor: darkMode ? '#e0e0e0' : '#212121',
        bodyColor: darkMode ? '#e0e0e0' : '#212121',
        borderColor: darkMode ? '#616161' : '#e0e0e0',
        borderWidth: 1,
        boxPadding: 6,
        usePointStyle: true,
        bodyFont: {
          family: "'Inter', sans-serif",
        },
        titleFont: {
          family: "'Inter', sans-serif",
          weight: 'bold'
        }
      }
    },
    scales: type !== 'pie' && type !== 'doughnut' ? {
      x: {
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: darkMode ? '#9e9e9e' : '#616161',
          font: {
            family: "'Inter', sans-serif",
          }
        }
      },
      y: {
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: darkMode ? '#9e9e9e' : '#616161',
          font: {
            family: "'Inter', sans-serif",
          }
        }
      }
    } : undefined
  };

  const mergedOptions = { ...defaultOptions, ...options };

  const renderChart = () => {
    switch (type) {
      case 'line':
        return <Line data={data} options={mergedOptions} />;
      case 'bar':
        return <Bar data={data} options={mergedOptions} />;
      case 'pie':
        return <Pie data={data} options={mergedOptions} />;
      case 'doughnut':
        return <Doughnut data={data} options={mergedOptions} />;
      default:
        return <Line data={data} options={mergedOptions} />;
    }
  };

  return (
    <div className="w-full h-full">
      {renderChart()}
    </div>
  );
}

export default ChartComponent;