import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const fetchConsumptionData = async () => {
  try {
    const response = await axios.get(`${API_URL}/consumption`);
    return response.data;
  } catch (error) {
    console.error('Error fetching consumption data:', error);
    return [];
  }
};

const processConsumptionData = (data) => {
  const energyData = [];
  const waterData = [];
  const labels = [];
  const monthlyEnergyConsumption = Array(12).fill(0);
  const monthlyWaterConsumption = Array(12).fill(0);

  data.forEach(item => {
    const { device, usage, usageInHrs } = item;
    const monthIndex = new Date(device.installationDate).getMonth();
    labels.push(device.deviceName);

    if (device.type === 'Electric') {
      energyData.push(usage);
      monthlyEnergyConsumption[monthIndex] += usage;
    } else if (device.type === 'Water') {
      waterData.push(usage);
      monthlyWaterConsumption[monthIndex] += usage;
    }
  });

  const totalEnergyConsumption = energyData.reduce((total, value) => total + value, 0);
  const totalWaterConsumption = waterData.reduce((total, value) => total + value, 0);

  return {
    energyData,
    waterData,
    labels,
    monthlyEnergyConsumption,
    monthlyWaterConsumption,
    totalEnergyConsumption,
    totalWaterConsumption
  };
};



export { fetchConsumptionData, processConsumptionData };
