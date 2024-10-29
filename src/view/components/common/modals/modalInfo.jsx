import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import { deleteDevice } from '../../../../controller/deviceController';
import { checkServerResponse } from '../functions/commonFunctions';

const ModalInfo = ({ device, onClose, setDisplayError }) => {
    const [loading, setLoading] = useState(false);
    const [isEditable, setIsEditable] = useState(false);

    const handleOk = () => {
        setLoading(true);
        setLoading(false); 
    };

    const handleCancel = () => {
        setIsEditable(false); 
        onClose(); 
    };

    const handleDelete = async () => {
        setLoading(true);
        const response = await deleteDevice(device.device.deviceId, setDisplayError);
        if(checkServerResponse(response)) {
            alert(response.data);
        }
        setLoading(false);
        onClose();
    };

    return (
        <Modal
            centered
            open={true} 
            title={`${device?.device.deviceName} Information`} 
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
                            href={`https://www.google.com/search?q=${device?.device.deviceName}`}
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
                        <Button key="delete" onClick={handleDelete} style={{ backgroundColor: '#001529', color: 'white' }}>
                            Delete Device
                        </Button>
                    </>
                )
            ]}
        >
            {device && (
                <div className="grid grid-cols-2 gap-3 text-left">
                    <div>Device ID: {isEditable ? <Input defaultValue={device.device.deviceId} /> : device.device.deviceId}</div>
                    <div>Type: {isEditable ? <Input defaultValue={device.device.type} /> : device.device.type}</div>
                    <div>Consumption Value: {isEditable ? <Input defaultValue={device.watts || device.flow_rate} /> : (device.watts || device.flow_rate)}</div>
                    <div>Installation Date: {isEditable ? <Input defaultValue={device.device.installationDate} /> : device.device.installationDate}</div>
                    <div>Added By: {isEditable ? <Input defaultValue={`${device.device.added_by.firstname} ${device.device.added_by.lastname}`} /> : `${device.device.added_by.firstname} ${device.device.added_by.lastname}`}</div>
                </div>
            )}
        </Modal>
    );
};

export default ModalInfo;
