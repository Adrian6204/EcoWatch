import React, { useState } from 'react';
import { Button, Modal, Form, Input, Select } from 'antd';
import { devices } from '../static/sampleArr';

const FormModal = ({ device, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const handleOk = async () => {
        try {
            setLoading(true);
            const values = await form.validateFields();

            const newDevice = {
                deviceID: devices.length + 1, 
                type: values.deviceType,
                name: values.deviceName,
                wattage: values.wattage,
                hoursUsed: 0, 
                author: "YourName" 
            };

            devices.push(newDevice); 

            console.log('New device added:', newDevice);
            onClose();
        } catch (error) {
            console.error('Validation Failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            centered
            open={true} 
            title={'Add Device'} 
            onOk={handleOk}
            onCancel={onClose}
            confirmLoading={loading}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Device Name"
                    name="deviceName"
                    rules={[{ required: true, message: 'Please enter the device name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Device Type"
                    name="deviceType"
                    rules={[{ required: true, message: 'Please select the device type!' }]}
                >
                    <Select placeholder="Select device type">
                        <Select.Option value="energy">Energy</Select.Option>
                        <Select.Option value="water">Water</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Wattage"
                    name="wattage"
                    rules={[{ required: true, message: 'Please enter the wattage!', type: 'number', min: 0 }]}
                >
                    <Input type="number" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default FormModal;
