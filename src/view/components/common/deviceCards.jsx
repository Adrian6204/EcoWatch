import React from 'react';
import { Card, Space } from 'antd';
import '../static/styles/switch.css';

const DeviceCard = ({ record, onShowModal }) => (
    <Space direction="horizontal" size={16}>
        <Card
            title={record.name}
            extra={<a href="#" onClick={onShowModal}>Info</a>}
            className="border-[#001529] bg-[#e6e8ea] border-1" 
            style={{
                width: 300,
                position: 'relative', 
            }}
        >
            <p>Device ID: {record.deviceID}</p>
            <p>Type: {record.type}</p>
            <div style={{
                position: 'absolute',
                bottom: '25px',  // Position from the bottom
                right: '25px',   // Position from the right
            }}>
                <label className="switch">
                    <input className="cb" type="checkbox" />
                    <span className="toggle">
                        <span className="left">off</span>
                        <span className="right">on</span>
                    </span>
                </label>
            </div>
        </Card>
    </Space>
);

export default DeviceCard;
