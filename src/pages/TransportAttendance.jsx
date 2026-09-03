import React, { useState } from 'react';
import { FaBus, FaClipboardList, FaFileSignature, FaChartLine, FaCheckCircle, FaTimesCircle, FaClock, FaSearch, FaUserCircle } from 'react-icons/fa';

/* ─── Static Data ─────────────────────────────────── */
const TABS = [
  { id: 'Mark Attendance', icon: FaClipboardList },
  { id: 'View Attendance', icon: FaSearch },
  { id: 'Out Pass', icon: FaFileSignature },
  { id: 'Attendance Report', icon: FaChartLine }
];

const ROUTES    = ['Select Routes','Route 1 - North Zone','Route 2 - South Zone','Route 3 - East Zone','Route 4 - West Zone'];
const TRIP_TYPES = ['Select Trip Type','Morning','Afternoon','Evening'];
const TRIP_ALL  = ['All','Morning','Afternoon','Evening'];
const STOPPAGES = ['Select','Stop 1 - Main Gate','Stop 2 - Market','Stop 3 - Park Road','Stop 4 - Colony'];

const STUDENTS = [
  { id:1, adm:'001', name:'Aarav Sharma',  father:'Rajesh Sharma',  cls:'9 A',  contact:'9876543210', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id:2, adm:'002', name:'Priya Mehta',   father:'Sunil Mehta',    cls:'8 B',  contact:'9876543211', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id:3, adm:'003', name:'Rajan Verma',   father:'Anil Verma',     cls:'10 C', contact:'9876543212', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id:4, adm:'004', name:'Sneha Patel',   father:'Dinesh Patel',   cls:'7 A',  contact:'9876543213', avatar: 'https://i.pravatar.cc/150?u=4' },
  { id:5, adm:'005', name:'Arjun Singh',   father:'Vikram Singh',   cls:'11 D', contact:'9876543214', avatar: 'https://i.pravatar.cc/150?u=5' },
  { id:6, adm:'006', name:'Naina Gupta',   father:'Manoj Gupta',    cls:'6 B',  contact:'9876543215', avatar: 'https://i.pravatar.cc/150?u=6' },
  { id:7, adm:'007', name:'Rohit Kumar',   father:'Suresh Kumar',   cls:'9 B',  contact:'9876543216', avatar: 'https://i.pravatar.cc/150?u=7' },
  { id:8, adm:'008', name:'Kavya Sharma',  father:'Ramesh Sharma',  cls:'10 A', contact:'9876543217', avatar: 'https://i.pravatar.cc/150?u=8' },
];

/* ─── Colour helpers ──────────────────────────────── */
const STATUS_COLOR = { P: '#10b981', A: '#ef4444', L: '#f59e0b' };
const STATUS_BG    = { P: '#dcfce7', A: '#fee2e2', L: '#fef3c7' };
const STATUS_LABEL = { P: 'Present', A: 'Absent',  L: 'Late'    };
const STATUS_ICON  = { P: FaCheckCircle, A: FaTimesCircle, L: FaClock };

/* ─── Tiny reusable pieces ────────────────────────── */
function Lbl({ children }) {
  return <label style={{ fontSize: 13, color: '#64748b', fontWeight: 600, marginBottom: 6, display: 'block' }}>{children}</label>;
}

function Select({ label, options, value, onChange, style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 150, ...style }}>
      {label && <Lbl>{label}</Lbl>}
      <select value={value} onChange={e => onChange(e.target.value)}
        style={{ border: '1px solid #cbd5e1', borderRadius: 8, padding: '10px 14px',
                 fontSize: 14, color: '#334155', background: '#fff',
                 outline: 'none', cursor: 'pointer', appearance: 'none',
                 boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function DateInput({ label, value, onChange, style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 150, ...style }}>
      {label && <Lbl>{label}</Lbl>}
      <input type="date" value={value} onChange={e => onChange(e.target.value)}
        style={{ border: '1px solid #cbd5e1', borderRadius: 8, padding: '9px 14px',
                 fontSize: 14, color: '#334155', background: '#fff',
                 outline: 'none', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }} />
    </div>
  );
}

function Btn({ children, onClick, color = '#3b82f6', style = {} }) {
  return (
    <button onClick={onClick}
      style={{ background: color, color: '#fff', border: 'none',
               borderRadius: 8, padding: '10px 24px', fontSize: 14, fontWeight: 600,
               cursor: 'pointer', alignSelf: 'flex-end', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
               transition: 'background 0.2s', ...style }}>
      {children}
    </button>
  );
}

/* ─── P / A / L toggle button ────────────────────── */
function PalBtn({ val, active, onClick }) {
  const Icon = STATUS_ICON[val];
  return (
    <button onClick={onClick}
      title={STATUS_LABEL[val]}
      style={{ width: 32, height: 32, border: 'none', borderRadius: 8, fontSize: 14,
               fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
               display: 'flex', alignItems: 'center', justifyItems: 'center',
               background: active ? STATUS_COLOR[val] : '#f1f5f9',
               color: active ? '#fff' : '#94a3b8',
               boxShadow: active ? `0 2px 6px ${STATUS_COLOR[val]}66` : 'none' }}>
      <span style={{ margin: 'auto' }}>{val}</span>
    </button>
  );
}

/* ══════════════════════════════════════════════════
   MARK ATTENDANCE TAB
══════════════════════════════════════════════════ */
function MarkAttendanceTab() {
  const today = new Date().toISOString().split('T')[0];

  const [route,    setRoute]    = useState('Select Routes');
  const [trip,     setTrip]     = useState('Select Trip Type');
  const [stop,     setStop]     = useState('Select');
  const [date,     setDate]     = useState(today);
  const [rows,     setRows]     = useState(null);
  const [attn,     setAttn]     = useState({});
  const [checked,  setChecked]  = useState([]);

  const [loading,  setLoading]  = useState(false);

  async function handleGet() {
    if (route === 'Select Routes' || trip === 'Select Trip Type') {
      alert("Please select a route and trip type first.");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/transport/students`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const init = {};
        data.forEach(s => {
          init[`${s.id}_m`] = 'P';
          init[`${s.id}_a`] = 'P';
        });
        setAttn(init);
        setRows(data);
        setChecked([]);
      } else {
        alert("Failed to fetch students");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  }

  function setCell(key, val) {
    setAttn(prev => ({ ...prev, [key]: val }));
  }

  function toggleOne(id) {
    setChecked(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }

  function toggleAll() {
    if (!rows) return;
    setChecked(prev => prev.length === rows.length ? [] : rows.map(s => s.id));
  }

  function bulkMark(val) {
    setAttn(prev => {
      const next = { ...prev };
      checked.forEach(id => {
        next[`${id}_m`] = val;
        next[`${id}_a`] = val;
      });
      return next;
    });
  }

  async function handleSubmit() {
    if (!rows || rows.length === 0) return;
    
    const records = rows.map(s => ({
      studentId: s.id,
      morningStatus: attn[`${s.id}_m`],
      afternoonStatus: attn[`${s.id}_a`]
    }));

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/transport/attendance/mark`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          date,
          route,
          tripType: trip,
          stop,
          records
        })
      });
      if (res.ok) {
        alert("Attendance submitted successfully!");
      } else {
        alert("Failed to submit attendance");
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting attendance");
    }
  }

  const allChecked  = rows && checked.length === rows.length;
  const someChecked = checked.length > 0;

  const counts = rows
    ? { P: rows.filter(s => attn[`${s.id}_m`] === 'P').length,
        A: rows.filter(s => attn[`${s.id}_m`] === 'A').length,
        L: rows.filter(s => attn[`${s.id}_m`] === 'L').length }
    : {};

  return (
    <div style={{ padding: '24px' }}>

      {/* Filter row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-end', marginBottom: 24, background: '#f8fafc', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
        <Select label="Routes" options={ROUTES} value={route} onChange={setRoute} />
        <Select label="Trip Type" options={TRIP_TYPES} value={trip} onChange={setTrip} />
        <Select label="Stoppage" options={STOPPAGES} value={stop} onChange={setStop} />
        <DateInput label="Date" value={date} onChange={setDate} />
        <Btn onClick={handleGet} style={{ height: 40, display: 'flex', alignItems: 'center', gap: 8 }}><FaSearch /> Fetch Students</Btn>
      </div>

      {rows && (
        <>
          {/* Bulk toolbar */}
          <div style={{
            display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 16,
            background: someChecked ? '#f0fdf4' : '#fff',
            border: `1px solid ${someChecked ? '#86efac' : '#e2e8f0'}`,
            borderRadius: 8, padding: '12px 20px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#334155' }}>
              <input type="checkbox" checked={!!allChecked} onChange={toggleAll} style={{ width: 16, height: 16, accentColor: '#10b981', cursor: 'pointer' }} />
              {allChecked ? 'Deselect All' : 'Select All'}
            </label>

            {someChecked && (
              <>
                <span style={{ fontSize: 13, color: '#64748b' }}>
                  <b style={{ color: '#10b981' }}>{checked.length}</b> students selected. Mark bulk attendance:
                </span>

                <div style={{ display: 'flex', gap: 8 }}>
                  {['P', 'A', 'L'].map(v => (
                    <button key={v} onClick={() => bulkMark(v)}
                      style={{
                        background: STATUS_COLOR[v], color: '#fff', border: 'none',
                        borderRadius: 6, padding: '6px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                        boxShadow: `0 2px 4px ${STATUS_COLOR[v]}40`
                      }}>
                      {STATUS_LABEL[v]}
                    </button>
                  ))}
                </div>
                <button onClick={() => setChecked([])} style={{ marginLeft: 'auto', background: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: 6, padding: '6px 12px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Clear</button>
              </>
            )}
          </div>

          {/* Student table */}
          <div style={{ overflowX: 'auto', background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '14px 16px', width: 40, textAlign: 'center' }}>
                    <input type="checkbox" checked={!!allChecked} onChange={toggleAll} style={{ width: 16, height: 16, accentColor: '#10b981', cursor: 'pointer' }} />
                  </th>
                  {['Adm No.', 'Student Details', 'Father Name', 'Class', 'Morning', 'Afternoon'].map(h => (
                    <th key={h} style={thStyle}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((s, i) => {
                  const sel = checked.includes(s.id);
                  return (
                    <tr key={s.id} style={{
                      background: sel ? '#f0fdf4' : '#fff',
                      borderBottom: '1px solid #f1f5f9',
                      transition: 'background 0.2s',
                    }}>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <input type="checkbox" checked={sel} onChange={() => toggleOne(s.id)} style={{ width: 16, height: 16, accentColor: '#10b981', cursor: 'pointer' }} />
                      </td>
                      <td style={tdStyle}>{s.adm}</td>
                      <td style={tdStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <img src={s.avatar} alt="avatar" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
                          <div>
                            <p style={{ margin: 0, fontWeight: 600, color: '#1e293b' }}>{s.name}</p>
                            <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>{s.contact}</p>
                          </div>
                        </div>
                      </td>
                      <td style={tdStyle}>{s.father}</td>
                      <td style={{ ...tdStyle, fontWeight: 600, color: '#3b82f6' }}>{s.cls}</td>

                      <td style={tdStyle}>
                        <div style={{ display: 'flex', gap: 6 }}>
                          {['P', 'A', 'L'].map(v => <PalBtn key={v} val={v} active={attn[`${s.id}_m`] === v} onClick={() => setCell(`${s.id}_m`, v)} />)}
                        </div>
                      </td>
                      <td style={tdStyle}>
                        <div style={{ display: 'flex', gap: 6 }}>
                          {['P', 'A', 'L'].map(v => <PalBtn key={v} val={v} active={attn[`${s.id}_a`] === v} onClick={() => setCell(`${s.id}_a`, v)} />)}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Summary + Save */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 24, padding: 20, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
            <div>
              <p style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 600, color: '#64748b' }}>Morning Attendance Summary</p>
              <div style={{ display: 'flex', gap: 12 }}>
                {['P', 'A', 'L'].map(v => (
                  <div key={v} style={{ display: 'flex', alignItems: 'center', gap: 8, background: STATUS_BG[v], color: STATUS_COLOR[v], padding: '6px 14px', borderRadius: 20, fontWeight: 700, fontSize: 13 }}>
                    {STATUS_LABEL[v]}: {counts[v]}
                  </div>
                ))}
              </div>
            </div>
            <Btn color="#10b981" onClick={handleSubmit} style={{ padding: '12px 32px' }}>
              {loading ? 'Submitting...' : 'Submit Attendance'}
            </Btn>
          </div>
        </>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   VIEW ATTENDANCE TAB
══════════════════════════════════════════════════ */
function ViewAttendanceTab() {
  const [date,  setDate]  = useState(new Date().toISOString().split('T')[0]);
  const [route, setRoute] = useState('Select Routes');
  const [trip,  setTrip]  = useState('All');
  const [stop,  setStop]  = useState('Select');
  const [records, setRecords] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRecords = async () => {
    if (!date) return alert("Please select a date.");
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/transport/attendance/view?date=${date}&tripType=${trip}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setRecords(data);
      } else {
        alert("Failed to fetch records");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-end', background: '#f8fafc', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
        <DateInput label="Date" value={date} onChange={setDate} />
        <Select label="Trip Type" options={TRIP_ALL} value={trip} onChange={setTrip} />
        <Select label="Routes" options={ROUTES} value={route} onChange={setRoute} />
        <Select label="Stoppage" options={STOPPAGES} value={stop} onChange={setStop} />
        <Btn onClick={fetchRecords} style={{ height: 40, display: 'flex', alignItems: 'center', gap: 8 }}>
          <FaSearch /> {loading ? 'Fetching...' : 'View Records'}
        </Btn>
      </div>
      
      {records ? (
        <div style={{ marginTop: 24, overflowX: 'auto', background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0' }}>
          {records.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  {['Adm No.', 'Student Details', 'Father Name', 'Class', 'Trip Type', 'Route', 'Morning', 'Afternoon'].map(h => (
                    <th key={h} style={thStyle}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {records.map((r, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={tdStyle}>{r.adm}</td>
                    <td style={tdStyle}>
                      <p style={{ margin: 0, fontWeight: 600, color: '#1e293b' }}>{r.name}</p>
                      <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>{r.contact}</p>
                    </td>
                    <td style={tdStyle}>{r.father}</td>
                    <td style={{ ...tdStyle, fontWeight: 600, color: '#3b82f6' }}>{r.cls}</td>
                    <td style={tdStyle}>{r.tripType}</td>
                    <td style={tdStyle}>{r.route}</td>
                    <td style={tdStyle}>
                      <span style={{ background: STATUS_BG[r.morningStatus] || '#f1f5f9', color: STATUS_COLOR[r.morningStatus] || '#94a3b8', padding: '4px 10px', borderRadius: 4, fontWeight: 700 }}>
                        {STATUS_LABEL[r.morningStatus] || 'N/A'}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      <span style={{ background: STATUS_BG[r.afternoonStatus] || '#f1f5f9', color: STATUS_COLOR[r.afternoonStatus] || '#94a3b8', padding: '4px 10px', borderRadius: 4, fontWeight: 700 }}>
                        {STATUS_LABEL[r.afternoonStatus] || 'N/A'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ padding: 40, textAlign: 'center', color: '#64748b' }}>No records found for the selected filters.</div>
          )}
        </div>
      ) : (
        <div style={{ marginTop: 40, textAlign: 'center', color: '#94a3b8' }}>
          <FaChartLine size={48} style={{ opacity: 0.2, marginBottom: 16 }} />
          <p>Select filters to view attendance records.</p>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   OUT PASS TAB
══════════════════════════════════════════════════ */
function OutPassTab() {
  const [assignDate, setAssignDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    fetchStudents();
    fetchPasses();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/transport/students`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) setStudents(await res.json());
    } catch (e) { console.error(e); }
  };

  const fetchPasses = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/transport/outpass`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) setPasses(await res.json());
    } catch (e) { console.error(e); }
  };

  const handleGenerate = async () => {
    if (!selectedStudent || !className || !assignDate || !endDate) return alert("Fill all fields");
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/transport/outpass`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: selectedStudent, className, section, assignDate, endDate })
      });
      if (res.ok) {
        alert("Out Pass generated");
        fetchPasses();
      } else alert("Failed to generate");
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-end', background: '#f8fafc', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
        <Select label="Student" options={['Select', ...students.map(s => s.id)]} value={selectedStudent} onChange={setSelectedStudent} />
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 100 }}>
          <Lbl>Class</Lbl>
          <input type="text" value={className} onChange={e => setClassName(e.target.value)} style={{ border: '1px solid #cbd5e1', borderRadius: 8, padding: '9px 14px', fontSize: 14, outline: 'none' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 100 }}>
          <Lbl>Section</Lbl>
          <input type="text" value={section} onChange={e => setSection(e.target.value)} style={{ border: '1px solid #cbd5e1', borderRadius: 8, padding: '9px 14px', fontSize: 14, outline: 'none' }} />
        </div>
        <DateInput label="Assign Date" value={assignDate} onChange={setAssignDate} />
        <DateInput label="End Date" value={endDate} onChange={setEndDate} />
        <Btn onClick={handleGenerate} style={{ height: 40 }}>{loading ? 'Generating...' : 'Generate Pass'}</Btn>
      </div>

      <div style={{ marginTop: 24, overflowX: 'auto', background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={thStyle}>Adm No.</th>
              <th style={thStyle}>Student Name</th>
              <th style={thStyle}>Class/Section</th>
              <th style={thStyle}>Assign Date</th>
              <th style={thStyle}>End Date</th>
            </tr>
          </thead>
          <tbody>
            {passes.map((p, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={tdStyle}>{p.adm}</td>
                <td style={tdStyle}><p style={{ margin: 0, fontWeight: 600 }}>{p.name}</p></td>
                <td style={tdStyle}>{p.cls} {p.section}</td>
                <td style={tdStyle}>{p.assignDate}</td>
                <td style={tdStyle}>{p.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   ATTENDANCE REPORT TAB
══════════════════════════════════════════════════ */
function AttendanceReportTab() {
  const today = new Date().toISOString().split('T')[0];
  const firstOfMon = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];

  const [from,  setFrom]  = useState(firstOfMon);
  const [to,    setTo]    = useState(today);
  const [route, setRoute] = useState('Select');
  const [trip,  setTrip]  = useState('All');
  const [stop,  setStop]  = useState('Select');

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-end', background: '#f8fafc', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
        <DateInput label="From Date" value={from} onChange={setFrom} />
        <DateInput label="To Date" value={to} onChange={setTo} />
        <Select label="Routes" options={['Select', ...ROUTES.slice(1)]} value={route} onChange={setRoute} />
        <Select label="Trip Type" options={TRIP_ALL} value={trip} onChange={setTrip} />
        <Select label="Stoppage" options={STOPPAGES} value={stop} onChange={setStop} />
        <Btn color="#8b5cf6" style={{ height: 40, display: 'flex', alignItems: 'center', gap: 8 }}><FaChartLine /> Generate Report</Btn>
      </div>
      <div style={{ marginTop: 40, textAlign: 'center', color: '#94a3b8' }}>
        <FaClipboardList size={48} style={{ opacity: 0.2, marginBottom: 16 }} />
        <p>Report will be generated here.</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════ */
export default function TransportAttendance() {
  const [activeTab, setActiveTab] = useState('Mark Attendance');

  return (
    <div style={{ flex: 1, background: '#f4f6f9', padding: '24px', display: 'flex', flexDirection: 'column', minHeight: '100vh', boxSizing: 'border-box' }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{ width: 48, height: 48, background: '#3b82f6', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 4px 10px rgba(59, 130, 246, 0.3)' }}>
          <FaBus size={24} />
        </div>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', margin: 0 }}>Transport Management</h1>
          <p style={{ color: '#64748b', fontSize: 14, margin: '4px 0 0' }}>Manage school bus attendance, routes, and reports</p>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '2px solid #f1f5f9', background: '#fff', overflowX: 'auto' }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '16px 24px', fontSize: 14, border: 'none', cursor: 'pointer',
                transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 10,
                fontWeight: activeTab === tab.id ? 700 : 500,
                background: activeTab === tab.id ? '#f8fafc' : 'transparent',
                color: activeTab === tab.id ? '#3b82f6' : '#64748b',
                borderBottom: activeTab === tab.id ? '3px solid #3b82f6' : '3px solid transparent',
                whiteSpace: 'nowrap'
              }}>
              <tab.icon size={16} />
              {tab.id}
            </button>
          ))}
        </div>

        {/* Tab panels */}
        <div style={{ flex: 1 }}>
          {activeTab === 'Mark Attendance'   && <MarkAttendanceTab />}
          {activeTab === 'View Attendance'   && <ViewAttendanceTab />}
          {activeTab === 'Out Pass'          && <OutPassTab />}
          {activeTab === 'Attendance Report' && <AttendanceReportTab />}
        </div>
      </div>

    </div>
  );
}

const thStyle = { padding: '14px 16px', fontSize: 13, fontWeight: 600, color: '#475569', whiteSpace: 'nowrap' };
const tdStyle = { padding: '12px 16px', fontSize: 13, color: '#334155', verticalAlign: 'middle' };
