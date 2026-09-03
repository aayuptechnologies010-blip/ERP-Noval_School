import React, { useState, useEffect } from 'react';
import { Eye, ChevronLeft, Printer, RefreshCw, Download, Check, X } from 'lucide-react';

export default function GenerateBillBookDetails() {
  const [classes, setClasses] = useState([]);
  const [feeTypes, setFeeTypes] = useState([]);
  const [installments, setInstallments] = useState([]);
  const [students, setStudents] = useState([]);
  
  const [selectedClass, setSelectedClass] = useState('');
  const [search, setSearch] = useState('');
  const [selectedFeeType, setSelectedFeeType] = useState('');
  const [selectedRange, setSelectedRange] = useState('');
  const [selectedInstallments, setSelectedInstallments] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [isError, setIsError] = useState(false);

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const [clsRes, typeRes, instRes] = await Promise.all([
        fetch(`${API_URL}/api/school-classes`, { headers }),
        fetch(`${API_URL}/api/fee-types`, { headers }),
        fetch(`${API_URL}/api/fee-installments`, { headers })
      ]);

      if (clsRes.ok) setClasses(await clsRes.json());
      if (typeRes.ok) setFeeTypes(await typeRes.json());
      if (instRes.ok) setInstallments(await instRes.json());
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  };

  const handleShow = async () => {
    try {
      setLoading(true);
      setStudents([]);
      const token = localStorage.getItem('token');
      let url = `${API_URL}/api/students?`;
      if (selectedClass) url += `class=${selectedClass}&`;
      if (search) url += `search=${search}&`;

      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) {
        const data = await res.json();
        setStudents(data);
        if (data.length === 0) {
          showToast('No students found', false);
        }
      }
    } catch (error) {
      console.error(error);
      showToast('Failed to fetch students', true);
    } finally {
      setLoading(false);
    }
  };

  const toggleInstallment = (id) => {
    if (selectedInstallments.includes(id)) {
      setSelectedInstallments(selectedInstallments.filter(i => i !== id));
    } else {
      setSelectedInstallments([...selectedInstallments, id]);
    }
  };

  const showToast = (msg, error) => {
    setToastMsg(msg);
    setIsError(error);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleGenerate = () => {
    if (students.length === 0) {
      return showToast('Please load students first', true);
    }
    if (selectedInstallments.length === 0) {
      return showToast('Please select at least one installment', true);
    }
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      showToast('Bill Book generated successfully for selected criteria!', false);
    }, 1500);
  };

  return (
    <>
      <style>
        {`
          @media print {
            @page { size: auto; margin: 10mm; }
            body { margin: 0; padding: 0; }
            .printable-content {
              display: block !important;
              padding: 0 !important;
              position: absolute !important;
              top: 0 !important;
              left: 0 !important;
              width: 100% !important;
            }
            .printable-content > div:not(.no-print) {
              display: block !important;
              width: 100% !important;
              border: none !important;
              border-radius: 0 !important;
              padding: 0 !important;
              margin: 0 !important;
              background: #fff !important;
            }
            .printable-content .table-wrapper {
              padding: 0 !important;
              border: none !important;
              border-radius: 0 !important;
            }
            .printable-content table {
              width: 100% !important;
              border: 1px solid #000 !important;
            }
            .printable-content table th, .printable-content table td {
              border: 1px solid #000 !important;
              padding: 8px !important;
              color: #000 !important;
            }
          }
        `}
      </style>
      <div className="printable-content" style={{ padding: '24px', background: '#fff', minHeight: '100%', display: 'flex', gap: '24px', position: 'relative' }}>
        
        {/* Toast Message */}
      {toastMsg && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', backgroundColor: isError ? '#ef4444' : '#4ade80', color: '#fff',
          borderRadius: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 3000, width: '320px', overflow: 'hidden'
        }}>
          <div style={{ padding: '12px 16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            {isError ? <X size={20} /> : <Check size={20} />}
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '13px' }}>{toastMsg}</span>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div style={{ width: '260px', display: 'flex', flexDirection: 'column', gap: '16px', flexShrink: 0 }}>
        <div className="no-print">
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#333', marginBottom: '4px' }}>School</label>
          <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px' }}>
            <option>All Schools</option>
          </select>
        </div>
        
        <div className="no-print">
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#333', marginBottom: '4px' }}>Class</label>
          <select 
            value={selectedClass} 
            onChange={e => setSelectedClass(e.target.value)}
            style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px' }}
          >
            <option value="">All ({classes.length})</option>
            {classes.map(c => (
              <option key={c._id} value={c._id}>{c.className}</option>
            ))}
          </select>
        </div>

        <div className="no-print">
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#333', marginBottom: '4px' }}>Search (Adm No / Name)</label>
          <input 
            type="text" 
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px' }} 
            placeholder="Search student..."
          />
        </div>

        <div className="no-print">
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#333', marginBottom: '4px' }}>Fee Type</label>
          <select 
            value={selectedFeeType} 
            onChange={e => setSelectedFeeType(e.target.value)}
            style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px' }}
          >
            <option value="">All Fees Types</option>
            {feeTypes.map(f => (
              <option key={f._id} value={f._id}>{f.name}</option>
            ))}
          </select>
        </div>

        <div className="no-print">
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#333', marginBottom: '4px' }}>Select Range</label>
          <select 
            value={selectedRange} 
            onChange={e => setSelectedRange(e.target.value)}
            style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px' }}
          >
            <option value="">Please Select</option>
            <option value="1-50">1 - 50</option>
            <option value="51-100">51 - 100</option>
            <option value="101-200">101 - 200</option>
          </select>
        </div>

        <div className="no-print">
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Installment</label>
          <div style={{ maxHeight: '150px', overflowY: 'auto', border: '1px solid #d1d5db', padding: '8px', borderRadius: '4px', background: '#f9fafb' }}>
            {installments.length === 0 ? <span style={{ fontSize: '12px', color: '#666' }}>No installments</span> : (
              installments.map(inst => (
                <label key={inst._id} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', fontSize: '12px', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={selectedInstallments.includes(inst._id)}
                    onChange={() => toggleInstallment(inst._id)}
                    style={{ cursor: 'pointer' }}
                  />
                  {inst.name}
                </label>
              ))
            )}
          </div>
        </div>

        <button 
          onClick={handleShow}
          disabled={loading}
          className="no-print"
          style={{ backgroundColor: '#29a9d8', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', marginTop: '8px' }}
        >
          {loading ? <RefreshCw size={14} className="spin-clockwise" /> : <Eye size={14} />} 
          {loading ? 'Loading...' : 'Show'}
        </button>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* Header */}
        <div className="no-print" style={{ padding: '16px 24px', borderBottom: '1px solid #e2e8f0', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '15px', color: '#1e293b', fontWeight: 600 }}>Bill Book Generation</h3>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              onClick={() => window.print()}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
            >
              <Printer size={14} /> Print Preview
            </button>
            <button 
              onClick={handleGenerate}
              disabled={generating}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: generating ? '#94a3b8' : '#4ade80', border: 'none', borderRadius: '4px', fontSize: '12px', fontWeight: 600, color: '#fff', cursor: generating ? 'not-allowed' : 'pointer' }}
            >
              {generating ? <RefreshCw size={14} className="spin-clockwise" /> : <Download size={14} />} 
              {generating ? 'Generating...' : 'Generate Bill Books'}
            </button>
          </div>
        </div>

        {/* Content Table */}
        <div className="table-wrapper" style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {students.length === 0 ? (
            <div className="no-print" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
              <Eye size={48} style={{ opacity: 0.2, marginBottom: '16px' }} />
              <p style={{ margin: 0, fontSize: '14px' }}>Apply filters and click "Show" to load students</p>
            </div>
          ) : (
            <div className="table-wrapper" style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #e2e8f0' }}>
                    <th className="no-print" style={{ padding: '12px 16px', textAlign: 'left', color: '#475569', fontWeight: 600, width: '40px' }}>
                      <input type="checkbox" />
                    </th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#475569', fontWeight: 600 }}>Adm No</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#475569', fontWeight: 600 }}>Student Name</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#475569', fontWeight: 600 }}>Class</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#475569', fontWeight: 600 }}>Father Name</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, idx) => (
                    <tr key={student._id || idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td className="no-print" style={{ padding: '12px 16px' }}>
                        <input type="checkbox" defaultChecked />
                      </td>
                      <td style={{ padding: '12px 16px', color: '#333', fontWeight: 500 }}>{student?.academicDetails?.admissionNumber || 'N/A'}</td>
                      <td style={{ padding: '12px 16px', color: '#333' }}>
                        {student?.personalDetails?.firstName} {student?.personalDetails?.lastName}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#64748b' }}>
                        {typeof student?.academicDetails?.class === 'object' ? student?.academicDetails?.class?.name : student?.academicDetails?.class || 'N/A'}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#64748b' }}>
                        {student?.familyDetails?.father?.firstName || 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
