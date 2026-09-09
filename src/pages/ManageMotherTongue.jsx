import React from 'react';
import MasterSettingCRUD from '../components/MasterSettingCRUD';

const fields = [
  { label: 'Define Mother Tongue Name', key: 'name', required: true }
];

export default function DefineMotherTongue() {
  return (
    <MasterSettingCRUD 
      title="Define Mother Tongue" 
      apiEndpoint="/api/mother-tongues" 
      fields={fields} 
    />
  );
}
