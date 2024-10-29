import React, { useEffect, useState } from 'react';
import { fetchTypeConsumptionData } from '../../../controller/typeConsumptionController';

const EnergyMeter = () => {
    const [totalWatts, setTotalWatts] = useState(0);
    const [energyDevices, setEnergyDevices] = useState([]);
    const [weeklyConsumption, setWeeklyConsumption] = useState([]);

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

    //get total number of hours for electric type
    const calculateWaterConsumption = parseInt(totalWatts);
    const value = calculateWaterConsumption;
    const paddedValue = String(value).padStart(8, '0');
    const valueArray = paddedValue.split('').map(Number);

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

            <div className="mt-4">
                <h2 className="text-lg font-semibold">Weekly Energy Consumption</h2>
                <table className="mt-2 border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">Week</th>
                            <th className="border border-gray-300 p-2">Devices</th>
                            <th className="border border-gray-300 p-2">Consumption (kWh)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weeklyConsumption.map((weekData, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 p-2">{weekData.week}</td>
                                <td className="border border-gray-300 p-2">{weekData.devices}</td>
                                <td className="border border-gray-300 p-2">{weekData.consumption}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EnergyMeter;
