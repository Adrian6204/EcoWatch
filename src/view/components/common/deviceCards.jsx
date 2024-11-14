import React, { useState } from 'react';
import { Card, Space } from 'antd';
import '../static/styles/switch.css';
import { turnDeviceOff, turnDeviceOn } from '../../../controller/deviceController';
import { checkServerResponse } from './functions/commonFunctions';

const DeviceCard = ({ record, onShowModal }) => {
    const [isOn, setIsOn] = useState(record.device.deviceOn);
    const [error, setError] = useState('');

    const handleToggle = async () => {
        const newState = !isOn; 
        setIsOn(newState); 
        
        let response;
        try {
            if (newState) {
                response = await turnDeviceOn(record.device.deviceId, setError);
            } else {
                response = await turnDeviceOff(record.device.deviceId, setError);
            }
    
            if (!checkServerResponse(response)) {
                setIsOn(isOn);
                alert('Error toggling device: Server issue');
            }
        } catch (error) {
            setIsOn(isOn);
            alert('Error toggling device:', error);
        }
    };
    

    return (
        <Space direction="horizontal" size={16}>
            <Card
                title={record.device.deviceName}
                extra={<a href="#" onClick={onShowModal}>Info</a>}
                className="border-[#001529] bg-[#e6e8ea] border-1"
                style={{
                    width: 300,
                    position: 'relative',
                }}
            >
                <p>Device ID: {record.device.deviceId}</p>
                <p>Type: {record.device.type}</p>
                <div style={{
                    position: 'absolute',
                    bottom: '25px',
                    right: '25px',
                }}>
                    <label className="switch">
                        <input
                            className="cb"
                            type="checkbox"
                            checked={isOn}
                            onChange={handleToggle}
                        />
                        <span className="toggle">
                            <span className="left">off</span>
                            <span className="right">on</span>
                        </span>
                    </label>
                </div>
            </Card>
        </Space>
    );
};

export default DeviceCard;
