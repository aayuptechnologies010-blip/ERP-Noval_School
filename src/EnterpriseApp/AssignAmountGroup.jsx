import React, { useState } from 'react';
import FormField from './FormField';
import Select from './Select';
import FeeAmountTable from './FeeAmountTable';
import Button from './Button';
import './styles.css';

export default function AssignAmountGroup({ setToast }) {
  const [feeGroup, setFeeGroup] = useState('');
  const [installment, setInstallment] = useState('All');
  const [tableData, setTableData] = useState([]);

  const feeGroupOptions = [
    { value: '', label: 'Please Select' },
    { value: 'group1', label: 'General Fee Group' },
    { value: 'group2', label: 'New Admission Group' }
  ];

  const installmentOptions = [
    { value: 'All', label: 'Select All' },
    { value: 'Inst1', label: 'Installment 1' },
    { value: 'Inst2', label: 'Installment 2' }
  ];

  const handleShow = () => {
    if (!feeGroup) {
      setToast('Please select a Fee Group.');
      return;
    }
    setTableData([
      { feeHead: 'Tuition Fee', amount: 2500.00 },
      { feeHead: 'Computer Fee', amount: 500.00 },
      { feeHead: 'Activity Fee', amount: 300.00 }
    ]);
  };

  const handleSave = () => {
    setToast('Fee group amounts saved successfully!');
  };

  return (
    <div className="erp-form-container">
      <div className="erp-row">
        <FormField label="Fee Group">
          <Select options={feeGroupOptions} value={feeGroup} onChange={e => setFeeGroup(e.target.value)} />
        </FormField>
        <FormField label="Installment">
          <Select options={installmentOptions} value={installment} onChange={e => setInstallment(e.target.value)} />
        </FormField>
      </div>

      <div className="erp-section-title">Group Amount List</div>
      <FeeAmountTable data={tableData} />

      <div className="erp-buttons">
        <Button variant="green" onClick={handleSave}>
          💾 Save
        </Button>
        <Button variant="blue" onClick={handleShow}>
          👁 Show
        </Button>
      </div>
    </div>
  );
}
