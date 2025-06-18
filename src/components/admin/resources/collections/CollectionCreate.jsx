import {
  Create,
  SimpleForm,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
  useTranslate
} from 'react-admin';

export const CollectionCreate = () => {
  const translate = useTranslate();
  
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title" label={translate('Title')} fullWidth />
        <TextInput 
          source="description" 
          label={translate('Description')} 
          multiline 
          rows={4} 
          fullWidth 
        />
        <ArrayInput source="tags" label={translate('Tags')}>
          <SimpleFormIterator>
            <TextInput source="" label={translate('Tag')} />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Create>
  );
};