import React from 'react';
import MasterSettingCRUD from '../components/MasterSettingCRUD';

const fields = [
  { label: 'Define Promotion Master Name', key: 'name', required: true }
];

export default function DefinePromotionMaster() {
  return (
    <MasterSettingCRUD 
      title="Define Promotion Master" 
      apiEndpoint="/api/promotion-masters" 
      fields={fields} 
    />
  );
}
