import React from 'react';
import { devices } from '../static/sampleArr';

const EnergyMeter = () => {
    const energyDevices = devices.filter(device => device.type === 'energy');

    const overallConsumption = energyDevices.reduce((acc, device) => acc + (device.hoursUsed * device.consumptionValue), 0);
    const consumptionArray = overallConsumption / 1000; 
    const value = overallConsumption;
    const paddedValue = String(value).padStart(8, '0'); 
    const valueArray = paddedValue.split('').map(Number); 

    const groupByWeek = (devices) => {
        const weeks = {};
        devices.forEach(device => {
            const date = new Date(device.dateAdded);
            const week = `${date.getFullYear()}-W${Math.ceil((date.getDate() + 6 - date.getDay()) / 7)}`; 

            if (!weeks[week]) {
                weeks[week] = [];
            }
            weeks[week].push(device);
        });
        return weeks;
    };

    const weeklyDevices = groupByWeek(energyDevices);

    const weeklyConsumption = Object.entries(weeklyDevices).map(([week, devices]) => {
        const totalConsumption = devices.reduce((acc, device) => acc + (device.hoursUsed * device.consumptionValue), 0).toFixed(2); 
        return {
            week,
            devices: devices.map(device => device.name).join(', '),
            consumption: totalConsumption,
        };
    });

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
                Overall Consumption: {consumptionArray} kWh
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
