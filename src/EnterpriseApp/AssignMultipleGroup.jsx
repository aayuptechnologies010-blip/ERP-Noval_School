import React, { useState } from 'react';
import FormField from './FormField';
import Select from './Select';
import MultiSelect from './MultiSelect';
import Button from './Button';
import './styles.css';

const CLASSES = [
  "NUR-A", "NUR-B", "LKG-A", "LKG-B", "UKG-A", "UKG-B",
  "1-A", "1-B", "1-C", "2-A", "2-B", "2-C",
  "3-A", "3-B", "3-C", "4-A", "4-B", "4-C",
  "5-A", "5-B", "5-C", "6-A", "6-B", "6-C", "6-D",
  "7-A", "7-B", "7-C", "7-D", "8-A", "8-B", "8-C", "8-D",
  "9-A", "9-B", "9-C", "9-D", "10-A", "10-B", "10-C", "10-D",
  "11-A", "11-B", "11-C", "11-D", "12-A", "12-B", "12-C", "12-D"
];

const classOptions = CLASSES.map(c => ({ value: c, label: c }));

export default function AssignMultipleGroup({ setToast }) {
  const [groupType, setGroupType] = useState('Classes');
  const [feesGroup, setFeesGroup] = useState('');
  const [feesInstallment, setFeesInstallment] = useState('All');
  const [selectedClasses, setSelectedClasses] = useState([]);

  const handleSave = () => {
    setToast('Multiple groups assigned successfully!');
  };

  return (
    <div className="erp-form-container">
      <div className="erp-row">
        <FormField label="Group Type">
          <Select 
            options={[{ value: 'Classes', label: 'Classes' }]} 
            value={groupType} 
            onChange={e => setGroupType(e.target.value)} 
          />
        </FormField>
        <FormField label="Fees Group">
          <Select 
            options={[
              { value: '', label: 'Please Select' },
              { value: 'g1', label: 'General Fee' },
              { value: 'g2', label: 'New Admission Fee' }
            ]} 
            value={feesGroup} 
            onChange={e => setFeesGroup(e.target.value)} 
          />
        </FormField>
      </div>
      <div className="erp-row">
        <FormField label="Fees Installment">
          <Select 
            options={[{ value: 'All', label: 'All Installment' }]} 
            value={feesInstallment} 
            onChange={e => setFeesInstallment(e.target.value)} 
          />
        </FormField>
        <FormField label="Class">
          <MultiSelect 
            options={classOptions} 
            selected={selectedClasses} 
            onChange={setSelectedClasses} 
          />
        </FormField>
      </div>

      <div className="erp-buttons">
        <Button variant="green" onClick={handleSave}>
          💾 Save
        </Button>
      </div>
    </div>
  );
}
