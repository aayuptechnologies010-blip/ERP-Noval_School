import React from 'react';
import MasterSettingCRUD from '../components/MasterSettingCRUD';

const fields = [
  { label: 'Term Master Name', key: 'name', required: true }
];

export default function TermMaster() {
  return (
    <MasterSettingCRUD 
      title="Term Master" 
      apiEndpoint="/api/term-masters" 
      fields={fields} 
    />
  );
}
