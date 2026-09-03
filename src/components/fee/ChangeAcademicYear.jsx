import React, { useState, useEffect } from 'react';
import { RefreshCw, Check, X } from 'lucide-react';

export default function ChangeAcademicYear() {
  const [academicYearId, setAcademicYearId] = useState('');
  const [financialYearId, setFinancialYearId] = useState('');
  const [schoolId, setSchoolId] = useState('');

  const [academicYears, setAcademicYears] = useState([]);
  const [financialYears, setFinancialYears] = useState([]);
  const [schools, setSchools] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${API_URL}/api/change-academic-year/options`, { headers });
      if (!res.ok) throw new Error('Failed to fetch options');
      
      const data = await res.json();
      setAcademicYears(data.academicYears || []);
      setFinancialYears(data.financialYears || []);
      setSchools(data.schools || []);

      // Auto-select active ones if available
      const activeAc = data.academicYears?.find(a => a.isActive);
      const activeFin = data.financialYears?.find(f => f.isActive);
      const activeSch = data.schools?.find(s => s.isMainSchool);

      if (activeAc) setAcademicYearId(activeAc._id);
      if (activeFin) setFinancialYearId(activeFin._id);
      if (activeSch) setSchoolId(activeSch._id);

    } catch (error) {
      console.error(error);
      setIsError(true);
      setMessage("Failed to load options from server.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = async () => {
    if (!academicYearId || !schoolId) {
      setIsError(true);
      setMessage("Please select all options before changing.");
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${API_URL}/api/change-academic-year`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ academicYearId, financialYearId: financialYearId || academicYearId, schoolId })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to change settings');

      setIsError(false);
      setMessage(data.message || 'Academic Year, Financial Year, and School changed successfully globally.');
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setMessage(error.message || 'An error occurred while changing settings');
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '40px', background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      
      {/* Toast Message */}
      {message && (
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
                <button onClick={() => setMessage(null)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 0 }}>
                  <X size={14} />
                </button>
              </div>
              <span style={{ fontSize: '13px' }}>{message}</span>
            </div>
          </div>
        </div>
      )}

      <div style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>Loading options...</div>
        ) : (
          <>
            {/* Academic Year */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: '#333' }}>
                Academic Year
              </label>
              <select 
                value={academicYearId} 
                onChange={(e) => setAcademicYearId(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #d9d9d9', borderRadius: '4px', outline: 'none', fontSize: '13px', color: '#333', cursor: 'pointer' }}
              >
                <option value="">Please Select</option>
                {academicYears.map(y => {
                  let text = y.sessionName;
                  if (!text && y.startDate && y.endDate) {
                    text = `${new Date(y.startDate).getFullYear()} - ${new Date(y.endDate).getFullYear()}`;
                  }
                  return <option key={y._id} value={y._id}>{text}</option>;
                })}
              </select>
            </div>

            {/* School */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: '#333' }}>
                School
              </label>
              <select 
                value={schoolId} 
                onChange={(e) => setSchoolId(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #d9d9d9', borderRadius: '4px', outline: 'none', fontSize: '13px', color: '#333', cursor: 'pointer' }}
              >
                <option value="">Please Select</option>
                {schools.map(s => <option key={s._id} value={s._id}>{s.schoolName}</option>)}
              </select>
            </div>

            {/* Button */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
              <button 
                onClick={handleChange}
                disabled={submitting}
                style={{ 
                  backgroundColor: submitting ? '#9ca3af' : '#29a9d8', color: '#fff', border: 'none', padding: '8px 24px', 
                  borderRadius: '4px', cursor: submitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 500
                }}>
                <RefreshCw size={14} /> {submitting ? 'Changing...' : 'Change'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
