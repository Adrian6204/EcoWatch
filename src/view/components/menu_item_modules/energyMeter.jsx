import React, { useEffect, useState } from 'react';
import { fetchTypeConsumptionData } from '../../../controller/typeConsumptionController';

const EnergyMeter = ({ data }) => {
    const [totalWatts, setTotalWatts] = useState(0);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetchTypeConsumptionData('Electric');
                setTotalWatts(response.data);
            } catch (error) {
                console.error('Error fetching energy consumption data:', error);
            }
        };

        getData();
    }, []);

    const calculateWaterConsumption = parseInt(totalWatts);
    const value = calculateWaterConsumption;
    const paddedValue = String(value).padStart(8, '0');
    const valueArray = paddedValue.split('').map(Number);

    const electricDevices = data.filter(item => item.device.type === 'Electric');

    return (
        <div className="flex flex-col items-center">
            <div className="flex justify-center items-end h-24">
                {valueArray.map((digit, index) => {
                    const isLastThree = index >= valueArray.length - 3;
                    return (
                        <div
                            key={index}
                            className={`w-10 h-20 border border-blue-900 mx-1 flex justify-center items-center text-2xl font-bold ${
                                isLastThree ? 'bg-black text-white' : 'bg-transparent text-black'
                            } shadow-md`}
                        >
                            {digit}
                        </div>
                    );
                })}
            </div>
            <div className="mt-2 text-lg font-semibold">
                Overall Consumption: {totalWatts.toFixed(2)} watts
            </div>

            {
                data ? (
                    <div className="w-full mt-4">
                        <table className="min-w-full border-collapse border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100 border-b">
                                    <th className="px-4 py-2 border">Device</th>
                                    <th className="px-4 py-2 border">Usage</th>
                                    <th className="px-4 py-2 border">Usage (hrs)</th>
                                    <th className="px-4 py-2 border">Device Is On</th>
                                    <th className="px-4 py-2 border">Device Is Off</th>
                                </tr>
                            </thead>
                            <tbody>
                                {electricDevices.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-4 py-2 border">{item.device.deviceName}</td>
                                        <td className="px-4 py-2 border">{item.usage.toFixed(2)}</td>
                                        <td className="px-4 py-2 border">{item.usageInHrs.toFixed(2)}</td>
                                        <td className="px-4 py-2 border">{new Date(item.deviceIsOn).toLocaleString()}</td>
                                        <td className="px-4 py-2 border">{item.deviceIsOff ? new Date(item.deviceIsOff).toLocaleString() : 'N/A'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center mt-2">No data available</div>
                )
            }
        </div>
    );
};

export default EnergyMeter;
