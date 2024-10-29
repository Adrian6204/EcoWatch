import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import { deleteDevice, updateEnergyDevice, updateWaterDevice } from '../../../../controller/deviceController';
import { checkServerResponse } from '../functions/commonFunctions';

const ModalInfo = ({ device, onClose, setDisplayError }) => {
    const [loading, setLoading] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [deviceName, setDeviceName] = useState(device.device.deviceName);
    const [consumptionValue, setConsumptionValue] = useState(device.watts || device.flow_rate);

    const handleOk = async () => {
        setLoading(true);
        const deviceType = device.device.type; 
        const deviceId = device.device.deviceId;
    
        if(deviceName !== device.device.deviceName || consumptionValue !== (device.watts || device.flow_rate)) {
            const consumptionNumber = parseFloat(consumptionValue);
            const deviceDataWater = {
                device_name: deviceName,
                flow_rate: consumptionNumber
            };

            const deviceDataElectric = {
                device_name: deviceName,
                watts: consumptionNumber
            };
    
            try {
                let response;
                if (deviceType === 'Water') {
                    response = await updateWaterDevice(deviceId, deviceDataWater, setDisplayError);
                } else if (deviceType === 'Electric') {
                    response = await updateEnergyDevice(deviceId, deviceDataElectric, setDisplayError);
                }
    
                if (checkServerResponse(response)) {
                    console.log(response);
                    alert('Device updated successfully!');
                    window.location.reload();
                }
            } catch (error) {
                alert('Error updating device. Please try again.');
            }
        } else if(deviceName !== device.device.deviceName || consumptionValue !== (device.watts || device.flow_rate)) {
            alert('You need to change both device name and consumption value.');
        } else {
            alert('You have made no changes to the device.');
        }
        setLoading(false);
    };

    const handleCancel = () => {
        setIsEditable(false); 
        onClose(); 
    };

    const handleDelete = async () => {
        setLoading(true);
        const response = await deleteDevice(device.device.deviceId, setDisplayError);
        if (checkServerResponse(response)) {
            alert(response.data);
            window.location.reload();
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
                    <Button key="update" onClick={handleOk} style={{ backgroundColor: '#001529', color: 'white' }}>
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
                    <div>Device ID: {isEditable ? <Input disabled defaultValue={device.device.deviceId} /> : device.device.deviceId}</div>
                    <div>
                        Device Name: {isEditable ? (
                            <Input
                                defaultValue={device.device.deviceName}
                                onChange={(e) => setDeviceName(e.target.value)}
                            />
                        ) : (
                            device.device.deviceName
                        )}
                    </div>
                    <div>Type: {isEditable ? <Input disabled defaultValue={device.device.type} /> : device.device.type}</div>
                    <div>
                        Consumption Value: {isEditable ? (
                            <Input
                                defaultValue={device.watts || device.flow_rate}
                                onChange={(e) => setConsumptionValue(e.target.value)}
                            />
                        ) : (
                            device.watts || device.flow_rate
                        )}
                    </div>
                    <div>Installation Date: {isEditable ? <Input disabled defaultValue={device.device.installationDate} /> : device.device.installationDate}</div>
                    <div>Added By: {isEditable ? <Input disabled defaultValue={`${device.device.added_by.firstname} ${device.device.added_by.lastname}`} /> : `${device.device.added_by.firstname} ${device.device.added_by.lastname}`}</div>
                </div>
            )}
        </Modal>
    );
};

export default ModalInfo;
