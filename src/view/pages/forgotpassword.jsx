import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleForgotPassword } from '../../controller/userManagementController';
import { checkServerResponse } from '../components/common/functions/commonFunctions';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [enableBtn, setEnableBtn] = useState(true);
  const [displayFeedbackMessage, setDisplayFeedbackMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnableBtn(false);
    const response = await handleForgotPassword(email, setDisplayFeedbackMessage);
    if (checkServerResponse(response)) {
      const forgotPasswordData = {
        email: email,
        otp: '',
        newPassword: '',
      };
      navigate('/otp', { state: { forgotPasswordData } });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6" style={{ color: '#001529' }}>Forgot Password</h2>
        {enableBtn ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={!enableBtn}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
              style={{ backgroundColor: '#001529' }}
            >
              Submit
            </button>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-lg font-medium" style={{ color: '#001529' }}>{displayFeedbackMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
