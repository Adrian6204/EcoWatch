import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { parseISO, startOfYear, startOfMonth, startOfWeek, getWeek } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ViewReport = ({ data }) => {
  console.log('Raw Data:', data);

  const calculateConsumption = (type) => {
    const filteredData = data.filter(item => item.device.type === type);
    const consumption = filteredData.reduce((acc, curr) => acc + curr.usage, 0);
    console.log(`${type} Consumption Data:`, filteredData);
    return consumption.toFixed(2);
  };

  const groupDataByTimeframe = (timeframe) => {
    const currentTime = new Date();
    const grouped = data.reduce((acc, curr) => {
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
    console.log(`${timeframe} Grouped Data:`, grouped);
    return grouped;
  };

  const getChartData = (timeframe) => {
    const groupedData = groupDataByTimeframe(timeframe);
    const labels = Object.keys(groupedData);
    const usage = Object.values(groupedData);

    return {
      labels: labels,
      datasets: [
        {
          label: 'Usage (kWh)',
          data: usage,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const getDeviceChartData = () => {
    const devices = Array.from(new Set(data.map(item => item.device.deviceName)));
    const usage = devices.map(deviceName => {
      const deviceData = data.filter(item => item.device.deviceName === deviceName);
      console.log(`Data for ${deviceName}:`, deviceData);
      return deviceData.reduce((acc, curr) => acc + curr.usage, 0);
    });

    return {
      labels: devices,
      datasets: [
        {
          label: 'Usage (kWh)',
          data: usage,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
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
        <h2 className='text-sm font-semibold'>Electric Consumption: {electricConsumption} watts</h2>
        <h2 className='text-sm font-semibold'>Water Consumption: {waterConsumption} liters</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="chart-container">
          <div style={{ width: '100%', height: '300px' }}>
            <Bar data={getChartData('yearly')} options={chartOptions('Yearly Energy Consumption')} />
          </div>
        </div>
        <div className="chart-container">
          <div style={{ width: '100%', height: '300px' }}>
            <Bar data={getChartData('monthly')} options={chartOptions('Monthly Energy Consumption')} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="chart-container">
          <div style={{ width: '100%', height: '300px' }}>
            <Bar data={getChartData('weekly')} options={chartOptions('Weekly Energy Consumption')} />
          </div>
        </div>
        <div className="chart-container">
          <div style={{ width: '100%', height: '300px' }}>
            <Bar data={getDeviceChartData()} options={chartOptions('Energy Consumption Per Device')} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewReport;
