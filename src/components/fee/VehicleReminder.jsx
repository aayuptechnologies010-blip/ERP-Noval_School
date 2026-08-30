import React from 'react';
import { Save, Eye } from 'lucide-react';

export default function VehicleReminder() {
  return (
    <div style={{ padding: '20px', background: '#fff', minHeight: '100%' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Select Vehicle Type</label>
            <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
              <option>All</option>
            </select>
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Select Vehicle No.</label>
            <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
              <option>Please Select</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Sms for</label>
            <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
              <option>Please Select</option>
            </select>
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Due Date</label>
            <input type="text" defaultValue="29-Aug-2026" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
          </div>
        </div>

        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#374151', cursor: 'pointer' }}>
            <input type="checkbox" defaultChecked style={{ accentColor: '#29a9d8' }} />
            Enable Reminder
          </label>
        </div>

        <div>
          <div style={{ background: '#f3f4f6', padding: '10px', textAlign: 'center', fontSize: '12px', fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb', borderBottom: 'none' }}>
            Service Reminder
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ border: '1px solid #e5e7eb' }}>
                <th style={{ padding: '10px', textAlign: 'left', color: '#374151', borderRight: '1px solid #e5e7eb', width: '25%' }}></th>
                <th style={{ padding: '10px', textAlign: 'left', color: '#374151', borderRight: '1px solid #e5e7eb', width: '25%' }}>No. of Days</th>
                <th style={{ padding: '10px', textAlign: 'left', color: '#374151', borderRight: '1px solid #e5e7eb', width: '25%' }}>Contact No.</th>
                <th style={{ padding: '10px', textAlign: 'left', color: '#374151', width: '25%' }}>Email</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: '1 reminder to be sent before', days: '2' },
                { label: '2 reminder to be sent before', days: '1' },
                { label: '3 reminder to be sent before', days: '0' }
              ].map((row, idx) => (
                <tr key={idx} style={{ border: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '10px', borderRight: '1px solid #e5e7eb', color: '#374151' }}>{row.label}</td>
                  <td style={{ padding: '10px', borderRight: '1px solid #e5e7eb' }}>
                    <input type="text" defaultValue={row.days} style={{ width: '100%', padding: '6px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
                  </td>
                  <td style={{ padding: '10px', borderRight: '1px solid #e5e7eb' }}>
                    <input type="text" style={{ width: '100%', padding: '6px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
                  </td>
                  <td style={{ padding: '10px' }}>
                    <input type="text" style={{ width: '100%', padding: '6px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '10px' }}>
          <button style={{ background: '#4ade80', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Save size={14} /> Save
          </button>
          <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Eye size={14} /> View
          </button>
        </div>
      </div>
    </div>
  );
}
