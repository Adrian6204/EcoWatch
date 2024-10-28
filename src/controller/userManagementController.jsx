import axios from 'axios';
import { userManagementState } from '../zustand/userManagementState';

const API_URL = process.env.REACT_APP_API_URL;


const handleLoginSignup = async (e, formData, endpoint, setDisplayError) => {
  e.preventDefault();
  console.log(`${API_URL}${endpoint}`)
  try {
    const response = await axios.post(`${API_URL}${endpoint}`, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response; 
  } catch (error) {
    setDisplayError('Incorrect credentials. Please try again.');
  } 
};


export const handleSignUp = (e, formData, setError) => {
  return handleLoginSignup(e, formData, '/user', setError);
};

export const handleSignIn = (e, formData, setError) => {
  return handleLoginSignup(e, formData, '/user/login', setError);
};

export const handleUpdateProfile = async (formData, setLoading, setDisplayFeedbackMessage, onClose) => {
  const userId = userManagementState.getState().user.userId; 
  const url = `${API_URL}/user/update-user`;

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
  const url = `${API_URL}/user/delete/${userId}?userId=${userId}`;
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
