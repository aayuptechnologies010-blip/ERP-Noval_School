import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaVideo, FaLevelUpAlt, FaUsers } from 'react-icons/fa';



function Promotion() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [promoted, setPromoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rollNumberUpdates, setRollNumberUpdates] = useState({});
  const [updatingRolls, setUpdatingRolls] = useState(false);
  const [availableClasses, setAvailableClasses] = useState([]);

  const [fromClass, setFromClass] = useState('NUR');
  const [fromSection, setFromSection] = useState('All');
  
  const [toClass, setToClass] = useState('LKG');
  const [toSection, setToSection] = useState('All');
  const [fromSession, setFromSession] = useState('2025-2026');
  const [toSession, setToSession] = useState('2026-2027');
  const [remarks, setRemarks] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [historyRecords, setHistoryRecords] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyPage, setHistoryPage] = useState(1);
  const [historyTotal, setHistoryTotal] = useState(0);
  const [historyFromSession, setHistoryFromSession] = useState('All');
  const [historyToSession, setHistoryToSession] = useState('All');
  const [historyFromClass, setHistoryFromClass] = useState('All');
  const [historyToClass, setHistoryToClass] = useState('All');


  React.useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/promotions/classes`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setAvailableClasses(data.classes || []);
          if (data.classes?.length > 0) {
             setFromClass(data.classes[0].class);
             setFromSection('All');
          }
        }
      } catch (e) {
        console.error("Error fetching classes", e);
      }
    };
    fetchClasses();
  }, []);


  const fetchHistory = async (page = 1) => {
    setHistoryLoading(true);
    try {
      const token = localStorage.getItem('token');
      let url = `${import.meta.env.VITE_API_BASE_URL}/api/promotions/history?page=${page}&limit=10`;
      if (historyFromSession !== 'All') url += `&fromSession=${historyFromSession}`;
      if (historyToSession !== 'All') url += `&toSession=${historyToSession}`;
      if (historyFromClass !== 'All') url += `&fromClass=${historyFromClass}`;
      if (historyToClass !== 'All') url += `&toClass=${historyToClass}`;
      const res = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setHistoryRecords(data.records || []);
        setHistoryTotal(data.total || 0);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setHistoryLoading(false);
    }
  };

  React.useEffect(() => {
    if (showHistory) fetchHistory(historyPage);
  }, [showHistory, historyPage, historyFromSession, historyToSession, historyFromClass, historyToClass]);

  const handleDeleteHistory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this promotion history record? Note: Student class will NOT be reverted automatically.")) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/promotions/history/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setHistoryRecords(historyRecords.filter(r => r._id !== id));
      } else {
        alert("Failed to delete record.");
      }
    } catch (e) {
      console.error(e);
      alert("Error deleting record.");
    }
  };


  const toggleSelectAll = () => {
    if (selectedIds.length === students.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(students.map(s => s._id));
    }
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selId => selId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };


  const handleFetchStudents = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const url = fromSection === 'All' ? `${import.meta.env.VITE_API_BASE_URL}/api/promotions/eligible?class=${fromClass}` : `${import.meta.env.VITE_API_BASE_URL}/api/promotions/eligible?class=${fromClass}&section=${fromSection}`;
      const res = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setStudents(data.students || []);
        setSelectedIds([]);
      } else {
        alert("Failed to fetch students");
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching students");
    } finally {
      setLoading(false);
    }
  };


  const handleRollNumberChange = (studentId, value) => {
    setRollNumberUpdates(prev => ({
      ...prev,
      [studentId]: value
    }));
  };

  const handleSaveRollNumbers = async () => {
    const updates = Object.keys(rollNumberUpdates).map(id => ({
      studentId: id,
      rollNumber: rollNumberUpdates[id]
    })).filter(u => u.rollNumber.trim() !== '');

    if (updates.length === 0) return;

    setUpdatingRolls(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/students/bulk/roll-numbers`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ updates })
      });
      if (res.ok) {
        alert("Roll numbers updated successfully");
        setRollNumberUpdates({});
        handleFetchStudents(); // refresh the list
      } else {
        alert("Failed to update roll numbers");
      }
    } catch (e) {
      console.error(e);
      alert("Error updating roll numbers");
    } finally {
      setUpdatingRolls(false);
    }
  };

  const handlePromote = async () => {
    if (selectedIds.length === 0) return;
    try {
      const token = localStorage.getItem('token');
      const payload = {
        fromSession,
        fromClass,
        fromSection: fromSection === 'All' ? undefined : fromSection,
        toSession,
        toClass,
        toSection: toSection === 'All' ? undefined : toSection,
        studentIds: selectedIds,
        remarks: remarks
      };

      // Clean up undefined section
      if (!payload.fromSection) delete payload.fromSection;
      if (!payload.toSection) delete payload.toSection;

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/promotions/promote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        const data = await res.json();
        setPromoted(true);
        setTimeout(() => setPromoted(false), 3000);
        // Remove promoted students from the list
        setStudents(students.filter(s => !selectedIds.includes(s._id)));
        setSelectedIds([]);
        alert(data.message || "Promotion completed!");
      } else {
        alert("Failed to promote students");
      }
    } catch (e) {
      console.error(e);
      alert("Error promoting students");
    }
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 12px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
          <FaLevelUpAlt size={22} color="#3b82f6" /> Student Promotion
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <button onClick={() => setShowHistory(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#8b5cf6', fontSize: 14, fontWeight: 600, cursor: 'pointer', background: 'none', border: 'none' }}>
            <FaUsers /> View History
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#22c55e', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            <FaVideo /> Video Tutorial
          </div>
          <button 
            onClick={() => navigate(-1)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#475569', fontSize: 14, fontWeight: 600, cursor: 'pointer', background: 'none', border: 'none' }}
          >
            <FaArrowLeft style={{ fontSize: 12 }} /> Go Back
          </button>
        </div>
      </div>

      <div style={{ padding: '0 32px 16px 32px', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {/* Promotion From Settings */}
        <div style={{ flex: 1, background: '#fff', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: '20px 24px' }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', margin: '0 0 16px 0', borderBottom: '2px solid #e2e8f0', paddingBottom: 8 }}>
            Promote From <span style={{ color: '#ef4444' }}>(Current Session)</span>
          </h2>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
              <label style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>Academic Session</label>
              <select style={inputStyle} value={fromSession} onChange={e => setFromSession(e.target.value)}>
                <option value="2024-2025">2024-2025</option>
                <option value="2025-2026">2025-2026</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
              <label style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>Class</label>
              <select style={inputStyle} value={fromClass} onChange={e => { setFromClass(e.target.value); }}>
                {availableClasses.map(c => <option key={c.class} value={c.class}>{c.class}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
              <label style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>Section</label>
              <select style={inputStyle} value={fromSection} onChange={e => setFromSection(e.target.value)}>
                <option value="All">All</option>
                {availableClasses.find(c => c.class === fromClass)?.sections.map(s => (
                   <option key={s.section} value={s.section}>{s.section}</option>
                ))}
              </select>
            </div>
          </div>
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleFetchStudents} disabled={loading} style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 20px', fontSize: 13, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <FaUsers /> Fetch Students
            </button>
          </div>
        </div>

        {/* Promotion To Settings */}
        <div style={{ flex: 1, background: '#fff', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: '20px 24px' }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', margin: '0 0 16px 0', borderBottom: '2px solid #e2e8f0', paddingBottom: 8 }}>
            Promote To <span style={{ color: '#22c55e' }}>(Next Session)</span>
          </h2>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
              <label style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>Academic Session</label>
              <select style={inputStyle} value={toSession} onChange={e => setToSession(e.target.value)}>
                <option value="2025-2026">2025-2026</option>
                <option value="2026-2027">2026-2027</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
              <label style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>Class</label>
              <select style={inputStyle} value={toClass} onChange={e => setToClass(e.target.value)}>
                {availableClasses.map(c => <option key={c.class} value={c.class}>{c.class}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
              <label style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>Section</label>
              <select style={inputStyle} value={toSection} onChange={e => setToSection(e.target.value)}>
                <option value="All">All</option>
                {availableClasses.find(c => c.class === toClass)?.sections.map(s => (
                   <option key={s.section} value={s.section}>{s.section}</option>
                ))}
              </select>
            </div>
          </div>
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 12 }}>
            <input 
              type="text" 
              placeholder="Remarks (e.g. Annual Promotion)" 
              value={remarks} 
              onChange={e => setRemarks(e.target.value)}
              style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '8px 12px', fontSize: 13, outline: 'none', width: 250 }}
            />
            {promoted && (
              <span style={{ fontSize: 13, fontWeight: 700, color: '#22c55e' }}>Promotion Successful!</span>
            )}
            <button 
              onClick={handlePromote}
              disabled={selectedIds.length === 0}
              style={{ 
                background: selectedIds.length > 0 ? '#22c55e' : '#94a3b8', 
                color: '#fff', border: 'none', borderRadius: 6, padding: '8px 20px', 
                fontSize: 13, fontWeight: 700, cursor: selectedIds.length > 0 ? 'pointer' : 'not-allowed', 
                display: 'flex', alignItems: 'center', gap: 6 
              }}
            >
              <FaLevelUpAlt /> Promote Selected ({selectedIds.length})
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Card - Student List */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'hidden' }}>
        <div style={{ background: '#fff', borderRadius: 12, height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ padding: '16px 20px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: 14, color: '#334155', fontWeight: 700 }}>Eligible Students for Promotion</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {Object.keys(rollNumberUpdates).length > 0 && (
                <button 
                  onClick={handleSaveRollNumbers}
                  disabled={updatingRolls}
                  style={{ background: '#f59e0b', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 12px', fontSize: 12, fontWeight: 600, cursor: updatingRolls ? 'not-allowed' : 'pointer' }}
                >
                  {updatingRolls ? 'Saving...' : 'Save Roll Nos'}
                </button>
              )}
              <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>Total: {students.length}</span>
            </div>
          </div>
           
          <div style={{ flex: 1, overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#fff' }}>
                  <th style={{ ...thStyle, width: 40, textAlign: 'center' }}>
                    <input 
                      type="checkbox" 
                      checked={students.length > 0 && selectedIds.length === students.length}
                      onChange={toggleSelectAll}
                      style={{ cursor: 'pointer', transform: 'scale(1.2)' }}
                    />
                  </th>
                  <th style={thStyle}>Sl. No.</th>
                  <th style={thStyle}>Student Info</th>
                  <th style={thStyle}>Current Class</th>
                  <th style={thStyle}>Roll No</th>
                  <th style={{ ...thStyle, textAlign: 'center' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {loading && <tr><td colSpan="6" style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>Fetching students...</td></tr>}
                {!loading && students.map((student, idx) => (
                  <tr key={student._id} style={{ borderBottom: '1px solid #f1f5f9', background: selectedIds.includes(student._id) ? '#eff6ff' : '#fff' }}>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(student._id)}
                        onChange={() => toggleSelect(student._id)}
                        style={{ cursor: 'pointer', transform: 'scale(1.2)' }}
                      />
                    </td>
                    <td style={tdStyle}>{idx + 1}</td>
                    <td style={{ ...tdStyle, color: '#334155' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{student.personalDetails?.firstName} {student.personalDetails?.lastName}</div>
                      <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>Adm No: {student.academicDetails?.admissionNumber}</div>
                    </td>
                    <td style={{ ...tdStyle, fontWeight: 600 }}>{student.academicDetails?.class} {student.academicDetails?.section}</td>
                    <td style={tdStyle}>
                      <input 
                        type="text" 
                        value={rollNumberUpdates[student._id] !== undefined ? rollNumberUpdates[student._id] : (student.academicDetails?.rollNumber || '')}
                        onChange={(e) => handleRollNumberChange(student._id, e.target.value)}
                        style={{ width: 60, padding: '4px 8px', borderRadius: 4, border: '1px solid #cbd5e1', outline: 'none', fontSize: 12 }}
                        placeholder="Roll No"
                      />
                    </td>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>
                      <span style={{ 
                        background: selectedIds.includes(student._id) ? '#dbeafe' : '#f1f5f9', 
                        color: selectedIds.includes(student._id) ? '#2563eb' : '#64748b', 
                        padding: '4px 10px', 
                        borderRadius: 12, 
                        fontSize: 11, 
                        fontWeight: 700 
                      }}>
                        {selectedIds.includes(student._id) ? 'Selected for Promotion' : 'Not Selected'}
                      </span>
                    </td>
                  </tr>
                ))}
                {students.length === 0 && (
                  <tr>
                    <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>
                      All students have been promoted or no students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* Promotion History Modal */}
      {showHistory && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: '24px 32px', width: 900, maxWidth: '95%', maxHeight: '90vh', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', margin: 0 }}>Promotion History</h2>
                <div style={{ display: 'flex', gap: 8 }}>
                  <select 
                    value={historyFromClass} 
                    onChange={e => { setHistoryFromClass(e.target.value); setHistoryPage(1); }}
                    style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '6px 10px', fontSize: 13, outline: 'none' }}
                  >
                    <option value="All">From: All Classes</option>
                    {availableClasses.map(c => <option key={c.class} value={c.class}>{c.class}</option>)}
                  </select>
                  <select 
                    value={historyToClass} 
                    onChange={e => { setHistoryToClass(e.target.value); setHistoryPage(1); }}
                    style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '6px 10px', fontSize: 13, outline: 'none' }}
                  >
                    <option value="All">To: All Classes</option>
                    {availableClasses.map(c => <option key={c.class} value={c.class}>{c.class}</option>)}
                  </select>
                  <select 
                    value={historyFromSession} 
                    onChange={e => { setHistoryFromSession(e.target.value); setHistoryPage(1); }}
                    style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '6px 10px', fontSize: 13, outline: 'none' }}
                  >
                    <option value="All">From: All Sessions</option>
                    <option value="2024-2025">2024-2025</option>
                    <option value="2025-2026">2025-2026</option>
                    <option value="2026-2027">2026-2027</option>
                    <option value="2027-2028">2027-2028</option>
                  </select>
                  <select 
                    value={historyToSession} 
                    onChange={e => { setHistoryToSession(e.target.value); setHistoryPage(1); }}
                    style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '6px 10px', fontSize: 13, outline: 'none' }}
                  >
                    <option value="All">To: All Sessions</option>
                    <option value="2024-2025">2024-2025</option>
                    <option value="2025-2026">2025-2026</option>
                    <option value="2026-2027">2026-2027</option>
                    <option value="2027-2028">2027-2028</option>
                  </select>
                </div>
              </div>
              <button onClick={() => setShowHistory(false)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#64748b' }}>×</button>
            </div>
            
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {historyLoading ? (
                <div style={{ padding: 40, textAlign: 'center', color: '#64748b' }}>Loading history...</div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead style={{ background: '#f8fafc', position: 'sticky', top: 0 }}>
                    <tr>
                      <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: 13, fontWeight: 600 }}>Date</th>
                      <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: 13, fontWeight: 600 }}>Student</th>
                      <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: 13, fontWeight: 600 }}>From</th>
                      <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: 13, fontWeight: 600 }}>To</th>
                      <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: 13, fontWeight: 600 }}>Remarks</th>
                      <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: 13, fontWeight: 600 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyRecords.length > 0 ? historyRecords.map(rec => (
                      <tr key={rec._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '12px 16px', fontSize: 13, color: '#334155' }}>
                          {new Date(rec.promotedAt).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <div style={{ fontWeight: 600, fontSize: 13, color: '#0f172a' }}>{rec.studentId?.personalDetails?.firstName} {rec.studentId?.personalDetails?.lastName}</div>
                          <div style={{ fontSize: 11, color: '#64748b' }}>Adm: {rec.studentId?.academicDetails?.admissionNumber}</div>
                        </td>
                        <td style={{ padding: '12px 16px', fontSize: 13, color: '#334155' }}>
                          {rec.fromClass} {rec.fromSection} <br/><span style={{fontSize: 11, color: '#64748b'}}>{rec.fromSession}</span>
                        </td>
                        <td style={{ padding: '12px 16px', fontSize: 13, color: '#334155' }}>
                          <span style={{color: '#22c55e', fontWeight: 600}}>{rec.toClass} {rec.toSection}</span> <br/><span style={{fontSize: 11, color: '#64748b'}}>{rec.toSession}</span>
                        </td>
                        <td style={{ padding: '12px 16px', fontSize: 13, color: '#334155' }}>
                          {rec.remarks || '-'}
                        </td>
                        <td style={{ padding: '12px 16px', fontSize: 13 }}>
                          <button onClick={() => handleDeleteHistory(rec._id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 14 }}>
                            🗑️
                          </button>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="6" style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>No promotion history found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingTop: 16, borderTop: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 13, color: '#64748b' }}>
                Showing {historyRecords.length} of {historyTotal} records
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button 
                  disabled={historyPage === 1}
                  onClick={() => setHistoryPage(p => p - 1)}
                  style={{ padding: '6px 12px', border: '1px solid #e2e8f0', background: '#fff', borderRadius: 4, cursor: historyPage === 1 ? 'not-allowed' : 'pointer' }}>
                  Prev
                </button>
                <button 
                  disabled={historyPage * 10 >= historyTotal}
                  onClick={() => setHistoryPage(p => p + 1)}
                  style={{ padding: '6px 12px', border: '1px solid #e2e8f0', background: '#fff', borderRadius: 4, cursor: historyPage * 10 >= historyTotal ? 'not-allowed' : 'pointer' }}>
                  Next
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

const inputStyle = {
  border: '1px solid #e2e8f0', 
  borderRadius: 6, 
  padding: '9px 12px', 
  fontSize: 13, 
  color: '#334155', 
  outline: 'none', 
  background: '#f8fafc',
  fontWeight: 500
};

const thStyle = {
  padding: '16px 20px',
  textAlign: 'left',
  fontSize: 12,
  fontWeight: 700,
  color: '#475569',
  whiteSpace: 'nowrap',
  borderBottom: '2px solid #e2e8f0',
};

const tdStyle = {
  padding: '14px 20px',
  fontSize: 13,
  color: '#475569',
  whiteSpace: 'nowrap',
};

export default Promotion;
