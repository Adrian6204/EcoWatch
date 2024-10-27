import React, { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';

const FormModal = ({ formFields, title, onClose, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      onSubmit(values);
      onClose();
    } catch (error) {
      console.error('Validation Failed:', error);
    } finally {
      setLoading(false);
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

export default FormModal;
