import React, { useState, useEffect } from 'react';
import DeviceCard from '../common/deviceCards';
import ModalInfo from '../common/modals/modalInfo';
import { getAllDevices } from '../../../controller/deviceController';

const DeviceManagement = () => {
    const [devices, setDevices] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [displayError, setDisplayError] = useState('');

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const deviceList = await getAllDevices(setDisplayError);
                setDevices(deviceList);
            } catch (error) {
                console.error('Error fetching devices: ', error);
            }
        };

        fetchDevices();
    }, []);

    const showModal = (device) => {
        setSelectedDevice(device);
        setModalVisible(true);
    };

    return (
        <div className="flex flex-wrap gap-5">
            {devices ? (
                <>
                    {devices.map(record => (
                        <DeviceCard key={record.device.deviceId} record={record} onShowModal={() => showModal(record)} />
                    ))}
                    {isModalVisible && <ModalInfo device={selectedDevice} onClose={() => setModalVisible(false)} />}
                    {displayError && <div style={{ color: 'red', marginTop: '10px' }}>{displayError}</div>}
                </>
            ) : (
                <div>No devices added</div>
            )}
        </div>
    );
}

export default DeviceManagement;
