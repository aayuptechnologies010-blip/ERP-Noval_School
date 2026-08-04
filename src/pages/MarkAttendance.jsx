import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaVideo, FaSave, FaCheckCircle } from 'react-icons/fa';

const CLASSES = [
  'Select Class','NUR A','NUR B','LKG A','LKG B','UKG A','UKG B','UKG C',
  '1 A','1 B','1 C','2 A','2 B','2 C','3 A','3 B','3 C',
  '4 A','4 B','4 C','5 A','5 B','5 C','6 A','6 B','6 C',
  '7 A','7 B','7 C','8 A','8 B','8 C','9 A','9 B','9 C','9 D','9 E','9 F',
  '10 A','10 B','10 C','10 D','11 A','11 B','11 C','11 D','11 E','11 F',
  '12 A','12 B','12 C','12 D'
];

const dummyStudents = [
  { id: 1, admNo: '1770', name: 'ARNAV GUPTA',       rollNo: '01' },
  { id: 2, admNo: '2203', name: 'ANVI MAURYA',        rollNo: '02' },
  { id: 3, admNo: '2206', name: 'SHANVI YADAV',       rollNo: '03' },
  { id: 4, admNo: '2219', name: 'DIVYA',              rollNo: '04' },
  { id: 5, admNo: '2221', name: 'PRABHAS SAHANI',     rollNo: '05' },
  { id: 6, admNo: '2224', name: 'GAUNIK RAI',         rollNo: '06' },
  { id: 7, admNo: '2235', name: 'DIPENDRA NISHAD',   rollNo: '07' },
  { id: 8, admNo: '2237', name: 'NAVYA CHAURASIYA',  rollNo: '08' },
];

const STATUS_BUTTONS = [
  { label: 'P',    bg: '#22c55e', color: '#fff', title: 'Present'  },
  { label: 'A',    bg: '#ef4444', color: '#fff', title: 'Absent'   },
  { label: 'L',    bg: '#f59e0b', color: '#fff', title: 'Leave'    },
  { label: 'WH',   bg: '#3b82f6', color: '#fff', title: 'Half Day' },
  { label: 'Late', bg: '#8b5cf6', color: '#fff', title: 'Late'     },
  { label: 'NA',   bg: '#64748b', color: '#fff', title: 'NA'       },
];

function MarkAttendance() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState('UKG A');
  const [date, setDate] = useState('03-Aug-2026');
  const [showTable, setShowTable] = useState(true);
  const [saved, setSaved] = useState(false);

  // attendance: { [studentId]: statusLabel }
  const [attendance, setAttendance] = useState(() => {
    const init = {};
    dummyStudents.forEach(s => { init[s.id] = 'P'; });
    return init;
  });

  const handleMark = (studentId, status) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const handleMarkAll = (status) => {
    const all = {};
    dummyStudents.forEach(s => { all[s.id] = status; });
    setAttendance(all);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const counts = dummyStudents.reduce((acc, s) => {
    const st = attendance[s.id] || 'P';
    acc[st] = (acc[st] || 0) + 1;
    return acc;
  }, {});

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ padding: '24px 32px 12px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Mark Attendance</h1>
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

      {/* Filter Card */}
      <div style={{ padding: '0 32px 16px 32px' }}>
        <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: '20px 24px', display: 'flex', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 180 }}>
            <label style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>Class</label>
            <select
              value={selectedClass}
              onChange={e => setSelectedClass(e.target.value)}
              style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '9px 12px', fontSize: 14, color: '#334155', outline: 'none', background: '#fff' }}
            >
              {CLASSES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 160 }}>
            <label style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>Date</label>
            <input
              type="text"
              value={date}
              onChange={e => setDate(e.target.value)}
              style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '9px 12px', fontSize: 14, color: '#334155', outline: 'none', background: '#f8fafc' }}
            />
          </div>
          <button
            onClick={() => setShowTable(true)}
            style={{ background: '#65c466', color: '#fff', border: 'none', borderRadius: 6, padding: '9px 22px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
          >
            GO
          </button>
        </div>
      </div>

      {showTable && (
        <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

          {/* Summary Bar */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
            {STATUS_BUTTONS.map(b => (
              <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '6px 14px', fontSize: 13 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: b.bg, display: 'inline-block' }}></span>
                <span style={{ fontWeight: 600, color: '#334155' }}>{b.title}:</span>
                <span style={{ color: b.bg, fontWeight: 700 }}>{counts[b.label] || 0}</span>
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '6px 14px', fontSize: 13 }}>
              <span style={{ fontWeight: 600, color: '#334155' }}>Total:</span>
              <span style={{ color: '#2b3674', fontWeight: 700 }}>{dummyStudents.length}</span>
            </div>
          </div>

          {/* Mark All Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, background: '#f1f5f9', borderRadius: 8, padding: '10px 16px' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#475569', marginRight: 6 }}>Mark All:</span>
            {STATUS_BUTTONS.map(b => (
              <button
                key={b.label}
                onClick={() => handleMarkAll(b.label)}
                style={{ background: b.bg, color: b.color, border: 'none', borderRadius: 5, padding: '5px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'opacity .2s' }}
              >
                {b.label}
              </button>
            ))}
          </div>

          {/* Table */}
          <div style={{ background: '#fff', borderRadius: 12, flex: 1, display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <div style={{ flex: 1, overflow: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    <th style={thStyle}>Sl.</th>
                    <th style={thStyle}>Adm No</th>
                    <th style={thStyle}>Roll No</th>
                    <th style={thStyle}>Student Name</th>
                    <th style={{ ...thStyle, textAlign: 'center' }}>Mark Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyStudents.map((student, idx) => {
                    const status = attendance[student.id];
                    return (
                      <tr key={student.id} style={{ borderBottom: '1px solid #f1f5f9', background: idx % 2 === 0 ? '#fff' : '#fafbfc' }}>
                        <td style={tdStyle}>{idx + 1}</td>
                        <td style={tdStyle}>{student.admNo}</td>
                        <td style={tdStyle}>{student.rollNo}</td>
                        <td style={{ ...tdStyle, fontWeight: 600, color: '#334155', display: 'flex', alignItems: 'center', gap: 10 }}>
                          <img
                            src={`https://ui-avatars.com/api/?name=${student.name}&background=6366f1&color=fff&size=28`}
                            alt=""
                            style={{ width: 28, height: 28, borderRadius: '50%' }}
                          />
                          {student.name}
                        </td>
                        <td style={{ padding: '10px 16px', textAlign: 'center' }}>
                          <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
                            {STATUS_BUTTONS.map(b => (
                              <button
                                key={b.label}
                                onClick={() => handleMark(student.id, b.label)}
                                style={{
                                  background: status === b.label ? b.bg : '#f1f5f9',
                                  color: status === b.label ? '#fff' : '#64748b',
                                  border: status === b.label ? `2px solid ${b.bg}` : '2px solid transparent',
                                  borderRadius: 5,
                                  padding: '4px 10px',
                                  fontSize: 11,
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  transition: 'all 0.2s',
                                  outline: 'none',
                                  minWidth: 36,
                                }}
                              >
                                {b.label}
                              </button>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Save Button */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 12 }}>
              {saved && (
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#22c55e', fontSize: 14, fontWeight: 600 }}>
                  <FaCheckCircle /> Attendance Saved!
                </span>
              )}
              <button
                onClick={handleSave}
                style={{ background: '#65c466', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 28px', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <FaSave /> Save Attendance
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const thStyle = {
  padding: '14px 16px',
  textAlign: 'left',
  fontSize: 12,
  fontWeight: 700,
  color: '#0f172a',
  whiteSpace: 'nowrap',
  borderBottom: '2px solid #e2e8f0',
};

const tdStyle = {
  padding: '12px 16px',
  fontSize: 13,
  color: '#475569',
  whiteSpace: 'nowrap',
};

export default MarkAttendance;
