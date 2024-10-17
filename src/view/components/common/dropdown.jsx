import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

const DropdownMenu = ({ label, items, onLogout }) => {
  const handleMenuClick = (key) => {
    if (key === '2' && onLogout) {
      onLogout();  
    }
  };

  return (
    <Dropdown
      menu={{
        items: items.map(item => ({
          ...item,
          onClick: () => handleMenuClick(item.key),
        })),
      }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <div className='text-lg'>
            {label}
          </div>
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default DropdownMenu;
