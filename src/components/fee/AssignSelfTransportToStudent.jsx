import React, { useState, useEffect } from 'react';
import { RefreshCw, Search } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const token = localStorage.getItem('token');

const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', outline: 'none' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' };

export default function AssignSelfTransportToStudent() {
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/classes`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => setClasses(d)).catch(console.error);
  }, []);

  const fetchSections = async (classId) => {
    if (!classId) return setSections([]);
    try {
      const res = await fetch(`${API_URL}/api/sections/class/${classId}`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setSections(await res.json());
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchSections(selectedClass); }, [selectedClass]);

  const handleSearch = async () => {
    if (!selectedClass) {
      setMessage({ type: 'error', text: 'Please select a class.' });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/students`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) {
        const data = await res.json();
        const filtered = data.filter(s => 
          s.academicDetails?.class === selectedClass && 
          (!selectedSection || s.academicDetails?.section === selectedSection)
        );
        setStudents(filtered);
      }
    } catch (err) { setMessage({ type: 'error', text: 'Search failed' }); }
    finally { setLoading(false); }
  };

  const handleAssign = async () => {
    if (!selectedStudents.length) {
      setMessage({ type: 'error', text: 'Please select at least one student.' });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/transport/assign-self-bulk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ studentIds: selectedStudents })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: data.message });
        setSelectedStudents([]);
        handleSearch(); // Refresh list
      } else { setMessage({ type: 'error', text: data.message }); }
    } catch (err) { setMessage({ type: 'error', text: 'Server error' }); }
    finally { setLoading(false); }
  };

  const toggleSelect = (id) => {
    setSelectedStudents(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    if (selectedStudents.length === students.length) setSelectedStudents([]);
    else setSelectedStudents(students.map(s => s._id));
  };

  return (
    <div style={{ padding: '20px', background: '#f3f4f6', minHeight: '100%' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {message && <div style={{ padding: '10px', borderRadius: '4px', background: message.type === 'success' ? '#d1fae5' : '#fee2e2', color: message.type === 'success' ? '#065f46' : '#991b1b', fontSize: '13px' }}>{message.text}</div>}

        {/* Filters */}
        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#1f2937' }}>Assign Self Transport</h3>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end' }}>
            <div style={{ width: '200px' }}>
              <label style={labelStyle}>Class *</label>
              <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} style={inputStyle}>
                <option value="">Select Class</option>
                {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>
            <div style={{ width: '200px' }}>
              <label style={labelStyle}>Section</label>
              <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} style={inputStyle}>
                <option value="">Select Section</option>
                {sections.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
              </select>
            </div>
            <button onClick={handleSearch} disabled={loading} style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '9px 20px', borderRadius: '4px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
              <Search size={14} /> Search
            </button>
          </div>
        </div>

        {/* Actions & Table */}
        <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ fontSize: '13px', color: '#374151' }}><b>{students.length}</b> Students Found</div>
            <button onClick={handleAssign} disabled={loading || !selectedStudents.length} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '13px', cursor: selectedStudents.length ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold', opacity: selectedStudents.length ? 1 : 0.6 }}>
              <RefreshCw size={14} /> Assign Self Transport to Selected
            </button>
          </div>

          <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '4px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead style={{ background: '#f9fafb' }}>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>
                    <input type="checkbox" checked={selectedStudents.length === students.length && students.length > 0} onChange={toggleAll} />
                  </th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Adm No.</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Student Name</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Current Transport</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr><td colSpan="5" style={{ padding: '30px', textAlign: 'center', color: '#9ca3af' }}>Search for students to display</td></tr>
                ) : students.map((s) => (
                  <tr key={s._id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <input type="checkbox" checked={selectedStudents.includes(s._id)} onChange={() => toggleSelect(s._id)} />
                    </td>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>{s.academicDetails?.admissionNumber}</td>
                    <td style={{ padding: '12px 16px', color: '#1f2937', fontWeight: '600' }}>{s.personalDetails?.firstName} {s.personalDetails?.lastName}</td>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>
                      {s.transportDetails?.isSelfTransport ? 'Self Transport' : (s.transportDetails?.isTransportStudent ? 'School Transport' : 'None')}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      {s.transportDetails?.isSelfTransport ? (
                        <span style={{ padding: '2px 8px', background: '#d1fae5', color: '#065f46', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>Assigned</span>
                      ) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
