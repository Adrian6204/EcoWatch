import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';

const ModalInfo = ({ device, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [isEditable, setIsEditable] = useState(false);

    const handleOk = () => {
        setLoading(true);
        // Add your logic to handle the submission here
        setLoading(false); // Reset loading after submission
    };

    const handleCancel = () => {
        setIsEditable(false); 
        onClose(); 
    };

    return (
        <Modal
            centered
            open={true} 
            title={`${device?.name} Information`} 
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                isEditable ? (
                    <Button key="update" onClick={onClose} style={{ backgroundColor: '#001529', color: 'white' }}>
                        Save
                    </Button>
                ) : (
                    <>
                        <Button
                            key="search"
                            href={`https://www.google.com/search?q=${device?.name}`}
                            type="primary"
                            loading={loading}
                            onClick={handleOk}
                            style={{ backgroundColor: '#001529' }}
                        >
                            Search on Google
                        </Button>
                        <Button key="save" onClick={() => { setIsEditable(true); }} style={{ backgroundColor: '#001529', color: 'white' }}>
                            Update Device
                        </Button>
                        <Button key="delete" onClick={() => {onClose()}} style={{ backgroundColor: '#001529', color: 'white' }}>
                            Delete Device
                        </Button>
                    </>
                )
            ]}
        >
            {device && (
                <div className="grid grid-cols-2 gap-3 text-left">
                    <div>Device ID: {isEditable ? <Input defaultValue={device.deviceID} /> : device.deviceID}</div>
                    <div>Type: {isEditable ? <Input defaultValue={device.type} /> : device.type}</div>
                    <div>Consumption Value: {isEditable ? <Input defaultValue={device.consumptionValue} /> : device.consumptionValue}</div>
                    <div>Hours Used: {isEditable ? <Input defaultValue={device.hoursUsed} /> : device.hoursUsed}</div>
                    <div>Author: {isEditable ? <Input defaultValue={device.author} /> : device.author}</div>
                </div>
            )}
        </Modal>
    );
};

export default ModalInfo;
