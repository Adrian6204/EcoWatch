import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OtpInput = () => {
  const [otp, setOtp] = useState(new Array(5).fill(""));
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      console.log('OTP submitted:', otp.join(''));
      setLoading(false);
      navigate('/dashboard');
    }, 2000); 
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
