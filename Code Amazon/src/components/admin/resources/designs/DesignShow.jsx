import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  ReferenceField,
  ArrayField,
  Datagrid,
  ImageField,
  useTranslate
} from 'react-admin';

export const DesignShow = () => {
  const translate = useTranslate();
  
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="title" label={translate('Title')} />
        <TextField source="description" label={translate('Description')} />
        <ReferenceField source="collectionId" reference="collections" label={translate('Collection')}>
          <TextField source="title" />
        </ReferenceField>
        <DateField source="createdAt" label={translate('Created')} />
        <ImageField source="images" src="src" title="title" label={translate('Images')} />
        <ArrayField source="tags" label={translate('Tags')}>
          <Datagrid bulkActionButtons={false}>
            <TextField source="" />
          </Datagrid>
        </ArrayField>
      </SimpleShowLayout>
    </Show>
  );
};