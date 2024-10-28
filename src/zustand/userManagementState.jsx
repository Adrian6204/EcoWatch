import create from 'zustand';

const localStorageKey = 'userManagementState';

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem(localStorageKey);
  return user ? JSON.parse(user) : null;
};

export const userManagementState = create((set) => ({
  user: getUserFromLocalStorage(),
  setUser: (userData) => {
    localStorage.setItem(localStorageKey, JSON.stringify(userData));
    set({ user: userData });
  },
  clearUser: () => {
    localStorage.removeItem(localStorageKey);
    set({ user: null });
  }
}));
