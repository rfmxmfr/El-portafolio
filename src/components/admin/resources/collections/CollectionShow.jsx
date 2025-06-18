import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  ArrayField,
  Datagrid,
  useTranslate
} from 'react-admin';
import { Badge } from '../../../ui/badge';

// Custom status field component
const StatusField = ({ record }) => {
  const translate = useTranslate();
  const status = record?.status || 'draft';
  
  return (
    <Badge className={status === 'published' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}>
      {status === 'published' ? translate('Published') : translate('Draft')}
    </Badge>
  );
};

export const CollectionShow = () => {
  const translate = useTranslate();
  
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="title" label={translate('Title')} />
        <TextField source="description" label={translate('Description')} />
        <StatusField source="status" label={translate('Status')} />
        <DateField source="lastUpdated" label={translate('Last Updated')} />
        <TextField source="items" label={translate('Items')} />
        <ArrayField source="tags" label={translate('Tags')}>
          <Datagrid bulkActionButtons={false}>
            <TextField source="" />
          </Datagrid>
        </ArrayField>
      </SimpleShowLayout>
    </Show>
  );
};