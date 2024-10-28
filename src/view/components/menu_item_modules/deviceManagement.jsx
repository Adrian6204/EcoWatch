import React, { useState } from 'react';
import { devices } from '../static/sampleArr';
import DeviceCard from '../common/deviceCards';
import ModalInfo from '../common/modals/modalInfo';

const DeviceManagement = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);

    const showModal = (device) => {
        setSelectedDevice(device);
        setModalVisible(true);
    };

    return (
        <div className="flex flex-wrap gap-5">
            {devices.map(record => (
                <DeviceCard key={record.deviceID} record={record} onShowModal={() => showModal(record)} />
            ))}
            {isModalVisible && <ModalInfo device={selectedDevice} onClose={() => setModalVisible(false)} />}
        </div>
    );
}

export default DeviceManagement;
