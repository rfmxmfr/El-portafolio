import { Resource } from 'react-admin';
import ReactAdminProvider from '../components/admin/ReactAdminProvider';
import { CustomAdminLayout } from '../components/admin/CustomAdminLayout';
import { Dashboard } from '../components/admin/resources/dashboard/Dashboard';
import collections from '../components/admin/resources/collections';
import designs from '../components/admin/resources/designs';

export default function AdminWithReactAdmin() {
  return (
    <ReactAdminProvider>
      <CustomAdminLayout dashboard={<Dashboard />}>
        <Resource name="collections" {...collections} />
        <Resource name="designs" {...designs} />
      </CustomAdminLayout>
    </ReactAdminProvider>
  );
}