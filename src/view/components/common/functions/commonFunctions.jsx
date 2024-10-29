import { useStore } from "../../../../zustand/userManagementState";

export const validateForm = (formData, fields) => {
    for (const field of fields) {
      if (!formData[field]) {
        return `Please input all required fields.`;
      }
    }
    return '';
  };
  
export const checkServerResponse = (response) => {
  if (response) {
    if (response.status === 201 || response.status === 200 ) return true; 
  }
}

export const saveUser = (response) => {
  useStore.getState().setUser(response.data); 
}

export const calculateTotals = (data) => {
  const totals = {
    Electric: 0,
    Water: 0,
    Total: 0
  };

  data.forEach(entry => {
    const usageInHours = entry.usageInHrs;
    const deviceType = entry.device.type;

    if (deviceType === 'Electric') {
      totals.Electric += usageInHours;
    } else if (deviceType === 'Water') {
      totals.Water += usageInHours;
    }

    totals.Total += usageInHours;
  });

  return totals;
};