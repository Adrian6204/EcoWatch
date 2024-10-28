import React, { useState } from 'react';
import { Button, Modal, Form } from 'antd';
import { handleUpdateProfile } from '../../../../controller/userManagementController';

const UpdateProfile = ({ formFields, title, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [displayError, setDisplayError] = useState('');

  const handleOk = async () => {
    try {
      const formData = form.getFieldsValue();
      await handleUpdateProfile(
        null, 
        formData,
        setLoading,
        setDisplayError
      );
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleDelete = () => {
    console.log('Delete action triggered');
    onClose();
  };

  return (
    <Modal
      centered
      open={true}
      title={title}
      onCancel={onClose}
      footer={[
        <Button 
          key="submit" 
          type="primary" 
          loading={loading} 
          onClick={handleOk}
          style={{ backgroundColor: '#001529' }}
        >
          Submit
        </Button>,
        title === "Update Profile" && (
          <Button
            key="delete"
            type="primary"
            danger
            style={{ color: 'white', backgroundColor: 'red' }}
            onClick={handleDelete}
          >
            Delete
          </Button>
        ),
      ]}
    >
      {displayError && <div style={{ color: 'red', marginBottom: '10px' }}>{displayError}</div>}
      <Form form={form} layout="vertical">
        {formFields.map((field) => (
          <Form.Item
            key={field.name}
            label={field.label}
            name={field.name}
            rules={field.rules}
          >
            {field.component}
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

export default UpdateProfile;
