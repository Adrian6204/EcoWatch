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

export const handleUpdateProfile = async (formData, setLoading, setDisplayFeedbackMessage, onClose) => {
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

    if (response.status === 200) {
      userManagementState.getState().setUser(response.data);
      setDisplayFeedbackMessage('Profile updated successfully!');
      setLoading(false);
      onClose();
      return response.status;
    }
  } catch (error) {
    setDisplayFeedbackMessage('Failed to update profile. Please try again.\n' + error);
  } finally {
    setLoading(false);
  }
};

export const handleDeleteProfile = async (setLoading, navigate, setDisplayFeedbackMessage, onClose) => {
  const userId = userManagementState.getState().user.userId; 
  const url = `https://ecowatch-backend.onrender.com/api/user/delete/{userId}?userId=${userId}`;
  const { clearUser } = userManagementState.getState(); 

  try {
    setLoading(true);
    const response = await axios.delete(url);

    if (response.status === 200) {
      clearUser();
      setDisplayFeedbackMessage('Profile deleted successfully!');
      navigate('/usermanagement') 
      onClose();
    }
  } catch (error) {
    setDisplayFeedbackMessage('Failed to delete profile. Please try again.\n' + error);
  } finally {
    setLoading(false);
  }
};
