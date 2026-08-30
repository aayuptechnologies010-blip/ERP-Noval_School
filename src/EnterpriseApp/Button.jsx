import React from 'react';
import './styles.css';

export default function Button({ children, variant = 'green', onClick, type = 'button' }) {
  return (
    <button type={type} className={`erp-btn erp-btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}
