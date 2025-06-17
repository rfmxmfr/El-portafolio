import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  ArrayInput,
  SimpleFormIterator,
  DateInput,
  useTranslate
} from 'react-admin';

export const CollectionEdit = () => {
  const translate = useTranslate();
  
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="title" label={translate('Title')} fullWidth />
        <TextInput 
          source="description" 
          label={translate('Description')} 
          multiline 
          rows={4} 
          fullWidth 
        />
        <SelectInput 
          source="status" 
          label={translate('Status')} 
          choices={[
            { id: 'draft', name: translate('Draft') },
            { id: 'published', name: translate('Published') },
          ]} 
        />
        <DateInput source="lastUpdated" label={translate('Last Updated')} />
        <ArrayInput source="tags" label={translate('Tags')}>
          <SimpleFormIterator>
            <TextInput source="" label={translate('Tag')} />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Edit>
  );
};