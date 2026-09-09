import React from 'react';
import MasterSettingCRUD from '../components/MasterSettingCRUD';

const fields = [
  { label: 'Define Moral Name', key: 'name', required: true }
];

export default function DefineMoral() {
  return (
    <MasterSettingCRUD 
      title="Define Moral" 
      apiEndpoint="/api/morals" 
      fields={fields} 
    />
  );
}
