import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function VerifyStructure() {
  const [classesOpt, setClassesOpt] = useState([{ _id: 'All', name: 'All Classes' }]);
  const [installmentsOpt, setInstallmentsOpt] = useState([{ _id: 'All', name: 'All Installment(s)' }]);
  const [feeTypesOpt, setFeeTypesOpt] = useState([]);

  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedInstallment, setSelectedInstallment] = useState('All');
  const [selectedFeeType, setSelectedFeeType] = useState('');
  
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        
        const [ftRes, instRes] = await Promise.all([
          fetch(`${API_URL}/api/fee-types`, { headers }),
          fetch(`${API_URL}/api/fee-installments`, { headers })
        ]);

        if (ftRes.ok) {
          const fts = await ftRes.json();
          setFeeTypesOpt(fts);
          if (fts.length > 0) setSelectedFeeType(fts[0]._id);
        }
        if (instRes.ok) {
          const insts = await instRes.json();
          setInstallmentsOpt([{ _id: 'All', name: 'All Installment(s)' }, ...insts]);
        }
        
        // Mock Classes since we don't have a class API in this phase yet
        setClassesOpt([
          { _id: 'All', name: 'All Classes' },
          { _id: 'C1', name: 'Class 1' },
          { _id: 'C2', name: 'Class 2' }
        ]);

      } catch (error) {
        console.error('Error fetching dropdowns:', error);
      }
    };
    fetchDropdowns();
  }, []);

  const handleShow = () => {
    // Mocking student data since Student API is not implemented yet
    setTableData([
      { id: 1, name: 'Aarav Kumar', admNo: '1001', class: 'Class 1', group: 'General Fee Group', structure: 'Assigned' },
      { id: 2, name: 'Rahul Sharma', admNo: '1002', class: 'Class 1', group: 'General Fee Group', structure: 'Assigned' },
      { id: 3, name: 'Priya Verma', admNo: '1003', class: 'Class 2', group: 'New Admission Group', structure: 'Pending' }
    ]);
  };

  return (
    <div style={{ padding: '20px', background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      
      <div style={{ display: 'flex', gap: '30px', marginBottom: '30px', justifyContent: 'center', marginTop: '30px' }}>
        <div style={{ width: '220px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Class</label>
          <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }}>
            {classesOpt.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>
        <div style={{ width: '220px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Installment</label>
          <select value={selectedInstallment} onChange={e => setSelectedInstallment(e.target.value)} style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }}>
            {installmentsOpt.map(i => <option key={i._id} value={i._id}>{i.name}</option>)}
          </select>
        </div>
        <div style={{ width: '220px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Fee Type</label>
          <select value={selectedFeeType} onChange={e => setSelectedFeeType(e.target.value)} style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }}>
            {feeTypesOpt.map(f => <option key={f._id} value={f._id}>{f.name}</option>)}
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
        <button onClick={handleShow} style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 24px', borderRadius: '4px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <Eye size={16} /> Show
        </button>
      </div>

      <div style={{ padding: '0 50px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: 'normal', margin: '0 0 15px 0', color: '#374151' }}>Verify Structure</h4>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', border: '1px solid #e5e7eb' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#f8fafc' }}>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold', color: '#333' }}>Sl. No.</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold', color: '#333' }}>Name</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold', color: '#333' }}>Adm No</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold', color: '#333' }}>Class</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold', color: '#333' }}>Group Assigned</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold', color: '#333' }}>Structure Assigned</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ height: '50px', textAlign: 'center', color: '#666' }}>Click Show to verify students structure</td>
              </tr>
            ) : (
              tableData.map((row, index) => (
                <tr key={row.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px 8px', color: '#095484' }}>{index + 1}</td>
                  <td style={{ padding: '10px 8px', color: '#333' }}>{row.name}</td>
                  <td style={{ padding: '10px 8px', color: '#333' }}>{row.admNo}</td>
                  <td style={{ padding: '10px 8px', color: '#333' }}>{row.class}</td>
                  <td style={{ padding: '10px 8px', color: '#333' }}>{row.group}</td>
                  <td style={{ padding: '10px 8px', color: row.structure === 'Pending' ? '#ef4444' : '#10b981' }}>{row.structure}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
