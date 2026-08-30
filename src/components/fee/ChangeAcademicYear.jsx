import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export default function ChangeAcademicYear() {
  const [academicYear, setAcademicYear] = useState('2026-2027');
  const [financialYear, setFinancialYear] = useState('2026-2027');
  const [school, setSchool] = useState('NAVALS NATIONAL ACADEMY');

  const years = [
    'Please Select',
    '2017-2018',
    '2018-2019',
    '2019-2020',
    '2022-2023',
    '2023-2024',
    '2024-2025',
    '2025-2026',
    '2026-2027'
  ];

  const schools = [
    'Please Select',
    'NAVALS NATIONAL ACADEMY'
  ];

  return (
    <div style={{ padding: '40px', background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <div style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Academic Year */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: '#333' }}>
            Academic Year
          </label>
          <select 
            value={academicYear} 
            onChange={(e) => setAcademicYear(e.target.value)}
            style={{ width: '100%', padding: '8px 12px', border: '1px solid #d9d9d9', borderRadius: '4px', outline: 'none', fontSize: '13px', color: '#333', cursor: 'pointer' }}
          >
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        {/* Financial Year */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: '#333' }}>
            Financial Year
          </label>
          <select 
            value={financialYear} 
            onChange={(e) => setFinancialYear(e.target.value)}
            style={{ width: '100%', padding: '8px 12px', border: '1px solid #d9d9d9', borderRadius: '4px', outline: 'none', fontSize: '13px', color: '#333', cursor: 'pointer' }}
          >
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        {/* School */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: '#333' }}>
            School
          </label>
          <select 
            value={school} 
            onChange={(e) => setSchool(e.target.value)}
            style={{ width: '100%', padding: '8px 12px', border: '1px solid #d9d9d9', borderRadius: '4px', outline: 'none', fontSize: '13px', color: '#333', cursor: 'pointer' }}
          >
            {schools.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
          <button style={{ 
            backgroundColor: '#29a9d8', color: '#fff', border: 'none', padding: '8px 24px', 
            borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 500
          }}>
            <RefreshCw size={14} /> Change
          </button>
        </div>

      </div>
    </div>
  );
}
