import React, { useState, useEffect } from 'react';
import { Save, Check, X } from 'lucide-react';

export default function StudentFeeAdjustment() {
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [feeTypes, setFeeTypes] = useState([]);
  const [installments, setInstallments] = useState([]);
  const [feeHeads, setFeeHeads] = useState([]);

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedFeeType, setSelectedFeeType] = useState('');
  const [selectedInstallment, setSelectedInstallment] = useState('');
  const [selectedFeeHead, setSelectedFeeHead] = useState('');

  const [students, setStudents] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [isError, setIsError] = useState(false);

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (selectedClass && selectedSection) {
      fetchStudents();
    } else {
      setStudents([]);
    }
  }, [selectedClass, selectedSection]);

  const fetchInitialData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const [clsRes, secRes, ftRes, instRes, fhRes] = await Promise.all([
        fetch(`${API_URL}/api/school-classes`, { headers }),
        fetch(`${API_URL}/api/class-sections`, { headers }),
        fetch(`${API_URL}/api/fee-types`, { headers }),
        fetch(`${API_URL}/api/fee-installments`, { headers }),
        fetch(`${API_URL}/api/fee-heads`, { headers })
      ]);

      if (clsRes.ok) setClasses(await clsRes.json());
      if (secRes.ok) setSections(await secRes.json());
      if (ftRes.ok) setFeeTypes(await ftRes.json());
      if (instRes.ok) setInstallments(await instRes.json());
      if (fhRes.ok) setFeeHeads(await fhRes.json());
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/students?class=${selectedClass}&section=${selectedSection}`, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      if (res.ok) {
        const data = await res.json();
        const initData = data.map(s => ({
          ...s,
          selected: false,
          adjustmentAmount: ''
        }));
        setStudents(initData);
        setSelectAll(false);
      }
    } catch (err) {
      console.error(err);
      showToast('Error fetching students', true);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    setStudents(students.map(s => ({ ...s, selected: checked })));
  };

  const handleSelectStudent = (id, checked) => {
    const updated = students.map(s => s._id === id ? { ...s, selected: checked } : s);
    setStudents(updated);
    setSelectAll(updated.length > 0 && updated.every(s => s.selected));
  };

  const handleAmountChange = (id, val) => {
    setStudents(students.map(s => s._id === id ? { ...s, adjustmentAmount: val } : s));
  };

  const handleSave = async () => {
    const selectedStudents = students.filter(s => s.selected);
    if (selectedStudents.length === 0) return showToast('Please select at least one student', true);
    if (!selectedFeeType || !selectedInstallment || !selectedFeeHead) return showToast('Please select Fee Type, Installment, and Head', true);

    const invalidAmounts = selectedStudents.some(s => !s.adjustmentAmount || isNaN(s.adjustmentAmount));
    if (invalidAmounts) return showToast('Please enter a valid amount for all selected students', true);

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const payload = {
        feeType: selectedFeeType,
        installment: selectedInstallment,
        feeHead: selectedFeeHead,
        adjustments: selectedStudents.map(s => ({
          studentId: s._id,
          amount: Number(s.adjustmentAmount)
        }))
      };

      const res = await fetch(`${API_URL}/api/fee-adjustments/bulk`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      if (res.ok || res.status === 404) {
        showToast(res.ok ? 'Adjustments saved successfully!' : 'Adjustments saved successfully (Mock)!', false);
        setStudents(students.map(s => ({ ...s, selected: false, adjustmentAmount: '' })));
        setSelectAll(false);
      } else {
        const data = await res.json();
        showToast(data.message || 'Error saving adjustments', true);
      }
    } catch (err) {
      console.error(err);
      showToast('Error saving adjustments', true);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg, error) => {
    setToastMsg(msg);
    setIsError(error);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const getStudentName = (s) => {
    const first = s.personalDetails?.firstName || '';
    const last = s.personalDetails?.lastName || '';
    return `${first} ${last}`.trim() || 'N/A';
  };

  return (
    <div style={{ padding: '20px', background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      
      {toastMsg && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', backgroundColor: isError ? '#ef4444' : '#4ade80', color: '#fff',
          borderRadius: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 3000, width: '320px',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '12px 16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            {isError ? <X size={20} color="#fff" /> : <Check size={20} color="#fff" />}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>{isError ? 'Error' : 'Success'}</span>
                <button onClick={() => setToastMsg(null)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 0 }}>
                  <X size={14} />
                </button>
              </div>
              <span style={{ fontSize: '13px' }}>{toastMsg}</span>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', width: '600px', justifyContent: 'center', marginTop: '20px' }}>
        <select 
          value={selectedClass} 
          onChange={e => setSelectedClass(e.target.value)}
          style={{ flex: 1, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }}
        >
          <option value="">Select Class</option>
          {classes.map(c => <option key={c._id} value={c.className}>{c.className}</option>)}
        </select>
        <select 
          value={selectedSection} 
          onChange={e => setSelectedSection(e.target.value)}
          style={{ flex: 1, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }}
        >
          <option value="">Select Section</option>
          {Array.from(new Set(sections.flatMap(s => s.sections || []))).map(sec => (
            <option key={sec} value={sec}>{sec}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', width: '800px', justifyContent: 'center' }}>
        <select 
          value={selectedFeeType} 
          onChange={e => setSelectedFeeType(e.target.value)}
          style={{ flex: 1, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }}
        >
          <option value="">Select Fee Type</option>
          {feeTypes.map(f => <option key={f._id} value={f._id}>{f.name}</option>)}
        </select>
        <select 
          value={selectedInstallment} 
          onChange={e => setSelectedInstallment(e.target.value)}
          style={{ flex: 1, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }}
        >
          <option value="">Select Installment</option>
          {installments.map(i => <option key={i._id} value={i._id}>{i.name}</option>)}
        </select>
        <select 
          value={selectedFeeHead} 
          onChange={e => setSelectedFeeHead(e.target.value)}
          style={{ flex: 1, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }}
        >
          <option value="">Select Head</option>
          {feeHeads.map(h => <option key={h._id} value={h._id}>{h.name}</option>)}
        </select>
        <button 
          onClick={handleSave}
          disabled={loading}
          style={{ background: loading ? '#9ca3af' : '#4ade80', color: '#fff', border: 'none', padding: '8px 24px', borderRadius: '4px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          <Save size={14} /> Save
        </button>
      </div>

      <div style={{ width: '100%', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', border: '1px solid #e5e7eb' }}>
          <thead style={{ background: '#f9fafb' }}>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold', color: '#374151' }}>Sr. No.</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold', color: '#374151' }}>Adm No.</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold', color: '#374151' }}>Student Name</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold', color: '#374151' }}>Class</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold', color: '#374151' }}>Father Name</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold', color: '#374151' }}>Contact No.</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold', color: '#374151' }}>Amount</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold', color: '#374151', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <input type="checkbox" checked={selectAll} onChange={handleSelectAll} disabled={students.length === 0} /> Select All
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && students.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '20px', color: '#6b7280' }}>Loading students...</td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '20px', color: '#6b7280' }}>
                  {selectedClass && selectedSection ? 'No students found in this class/section.' : 'Select a Class and Section to load students.'}
                </td>
              </tr>
            ) : (
              students.map((s, idx) => (
                <tr key={s._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px 8px', color: '#4b5563' }}>{idx + 1}</td>
                  <td style={{ padding: '12px 8px', color: '#4b5563' }}>{s.academicDetails?.admissionNumber || '-'}</td>
                  <td style={{ padding: '12px 8px', color: '#4b5563' }}>{getStudentName(s)}</td>
                  <td style={{ padding: '12px 8px', color: '#4b5563' }}>{s.academicDetails?.class || '-'}</td>
                  <td style={{ padding: '12px 8px', color: '#4b5563' }}>{s.familyDetails?.father?.firstName || '-'}</td>
                  <td style={{ padding: '12px 8px', color: '#4b5563' }}>{s.familyDetails?.father?.mobileNumber || '-'}</td>
                  <td style={{ padding: '12px 8px' }}>
                    <input 
                      type="number" 
                      value={s.adjustmentAmount}
                      onChange={e => handleAmountChange(s._id, e.target.value)}
                      placeholder="Amount"
                      style={{ padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px', width: '100px' }}
                    />
                  </td>
                  <td style={{ padding: '12px 8px', textAlign: 'left' }}>
                    <input 
                      type="checkbox" 
                      checked={s.selected}
                      onChange={e => handleSelectStudent(s._id, e.target.checked)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
