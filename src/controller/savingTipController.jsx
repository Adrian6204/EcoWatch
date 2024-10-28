import axios from 'axios';

const API_URL = 'https://ecowatch-backend.onrender.com/api/saving-tip';

export const getSavingTip = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching saving tip:', error);
    return null;
  }
};
