import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'antd';
import { handleUpdateProfile, handleDeleteProfile, handleChangePassword } from '../../../../controller/userManagementController';
import { useNavigate } from 'react-router-dom';
import { checkServerResponse, saveUser } from '../functions/commonFunctions';
import { addWaterDevice, addEnergyDevice, viewReportByTimeline } from '../../../../controller/deviceController';
import { DeviceModel } from '../../../../model/deviceModel';
import { useStore } from '../../../../zustand/userManagementState';
import UsageGraph from '../energyConsumptionByTimeline';

const UpdateProfile = ({ formFields, title, onClose, parent, data }) => {
  const [loading, setLoading] = useState(false);
  const [displayTimelineModal, setDisplayTimelineModal] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [displayFeedbackMessage, setDisplayFeedbackMessage] = useState('');
  const { clearUser } = useStore.getState(); 
  const formData = form.getFieldsValue();
  const initialFormValues = formFields.reduce((acc, field) => {
    acc[field.name] = field.initialValue;
    return acc;
  }, {});

  const handleOk = async (parent) => {
    if (parent === 'dropdown') {
      try {
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
        if (checkServerResponse(response)) {
          saveUser(response);
          alert('Profile updated successfully');
        }
      } catch (error) {
        console.error('Error updating profile: ', error);
      }
    } else if(parent === 'change-password') {
      try {
        const isUnchanged = Object.keys(formData).every(
          key => formData[key] === formData[key + 1]
        );
        if (isUnchanged) {
          setDisplayFeedbackMessage('Unable to change password, old password is the same with new password.');
          return;
        }
        const response = await handleChangePassword(
          formData,
          setLoading,
          setDisplayFeedbackMessage,
        );
        if (checkServerResponse(response)) {
          onClose();
          saveUser(response);
          alert('Password changed');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error changing password: ', error);
      }
    } else if (parent === 'layout') {
      try {
        const deviceType = formData.device_type;
        const deviceData = {
          ...DeviceModel,
          device_name: formData.device_name,
          added_by: useStore.getState().user.userId,
          quantity: formData.quantity,
          power: formData.power
        };

        let response;
        if (deviceType === 'water') {
          console.log("1")
          response = await addWaterDevice({
            device_name: deviceData.device_name,
            added_by: deviceData.added_by,
            quantity: deviceData.quantity,
            flow_rate: deviceData.power,
          }, setDisplayFeedbackMessage);
        } else if (deviceType === 'energy') {
          response = await addEnergyDevice({
            device_name: deviceData.device_name,
            added_by: deviceData.added_by,
            quantity: deviceData.quantity,
            watts: deviceData.power,
          }, setDisplayFeedbackMessage);  
        }

        if (checkServerResponse(response)) {
          onClose();
          alert('Device added successfully');
          window.location.reload();
        }
      } catch (error) {
        console.error('Error adding device: ', error);
      }
    } else if(parent === 'view-report') {
      setDisplayTimelineModal(true);
    }
  };  

  const handleDelete = async () => {
    try {
      const response = await handleDeleteProfile(setLoading, navigate, setDisplayFeedbackMessage, onClose);
      if (checkServerResponse(response)) {
        clearUser();
        alert('Profile deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  const handleTimelineCancel = () => {
    setDisplayTimelineModal(false)
    onClose();
  }

  return (
    displayTimelineModal ? (
    <Modal
      centered
      open={displayTimelineModal}
      title="Energy Consumption by Timeline"
      onOk={handleTimelineCancel}
      onCancel={handleTimelineCancel}
      width={770}
    >
      <UsageGraph formData={formData} data={data} />
    </Modal>
    ) : (
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
            onClick={() => handleOk(parent)}
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
    )
  );  
};

export default UpdateProfile;
