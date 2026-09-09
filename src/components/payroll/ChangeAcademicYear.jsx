import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';


const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function ChangeAcademicYear() {
  const [academicYears, setAcademicYears] = useState([]);
  const [financialYears, setFinancialYears] = useState([]);
  const [schools, setSchools] = useState([]);

  const [selectedAcademicYear, setSelectedAcademicYear] = useState('');
  const [selectedFinancialYear, setSelectedFinancialYear] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const token = localStorage.getItem('token');
  const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/change-academic-year/options`, { headers });
        if (res.ok) {
          const data = await res.json();
          setAcademicYears(data.academicYears || []);
          setFinancialYears(data.financialYears || []);
          setSchools(data.schools || []);

          // Pre-select active ones
          const activeAy = data.academicYears.find(ay => ay.isActive);
          if (activeAy) setSelectedAcademicYear(activeAy._id);
          else if (data.academicYears.length > 0) setSelectedAcademicYear(data.academicYears[0]._id);

          const activeFy = data.financialYears.find(fy => fy.isActive);
          if (activeFy) setSelectedFinancialYear(activeFy._id);
          else if (data.financialYears.length > 0) setSelectedFinancialYear(data.financialYears[0]._id);

          const activeSchool = data.schools.find(s => s.isMainSchool);
          if (activeSchool) setSelectedSchool(activeSchool._id);
          else if (data.schools.length > 0) setSelectedSchool(data.schools[0]._id);
        }
      } catch (err) {
        console.error('Failed to fetch options', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOptions();
  }, []);

  const handleChange = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });
    try {
      const res = await fetch(`${API_BASE}/api/change-academic-year`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          academicYearId: selectedAcademicYear,
          financialYearId: selectedFinancialYear,
          schoolId: selectedSchool
        })
      });

      if (res.ok) {
        const data = await res.json();
        setMessage({ type: 'success', text: data.message || 'Successfully updated global contexts' });
        // Optionally update localStorage if the frontend relies on it directly
      } else {
        const data = await res.json();
        setMessage({ type: 'error', text: data.message || 'Update failed' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Network error occurred' });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    }
  };

  const getYearLabel = (y) => y.year || y.name || y.yearRange || y.title || `${y.startYear}-${y.endYear}`;

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading options...</div>;
  }

  return (
    <div className="global-settings-container" style={{ padding: '40px' }}>
      
      {message.text && (
        <div style={{
          maxWidth: '600px', margin: '0 auto 20px auto', padding: '12px 16px', borderRadius: '4px',
          display: 'flex', alignItems: 'center', gap: '8px',
          backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
          color: message.type === 'success' ? '#155724' : '#721c24',
          border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
        }}>
          {message.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          {message.text}
        </div>
      )}

      <div className="form-group" style={{ maxWidth: '600px', margin: '0 auto 25px auto' }}>
        <label>Academic Year</label>
        <select 
          className="settings-input" 
          value={selectedAcademicYear} 
          onChange={(e) => setSelectedAcademicYear(e.target.value)}
        >
          {academicYears.map(ay => (
            <option key={ay._id} value={ay._id}>{getYearLabel(ay)}</option>
          ))}
        </select>
      </div>

      <div className="form-group" style={{ maxWidth: '600px', margin: '0 auto 25px auto' }}>
        <label>Financial Year</label>
        <select 
          className="settings-input" 
          value={selectedFinancialYear} 
          onChange={(e) => setSelectedFinancialYear(e.target.value)}
        >
          {financialYears.map(fy => (
            <option key={fy._id} value={fy._id}>{getYearLabel(fy)}</option>
          ))}
        </select>
      </div>

      <div className="form-group" style={{ maxWidth: '600px', margin: '0 auto 40px auto' }}>
        <label>School</label>
        <select 
          className="settings-input" 
          value={selectedSchool} 
          onChange={(e) => setSelectedSchool(e.target.value)}
        >
          {schools.map(school => (
            <option key={school._id} value={school._id}>{school.schoolName}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button 
          className="blue-btn" 
          style={{ padding: '8px 25px', opacity: saving ? 0.7 : 1 }}
          onClick={handleChange}
          disabled={saving}
        >
          {saving ? 'Changing...' : 'Change'}
        </button>
      </div>

    </div>
  );
}
