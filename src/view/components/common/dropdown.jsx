import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Input } from 'antd';
import UpdateProfile from './modals/updateProfile';

const DropdownMenu = ({ label, items, onLogout }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [formFields, setFormFields] = useState([]);
  const [modalTitle, setModalTitle] = useState('');

  const handleMenuClick = (key) => {
    if (key === '1') {
      setModalTitle('Update Profile');
      setFormFields([
        {
          label: 'First Name',
          name: 'firstName',
          placeholder: 'Brynt',
          rules: [{ required: true, message: 'Please enter the first name!' }],
          component: <Input />,
        },
        {
          label: 'Last Name',
          name: 'lastName',
          placeholder: 'Pogi',
          rules: [{ required: true, message: 'Please enter the last name!' }],
          component: <Input />,
        },
        {
          label: 'Email',
          name: 'email',
          placeholder: 'brynt.dador@cit.edu',
          rules: [{ required: true, message: 'Please enter the email!', type: 'email' }],
          component: <Input />,
        },
      ]);
      setModalVisible(true);
    } else if (key === '2' && onLogout) {
      onLogout();
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleFormSubmit = (values) => {
    console.log('User added:', values);
  };

  return (
    <>
      <Dropdown
        menu={{
          items: items.map((item) => ({
            ...item,
            onClick: () => handleMenuClick(item.key),
          })),
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <div className="text-lg">{label}</div>
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
      {modalVisible && (
        <UpdateProfile
          title={modalTitle}
          formFields={formFields}
          onClose={closeModal}
          onSubmit={handleFormSubmit}
        />
      )}
    </>
  );
};

export default DropdownMenu;
