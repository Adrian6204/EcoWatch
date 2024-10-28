import React from 'react';
import { Modal } from 'antd';

const LoadModal = ({loading, message}) => {
  return (
    <>
      <Modal open={loading} centered footer={null} closable={false}>
        <div class="text-center m-10">
          <div
            class="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary mx-auto"
          ></div>
          <h2 class="text-primary mt-4">Loading...</h2>
          <p class="text-primary">
            {message}
          </p>
        </div>
      </Modal>
    </>
  );
};
export default LoadModal;