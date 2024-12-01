import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { parseISO, startOfYear, startOfMonth, startOfWeek, getWeek } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ViewReport = ({ data }) => {
  const calculateConsumption = (type) => {
    const filteredData = data.filter(item => item.device.type === type);
    const consumption = filteredData.reduce((acc, curr) => acc + curr.usage, 0);
    return consumption.toFixed(2);  
  };

  const groupDataByTimeframe = (timeframe, type) => {
    const filteredData = data.filter(item => item.device.type === type);
    const grouped = filteredData.reduce((acc, curr) => {
      const deviceOn = parseISO(curr.deviceIsOn);
      let key;
      if (timeframe === 'yearly') {
        key = startOfYear(deviceOn).getFullYear();
      } else if (timeframe === 'monthly') {
        key = `${startOfMonth(deviceOn).getFullYear()}-${startOfMonth(deviceOn).getMonth() + 1}`;
      } else if (timeframe === 'weekly') {
        key = `${startOfWeek(deviceOn, { weekStartsOn: 1 }).getFullYear()}-${getWeek(deviceOn, { weekStartsOn: 1 })}`;
      }
      acc[key] = (acc[key] || 0) + curr.usage;
      return acc;
    }, {});
    return grouped;
  };

  const getChartData = (timeframe, type) => {
    const groupedData = groupDataByTimeframe(timeframe, type);
    const labels = Object.keys(groupedData);
    const usage = Object.values(groupedData);

    return {
      labels: labels,
      datasets: [
        {
          label: `${type} Usage`,
          data: usage,
          backgroundColor: type === 'Electric' ? 'rgba(75, 192, 192, 0.6)' : 'rgba(54, 162, 235, 0.6)',
          borderColor: type === 'Electric' ? 'rgba(75, 192, 192, 1)' : 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const getDeviceChartData = (type) => {
    const devices = Array.from(new Set(data.filter(item => item.device.type === type).map(item => item.device.deviceName)));
    const usage = devices.map(deviceName => {
      const deviceData = data.filter(item => item.device.deviceName === deviceName && item.device.type === type);
      return deviceData.reduce((acc, curr) => acc + curr.usage, 0);
    });

    return {
      labels: devices,
      datasets: [
        {
          label: `${type} Usage (kWh or Liters)`,
          data: usage,
          backgroundColor: type === 'Electric' ? 'rgba(75, 192, 192, 0.6)' : 'rgba(54, 162, 235, 0.6)',
          borderColor: type === 'Electric' ? 'rgba(75, 192, 192, 1)' : 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = (title) => ({
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
  });

  const electricConsumption = calculateConsumption('Electric');
  const waterConsumption = calculateConsumption('Water');

  return (
    <div>
      <h1 className='mb-3 text-base font-semibold'>Device Usage Report</h1>
      <div className='mb-3'>
        <h2 className='text-sm font-semibold'>Electric Consumption: {electricConsumption} kWh</h2>
        <h2 className='text-sm font-semibold'>Water Consumption: {waterConsumption} Liters</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="chart-container">
          <div style={{ width: '100%', height: '300px' }}>
            <Bar data={getChartData('yearly', 'Electric')} options={chartOptions('Yearly Electric Consumption')} />
          </div>
        </div>
        <div className="chart-container">
          <div style={{ width: '100%', height: '300px' }}>
            <Bar data={getChartData('yearly', 'Water')} options={chartOptions('Yearly Water Consumption')} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="chart-container">
          <div style={{ width: '100%', height: '300px' }}>
            <Bar data={getChartData('monthly', 'Electric')} options={chartOptions('Monthly Electric Consumption')} />
          </div>
        </div>
        <div className="chart-container">
          <div style={{ width: '100%', height: '300px' }}>
            <Bar data={getChartData('monthly', 'Water')} options={chartOptions('Monthly Water Consumption')} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="chart-container">
          <div style={{ width: '100%', height: '300px' }}>
            <Bar data={getChartData('weekly', 'Electric')} options={chartOptions('Weekly Electric Consumption')} />
          </div>
        </div>
        <div className="chart-container">
          <div style={{ width: '100%', height: '300px' }}>
            <Bar data={getChartData('weekly', 'Water')} options={chartOptions('Weekly Water Consumption')} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="chart-container">
          <div style={{ width: '100%', height: '300px' }}>
            <Bar data={getDeviceChartData('Electric')} options={chartOptions('Electric Consumption Per Device')} />
          </div>
        </div>
        <div className="chart-container">
          <div style={{ width: '100%', height: '300px' }}>
            <Bar data={getDeviceChartData('Water')} options={chartOptions('Water Consumption Per Device')} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewReport;
