import React, { useEffect, useState } from 'react';
import { viewReportByTimeline } from '../../../controller/deviceController';

const UsageGraph = ({ data, formData }) => {
  const { fromDate, toDate, type } = formData;
  const [timelineData, setTimelineData] = useState([]);
  const formatDate = (date) => {
    return new Date(date).toISOString().split('T')[0];
  };

  const formattedFromDate = formatDate(fromDate);
  const formattedToDate = formatDate(toDate);

  useEffect(() => {
  const getData = async () => {
    try {
      const response = await viewReportByTimeline(formattedFromDate, formattedToDate, type);
      if (response && response.data) {
        setTimelineData(response.data);
      } else {
        console.error("No data returned from API");
        setTimelineData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setTimelineData([]);
    }
  };

  getData();
}, [formattedFromDate, formattedToDate, type]);


  return (
    <div>
      <table className="divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Watts</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Installation Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device On</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {timelineData.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">No data available for the selected period.</td>
            </tr>
          ) : (
            timelineData.map((device) => (
              <tr key={device.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{device.device.deviceId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{device.device.deviceName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{device.device.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{device.watts}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{device.device.installationDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{device.device.deviceOn ? 'On' : 'Off'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsageGraph;
