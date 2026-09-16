import React, { useState, useEffect } from 'react';
import { Search, Save, Eye, XCircle, RefreshCw, Check, X } from 'lucide-react';

export default function StudentFeeDetails() {
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [student, setStudent] = useState(null);
  
  // Form dropdown data
  const [concessions, setConcessions] = useState([]);
  const [feeGroups, setFeeGroups] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [stops, setStops] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  // Form states
  const [concession, setConcession] = useState('');
  const [classGroup, setClassGroup] = useState('');
  const [specialGroup, setSpecialGroup] = useState('');
  
  const [transportRoute, setTransportRoute] = useState('');
  const [transportStop, setTransportStop] = useState('');
  const [transportVehicle, setTransportVehicle] = useState('');
  const [assignDate, setAssignDate] = useState(new Date().toISOString().split('T')[0]);
  const [joinDate, setJoinDate] = useState('');
  const [leaveDate, setLeaveDate] = useState('');

  // Months checkboxes
  const [months, setMonths] = useState({
    Apr: false, May: false, Jun: false, Jul: false, Aug: false, Sep: false, Oct: false, Nov: false, Dec: false, Jan: false, Feb: false, Mar: false
  });

  const [loading, setLoading] = useState(false);
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

      const [clsRes, secRes, concRes, fgRes, rtRes, vehRes] = await Promise.all([
        fetch(`${API_URL}/api/school-classes`, { headers }),
        fetch(`${API_URL}/api/class-sections`, { headers }),
        fetch(`${API_URL}/api/concession-types`, { headers }).catch(() => fetch(`${API_URL}/api/concessions`, { headers })),
        fetch(`${API_URL}/api/fee-groups`, { headers }),
        fetch(`${API_URL}/api/transport/routes`, { headers }).catch(() => ({ ok: false })),
        fetch(`${API_URL}/api/transport/vehicles`, { headers }).catch(() => ({ ok: false }))
      ]);

      if (clsRes.ok) setClasses(await clsRes.json());
      if (secRes.ok) setSections(await secRes.json());
      if (concRes?.ok) setConcessions(await concRes.json());
      if (fgRes.ok) setFeeGroups(await fgRes.json());
      if (rtRes?.ok) setRoutes(await rtRes.json());
      if (vehRes?.ok) setVehicles(await vehRes.json());
    } catch (err) {
      console.error('Error fetching initial data:', err);
    }
  };

  const fetchStops = async (routeId) => {
    if (!routeId) {
      setStops([]);
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/transport/stops/${routeId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) setStops(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const handleRouteSelect = (e) => {
    const val = e.target.value;
    setTransportRoute(val);
    fetchStops(val);
  };

  const handleSearch = async () => {
    if (!searchQuery && !selectedClass && !selectedSection) {
      return showToast('Please enter search query or select class/section', true);
    }
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      let url = `${API_URL}/api/students?`;
      if (selectedClass) url += `class=${selectedClass}&`;
      if (selectedSection) url += `section=${selectedSection}&`;
      if (searchQuery) url += `search=${encodeURIComponent(searchQuery)}`;
      
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          const s = data[0];
          setStudent(s);
          
          if (s.transportDetails) {
            setTransportRoute(s.transportDetails.route || '');
            if (s.transportDetails.route) fetchStops(s.transportDetails.route);
            setTransportStop(s.transportDetails.stop || '');
            setTransportVehicle(s.transportDetails.vehicle || '');
          }
          showToast('Student found', false);
        } else {
          setStudent(null);
          showToast('No student found', true);
        }
      }
    } catch (err) {
      console.error(err);
      showToast('Error searching student', true);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!student) return showToast('Please select a student first', true);

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const payload = {
        transportDetails: {
          ...student.transportDetails,
          route: transportRoute || undefined,
          stop: transportStop || undefined,
          vehicle: transportVehicle || undefined,
          assignedDate: assignDate || undefined
        }
      };

      const res = await fetch(`${API_URL}/api/students/${student._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        showToast('Student fee details saved successfully!', false);
      } else {
        const data = await res.json();
        showToast(data.message || 'Error saving details', true);
      }
    } catch (err) {
      console.error(err);
      showToast('Error saving details', true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setConcession('');
    setClassGroup('');
    setSpecialGroup('');
    setTransportRoute('');
    setTransportStop('');
    setTransportVehicle('');
    setJoinDate('');
    setLeaveDate('');
    setMonths({ Apr: false, May: false, Jun: false, Jul: false, Aug: false, Sep: false, Oct: false, Nov: false, Dec: false, Jan: false, Feb: false, Mar: false });
  };

  const showToast = (msg, error) => {
    setToastMsg(msg);
    setIsError(error);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const getStudentName = (s) => s ? `${s.personalDetails?.firstName || ''} ${s.personalDetails?.lastName || ''}`.trim() : 'N/A';
  const getFatherName = (s) => s?.familyDetails?.father?.firstName || 'N/A';
  const getAddress = (s) => s?.contactAddress?.currentAddress || 'N/A';
  const getAdmNo = (s) => s?.academicDetails?.admissionNumber || 'N/A';
  const getClassName = (s) => s?.academicDetails?.class || 'N/A';

  const classGroups = feeGroups.filter(fg => fg.special === 'False');
  const specialGroups = feeGroups.filter(fg => fg.special === 'True');
  const availableSections = Array.from(new Set(sections.flatMap(s => s.sections || [])));

  const selectStyle = {
    padding: '8px 12px',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    outline: 'none',
    fontSize: '13px',
    color: '#1e293b',
    backgroundColor: '#ffffff',
    cursor: 'pointer'
  };

  return (
    <div style={{ padding: '20px', background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
      
      {toastMsg && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', backgroundColor: isError ? '#ef4444' : '#16a34a', color: '#fff',
          borderRadius: '6px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 3000, width: '320px',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '12px 16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            {isError ? <X size={20} color="#fff" /> : <Check size={20} color="#fff" />}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>{isError ? 'Error' : 'Success'}</span>
                <button onClick={() => setToastMsg(null)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 0 }}>
                  <X size={14} />
                </button>
              </div>
              <span style={{ fontSize: '13px' }}>{toastMsg}</span>
            </div>
          </div>
        </div>
      )}

      {/* Top Search */}
      <div style={{ display: 'flex', gap: '15px', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#f8fafc', alignItems: 'center' }}>
        <select 
          value={selectedClass} 
          onChange={e => setSelectedClass(e.target.value)}
          style={{ ...selectStyle, flex: 1 }}
        >
          <option value="" style={{ color: '#1e293b', background: '#fff' }}>All Classes</option>
          {classes.map(c => (
            <option key={c._id} value={c.className} style={{ color: '#1e293b', background: '#fff' }}>
              {c.className}
            </option>
          ))}
        </select>
        
        <select 
          value={selectedSection} 
          onChange={e => setSelectedSection(e.target.value)}
          style={{ ...selectStyle, flex: 1 }}
        >
          <option value="" style={{ color: '#1e293b', background: '#fff' }}>All Section</option>
          {availableSections.map(sec => (
            <option key={sec} value={sec} style={{ color: '#1e293b', background: '#fff' }}>
              {sec}
            </option>
          ))}
        </select>
        
        <div style={{ display: 'flex', flex: 3 }}>
          <input 
            type="text" 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by Admission No or Name..."
            style={{ flex: 1, padding: '8px 12px', border: '1px solid #cbd5e1', borderRight: 'none', borderRadius: '6px 0 0 6px', outline: 'none', fontSize: '13px', color: '#1e293b', background: '#fff' }} 
          />
          <button 
            onClick={handleSearch}
            disabled={loading}
            style={{ background: loading ? '#94a3b8' : '#0284c7', color: '#fff', border: 'none', padding: '0 18px', borderRadius: '0 6px 6px 0', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Search size={16} />
          </button>
        </div>
      </div>

      {/* Info labels */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: '#f1f5f9', borderRadius: '6px', fontSize: '13px', fontWeight: 600, color: '#334155' }}>
        <div style={{ flex: 1 }}>Admission No: <span style={{ fontWeight: 400, color: '#0f172a' }}>{getAdmNo(student)}</span></div>
        <div style={{ flex: 1 }}>Class: <span style={{ fontWeight: 400, color: '#0f172a' }}>{getClassName(student)}</span></div>
        <div style={{ flex: 1 }}>Name: <span style={{ fontWeight: 400, color: '#0f172a' }}>{getStudentName(student)}</span></div>
        <div style={{ flex: 1 }}>Father Name: <span style={{ fontWeight: 400, color: '#0f172a' }}>{getFatherName(student)}</span></div>
        <div style={{ flex: 1 }}>Address: <span style={{ fontWeight: 400, color: '#0f172a' }}>{getAddress(student)}</span></div>
      </div>

      {/* Concession forms */}
      <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px' }}>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '180px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: '#475569' }}>Concession</label>
            <select 
              value={concession}
              onChange={e => setConcession(e.target.value)}
              style={{ ...selectStyle, width: '100%' }}
            >
              <option value="" style={{ color: '#1e293b', background: '#fff' }}>None selected</option>
              {concessions.map(c => (
                <option key={c._id} value={c._id} style={{ color: '#1e293b', background: '#fff' }}>
                  {c.name || c.concessionName}
                </option>
              ))}
            </select>
          </div>
          <div style={{ flex: 1, minWidth: '160px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: '#475569' }}>Concession Date</label>
            <input 
              type="date" 
              value={assignDate} 
              readOnly 
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', outline: 'none', fontSize: '13px', background: '#f8fafc', color: '#475569' }} 
            />
          </div>
          <div style={{ flex: 1, minWidth: '180px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: '#475569' }}>Class Group</label>
            <select 
              value={classGroup}
              onChange={e => setClassGroup(e.target.value)}
              style={{ ...selectStyle, width: '100%' }}
            >
              <option value="" style={{ color: '#1e293b', background: '#fff' }}>None selected</option>
              {classGroups.map(cg => (
                <option key={cg._id} value={cg._id} style={{ color: '#1e293b', background: '#fff' }}>
                  {cg.name || cg.groupName}
                </option>
              ))}
            </select>
          </div>
          <div style={{ flex: 1, minWidth: '180px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: '#475569' }}>Special Group</label>
            <select 
              value={specialGroup}
              onChange={e => setSpecialGroup(e.target.value)}
              style={{ ...selectStyle, width: '100%' }}
            >
              <option value="" style={{ color: '#1e293b', background: '#fff' }}>None selected</option>
              {specialGroups.map(sg => (
                <option key={sg._id} value={sg._id} style={{ color: '#1e293b', background: '#fff' }}>
                  {sg.name || sg.groupName}
                </option>
              ))}
            </select>
          </div>
          <div style={{ minWidth: '140px', paddingBottom: '8px', fontWeight: 600, fontSize: '13px', color: '#334155' }}>
            Bus No: <span style={{ fontWeight: 400, color: '#0f172a', marginLeft: '6px' }}>
              {vehicles.find(v => v._id === transportVehicle)?.vehicleNo || vehicles.find(v => v._id === transportVehicle)?.vehicleNumber || 'N/A'}
            </span>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <button onClick={handleSave} disabled={loading} style={{ background: '#fff', color: '#16a34a', border: '1px solid #16a34a', padding: '8px 20px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', cursor: loading ? 'not-allowed' : 'pointer' }}>
            <Save size={15} /> Save
          </button>
          <button style={{ background: '#fff', color: '#2563eb', border: '1px solid #2563eb', padding: '8px 20px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <Eye size={15} /> View
          </button>
          <button onClick={handleReset} style={{ background: '#fff', color: '#d97706', border: '1px solid #d97706', padding: '8px 20px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <XCircle size={15} /> Reset
          </button>
        </div>
      </div>

      {/* Transport */}
      <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
          <span style={{ fontWeight: 700, fontSize: '14px', color: '#1e293b' }}>Transport Settings</span>
          <button style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <RefreshCw size={14} /> Change Route
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'center', minWidth: '1000px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc', color: '#475569' }}>
                <th style={{ padding: '12px 8px', fontWeight: 600 }}>Assign Date</th>
                <th style={{ padding: '12px 8px', fontWeight: 600 }}>Join Date</th>
                <th style={{ padding: '12px 8px', fontWeight: 600 }}>Leave Date</th>
                <th style={{ padding: '12px 8px', fontWeight: 600 }}>Route</th>
                <th style={{ padding: '12px 8px', fontWeight: 600 }}>Stop</th>
                <th style={{ padding: '12px 8px', fontWeight: 600 }}>Vehicle</th>
                {Object.keys(months).map(m => (
                  <th key={m} style={{ padding: '12px 8px', fontWeight: 600 }}>{m}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '12px 8px' }}>
                  <input type="date" value={assignDate} onChange={e => setAssignDate(e.target.value)} style={{ width: '110px', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '11px', color: '#1e293b', background: '#fff' }} />
                </td>
                <td style={{ padding: '12px 8px' }}>
                  <input type="date" value={joinDate} onChange={e => setJoinDate(e.target.value)} style={{ width: '110px', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '11px', color: '#1e293b', background: '#fff' }} />
                </td>
                <td style={{ padding: '12px 8px' }}>
                  <input type="date" value={leaveDate} onChange={e => setLeaveDate(e.target.value)} style={{ width: '110px', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '11px', color: '#1e293b', background: '#fff' }} />
                </td>
                <td style={{ padding: '12px 8px' }}>
                  <select value={transportRoute} onChange={handleRouteSelect} style={{ width: '120px', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '11px', color: '#1e293b', background: '#fff' }}>
                    <option value="" style={{ color: '#1e293b', background: '#fff' }}>Select Route</option>
                    {routes.map(r => (
                      <option key={r._id} value={r._id} style={{ color: '#1e293b', background: '#fff' }}>
                        {r.routeName || r.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td style={{ padding: '12px 8px' }}>
                  <select value={transportStop} onChange={e => setTransportStop(e.target.value)} style={{ width: '120px', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '11px', color: '#1e293b', background: '#fff' }}>
                    <option value="" style={{ color: '#1e293b', background: '#fff' }}>Select Stop</option>
                    {stops.map(s => (
                      <option key={s._id} value={s._id} style={{ color: '#1e293b', background: '#fff' }}>
                        {s.stopName || s.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td style={{ padding: '12px 8px' }}>
                  <select value={transportVehicle} onChange={e => setTransportVehicle(e.target.value)} style={{ width: '120px', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '11px', color: '#1e293b', background: '#fff' }}>
                    <option value="" style={{ color: '#1e293b', background: '#fff' }}>Select Vehicle</option>
                    {vehicles.map(v => (
                      <option key={v._id} value={v._id} style={{ color: '#1e293b', background: '#fff' }}>
                        {v.vehicleNo || v.vehicleNumber || v.name}
                      </option>
                    ))}
                  </select>
                </td>
                {Object.keys(months).map(m => (
                  <td key={m} style={{ padding: '12px 8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>0%</span>
                      <input 
                        type="checkbox" 
                        checked={months[m]} 
                        onChange={e => setMonths({...months, [m]: e.target.checked})}
                        style={{ cursor: 'pointer', accentColor: '#2563eb' }}
                      />
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
