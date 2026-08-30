import React from 'react';
import { Eye } from 'lucide-react';

export default function SlotAssigning() {
  return (
    <div className="global-settings-container">
      <div style={{ padding: '30px' }}>
        <div className="settings-row" style={{ gridTemplateColumns: '1fr 1fr auto', gap: '30px', alignItems: 'end', maxWidth: '800px' }}>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>From Date</label>
            <input type="text" className="settings-input" defaultValue="30-Aug-2026" />
          </div>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>To Date</label>
            <input type="text" className="settings-input" defaultValue="30-Aug-2026" />
          </div>
          <div className="form-group" style={{ paddingBottom: '2px' }}>
            <button style={{ backgroundColor: 'white', color: '#159BD7', border: '1px solid #159BD7', padding: '6px 20px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
              <Eye size={16} /> Show
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
