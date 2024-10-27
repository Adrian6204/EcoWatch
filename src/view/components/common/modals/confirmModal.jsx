import React from 'react';
import { Modal, Button } from 'antd';

const ConfirmationModal = ({ visible, onConfirm, onCancel }) => {
  return (
    <Modal
      title="Confirm Action"
      visible={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Confirm"
      cancelText="Cancel"
      style={{ backgroundColor: '#001529', color: '#ffffff' }}
      bodyStyle={{ backgroundColor: '#001121', color: '#ffffff' }}
      footerStyle={{ backgroundColor: '#001121', color: '#ffffff' }}
    >
      <p style={{ color: '#ffffff' }}>Are you sure you want to proceed with this action?</p>
    </Modal>
  );
};

export default ConfirmationModal;
