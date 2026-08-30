import React, { useState } from 'react';

const GATEWAYS = [
  'Atom', 'Axis', 'billdesk', 'bob', 'ccavenue', 'citrus', 'ebs',
  'EaseBuzz', 'federal', 'freecharge', 'HDFC SmartGateway', 'icici',
  'iob', 'Paytm', 'Payu', 'Payub', 'qfix', 'razorpay', 'sabpaisa'
];

export default function PaymentGatewaySetting() {
  const [gateway, setGateway] = useState('');

  return (
    <div style={{ padding: '24px 32px', background: '#fff', minHeight: '100%' }}>
      <select 
        value={gateway}
        onChange={(e) => setGateway(e.target.value)}
        style={{ 
          width: '100%', 
          padding: '8px 12px', 
          border: '1px solid #d1d5db', 
          borderRadius: '4px', 
          fontSize: '13px', 
          color: '#333',
          cursor: 'pointer'
        }}
      >
        <option value="">Select Payment Gateway</option>
        {GATEWAYS.map(g => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>
    </div>
  );
}
