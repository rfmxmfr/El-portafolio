import { Resource } from 'react-admin';
import ReactAdminProvider from './ReactAdminProvider';
import { CustomAdminLayout } from './CustomAdminLayout';
import { Dashboard } from './resources/dashboard/Dashboard';
import collections from './resources/collections';
import designs from './resources/designs';

export default function ReactAdminWrapper() {
  return (
    <ReactAdminProvider>
      <CustomAdminLayout dashboard={<Dashboard />}>
        <Resource name="collections" {...collections} />
        <Resource name="designs" {...designs} />
      </CustomAdminLayout>
    </ReactAdminProvider>
  );
}