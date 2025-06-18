import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  ShowButton,
  TextInput,
  ReferenceField,
  ImageField,
  useTranslate
} from 'react-admin';

// Custom filter component
const DesignFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
];

export const DesignList = () => {
  const translate = useTranslate();
  
  return (
    <List filters={DesignFilters}>
      <Datagrid>
        <TextField source="title" label={translate('Title')} />
        <ReferenceField source="collectionId" reference="collections" label={translate('Collection')}>
          <TextField source="title" />
        </ReferenceField>
        <ImageField source="thumbnail" label={translate('Thumbnail')} />
        <DateField source="createdAt" label={translate('Created')} />
        <EditButton />
        <ShowButton />
      </Datagrid>
    </List>
  );
};