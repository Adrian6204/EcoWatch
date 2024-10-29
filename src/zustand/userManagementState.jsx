import create from 'zustand';

const localStorageKey = 'userManagementState';

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem(localStorageKey);
  return user ? JSON.parse(user) : null;
};

// Function to calculate totals
const calculateTotals = (data) => {
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

const saveToLocalStorage = (data) => {
  localStorage.setItem(localStorageKey, JSON.stringify(data));
};

export const useStore = create((set) => ({
  user: getUserFromLocalStorage(),
  totals: {
    Electric: 0,
    Water: 0,
    Total: 0
  },
  setUser: (userData) => {
    localStorage.setItem(localStorageKey, JSON.stringify(userData));
    set({ user: userData });
  },
  clearUser: () => {
    localStorage.removeItem(localStorageKey);
    set({ user: null });
  },
  isLoggedIn: () => !!getUserFromLocalStorage(),
  updateTotals: (data) => {
    const newTotals = calculateTotals(data);
    saveToLocalStorage({ ...getUserFromLocalStorage(), totals: newTotals });
    set({ totals: newTotals });
  },
  getTotals: () => {
    const user = getUserFromLocalStorage();
    return user?.totals || { Electric: 0, Water: 0, Total: 0 };
  }
}));
