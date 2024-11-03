import React from 'react';


const UsageGraph = ({ data, formData }) => {
  const { fromDate, toDate, type } = formData;
  
  const formatDate = (date) => {
    return new Date(date).toISOString().split('T')[0];
  };

  const formattedFromDate = formatDate(fromDate);
  const formattedToDate = formatDate(toDate);

  const filteredDevices = data.filter((item) => {
    const deviceDate = new Date(item.device.installationDate);
    return (
      item.device.type === type &&
      deviceDate >= formattedFromDate &&
      deviceDate <= formattedToDate
    );
  });

  console.log(filteredDevices)

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Installation Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device On</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device Off</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredDevices.map((device) => (
            <tr key={device.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{device.device.deviceId}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{device.device.deviceName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{device.device.type}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{device.device.installationDate}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{device.usage.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{device.deviceIsOn}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{device.deviceIsOff || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsageGraph;
