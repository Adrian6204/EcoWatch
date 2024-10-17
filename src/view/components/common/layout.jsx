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
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import DevicesOtherOutlinedIcon from '@mui/icons-material/DevicesOtherOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import FormModal from './formModal';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
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

  const menuItems = [
    {
      key: '1',
      icon: <DevicesOtherOutlinedIcon />,
      label: 'Manage Device',
    },
    {
      key: '2',
      icon: <WaterDropOutlinedIcon />,
      label: 'Water Meter',
    },
    {
      key: '3',
      icon: <BoltOutlinedIcon />,
      label: 'Energy Meter',
    },
    {
      key: '4',
      icon: <AssessmentOutlinedIcon />,
      label: 'View Report',
    },
    {
      key: '5',
      icon: <ManageSearchIcon />,
      label: 'View History',
    },
  ];

  const getTitle = () => {
    const item = menuItems.find((menuItem) => menuItem.key === selectedKey);
    return item ? item.label : '';
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

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

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
          items={menuItems}
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
          <Title level={4} style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{getTitle()}</span>
            {selectedKey === '1' && (
              <Button type="primary" style={{ marginLeft: '16px' }} onClick={openModal}>
                Add Device
              </Button>
            )}
          </Title>
          
          <div
            style={{
              maxHeight: 'calc(100vh - 64px - 48px - 48px)',
              overflowY: 'auto',
            }}
          >
            {renderContent()}
          </div>
        </Content>
      </Layout>
      
      {modalVisible && <FormModal device={selectedKey} onClose={closeModal} />}
    </Layout>
  );
};

export default AppLayout;
