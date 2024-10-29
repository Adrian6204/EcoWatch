import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchTypeConsumptionData = async (type) => {
    try {
        const response = await axios.get(`${API_URL}/consumption/total/{type}?type=${type}`);
        return response;
    } catch (error) {
        console.error(`Error fetching ${type} consumption data:`, error);
    }
};
