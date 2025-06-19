import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  ArrayInput,
  SimpleFormIterator,
  ImageInput,
  ImageField,
  useTranslate
} from 'react-admin';

export const DesignCreate = () => {
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
        <ReferenceInput source="collectionId" reference="collections" label={translate('Collection')}>
          <SelectInput optionText="title" />
        </ReferenceInput>
        <ImageInput source="images" label={translate('Images')} multiple>
          <ImageField source="src" title="title" />
        </ImageInput>
        <ArrayInput source="tags" label={translate('Tags')}>
          <SimpleFormIterator>
            <TextInput source="" label={translate('Tag')} />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Create>
  );
};