import React from 'react';
import MasterSettingCRUD from '../components/MasterSettingCRUD';

const fields = [
  { label: 'Define Character Name', key: 'name', required: true }
];

export default function DefineCharacter() {
  return (
    <MasterSettingCRUD 
      title="Define Character" 
      apiEndpoint="/api/characters" 
      fields={fields} 
    />
  );
}
