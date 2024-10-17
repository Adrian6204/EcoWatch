import React from 'react';
import { Card, Space } from 'antd';

const DeviceCard = ({ record, onShowModal }) => (
    <Space direction="horizontal" size={16}>
        <Card
            title={record.name}
            extra={<a href="#" onClick={onShowModal}>Info</a>}
            className="border-[#001529] border-1" 
            style={{
                width: 300,
            }}
        >
            <p>Device ID: {record.deviceID}</p>
            <p>Type: {record.type}</p>
        </Card>
    </Space>
);

export default DeviceCard;
