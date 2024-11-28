import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import MeshGradientBackground from '../components/common/meshGradientBackground';

const Landing = () => {
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate('/usermanagement');
    };

    return (
        <div className="relative">
            <MeshGradientBackground />
            <div className="absolute inset-0 flex items-center justify-center p-5">
                <div className="text-black text-center">
                    <h1 className="text-4xl">About Us</h1>
                    <p className="mt-10">
                        EcoWatch is a Smart Application that monitors the Energy and Water consumption for a user.
                    </p>
                    <button 
                        className="mt-4 px-4 py-2 bg-[#001529] text-white rounded hover:bg-blue-600" 
                        onClick={handleOnClick}
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Landing;
