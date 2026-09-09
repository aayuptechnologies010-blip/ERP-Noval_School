import React from 'react';
import MasterSettingCRUD from '../components/MasterSettingCRUD';

const fields = [
  { label: 'Define Language Name', key: 'name', required: true }
];

export default function DefineLanguage() {
  return (
    <MasterSettingCRUD 
      title="Define Language" 
      apiEndpoint="/api/languages" 
      fields={fields} 
    />
  );
}
