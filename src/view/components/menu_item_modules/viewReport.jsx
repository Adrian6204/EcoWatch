import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { fetchConsumptionData, processConsumptionData } from '../../../controller/consumptionController';

Chart.register(...registerables);

const ViewReport = () => {
  const [consumptionData, setConsumptionData] = useState({
    energyData: [],
    waterData: [],
    labels: [],
    monthlyEnergyConsumption: [],
    monthlyWaterConsumption: [],
    totalEnergyConsumption: 0,
    totalWaterConsumption: 0
  });

  useEffect(() => {
    const getData = async () => {
      const data = await fetchConsumptionData();
      const processedData = processConsumptionData(data);
      setConsumptionData(processedData);
    };

    getData();
  }, []);

  const {
    energyData,
    waterData,
    labels,
    monthlyEnergyConsumption,
    monthlyWaterConsumption,
    totalEnergyConsumption,
    totalWaterConsumption
  } = consumptionData;

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
        <p className="text-lg">Energy Consumption: {(totalEnergyConsumption || 0).toFixed(2)} kWh</p>
        <p className="text-lg">Water Consumption: {(totalWaterConsumption || 0).toFixed(2)} liters</p>
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
          {labels.map((label, index) => (
            <li key={index} className="mb-2">
              <span className="font-medium">{label}</span>: {(energyData[index] || waterData[index] || 0).toFixed(2)} {energyData[index] ? 'kWh' : 'liters'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewReport;
