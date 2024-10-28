import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { WarningOutlined } from '@ant-design/icons';

const ErrorModal = ({ displayError, error, setDisplayError }) => {
  useEffect(() => {
    if (displayError) {
      const timer = setTimeout(() => {
        setDisplayError(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [displayError, setDisplayError]);

  return (
    <Modal open={displayError} onCancel={() => setDisplayError(false)} centered footer={null}>
      <div className="text-center m-10">
        <WarningOutlined style={{ fontSize: '40px', color: 'red', marginBottom: '10px' }} />
        <p className="text-primary">
          {error}
        </p>
      </div>
    </Modal>
  );
};

export default ErrorModal;
