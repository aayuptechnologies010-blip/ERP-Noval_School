import React, { useState } from 'react';

/* ─── Static Data ─────────────────────────────────── */
const TABS = ['Mark Attendance', 'View Attendance', 'Out Pass', 'Attendance Report'];

const ROUTES    = ['Select Routes','Route 1 - North Zone','Route 2 - South Zone','Route 3 - East Zone','Route 4 - West Zone'];
const TRIP_TYPES = ['Select Trip Type','Morning','Afternoon','Evening'];
const TRIP_ALL  = ['All','Morning','Afternoon','Evening'];
const STOPPAGES = ['Select','Stop 1 - Main Gate','Stop 2 - Market','Stop 3 - Park Road','Stop 4 - Colony'];

const STUDENTS = [
  { id:1, adm:'001', name:'Aarav Sharma',  father:'Rajesh Sharma',  cls:'9 A',  contact:'9876543210' },
  { id:2, adm:'002', name:'Priya Mehta',   father:'Sunil Mehta',    cls:'8 B',  contact:'9876543211' },
  { id:3, adm:'003', name:'Rajan Verma',   father:'Anil Verma',     cls:'10 C', contact:'9876543212' },
  { id:4, adm:'004', name:'Sneha Patel',   father:'Dinesh Patel',   cls:'7 A',  contact:'9876543213' },
  { id:5, adm:'005', name:'Arjun Singh',   father:'Vikram Singh',   cls:'11 D', contact:'9876543214' },
  { id:6, adm:'006', name:'Naina Gupta',   father:'Manoj Gupta',    cls:'6 B',  contact:'9876543215' },
  { id:7, adm:'007', name:'Rohit Kumar',   father:'Suresh Kumar',   cls:'9 B',  contact:'9876543216' },
  { id:8, adm:'008', name:'Kavya Sharma',  father:'Ramesh Sharma',  cls:'10 A', contact:'9876543217' },
];

/* ─── Colour helpers ──────────────────────────────── */
const STATUS_COLOR = { P:'#4caf50', A:'#ef5350', L:'#ff9800' };
const STATUS_BG    = { P:'#e8f5e9', A:'#ffebee', L:'#fff3e0' };
const STATUS_LABEL = { P:'Present', A:'Absent',  L:'Late'    };

/* ─── Tiny reusable pieces ────────────────────────── */
function Lbl({ children }) {
  return <label style={{ fontSize:12, color:'#555', marginBottom:2, display:'block' }}>{children}</label>;
}

function Select({ label, options, value, onChange }) {
  return (
    <div style={{ display:'flex', flexDirection:'column' }}>
      {label && <Lbl>{label}</Lbl>}
      <select value={value} onChange={e => onChange(e.target.value)}
        style={{ border:'1px solid #d1d5db', borderRadius:4, padding:'6px 10px',
                 fontSize:13, color:'#374151', background:'#fff', height:34,
                 outline:'none', cursor:'pointer', minWidth:150 }}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function DateInput({ label, value, onChange }) {
  const display = value
    ? new Date(value).toLocaleDateString('en-GB',{ day:'2-digit', month:'short', year:'numeric' })
    : '';
  return (
    <div style={{ display:'flex', flexDirection:'column' }}>
      {label && <Lbl>{label}</Lbl>}
      <div style={{ position:'relative', width:160 }}>
        <input type="date" value={value} onChange={e => onChange(e.target.value)}
          style={{ position:'absolute', inset:0, opacity:0, cursor:'pointer', zIndex:1, width:'100%' }} />
        <div style={{ border:'1px solid #d1d5db', borderRadius:4, padding:'6px 10px',
                      fontSize:13, color:'#374151', background:'#e9e9e9', height:34,
                      display:'flex', alignItems:'center', userSelect:'none' }}>
          {display || <span style={{ color:'#aaa' }}>Select date</span>}
        </div>
      </div>
    </div>
  );
}

function Btn({ children, onClick, color='#4caf50', hoverColor='#388e3c', style={} }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ background: hov ? hoverColor : color, color:'#fff', border:'none',
               borderRadius:4, padding:'7px 18px', fontSize:13, fontWeight:600,
               cursor:'pointer', height:34, alignSelf:'flex-end', ...style }}>
      {children}
    </button>
  );
}

/* ─── P / A / L toggle button ────────────────────── */
function PalBtn({ val, active, onClick }) {
  return (
    <button onClick={onClick}
      title={STATUS_LABEL[val]}
      style={{ width:26, height:26, border:'none', borderRadius:4, fontSize:12,
               fontWeight:700, cursor:'pointer', transition:'background 0.15s',
               background: active ? STATUS_COLOR[val] : '#e5e7eb',
               color: active ? '#fff' : '#666' }}>
      {val}
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
  const [rows,     setRows]     = useState(null);   // null = not loaded yet
  const [attn,     setAttn]     = useState({});     // { "1_m": "P", "1_a": "P", ... }
  const [checked,  setChecked]  = useState([]);     // array of selected student ids

  /* Load students */
  function handleGet() {
    const init = {};
    STUDENTS.forEach(s => {
      init[`${s.id}_m`] = 'P';
      init[`${s.id}_a`] = 'P';
    });
    setAttn(init);
    setRows(STUDENTS);
    setChecked([]);
  }

  /* Toggle one P/A/L cell */
  function setCell(key, val) {
    setAttn(prev => ({ ...prev, [key]: val }));
  }

  /* Checkbox: toggle a single student */
  function toggleOne(id) {
    setChecked(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }

  /* Checkbox: toggle all students */
  function toggleAll() {
    if (!rows) return;
    setChecked(prev => prev.length === rows.length ? [] : rows.map(s => s.id));
  }

  /* Bulk mark selected students */
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

  const allChecked  = rows && checked.length === rows.length;
  const someChecked = checked.length > 0;

  /* Summary counts (morning only) */
  const counts = rows
    ? { P: rows.filter(s => attn[`${s.id}_m`] === 'P').length,
        A: rows.filter(s => attn[`${s.id}_m`] === 'A').length,
        L: rows.filter(s => attn[`${s.id}_m`] === 'L').length }
    : {};

  return (
    <div style={{ padding:'16px 20px' }}>

      {/* ── Filter row ── */}
      <div style={{ display:'flex', flexWrap:'wrap', gap:12, alignItems:'flex-end', marginBottom:16 }}>
        <Select label="Routes"    options={ROUTES}     value={route} onChange={setRoute} />
        <Select label="Trip Type" options={TRIP_TYPES} value={trip}  onChange={setTrip}  />
        <Select label="Stoppage"  options={STOPPAGES}  value={stop}  onChange={setStop}  />
        <DateInput label="Date" value={date} onChange={setDate} />
        <Btn onClick={handleGet}>Get Student</Btn>
      </div>

      {rows && (
        <>
          {/* ── Bulk toolbar ── */}
          <div style={{
            display:'flex', alignItems:'center', flexWrap:'wrap', gap:10, marginBottom:10,
            background: someChecked ? '#e8f5e9' : '#f9fafb',
            border:`1px solid ${someChecked ? '#a5d6a7' : '#e5e7eb'}`,
            borderRadius:6, padding:'8px 14px',
          }}>
            {/* Select All */}
            <label style={{ display:'flex', alignItems:'center', gap:6, cursor:'pointer',
                            fontSize:13, fontWeight:500, color:'#374151', userSelect:'none' }}>
              <input type="checkbox" checked={!!allChecked} onChange={toggleAll}
                style={{ width:15, height:15, cursor:'pointer', accentColor:'#4caf50' }} />
              {allChecked ? 'Deselect All' : 'Select All'}
            </label>

            {someChecked && (
              <>
                <span style={{ fontSize:12, color:'#555' }}>
                  <b style={{ color:'#2e7d32' }}>{checked.length}</b>
                  {checked.length > 1 ? ' students' : ' student'} selected — Mark as:
                </span>

                {['P','A','L'].map(v => (
                  <button key={v} onClick={() => bulkMark(v)}
                    style={{
                      background: STATUS_COLOR[v], color:'#fff', border:'none',
                      borderRadius:4, padding:'5px 16px', fontSize:12, fontWeight:700, cursor:'pointer',
                    }}>
                    {STATUS_LABEL[v]}
                  </button>
                ))}

                <button onClick={() => setChecked([])}
                  style={{ marginLeft:'auto', background:'transparent', color:'#888',
                           border:'1px solid #ccc', borderRadius:4, padding:'4px 10px',
                           fontSize:12, cursor:'pointer' }}>
                  Clear Selection
                </button>
              </>
            )}
          </div>

          {/* ── Student table ── */}
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
              <thead>
                <tr style={{ background:'#f3f4f6' }}>
                  <th style={{ padding:'8px 10px', width:36 }}>
                    <input type="checkbox" checked={!!allChecked} onChange={toggleAll}
                      style={{ width:14, height:14, cursor:'pointer', accentColor:'#4caf50' }} />
                  </th>
                  {['#','Adm No.','Student Name','Father Name','Class','Contact','Morning','Afternoon'].map(h => (
                    <th key={h} style={{ padding:'8px 10px', textAlign:'left', fontWeight:600,
                                         color:'#555', borderBottom:'1px solid #e5e7eb', whiteSpace:'nowrap' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((s, i) => {
                  const sel = checked.includes(s.id);
                  return (
                    <tr key={s.id} style={{
                      background: sel ? '#f0fdf4' : i % 2 === 0 ? '#fff' : '#f9fafb',
                      borderBottom:'1px solid #f3f4f6',
                      transition:'background 0.15s',
                    }}>
                      {/* Checkbox */}
                      <td style={{ padding:'7px 10px', textAlign:'center' }}>
                        <input type="checkbox" checked={sel} onChange={() => toggleOne(s.id)}
                          style={{ width:14, height:14, cursor:'pointer', accentColor:'#4caf50' }} />
                      </td>
                      <td style={{ padding:'7px 10px', color:'#888' }}>{i+1}</td>
                      <td style={{ padding:'7px 10px' }}>{s.adm}</td>
                      <td style={{ padding:'7px 10px', fontWeight:500, color: sel ? '#1b5e20' : '#222' }}>{s.name}</td>
                      <td style={{ padding:'7px 10px', color:'#555' }}>{s.father}</td>
                      <td style={{ padding:'7px 10px' }}>{s.cls}</td>
                      <td style={{ padding:'7px 10px', color:'#555' }}>{s.contact}</td>

                      {/* Morning */}
                      <td style={{ padding:'7px 10px' }}>
                        <div style={{ display:'flex', gap:4 }}>
                          {['P','A','L'].map(v => (
                            <PalBtn key={v} val={v}
                              active={attn[`${s.id}_m`] === v}
                              onClick={() => setCell(`${s.id}_m`, v)} />
                          ))}
                        </div>
                      </td>

                      {/* Afternoon */}
                      <td style={{ padding:'7px 10px' }}>
                        <div style={{ display:'flex', gap:4 }}>
                          {['P','A','L'].map(v => (
                            <PalBtn key={v} val={v}
                              active={attn[`${s.id}_a`] === v}
                              onClick={() => setCell(`${s.id}_a`, v)} />
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Summary + Save */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
                          marginTop:12, flexWrap:'wrap', gap:8 }}>
              <div style={{ display:'flex', gap:10 }}>
                {['P','A','L'].map(v => (
                  <span key={v} style={{
                    background: STATUS_BG[v], color: STATUS_COLOR[v],
                    fontWeight:700, fontSize:12,
                    padding:'4px 12px', borderRadius:20,
                    border:`1px solid ${STATUS_COLOR[v]}44`,
                  }}>
                    {STATUS_LABEL[v]}: {counts[v]}
                  </span>
                ))}
              </div>
              <Btn>Save Attendance</Btn>
            </div>
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
  const [date,  setDate]  = useState('');
  const [route, setRoute] = useState('Select Routes');
  const [stop,  setStop]  = useState('Select');

  return (
    <div style={{ padding:'16px 20px' }}>
      <div style={{ display:'flex', flexWrap:'wrap', gap:12, alignItems:'flex-end' }}>
        <DateInput label="Date" value={date} onChange={setDate} />
        <Select label="Routes" options={ROUTES} value={route} onChange={setRoute} />
        <Select label="Stoppage" options={STOPPAGES} value={stop} onChange={setStop} />
        <Btn>Get Student</Btn>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   OUT PASS TAB
══════════════════════════════════════════════════ */
function OutPassTab() {
  const [date, setDate] = useState('');
  return (
    <div style={{ padding:'16px 20px' }}>
      <div style={{ display:'flex', flexWrap:'wrap', gap:12, alignItems:'flex-end' }}>
        <DateInput label="Date" value={date} onChange={setDate} />
        <Btn>Get</Btn>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   ATTENDANCE REPORT TAB
══════════════════════════════════════════════════ */
function AttendanceReportTab() {
  const today      = new Date().toISOString().split('T')[0];
  const firstOfMon = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];

  const [from,  setFrom]  = useState(firstOfMon);
  const [to,    setTo]    = useState(today);
  const [route, setRoute] = useState('Select');
  const [trip,  setTrip]  = useState('All');
  const [stop,  setStop]  = useState('Select');

  const fmtDate = d => d
    ? new Date(d).toLocaleDateString('en-GB',{ day:'2-digit', month:'short', year:'numeric' })
    : '';

  const rangeLabel = (from && to) ? `${fmtDate(from)} to ${fmtDate(to)}` : fmtDate(from) || '';

  return (
    <div style={{ padding:'16px 20px' }}>
      <div style={{ display:'flex', flexWrap:'wrap', gap:12, alignItems:'flex-end' }}>

        {/* Date Range field */}
        <div style={{ display:'flex', flexDirection:'column' }}>
          <Lbl>Date Range</Lbl>
          <div style={{ position:'relative', width:230 }}>
            <input type="date" value={from} onChange={e => setFrom(e.target.value)}
              style={{ position:'absolute', left:0, top:0, width:'50%', height:'100%',
                       opacity:0, cursor:'pointer', zIndex:1 }} />
            <input type="date" value={to} onChange={e => setTo(e.target.value)}
              style={{ position:'absolute', right:0, top:0, width:'50%', height:'100%',
                       opacity:0, cursor:'pointer', zIndex:1 }} />
            <div style={{ border:'1px solid #d1d5db', borderRadius:4, padding:'6px 10px',
                          fontSize:13, color:'#374151', background:'#e9e9e9', height:34,
                          display:'flex', alignItems:'center', userSelect:'none' }}>
              {rangeLabel || <span style={{ color:'#aaa' }}>Select range</span>}
            </div>
          </div>
        </div>

        <Select label="Routes"    options={['Select',...ROUTES.slice(1)]} value={route} onChange={setRoute} />
        <Select label="Trip Type" options={TRIP_ALL}                      value={trip}  onChange={setTrip}  />
        <Select label="Stoppage"  options={STOPPAGES}                     value={stop}  onChange={setStop}  />
        <Btn>Get Report</Btn>
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
    <div style={{ flex:1, background:'#f0f2f5', borderTopLeftRadius:'2rem',
                  padding:24, overflowY:'auto' }}>

      <h2 style={{ fontSize:18, fontWeight:700, color:'#222', marginBottom:16 }}>
        Transport Attendance
      </h2>

      <div style={{ background:'#fff', borderRadius:8,
                    boxShadow:'0 1px 6px rgba(0,0,0,0.08)', overflow:'hidden' }}>

        {/* Tabs */}
        <div style={{ display:'flex', borderBottom:'1px solid #e5e7eb',
                      padding:'10px 16px 0', gap:4 }}>
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{
                padding:'7px 16px', fontSize:13, border:'none', cursor:'pointer',
                borderRadius:'4px 4px 0 0', transition:'all 0.15s',
                fontWeight: activeTab === tab ? 600 : 400,
                background: activeTab === tab ? '#4caf50' : 'transparent',
                color:      activeTab === tab ? '#fff'    : '#555',
              }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Tab panels */}
        {activeTab === 'Mark Attendance'   && <MarkAttendanceTab />}
        {activeTab === 'View Attendance'   && <ViewAttendanceTab />}
        {activeTab === 'Out Pass'          && <OutPassTab />}
        {activeTab === 'Attendance Report' && <AttendanceReportTab />}
      </div>

      <div style={{ textAlign:'center', fontSize:12, color:'#aaa', fontWeight:700,
                    marginTop:32, paddingTop:16, borderTop:'1px solid #e5e7eb' }}>
        COPYRIGHT © 2026 FRANCISCAN
      </div>
    </div>
  );
}
