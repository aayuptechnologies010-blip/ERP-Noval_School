import React from 'react';
import MasterSettingCRUD from '../components/MasterSettingCRUD';

const fields = [
  { label: 'Define TC Caste Name', key: 'name', required: true }
];

export default function DefineTCCaste() {
  return (
    <MasterSettingCRUD 
      title="Define TC Caste" 
      apiEndpoint="/api/tc-castes" 
      fields={fields} 
    />
  );
}
