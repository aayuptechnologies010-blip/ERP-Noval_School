import React from 'react';
import { Search, Save, Eye, XCircle, RefreshCw } from 'lucide-react';

export default function StudentFeeDetails() {
  return (
    <div style={{ padding: '20px', background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top Search */}
      <div style={{ display: 'flex', gap: '15px', padding: '15px', border: '1px solid #e5e7eb', borderRadius: '4px', background: '#f9fafb', alignItems: 'center' }}>
        <select style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px', flex: 1 }}>
          <option>All Classes</option>
        </select>
        <select style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px', flex: 1 }}>
          <option>All Section</option>
        </select>
        <div style={{ display: 'flex', flex: 3 }}>
          <input type="text" style={{ flex: 1, padding: '8px 12px', border: '1px solid #d1d5db', borderRight: 'none', borderRadius: '4px 0 0 4px', outline: 'none', fontSize: '12px' }} />
          <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '0 15px', borderRadius: '0 4px 4px 0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Search size={16} />
          </button>
        </div>
      </div>

      {/* Info labels */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontSize: '12px', fontWeight: 'bold', color: '#374151' }}>
        <div>Admission No.</div>
        <div>Class</div>
        <div>Name</div>
        <div>Father Name</div>
        <div>Address</div>
      </div>

      {/* Concession forms */}
      <div style={{ border: '1px solid #e5e7eb', borderRadius: '4px', padding: '20px' }}>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Concession</label>
            <select style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }}>
              <option>None selected</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Concession Date</label>
            <input type="text" value="28-Aug-2026" readOnly style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Class Group</label>
            <select style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }}>
              <option>None selected</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Special Group</label>
            <select style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }}>
              <option>None selected</option>
            </select>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', fontWeight: 'bold', fontSize: '12px', color: '#374151' }}>
            Bus No:
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <button style={{ background: '#fff', color: '#4ade80', border: '1px solid #4ade80', padding: '6px 16px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <Save size={14} /> Save
          </button>
          <button style={{ background: '#fff', color: '#3b82f6', border: '1px solid #3b82f6', padding: '6px 16px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <Eye size={14} /> View
          </button>
          <button style={{ background: '#fff', color: '#f59e0b', border: '1px solid #f59e0b', padding: '6px 16px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <XCircle size={14} /> Reset
          </button>
        </div>
      </div>

      {/* Transport */}
      <div style={{ border: '1px solid #e5e7eb', borderRadius: '4px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
          <span style={{ fontWeight: 'bold', fontSize: '13px', color: '#374151' }}>Transport</span>
          <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <RefreshCw size={14} /> Change Route
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'center', minWidth: '1000px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '10px 8px' }}>Assign Date</th>
                <th style={{ padding: '10px 8px' }}>Join Date</th>
                <th style={{ padding: '10px 8px' }}>Leave Date</th>
                <th style={{ padding: '10px 8px' }}>Route</th>
                <th style={{ padding: '10px 8px' }}>Stop</th>
                <th style={{ padding: '10px 8px' }}>Vehicle</th>
                <th style={{ padding: '10px 8px' }}>Apr</th>
                <th style={{ padding: '10px 8px' }}>May</th>
                <th style={{ padding: '10px 8px' }}>Jun</th>
                <th style={{ padding: '10px 8px' }}>Jul</th>
                <th style={{ padding: '10px 8px' }}>Aug</th>
                <th style={{ padding: '10px 8px' }}>Sep</th>
                <th style={{ padding: '10px 8px' }}>Oct</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px 8px' }}>
                  <input type="text" value="28-Aug-2026" readOnly style={{ width: '80px', padding: '4px', border: '1px solid #d1d5db', borderRadius: '2px', fontSize: '10px' }} />
                </td>
                <td style={{ padding: '10px 8px' }}>
                  <input type="text" style={{ width: '60px', padding: '4px', border: '1px solid #d1d5db', borderRadius: '2px', fontSize: '10px' }} />
                </td>
                <td style={{ padding: '10px 8px' }}>
                  <input type="text" style={{ width: '60px', padding: '4px', border: '1px solid #d1d5db', borderRadius: '2px', fontSize: '10px' }} />
                </td>
                <td style={{ padding: '10px 8px' }}>
                  <select style={{ padding: '4px', border: '1px solid #d1d5db', borderRadius: '2px', fontSize: '10px' }}><option>Route</option></select>
                </td>
                <td style={{ padding: '10px 8px' }}>
                  <select style={{ padding: '4px', border: '1px solid #d1d5db', borderRadius: '2px', fontSize: '10px' }}><option>Stop</option></select>
                </td>
                <td style={{ padding: '10px 8px' }}>
                  <input type="text" style={{ width: '60px', padding: '4px', border: '1px solid #d1d5db', borderRadius: '2px', fontSize: '10px' }} />
                </td>
                <td style={{ padding: '10px 8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2px', justifyContent: 'center' }}><span style={{fontSize:'10px'}}>0%</span><input type="checkbox" /></div>
                </td>
                <td style={{ padding: '10px 8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2px', justifyContent: 'center' }}><span style={{fontSize:'10px'}}>0%</span><input type="checkbox" /></div>
                </td>
                <td style={{ padding: '10px 8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2px', justifyContent: 'center' }}><span style={{fontSize:'10px'}}>0%</span><input type="checkbox" /></div>
                </td>
                <td style={{ padding: '10px 8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2px', justifyContent: 'center' }}><span style={{fontSize:'10px'}}>0%</span><input type="checkbox" /></div>
                </td>
                <td style={{ padding: '10px 8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2px', justifyContent: 'center' }}><span style={{fontSize:'10px'}}>0%</span><input type="checkbox" /></div>
                </td>
                <td style={{ padding: '10px 8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2px', justifyContent: 'center' }}><span style={{fontSize:'10px'}}>0%</span><input type="checkbox" /></div>
                </td>
                <td style={{ padding: '10px 8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2px', justifyContent: 'center' }}><span style={{fontSize:'10px'}}>0%</span><input type="checkbox" /></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
