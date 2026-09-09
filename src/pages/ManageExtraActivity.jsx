import React from 'react';
import MasterSettingCRUD from '../components/MasterSettingCRUD';

const fields = [
  { label: 'Define Extra Activity Name', key: 'name', required: true }
];

export default function DefineExtraActivity() {
  return (
    <MasterSettingCRUD 
      title="Define Extra Activity" 
      apiEndpoint="/api/extra-activities" 
      fields={fields} 
    />
  );
}
