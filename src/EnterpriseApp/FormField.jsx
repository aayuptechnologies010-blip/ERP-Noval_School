import React from 'react';
import './styles.css';

export default function FormField({ label, children }) {
  return (
    <div className="erp-col">
      <label className="erp-label">{label}</label>
      {children}
    </div>
  );
}
