import React, { memo } from 'react';
import AdminDashboard from './AdminDashboard';

const MemoizedAdminDashboard = memo(AdminDashboard, (prevProps, nextProps) => {
  return (
    prevProps.isOpen === nextProps.isOpen &&
    prevProps.onClose === nextProps.onClose &&
    prevProps.isAdmin === nextProps.isAdmin
  );
});

export default MemoizedAdminDashboard;
