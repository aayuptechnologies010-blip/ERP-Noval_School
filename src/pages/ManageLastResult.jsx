import React from 'react';
import MasterSettingCRUD from '../components/MasterSettingCRUD';

const fields = [
  { label: 'Define Last Result Name', key: 'name', required: true }
];

export default function DefineLastResult() {
  return (
    <MasterSettingCRUD 
      title="Define Last Result" 
      apiEndpoint="/api/last-results" 
      fields={fields} 
    />
  );
}
