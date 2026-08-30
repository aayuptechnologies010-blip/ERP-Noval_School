import React from 'react';
import './styles.css';

export default function Select({ options, value, onChange }) {
  return (
    <select className="erp-select" value={value} onChange={onChange}>
      {options.map((opt, i) => (
        <option key={i} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}
