import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaVideo, FaPaperPlane } from 'react-icons/fa';

// Dummy data removed

function AbsenteeSMS() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/school-classes`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setClasses(data.classes || []);
      }
    } catch (err) { console.error(err); }
  };

  const handleFetchAbsent = async () => {
    if (!selectedClass) {
      alert('Please select a class');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      // For now, fetch students in the class. A true absentee system would query attendance records.
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/students?class=${selectedClass}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const list = Array.isArray(data) ? data : (data.students || []);
        const formatted = list.map(s => ({
          id: s._id,
          name: `${s.firstName || ''} ${s.lastName || ''}`.trim(),
          class: s.class ? s.class.className : 'N/A',
          phone: s.mobileNo || s.fatherMobileNo || '-',
          sent: false
        }));
        setStudents(formatted);
        setSelectedIds([]);
      }
    } catch (err) { console.error(err); }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === students.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(students.map(s => s.id));
    }
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selId => selId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSendSMS = async () => {
    try {
      const token = localStorage.getItem('token');
      const payload = {
        subject: 'Attendance',
        content: `Dear Parent, your ward is absent today (${date}) without prior information. Regards, Principal.`,
        recipientTypes: ['Specified'],
        recipients: selectedIds.map(id => {
          const s = students.find(x => x.id === id);
          return { recipientName: s.name, mobileNo: s.phone };
        })
      };

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/messages`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setStudents(students.map(s => 
          selectedIds.includes(s.id) ? { ...s, sent: true } : s
        ));
        setSelectedIds([]);
        alert('Absentee SMS sent successfully!');
      } else {
        alert('Failed to send SMS');
      }
    } catch (err) { console.error(err); }
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 12px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Absentee SMS</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
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

      {/* Filter and Action Card */}
      <div style={{ padding: '0 32px 16px 32px' }}>
        <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: '20px 24px', display: 'flex', flexWrap: 'wrap', gap: 24 }}>
          
          <div style={{ display: 'flex', flex: 1, gap: 16, alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 150 }}>
              <label style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>Date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '9px 12px', fontSize: 14, color: '#334155', outline: 'none', background: '#f8fafc' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 150 }}>
              <label style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>Class</label>
              <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '9px 12px', fontSize: 14, color: '#334155', outline: 'none', background: '#fff' }}>
                <option value="">Select Class</option>
                {classes.map(c => (
                  <option key={c._id} value={c._id}>{c.className}</option>
                ))}
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, justifyContent: 'flex-end', height: '100%' }}>
              <label style={{ fontSize: 12, color: 'transparent' }}>&nbsp;</label>
              <button onClick={handleFetchAbsent} style={{ background: '#65c466', color: '#fff', border: 'none', borderRadius: 6, padding: '9px 22px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                GO
              </button>
            </div>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>SMS Template Preview</label>
            <textarea 
              readOnly 
              defaultValue="Dear Parent, your ward {#student_name#} is absent today ({#date#}) without prior information. Regards, Principal."
              style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '10px 12px', fontSize: 13, color: '#64748b', outline: 'none', background: '#f8fafc', height: 60, resize: 'none' }}
            ></textarea>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                onClick={handleSendSMS}
                disabled={selectedIds.length === 0}
                style={{ 
                  background: selectedIds.length > 0 ? '#3b82f6' : '#94a3b8', 
                  color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', 
                  fontSize: 13, fontWeight: 700, cursor: selectedIds.length > 0 ? 'pointer' : 'not-allowed',
                  display: 'flex', alignItems: 'center', gap: 6
                }}
              >
                <FaPaperPlane /> Send SMS ({selectedIds.length})
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content Card */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'hidden' }}>
        <div style={{ background: '#fff', borderRadius: 12, height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
           
          <div style={{ flex: 1, overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={{ ...thStyle, width: 40, textAlign: 'center' }}>
                    <input 
                      type="checkbox" 
                      checked={students.length > 0 && selectedIds.length === students.length}
                      onChange={toggleSelectAll}
                      style={{ cursor: 'pointer' }}
                    />
                  </th>
                  <th style={thStyle}>Sl. No.</th>
                  <th style={thStyle}>Student Name</th>
                  <th style={thStyle}>Class</th>
                  <th style={thStyle}>Guardian Phone</th>
                  <th style={thStyle}>Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, idx) => (
                  <tr key={student.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(student.id)}
                        onChange={() => toggleSelect(student.id)}
                        style={{ cursor: 'pointer' }}
                      />
                    </td>
                    <td style={tdStyle}>{idx + 1}</td>
                    <td style={{ ...tdStyle, fontWeight: 600, color: '#334155' }}>{student.name}</td>
                    <td style={tdStyle}>{student.class}</td>
                    <td style={tdStyle}>{student.phone}</td>
                    <td style={tdStyle}>
                      <span style={{ 
                        background: student.sent ? '#dcfce7' : '#fee2e2', 
                        color: student.sent ? '#166534' : '#991b1b', 
                        padding: '4px 10px', 
                        borderRadius: 12, 
                        fontSize: 12, 
                        fontWeight: 700 
                      }}>
                        {student.sent ? 'Sent' : 'Not Sent'}
                      </span>
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

const thStyle = {
  padding: '16px 20px',
  textAlign: 'left',
  fontSize: 13,
  fontWeight: 700,
  color: '#0f172a',
  whiteSpace: 'nowrap',
  borderBottom: '1px solid #e2e8f0',
};

const tdStyle = {
  padding: '16px 20px',
  fontSize: 13,
  color: '#475569',
  whiteSpace: 'nowrap',
};

export default AbsenteeSMS;
