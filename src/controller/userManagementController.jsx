import axios from 'axios';
import { userManagementState } from '../zustand/userManagementState';

const handleLoginSignup = async (e, formData, url, navigate, setLoading, setDisplayError) => {
  e.preventDefault();
  
  try {
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 201 || response.status === 200) {
      userManagementState.getState().setUser(response.data); 
      navigate('/dashboard');
      return response.data; 
    }
  } catch (error) {
    setDisplayError('Incorrect credentials. Please try again.');
  } finally {
    setLoading(false);
  }
};

export const handleSignUp = (e, formData, setError, navigate, setLoading) => {
  return handleLoginSignup(e, formData, 'https://ecowatch-backend.onrender.com/api/user', setError, navigate, setLoading);
};

export const handleSignIn = (e, formData, setError, navigate, setLoading) => {
  return handleLoginSignup(e, formData, 'https://ecowatch-backend.onrender.com/api/user/login', setError, navigate, setLoading);
};

export const handleUpdateProfile = async (formData, setLoading, setDisplayError, onClose) => {
  const userId = userManagementState.getState().user.userId; 
  const url = 'https://ecowatch-backend.onrender.com/api/user/update-user';

  const updatedData = {
    userId,
    email: formData.email,
    firstname: formData.firstname,
    lastname: formData.lastname
  };

  try {
    const response = await axios.put(url, updatedData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log(response)
    if (response.status === 200) {
      userManagementState.getState().setUser(response.data);
      setLoading(false);
      onClose();
    }
  } catch (error) {
    setDisplayError('Failed to update profile. Please try again.\n' + error);
  } finally {
    setLoading(false);
  }
};
