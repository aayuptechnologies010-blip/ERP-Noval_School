import React from 'react';
import './styles.css';

export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="erp-toast">
      {message}
    </div>
  );
}
