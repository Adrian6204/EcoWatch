import React, { useState } from 'react';
import { Button, Modal, Form } from 'antd';
import { handleUpdateProfile, handleDeleteProfile } from '../../../../controller/userManagementController';
import { useNavigate } from 'react-router-dom';
import { userManagementState } from '../../../../zustand/userManagementState';

const UpdateProfile = ({ formFields, title, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [displayFeedbackMessage, setDisplayFeedbackMessage] = useState('');
  const { clearUser } = userManagementState.getState(); 
  const initialFormValues = formFields.reduce((acc, field) => {
    acc[field.name] = field.initialValue;
    return acc;
  }, {});

  const handleOk = async () => {
    try {
      const formData = form.getFieldsValue();
      
      const isUnchanged = Object.keys(formData).every(
        key => formData[key] === initialFormValues[key]
      );

      if (isUnchanged) {
        setDisplayFeedbackMessage('Unable to update profile, no profile updates were made.');
        return;
      }

      const response = await handleUpdateProfile(
        formData,
        setLoading,
        setDisplayFeedbackMessage,
        onClose,
      );

      if(response === 200) alert('Profile updated successfully');
      
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await handleDeleteProfile(setLoading, navigate, setDisplayFeedbackMessage, onClose);
      if (response === 200) {
        clearUser();
        alert('Profile deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
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
        <Form
          form={form}
          layout="vertical"
          initialValues={initialFormValues}
        >
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
          {displayFeedbackMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{displayFeedbackMessage}</div>}
        </Form>
      </Modal>    
  );
};

export default UpdateProfile;
