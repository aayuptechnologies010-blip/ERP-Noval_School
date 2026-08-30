import React, { useState } from 'react';
import { Save } from 'lucide-react';

export default function FeeOpeningBalanceSetting() {
  const [adjustmentType, setAdjustmentType] = useState('auto');
  const [feeType, setFeeType] = useState('School Fee');

  return (
    <div style={{ padding: '40px', background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Section 1 */}
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#fff' }}>
            <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#333' }}>Fee Opening Balance and Advance Amount Setting</h4>
          </div>
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#fff' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#333', cursor: 'pointer' }}>
              <input 
                type="radio" 
                checked={adjustmentType === 'auto'} 
                onChange={() => setAdjustmentType('auto')}
                style={{ cursor: 'pointer' }}
              />
              Auto adjust, if advance amount is greater than or equal to next installment amount.
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#333', cursor: 'pointer' }}>
              <input 
                type="radio" 
                checked={adjustmentType === 'manual'} 
                onChange={() => setAdjustmentType('manual')}
                style={{ cursor: 'pointer' }}
              />
              Manually adjust advance amount.
            </label>
          </div>
        </div>

        {/* Section 2 */}
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#fff' }}>
            <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#333' }}>Fee Type For Advance</h4>
          </div>
          <div style={{ padding: '16px', backgroundColor: '#fff' }}>
            <select 
              value={feeType}
              onChange={(e) => setFeeType(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', color: '#333', marginBottom: '16px', cursor: 'pointer' }}
            >
              <option value="School Fee">School Fee</option>
            </select>
            
            <p style={{ margin: 0, fontSize: '12px', color: '#4b5563', lineHeight: '1.5' }}>
              <strong>Note:</strong>Advance amount is automatically adjusted in similar fee type which is choosen at the time of fee collection on fee entry page. However is all type is selected on fee collection page then advance adjustment will happen according to the fee type choosen in above setting.
            </p>
          </div>
        </div>

        {/* Button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
          <button style={{ 
            backgroundColor: '#4ade80', color: '#fff', border: 'none', padding: '8px 24px', 
            borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 500
          }}>
            <Save size={16} /> Save
          </button>
        </div>

      </div>

    </div>
  );
}
