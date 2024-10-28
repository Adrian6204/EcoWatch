import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { handleResetPassword } from '../../controller/userManagementController';
import { checkServerResponse } from '../components/common/functions/commonFunctions';

const OtpInput = () => {
  const location = useLocation();
  const { forgotPasswordData } = location.state || {};
  const [otp, setOtp] = useState(new Array(5).fill(""));
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [displayFeedbackMessage, setDisplayFeedbackMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    } else if (element.previousSibling && element.value === '') {
      element.previousSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedForgotPasswordData = {
      ...forgotPasswordData,
      otp: otp.join(''),
      newPassword: newPassword,
    };
    console.log(updatedForgotPasswordData);
    setLoading(true);

    try {
      const response = await handleResetPassword(
        updatedForgotPasswordData.email,
        updatedForgotPasswordData.otp,
        updatedForgotPasswordData.newPassword,
        setDisplayFeedbackMessage
      );

      if (response && checkServerResponse(response)) {
        alert(response.data);
        setLoading(false);
        navigate('/usermanagement');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error changing password:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6" style={{ color: '#001529' }}>Enter OTP</h2>
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="loader"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center mb-4 space-x-2">
              {otp.map((data, index) => {
                return (
                  <input
                    className="border border-gray-300 w-12 h-16 text-center form-control rounded"
                    type="text"
                    maxLength="1"
                    key={index}
                    value={data}
                    onChange={e => handleChange(e.target, index)}
                    onFocus={e => e.target.select()}
                  />
                );
              })}
            </div>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                id="newPassword"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            {displayFeedbackMessage && (
              <div className="text-red-500 mb-4">
                {displayFeedbackMessage}
              </div>
            )}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
              style={{ backgroundColor: '#001529' }}
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default OtpInput;
