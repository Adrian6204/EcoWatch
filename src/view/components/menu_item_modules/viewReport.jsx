import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { devices } from '../static/sampleArr';

// Register all necessary components
Chart.register(...registerables);

const calculateTotalConsumption = (type) => {
  return devices
    .filter(device => device.type === type)
    .reduce((total, device) => total + device.consumptionValue, 0);
};

const getMonthlyConsumptionData = () => {
  const monthlyEnergyConsumption = Array(12).fill(0);
  const monthlyWaterConsumption = Array(12).fill(0);

  devices.forEach(device => {
    const monthIndex = new Date(device.dateAdded).getMonth();
    if (device.type === 'energy') {
      monthlyEnergyConsumption[monthIndex] += device.consumptionValue;
    } else if (device.type === 'water') {
      monthlyWaterConsumption[monthIndex] += device.consumptionValue;
    }
  });

  return { monthlyEnergyConsumption, monthlyWaterConsumption };
};

const getConsumptionData = () => {
  const energyData = devices.filter(device => device.type === 'energy').map(device => device.consumptionValue);
  const waterData = devices.filter(device => device.type === 'water').map(device => device.consumptionValue);
  const labels = devices.map(device => device.name);
  
  return { energyData, waterData, labels };
};

const ViewReport = () => {
  const totalEnergyConsumption = calculateTotalConsumption('energy');
  const totalWaterConsumption = calculateTotalConsumption('water');
  const { energyData, waterData, labels } = getConsumptionData();
  const { monthlyEnergyConsumption, monthlyWaterConsumption } = getMonthlyConsumptionData();

  const barData = {
    labels,
    datasets: [
      {
        label: 'Energy Consumption (kWh)',
        data: energyData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Water Consumption (liters)',
        data: waterData,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  const lineData = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
      {
        label: 'Monthly Energy Consumption (kWh)',
        data: monthlyEnergyConsumption,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Monthly Water Consumption (liters)',
        data: monthlyWaterConsumption,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false, 
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg min-h-screen">
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold">Total Consumption</h2>
        <p className="text-lg">Energy Consumption: {totalEnergyConsumption} kWh</p>
        <p className="text-lg">Water Consumption: {totalWaterConsumption} liters</p>
      </div>
      <div className="flex mt-8 space-x-4">
        <div className="w-1/2 h-64">
          <h2 className="text-xl font-semibold mb-2">Consumption Graph</h2>
          <Bar data={barData} options={options} />
        </div>
        <div className="w-1/2 h-64">
          <h2 className="text-xl font-semibold mb-2">Yearly Consumption Timeline</h2>
          <Line data={lineData} options={options} />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Detailed Consumption by Device</h2>
        <ul className="list-disc pl-6">
          {devices.map(device => (
            <li key={device.deviceID} className="mb-2">
              <span className="font-medium">{device.name}</span>: {device.consumptionValue} {device.type === 'energy' ? 'kWh' : 'liters'} (Used: {device.hoursUsed} hours)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewReport;
