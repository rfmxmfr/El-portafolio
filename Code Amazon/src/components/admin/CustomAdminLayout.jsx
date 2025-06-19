import { useState } from 'react';
import { Layout, AppBar, Menu, Sidebar, useResourceDefinitions } from 'react-admin';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  Shirt, 
  PenTool, 
  Settings, 
  Users, 
  LogOut,
  UserCircle
} from 'lucide-react';
import { adminTheme } from './theme';

// Custom AppBar component that matches your existing header
const CustomAppBar = (props) => {
  const { t } = useTranslation();
  
  return (
    <AppBar
      {...props}
      color="default"
      elevation={1}
      sx={{
        '& .RaAppBar-title': {
          flex: 1,
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        },
      }}
    />
  );
};

// Custom Menu component that matches your existing sidebar
const CustomMenu = (props) => {
  const { t } = useTranslation();
  const resources = useResourceDefinitions();
  
  // Map your resources to icons
  const getResourceIcon = (resourceName) => {
    switch (resourceName) {
      case 'collections':
        return <Shirt size={18} />;
      case 'designs':
        return <PenTool size={18} />;
      case 'users':
        return <Users size={18} />;
      case 'about':
        return <UserCircle size={18} />;
      default:
        return null;
    }
  };
  
  return (
    <Menu {...props}>
      <Menu.DashboardItem
        primaryText={t('Dashboard')}
        leftIcon={<LayoutDashboard size={18} />}
      />
      
      {Object.keys(resources).map(name => (
        <Menu.ResourceItem
          key={name}
          name={name}
          leftIcon={getResourceIcon(name)}
        />
      ))}
      
      <Menu.Item
        primaryText={t('Settings')}
        leftIcon={<Settings size={18} />}
        to="/settings"
      />
    </Menu>
  );
};

// Custom Sidebar component
const CustomSidebar = (props) => (
  <Sidebar
    {...props}
    sx={{
      '& .RaSidebar-fixed': {
        backgroundColor: 'white',
        borderRight: '1px solid #e5e5e5',
      },
    }}
  />
);

// Custom Layout component that wraps everything
export const CustomAdminLayout = (props) => (
  <Layout
    {...props}
    appBar={CustomAppBar}
    menu={CustomMenu}
    sidebar={CustomSidebar}
    theme={adminTheme}
  />
);