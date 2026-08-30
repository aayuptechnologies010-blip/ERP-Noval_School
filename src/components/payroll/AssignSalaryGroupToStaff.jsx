import React from 'react';
import { CheckSquare, X, Eye } from 'lucide-react';

export default function AssignSalaryGroupToStaff() {
  const data = [
    { id: 1, emp: '', name: 'REKHA GUPTA', group: '', father: 'PRADEEP GUPTA', desig: 'Teacher' },
    { id: 2, emp: '', name: 'SEEMA GIRI', group: '', father: 'RAMANAND GIRI', desig: 'Teacher' },
    { id: 3, emp: '', name: 'KIRAN YADAV', group: '', father: 'RAM VIJAY YADAV', desig: 'Teacher' },
    { id: 4, emp: '', name: 'ARPANA UPADHYAY', group: '', father: 'BANSHIDHAR UPADHYAY', desig: 'Teacher' },
    { id: 5, emp: '', name: 'PRIYANKA RAI', group: '', father: 'PAWAN KUMAR RAI', desig: 'Teacher' },
    { id: 6, emp: '', name: 'AMIT DUBEY', group: '', father: 'HARISHYAM DUBEY', desig: 'Teacher' },
    { id: 7, emp: '', name: 'WASEEM FIROJ', group: '', father: 'SHAFATULLAH ANSARI', desig: 'Teacher' },
  ];

  return (
    <div className="mail-template-container">
      <div className="settings-row" style={{ gridTemplateColumns: '1fr 1fr', gap: '30px', padding: '20px 40px' }}>
        <div className="form-group">
          <label>Staff Type</label>
          <select className="settings-input"><option>All Staff Types</option></select>
        </div>
        <div className="form-group">
          <label>Salary Group</label>
          <select className="settings-input"><option>Select Group</option></select>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '30px' }}>
        <button style={{ backgroundColor: '#159BD7', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
          <CheckSquare size={16} /> Assign
        </button>
        <button style={{ backgroundColor: '#159BD7', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
          <X size={16} /> Remove
        </button>
        <button style={{ backgroundColor: 'white', color: '#159BD7', border: '1px solid #159BD7', padding: '8px 20px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
          <Eye size={16} /> Show Structure
        </button>
      </div>

      <div style={{ padding: '0 20px' }}>
        <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '20px', textTransform: 'uppercase' }}>STAFF DETAILS</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Search:</span>
          <input type="text" className="settings-input" style={{ width: '250px', padding: '4px 10px', borderRadius: '20px' }} />
        </div>

        <div className="mail-table-wrapper">
          <table className="mail-table">
            <thead>
              <tr>
                <th style={{ width: '40px', textAlign: 'center' }}><input type="checkbox" /></th>
                <th>Emp No.</th>
                <th>Name</th>
                <th>Group Name</th>
                <th>Father/Spouse</th>
                <th>Designation</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={row.id} className={i % 2 === 0 ? 'row-even' : 'row-odd'}>
                  <td style={{ textAlign: 'center' }}><input type="checkbox" /></td>
                  <td>{row.emp}</td>
                  <td>{row.name}</td>
                  <td>{row.group}</td>
                  <td>{row.father}</td>
                  <td>{row.desig}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px', color: '#6c757d', fontSize: '13px', paddingBottom: '20px' }}>
          <div>
            Show 
            <select style={{ margin: '0 5px', padding: '2px 5px' }}><option>10</option></select>
            entries
          </div>
          <div>Showing 1 to 7 of 7 entries</div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ cursor: 'pointer', padding: '5px 10px' }}>Previous</span>
            <span style={{ cursor: 'pointer', padding: '5px 10px', backgroundColor: '#0dcaf0', color: 'white', borderRadius: '4px' }}>1</span>
            <span style={{ cursor: 'pointer', padding: '5px 10px' }}>Next</span>
          </div>
        </div>
      </div>
    </div>
  );
}
