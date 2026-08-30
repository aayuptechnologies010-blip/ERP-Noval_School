import React from 'react';
import { Eye, Save } from 'lucide-react';

const SettingGroup = ({ title, showSameAsErp, dropdownValue, isDropdownPlaceholder }) => (
  <div style={{ marginBottom: '24px' }}>
    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>
      {title}
    </label>
    {showSameAsErp && (
      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b', marginBottom: '8px', cursor: 'pointer' }}>
        <input type="checkbox" /> Same as ERP
      </label>
    )}
    <div style={{ display: 'flex', gap: '8px' }}>
      <select 
        style={{ 
          flex: 1, padding: '6px 12px', border: '1px solid #d1d5db', borderRadius: '4px', 
          fontSize: '12px', color: isDropdownPlaceholder ? '#64748b' : '#333', cursor: 'pointer' 
        }}
        defaultValue={dropdownValue}
      >
        <option value={dropdownValue}>{dropdownValue}</option>
      </select>
      <button style={{ 
        backgroundColor: '#29a9d8', color: '#fff', border: 'none', borderRadius: '4px', 
        padding: '0 12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer'
      }}>
        <Eye size={12} /> VIEW
      </button>
    </div>
  </div>
);

export default function ReceiptCertificateSetting() {
  return (
    <div style={{ padding: '32px 40px', background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '48px', marginBottom: '40px' }}>
        
        {/* Column 1 */}
        <div>
          <SettingGroup title="Receipt For ERP" dropdownValue="ReceiptFormat20" />
          <SettingGroup title="Receipt For Mobile" showSameAsErp dropdownValue="ReceiptFormat20" />
          <SettingGroup title="Amt without structure Receipt Student" dropdownValue="Type 1 Format" />
          <SettingGroup title="Amt without structure Receipt Teacher" dropdownValue="Type 1 Format" />
        </div>

        {/* Column 2 */}
        <div>
          <SettingGroup title="Fee Certificate For ERP" dropdownValue="select Certificate" isDropdownPlaceholder />
          <SettingGroup title="Fee Certificate For Mobile" showSameAsErp dropdownValue="CertificateFormat 29" />
        </div>

        {/* Column 3 */}
        <div>
          <SettingGroup title="Bill Book For ERP" dropdownValue="CustomType8" />
          <SettingGroup title="Bill Book For Mobile" showSameAsErp dropdownValue="CustomType8" />
        </div>

      </div>

      {/* Save Button */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button style={{ 
          backgroundColor: '#4ade80', color: '#fff', border: 'none', padding: '10px 28px', 
          borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 500
        }}>
          <Save size={16} /> Save
        </button>
      </div>

    </div>
  );
}
