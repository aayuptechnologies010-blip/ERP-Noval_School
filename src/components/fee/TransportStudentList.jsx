import React, { useState, useEffect } from 'react';
import { Eye, Printer } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005';
const token = localStorage.getItem('token');
const inputStyle = { width: '100%', padding: '7px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none', background: '#fff' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px', color: '#374151' };

export default function TransportStudentList() {
  // Master lists
  const [schools, setSchools] = useState([]);
  const [classes, setClasses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [stops, setStops] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [installments, setInstallments] = useState([]);

  // Form selections
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedStop, setSelectedStop] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedVendor, setSelectedVendor] = useState('');
  const [selectedInstallment, setSelectedInstallment] = useState('All');
  const [selectedShift, setSelectedShift] = useState('Morning');

  // Report state
  const [reportData, setReportData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getHeaders = () => {
    const t = localStorage.getItem('token') || token;
    return t ? { Authorization: `Bearer ${t}` } : {};
  };

  useEffect(() => {
    const headers = getHeaders();

    fetch(`${API_URL}/api/school-global-details`, { headers })
      .then(r => r.json())
      .then(d => {
        const list = Array.isArray(d) ? d : (d?.data || []);
        setSchools(list);
        if (list.length > 0) {
          const defaultSch = list.find(s => s.schoolName?.toUpperCase().includes('NAVAL')) || list[0];
          setSelectedSchool(defaultSch.schoolName);
        } else {
          setSelectedSchool('NAVALS NATIONAL ACADEMY');
        }
      })
      .catch(() => setSelectedSchool('NAVALS NATIONAL ACADEMY'));

    fetch(`${API_URL}/api/school-classes`, { headers })
      .then(r => r.json())
      .then(d => setClasses(Array.isArray(d) ? d : (d?.data || [])))
      .catch(console.error);

    fetch(`${API_URL}/api/transport/routes`, { headers })
      .then(r => r.json())
      .then(d => setRoutes(Array.isArray(d) ? d : []))
      .catch(console.error);

    fetch(`${API_URL}/api/transport/stops`, { headers })
      .then(r => r.json())
      .then(d => setStops(Array.isArray(d) ? d : []))
      .catch(console.error);

    fetch(`${API_URL}/api/transport/vehicles`, { headers })
      .then(r => r.json())
      .then(d => setVehicles(Array.isArray(d) ? d : []))
      .catch(console.error);

    fetch(`${API_URL}/api/transport/agencies`, { headers })
      .then(r => r.json())
      .then(d => {
        const list = Array.isArray(d) ? d : [];
        setAgencies(list);
        if (list.length > 0) {
          const defaultVendor = list.find(a => a.agencyName?.toUpperCase().includes('NAVAL')) || list[0];
          setSelectedVendor(defaultVendor.agencyName);
        } else {
          setSelectedVendor('NAVALS NATIONAL ACADEMY');
        }
      })
      .catch(() => setSelectedVendor('NAVALS NATIONAL ACADEMY'));

    fetch(`${API_URL}/api/fee-installments`, { headers })
      .then(r => r.json())
      .then(d => setInstallments(Array.isArray(d) ? d : []))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const headers = getHeaders();
    if (selectedRoute) {
      fetch(`${API_URL}/api/transport/stops/${selectedRoute}`, { headers })
        .then(r => r.json())
        .then(d => setStops(Array.isArray(d) ? d : []))
        .catch(() => setStops([]));
    } else {
      fetch(`${API_URL}/api/transport/stops`, { headers })
        .then(r => r.json())
        .then(d => setStops(Array.isArray(d) ? d : []))
        .catch(() => setStops([]));
    }
  }, [selectedRoute]);

  const handleShow = async () => {
    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const headers = getHeaders();
      const res = await fetch(`${API_URL}/api/students`, { headers });
      const data = await res.json();

      if (res.ok) {
        let list = Array.isArray(data) ? data : (data.students || []);

        if (selectedClass && selectedClass !== 'All') {
          const selClsObj = classes.find(c => c._id === selectedClass);
          const clsTarget = (selClsObj?.className || selClsObj?.name || selectedClass).toString().trim().toLowerCase();
          list = list.filter(s => {
            const sc = (s.academicDetails?.class || s.class?.className || s.class?.name || s.class || '').toString().trim().toLowerCase();
            return sc === clsTarget || s.academicDetails?.class === selectedClass || s.class?._id === selectedClass;
          });
        }

        if (selectedRoute) {
          list = list.filter(s => {
            const rId = s.transportDetails?.route?._id || s.transportDetails?.route || s.transportRoute?._id || s.transportRoute;
            return rId && rId.toString() === selectedRoute.toString();
          });
        }

        if (selectedStop) {
          list = list.filter(s => {
            const stId = s.transportDetails?.stop?._id || s.transportDetails?.stop || s.transportStop?._id || s.transportStop;
            return stId && stId.toString() === selectedStop.toString();
          });
        }

        if (selectedVehicle) {
          list = list.filter(s => {
            const vId = s.transportDetails?.vehicle?._id || s.transportDetails?.vehicle || s.vehicleNo;
            return vId && (vId.toString() === selectedVehicle.toString() || vId === selectedVehicle);
          });
        }

        const transportStudents = list.filter(s => {
          const t = s.transportDetails || {};
          return t.isTransportStudent || t.route || t.stop || t.vehicle || s.transportAssigned || s.transportRoute;
        });

        setReportData(transportStudents.length > 0 ? transportStudents : list);
      } else {
        setError(data.message || 'Error fetching student records');
      }
    } catch {
      setError('Server connection error');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const currentDateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const currentTimeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  return (
    <div style={{ display: 'flex', height: '100%', background: '#f3f4f6', overflow: 'hidden' }}>
      {/* ── LEFT FILTER SIDEBAR ── */}
      <div style={{ width: '260px', background: '#fff', borderRight: '1px solid #e5e7eb', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px', flexShrink: 0, overflowY: 'auto' }}>
        
        {/* Select School */}
        <div>
          <label style={labelStyle}>Select School</label>
          <select value={selectedSchool} onChange={e => setSelectedSchool(e.target.value)} style={inputStyle}>
            {schools.length > 0 ? (
              schools.map(s => <option key={s._id} value={s.schoolName}>{s.schoolName}</option>)
            ) : (
              <option value="NAVALS NATIONAL ACADEMY">NAVALS NATIONAL ACADEMY</option>
            )}
          </select>
        </div>

        {/* Class */}
        <div>
          <label style={labelStyle}>Class</label>
          <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} style={inputStyle}>
            <option value="All">All ({classes.length})</option>
            {classes.map(c => (
              <option key={c._id} value={c._id}>{c.className || c.name}</option>
            ))}
          </select>
        </div>

        {/* Select Route */}
        <div>
          <label style={labelStyle}>Select Route</label>
          <select value={selectedRoute} onChange={e => setSelectedRoute(e.target.value)} style={inputStyle}>
            <option value="">-- All Routes --</option>
            {routes.map(r => (
              <option key={r._id} value={r._id}>{r.routeName || r.name}</option>
            ))}
          </select>
        </div>

        {/* Select Stop */}
        <div>
          <label style={labelStyle}>Select Stop</label>
          <select value={selectedStop} onChange={e => setSelectedStop(e.target.value)} style={inputStyle} disabled={!selectedRoute && stops.length === 0}>
            <option value="">-- All Stops --</option>
            {stops.map(st => (
              <option key={st._id} value={st._id}>{st.stopName}</option>
            ))}
          </select>
        </div>

        {/* Select Vehicle */}
        <div>
          <label style={labelStyle}>Select Vehicle</label>
          <select value={selectedVehicle} onChange={e => setSelectedVehicle(e.target.value)} style={inputStyle}>
            <option value="">-- All Vehicles --</option>
            {vehicles.map(v => (
              <option key={v._id} value={v._id}>{v.vehicleNo || v.name}</option>
            ))}
          </select>
        </div>

        {/* Vendor */}
        <div>
          <label style={labelStyle}>Vendor</label>
          <select value={selectedVendor} onChange={e => setSelectedVendor(e.target.value)} style={inputStyle}>
            {agencies.length > 0 ? (
              agencies.map(a => <option key={a._id} value={a.agencyName}>{a.agencyName}</option>)
            ) : (
              <option value="NAVALS NATIONAL ACADEMY">NAVALS NATIONAL ACADEMY</option>
            )}
          </select>
        </div>

        {/* Installment */}
        <div>
          <label style={labelStyle}>Installment</label>
          <select value={selectedInstallment} onChange={e => setSelectedInstallment(e.target.value)} style={inputStyle}>
            <option value="All">All ({installments.length || 11})</option>
            {installments.map(ins => (
              <option key={ins._id} value={ins.name}>{ins.name || ins.printName}</option>
            ))}
          </select>
        </div>

        {/* Transport Shift */}
        <div>
          <label style={labelStyle}>Transport Shift</label>
          <select value={selectedShift} onChange={e => setSelectedShift(e.target.value)} style={inputStyle}>
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
            <option value="Both">Both</option>
          </select>
        </div>

        {/* Show Button */}
        <button 
          onClick={handleShow} 
          disabled={loading} 
          style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '9px', borderRadius: '4px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 'bold', marginTop: '6px' }}
        >
          <Eye size={15} /> {loading ? 'Loading...' : 'Show'}
        </button>
      </div>

      {/* ── RIGHT REPORT VIEWER (Crystal Report Format) ── */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <div style={{ background: '#fff', minHeight: '100%', borderRadius: '4px', border: '1px solid #d1d5db', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          
          {/* Top Action Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' }}>
            <span style={{ fontSize: '13px', color: '#6b7280' }}>
              Format: <strong>Transport Student List (Crystal Report)</strong>
            </span>
            <button 
              onClick={handlePrint}
              style={{ background: '#059669', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600' }}
            >
              <Printer size={14} /> Print Report
            </button>
          </div>

          {error && (
            <div style={{ padding: '12px', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', marginBottom: '16px', fontSize: '13px' }}>
              {error}
            </div>
          )}

          {/* Report Paper Container */}
          <div style={{ border: '2px solid #b45309', padding: '16px', minHeight: '400px' }}>
            
            {/* Header: School Title & Address */}
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <h1 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 'bold', color: '#000', letterSpacing: '0.5px' }}>
                {selectedSchool || 'NAVALS NATIONAL ACADEMY'}
              </h1>
              <div style={{ fontSize: '11px', color: '#000', fontWeight: '600', marginBottom: '2px' }}>
                DOHRIGHAT , MAU
              </div>
              <div style={{ fontSize: '11px', color: '#000' }}>
                Affiliated to CBSE, New Delhi
              </div>
            </div>

            {/* Sub-header Banner */}
            <div style={{ borderTop: '1px solid #b45309', borderBottom: '1px solid #b45309', padding: '5px 8px', marginBottom: '12px', background: '#fff' }}>
              <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#000', letterSpacing: '0.5px' }}>
                TRANSPORT STUDENT LIST
              </span>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px', color: '#000' }}>
                <thead>
                  <tr style={{ background: '#fef3c7', borderTop: '1px solid #d97706', borderBottom: '1px solid #d97706' }}>
                    <th style={{ padding: '6px 4px', border: '1px solid #d97706', textAlign: 'center', width: '30px' }}>SN</th>
                    <th style={{ padding: '6px 4px', border: '1px solid #d97706', textAlign: 'center', width: '60px' }}>ADM. NO.</th>
                    <th style={{ padding: '6px 4px', border: '1px solid #d97706', textAlign: 'left' }}>NAME</th>
                    <th style={{ padding: '6px 4px', border: '1px solid #d97706', textAlign: 'left' }}>PIC-UP STOP</th>
                    <th style={{ padding: '6px 4px', border: '1px solid #d97706', textAlign: 'center' }}>CLASS</th>
                    <th style={{ padding: '6px 4px', border: '1px solid #d97706', textAlign: 'center' }}>BUS NO.</th>
                    <th style={{ padding: '6px 4px', border: '1px solid #d97706', textAlign: 'left' }}>DROP STOP</th>
                    <th style={{ padding: '6px 4px', border: '1px solid #d97706', textAlign: 'center' }}>ATTENDANCE</th>
                    <th style={{ padding: '6px 4px', border: '1px solid #d97706', textAlign: 'center' }}>PICK UP TIME</th>
                    <th style={{ padding: '6px 4px', border: '1px solid #d97706', textAlign: 'center' }}>TIME</th>
                    <th style={{ padding: '6px 4px', border: '1px solid #d97706', textAlign: 'center' }}>DROP BUS</th>
                    <th style={{ padding: '6px 4px', border: '1px solid #d97706', textAlign: 'center' }}>DROP TIME</th>
                    <th style={{ padding: '6px 4px', border: '1px solid #d97706', textAlign: 'center' }}>DROP REAL TIME</th>
                    <th style={{ padding: '6px 4px', border: '1px solid #d97706', textAlign: 'left' }}>FATHER NAME</th>
                    <th style={{ padding: '6px 4px', border: '1px solid #d97706', textAlign: 'center' }}>FATHER MOBILE</th>
                    <th style={{ padding: '6px 4px', border: '1px solid #d97706', textAlign: 'left' }}>MOTHER NAME</th>
                    <th style={{ padding: '6px 4px', border: '1px solid #d97706', textAlign: 'center' }}>MOTHER MOBILE</th>
                  </tr>
                </thead>
                <tbody>
                  {!hasSearched ? (
                    <tr>
                      <td colSpan="17" style={{ textAlign: 'center', padding: '24px', color: '#6b7280', border: '1px solid #d97706' }}>
                        Click "Show" to view transport students list.
                      </td>
                    </tr>
                  ) : reportData.length === 0 ? (
                    <tr>
                      <td colSpan="17" style={{ textAlign: 'center', padding: '20px', color: '#92400e', fontWeight: 'bold', border: '1px solid #d97706' }}>
                        No record found!
                      </td>
                    </tr>
                  ) : (
                    reportData.map((s, idx) => {
                      const admNo = s.academicDetails?.admissionNumber || s.admissionNumber || '-';
                      const p = s.personalDetails || {};
                      const name = `${p.firstName || s.firstName || ''} ${p.lastName || s.lastName || ''}`.trim() || '-';
                      
                      const stopId = s.transportDetails?.stop?._id || s.transportDetails?.stop || s.transportStop;
                      const matchedStop = stops.find(st => st._id === stopId || st.stopName === stopId);
                      const stopName = s.transportDetails?.stop?.stopName || matchedStop?.stopName || s.transportStop || '-';

                      const cls = s.academicDetails?.class || s.class?.className || s.class?.name || s.class || '-';

                      const vehicleId = s.transportDetails?.vehicle?._id || s.transportDetails?.vehicle || s.vehicleNo;
                      const matchedVehicle = vehicles.find(v => v._id === vehicleId || v.vehicleNo === vehicleId);
                      const busNo = s.transportDetails?.vehicle?.vehicleNo || matchedVehicle?.vehicleNo || s.vehicleNo || '-';

                      const fam = s.familyDetails || {};
                      const f = fam.father || {};
                      const m = fam.mother || {};
                      const fatherName = f.firstName ? `${f.title || 'Mr.'} ${f.firstName} ${f.lastName || ''}`.trim() : (s.fatherName || '-');
                      const fatherMobile = f.mobile || s.fatherMobile || '-';
                      const motherName = m.firstName ? `${m.title || 'Mrs.'} ${m.firstName} ${m.lastName || ''}`.trim() : (s.motherName || '-');
                      const motherMobile = m.mobile || s.motherMobile || '-';

                      return (
                        <tr key={s._id || idx} style={{ borderBottom: '1px solid #fde68a' }}>
                          <td style={{ padding: '5px 4px', border: '1px solid #d97706', textAlign: 'center' }}>{idx + 1}</td>
                          <td style={{ padding: '5px 4px', border: '1px solid #d97706', textAlign: 'center' }}>{admNo}</td>
                          <td style={{ padding: '5px 4px', border: '1px solid #d97706' }}>{name}</td>
                          <td style={{ padding: '5px 4px', border: '1px solid #d97706' }}>{stopName}</td>
                          <td style={{ padding: '5px 4px', border: '1px solid #d97706', textAlign: 'center' }}>{cls}</td>
                          <td style={{ padding: '5px 4px', border: '1px solid #d97706', textAlign: 'center' }}>{busNo}</td>
                          <td style={{ padding: '5px 4px', border: '1px solid #d97706' }}>{stopName}</td>
                          <td style={{ padding: '5px 4px', border: '1px solid #d97706', textAlign: 'center' }}>P</td>
                          <td style={{ padding: '5px 4px', border: '1px solid #d97706', textAlign: 'center' }}>07:30 AM</td>
                          <td style={{ padding: '5px 4px', border: '1px solid #d97706', textAlign: 'center' }}>-</td>
                          <td style={{ padding: '5px 4px', border: '1px solid #d97706', textAlign: 'center' }}>{busNo}</td>
                          <td style={{ padding: '5px 4px', border: '1px solid #d97706', textAlign: 'center' }}>02:15 PM</td>
                          <td style={{ padding: '5px 4px', border: '1px solid #d97706', textAlign: 'center' }}>-</td>
                          <td style={{ padding: '5px 4px', border: '1px solid #d97706' }}>{fatherName}</td>
                          <td style={{ padding: '5px 4px', border: '1px solid #d97706', textAlign: 'center' }}>{fatherMobile}</td>
                          <td style={{ padding: '5px 4px', border: '1px solid #d97706' }}>{motherName}</td>
                          <td style={{ padding: '5px 4px', border: '1px solid #d97706', textAlign: 'center' }}>{motherMobile}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', fontSize: '10px', color: '#000', fontWeight: 'bold' }}>
              <div>Academic Year : 2026-2027</div>
              <div>Transport Student List printed on {currentDateStr} at {currentTimeStr}</div>
              <div>Page 1 of 1</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
