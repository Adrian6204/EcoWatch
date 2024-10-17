import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const ModalInfo = ({ device, onClose }) => {
    const [loading, setLoading] = useState(false);

    const handleOk = () => {
        setLoading(true);
    };

    return (
        <Modal
            centered
            open={true} 
            title={`${device?.name} Information`} 
            onOk={handleOk}
            onCancel={onClose}
            footer={[
                <Button
                    key="link"
                    href={`https://www.google.com/search?q=${device?.name}`}
                    type="primary"
                    loading={loading}
                    onClick={handleOk}
                >
                    Search on Google
                </Button>,
            ]}
        >
            {device && (
                <div className="grid grid-cols-2 gap-3 text-left">
                    <div>Device ID: {device.deviceID}</div>
                    <div>Type: {device.type}</div>
                    <div>Consumption Value: {device.consumptionValue}</div>
                    <div>Hours Used: {device.hoursUsed}</div>
                    <div>Author: {device.author}</div>
                </div>
            )}
        </Modal>
    );
};

export default ModalInfo;
