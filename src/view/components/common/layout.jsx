import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined 
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Typography } from 'antd';
import earthLogo from '../static/save-earth.svg'; 
import DropdownMenu from './dropdown';
import DeviceManagement from '../menu_item_modules/deviceManagement'; 
import WaterMeter from '../menu_item_modules/waterMeter'; 
import EnergyMeter from '../menu_item_modules/energyMeter'; 
import ViewReport from '../menu_item_modules/viewReport';
import ViewHistory from '../menu_item_modules/viewHistory'; 

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1'); 
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (key) => {
    setSelectedKey(key);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case '1':
        return <DeviceManagement />;
      case '2':
        return <WaterMeter />;
      case '3':
        return <EnergyMeter />;
      case '4':
        return <ViewReport />;
      case '5':
        return <ViewHistory />;
      default:
        return null;
    }
  };

  const items = [
    {
      key: '1',
      label: 'Profile',
    },
    {
      key: '2',
      label: 'Logout',
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <div style={{ padding: '16px', color: '#fff', textAlign: 'center' }}>
          {collapsed ? 
            <img src={earthLogo} alt='earth-logo' style={{ width: '40px', height: '40px' }} /> 
            :
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={earthLogo} alt='earth-logo' style={{ width: '40px', height: '40px', marginRight: '8px' }} />
              <Title level={3} style={{ margin: 0, color: '#fff' }}>
                EcoWatch
              </Title>
            </div>
          }
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => handleMenuClick(key)}
          items={[
            {
              key: '1',
              label: 'Manage Device',
            },
            {
              key: '2',
              label: 'Water Meter',
            },
            {
              key: '3',
              label: 'Energy Meter',
            },
            {
              key: '4',
              label: 'View Report',
            },
            {
              key: '5',
              label: 'View History',
            },
          ]}
        />
      </Sider>
      <Layout>
      <Header
        style={{
          padding: 0,
          background: colorBgContainer,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        />
        <div style={{ marginLeft: 'auto', marginRight: '16px', display: 'flex', alignItems: 'center' }}>
          <UserOutlined style={{ marginRight: '10px', fontSize: '18px' }} />
          <DropdownMenu label="Account" items={items} />
        </div>
      </Header>

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 'calc(100vh - 64px - 48px)', 
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
