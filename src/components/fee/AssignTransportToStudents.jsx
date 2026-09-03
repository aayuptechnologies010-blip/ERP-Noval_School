import React, { useState, useEffect } from 'react';
import { Search, Save, Trash2, RotateCcw } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' };
const labelStyle = { display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: '#374151' };
const btnBase = { border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' };

export default function AssignTransportToStudents() {
  const [routes, setRoutes] = useState([]);
  const [stops, setStops] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [groups, setGroups] = useState([]);
  const [mediums, setMediums] = useState([]);

  const [students, setStudents] = useState([]);
  const [assignedStudents, setAssignedStudents] = useState([]);

  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedStop, setSelectedStop] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedMedium, setSelectedMedium] = useState('');
  const [transportFee, setTransportFee] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMasters = async () => {
      try {
        const [rRes, vRes, gRes, mRes] = await Promise.all([
          fetch(`${API_URL}/api/transport/routes`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_URL}/api/transport/vehicles`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_URL}/api/transport/groups`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_URL}/api/transport/mediums`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        if (rRes.ok) setRoutes(await rRes.json());
        if (vRes.ok) setVehicles(await vRes.json());
        if (gRes.ok) setGroups(await gRes.json());
        if (mRes.ok) setMediums(await mRes.json());
      } catch (err) { console.error(err); }
    };
    fetchMasters();
  }, []);

  useEffect(() => {
    const fetchStops = async () => {
      if (!selectedRoute) return setStops([]);
      try {
        const res = await fetch(`${API_URL}/api/transport/stops/${selectedRoute}`, { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) setStops(await res.json());
      } catch (err) { console.error(err); }
    };
    fetchStops();
    if (selectedRoute) fetchAssignedStudents();
  }, [selectedRoute]);

  const fetchAssignedStudents = async () => {
    try {
      const res = await fetch(`${API_URL}/api/transport/students-by-route/${selectedRoute}`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setAssignedStudents(await res.json());
    } catch (err) { console.error(err); }
  };

  const handleSearch = async () => {
    if (!searchQuery) return;
    try {
      const res = await fetch(`${API_URL}/api/students`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) {
        const data = await res.json();
        const filtered = data.filter(s =>
          s.admissionNumber === searchQuery ||
          `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setStudents(filtered);
      }
    } catch (err) { setMessage({ type: 'error', text: 'Error searching' }); }
  };

  const handleAssign = async () => {
    if (!selectedStudentId || !selectedRoute) {
      setMessage({ type: 'error', text: 'Please select a student and route.' });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/transport/assign-student`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          studentId: selectedStudentId,
          route: selectedRoute,
          stop: selectedStop || undefined,
          vehicle: selectedVehicle || undefined,
          transportFee: transportFee || 0,
          transportGroup: selectedGroup || undefined,
          transportMedium: selectedMedium || undefined,
        })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: data.message });
        setSelectedStudentId('');
        setStudents([]);
        setSearchQuery('');
        fetchAssignedStudents();
      } else { setMessage({ type: 'error', text: data.message }); }
    } catch (err) { setMessage({ type: 'error', text: 'Server error' }); }
    finally { setLoading(false); }
  };

  const handleRemove = async (studentId) => {
    if (!window.confirm('Remove transport assignment for this student?')) return;
    try {
      const res = await fetch(`${API_URL}/api/transport/assign-student/${studentId}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) { setMessage({ type: 'success', text: 'Transport removed' }); fetchAssignedStudents(); }
    } catch (err) { setMessage({ type: 'error', text: 'Server error' }); }
  };

  return (
    <div style={{ padding: '20px', background: '#f3f4f6', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {message && <div style={{ padding: '10px', borderRadius: '4px', background: message.type === 'success' ? '#d1fae5' : '#fee2e2', color: message.type === 'success' ? '#065f46' : '#991b1b', fontSize: '13px' }}>{message.text}</div>}

      {/* Assignment Form */}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#1f2937', fontWeight: 'bold' }}>Assign Transport to Student</h3>

        {/* Student Search */}
        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>Search Student</label>
          <div style={{ display: 'flex', gap: '10px', maxWidth: '400px' }}>
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Admission No or Name" style={inputStyle} />
            <button onClick={handleSearch} style={{ ...btnBase, background: '#29a9d8', color: '#fff', whiteSpace: 'nowrap' }}><Search size={14} /> Search</button>
          </div>
          {students.length > 0 && (
            <div style={{ marginTop: '8px', border: '1px solid #e5e7eb', borderRadius: '4px', maxHeight: '150px', overflowY: 'auto' }}>
              {students.map(s => (
                <div key={s._id} onClick={() => { setSelectedStudentId(s._id); setStudents([]); setSearchQuery(`${s.firstName} ${s.lastName} (${s.admissionNumber})`); }}
                  style={{ padding: '8px 12px', cursor: 'pointer', fontSize: '13px', borderBottom: '1px solid #f3f4f6', background: selectedStudentId === s._id ? '#e0f2fe' : '#fff' }}>
                  {s.firstName} {s.lastName} — {s.admissionNumber}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Transport Details */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Route *</label>
            <select value={selectedRoute} onChange={(e) => setSelectedRoute(e.target.value)} style={inputStyle}>
              <option value="">-- Select Route --</option>
              {routes.map(r => <option key={r._id} value={r._id}>{r.routeName}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Stop</label>
            <select value={selectedStop} onChange={(e) => setSelectedStop(e.target.value)} style={inputStyle}>
              <option value="">-- Select Stop --</option>
              {stops.map(s => <option key={s._id} value={s._id}>{s.stopName} (₹{s.fee})</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Vehicle</label>
            <select value={selectedVehicle} onChange={(e) => setSelectedVehicle(e.target.value)} style={inputStyle}>
              <option value="">-- Select Vehicle --</option>
              {vehicles.map(v => <option key={v._id} value={v._id}>{v.vehicleNo}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Transport Group</label>
            <select value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)} style={inputStyle}>
              <option value="">-- None --</option>
              {groups.map(g => <option key={g._id} value={g._id}>{g.groupName}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Transport Medium</label>
            <select value={selectedMedium} onChange={(e) => setSelectedMedium(e.target.value)} style={inputStyle}>
              <option value="">-- None --</option>
              {mediums.map(m => <option key={m._id} value={m._id}>{m.mediumName}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Transport Fee (₹)</label>
            <input type="number" value={transportFee} onChange={(e) => setTransportFee(e.target.value)} placeholder="0" style={inputStyle} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
          <button onClick={handleAssign} disabled={loading} style={{ ...btnBase, background: '#10b981', color: '#fff' }}><Save size={14} /> Assign Transport</button>
          <button onClick={() => { setSelectedStudentId(''); setSearchQuery(''); setSelectedRoute(''); setMessage(null); }} style={{ ...btnBase, background: '#f59e0b', color: '#fff' }}><RotateCcw size={14} /> Reset</button>
        </div>
      </div>

      {/* Assigned Students Table */}
      <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <div style={{ padding: '15px 20px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '15px', color: '#1f2937', fontWeight: 'bold' }}>Students Assigned to Selected Route</h3>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>{assignedStudents.length} students</span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead style={{ background: '#f9fafb' }}>
            <tr>
              {['#', 'Student Name', 'Adm. No.', 'Class', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: h === 'Actions' ? 'center' : 'left', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!selectedRoute ? (
              <tr><td colSpan="5" style={{ padding: '30px', textAlign: 'center', color: '#6b7280' }}>Select a route to see assigned students.</td></tr>
            ) : assignedStudents.length === 0 ? (
              <tr><td colSpan="5" style={{ padding: '30px', textAlign: 'center', color: '#6b7280' }}>No students assigned to this route.</td></tr>
            ) : assignedStudents.map((s, i) => (
              <tr key={s._id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '12px 16px', color: '#6b7280' }}>{i + 1}</td>
                <td style={{ padding: '12px 16px', color: '#1f2937', fontWeight: '600' }}>{s.firstName} {s.lastName}</td>
                <td style={{ padding: '12px 16px', color: '#374151' }}>{s.admissionNumber}</td>
                <td style={{ padding: '12px 16px', color: '#374151' }}>{s.class?.name || '-'}</td>
                <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                  <button onClick={() => handleRemove(s._id)} style={{ ...btnBase, background: '#ef4444', color: '#fff', padding: '6px 12px', fontSize: '12px' }}><Trash2 size={12} /> Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
