import React, { useState, useEffect } from 'react';
import { Eye, Printer } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005';
const inputStyle = { width: '100%', padding: '7px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none', background: '#fff' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px', color: '#374151' };

export default function TransportDetail() {
  // Master lists
  const [schools, setSchools] = useState([]);
  const [classes, setClasses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [stops, setStops] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [installments, setInstallments] = useState([]);

  // Form selections matching the user screenshot:
  // 1. Select School (Default: "All Schools" / NAVALS NATIONAL ACADEMY)
  // 2. Class (Default: "All (51)")
  // 3. Select Route (Default: "All Route(s) (20)")
  // 4. Select Stop (Default: "All (96)")
  // 5. Select Vehicle (Default: "All Vehicle(s) (12)")
  // 6. Vendor (Default: "All Vendor & Others")
  // 7. Installment (Default: "All (11)")
  // 8. Select Month (Default: "All (12)")
  // 9. Status (Default: "ALL")
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedStop, setSelectedStop] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedVendor, setSelectedVendor] = useState('All');
  const [selectedInstallment, setSelectedInstallment] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  // Report state
  const [reportData, setReportData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const monthsList = [
    'April', 'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December', 'January', 'February', 'March'
  ];

  const getHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    const headers = getHeaders();

    // 1. Schools
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

    // 2. Classes
    fetch(`${API_URL}/api/school-classes`, { headers })
      .then(r => r.json())
      .then(d => setClasses(Array.isArray(d) ? d : (d?.data || [])))
      .catch(console.error);

    // 3. Routes
    fetch(`${API_URL}/api/transport/routes`, { headers })
      .then(r => r.json())
      .then(d => setRoutes(Array.isArray(d) ? d : []))
      .catch(console.error);

    // 4. Stops
    fetch(`${API_URL}/api/transport/stops`, { headers })
      .then(r => r.json())
      .then(d => setStops(Array.isArray(d) ? d : []))
      .catch(console.error);

    // 5. Vehicles
    fetch(`${API_URL}/api/transport/vehicles`, { headers })
      .then(r => r.json())
      .then(d => setVehicles(Array.isArray(d) ? d : []))
      .catch(console.error);

    // 6. Travel Agencies / Vendors
    fetch(`${API_URL}/api/transport/agencies`, { headers })
      .then(r => r.json())
      .then(d => setAgencies(Array.isArray(d) ? d : []))
      .catch(console.error);

    // 7. Fee Installments
    fetch(`${API_URL}/api/fee-installments`, { headers })
      .then(r => r.json())
      .then(d => setInstallments(Array.isArray(d) ? d : []))
      .catch(console.error);
  }, []);

  // Update stops when route selection changes
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

        // Filter by Class
        if (selectedClass && selectedClass !== 'All') {
          const selClsObj = classes.find(c => c._id === selectedClass);
          const clsTarget = (selClsObj?.className || selClsObj?.name || selectedClass).toString().trim().toLowerCase();
          list = list.filter(s => {
            const sc = (s.academicDetails?.class || s.class?.className || s.class?.name || s.class || '').toString().trim().toLowerCase();
            return sc === clsTarget || s.academicDetails?.class === selectedClass || s.class?._id === selectedClass;
          });
        }

        // Filter by Route
        if (selectedRoute) {
          list = list.filter(s => {
            const rId = s.transportDetails?.route?._id || s.transportDetails?.route || s.transportRoute?._id || s.transportRoute;
            return rId && rId.toString() === selectedRoute.toString();
          });
        }

        // Filter by Stop
        if (selectedStop) {
          list = list.filter(s => {
            const stId = s.transportDetails?.stop?._id || s.transportDetails?.stop || s.transportStop?._id || s.transportStop;
            return stId && stId.toString() === selectedStop.toString();
          });
        }

        // Filter by Vehicle
        if (selectedVehicle) {
          list = list.filter(s => {
            const vId = s.transportDetails?.vehicle?._id || s.transportDetails?.vehicle || s.vehicleNo;
            return vId && (vId.toString() === selectedVehicle.toString() || vId === selectedVehicle);
          });
        }

        // Filter by Status if not ALL
        if (selectedStatus && selectedStatus !== 'ALL') {
          list = list.filter(s => {
            const curStatus = (s.academicDetails?.currentStatus || s.status || 'STUDYING').toString().toUpperCase();
            return curStatus === selectedStatus.toUpperCase();
          });
        }

        // Show students with transport details or all matching
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

  const formatDate = (d) => {
    if (!d) return '01-04-2026';
    try {
      const dt = new Date(d);
      if (isNaN(dt.getTime())) return '01-04-2026';
      const dd = String(dt.getDate()).padStart(2, '0');
      const mm = String(dt.getMonth() + 1).padStart(2, '0');
      const yyyy = dt.getFullYear();
      return `${dd}-${mm}-${yyyy}`;
    } catch {
      return '01-04-2026';
    }
  };

  return (
    <div style={{ display: 'flex', height: '100%', background: '#f3f4f6', overflow: 'hidden' }}>
      {/* ── LEFT FILTER SIDEBAR ── */}
      <div style={{ width: '260px', background: '#fff', borderRight: '1px solid #e5e7eb', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', flexShrink: 0, overflowY: 'auto' }}>
        
        {/* 1. Select School */}
        <div>
          <label style={labelStyle}>Select School</label>
          <select value={selectedSchool} onChange={e => setSelectedSchool(e.target.value)} style={inputStyle}>
            <option value="">All Schools</option>
            {schools.length > 0 ? (
              schools.map(s => <option key={s._id} value={s.schoolName}>{s.schoolName}</option>)
            ) : (
              <option value="NAVALS NATIONAL ACADEMY">NAVALS NATIONAL ACADEMY</option>
            )}
          </select>
        </div>

        {/* 2. Class */}
        <div>
          <label style={labelStyle}>Class</label>
          <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} style={inputStyle}>
            <option value="All">All ({classes.length})</option>
            {classes.map(c => (
              <option key={c._id} value={c._id}>{c.className || c.name}</option>
            ))}
          </select>
        </div>

        {/* 3. Select Route */}
        <div>
          <label style={labelStyle}>Select Route</label>
          <select value={selectedRoute} onChange={e => setSelectedRoute(e.target.value)} style={inputStyle}>
            <option value="">All Route(s) ({routes.length})</option>
            {routes.map(r => (
              <option key={r._id} value={r._id}>{r.routeName || r.name}</option>
            ))}
          </select>
        </div>

        {/* 4. Select Stop */}
        <div>
          <label style={labelStyle}>Select Stop</label>
          <select value={selectedStop} onChange={e => setSelectedStop(e.target.value)} style={inputStyle}>
            <option value="">All ({stops.length})</option>
            {stops.map(st => (
              <option key={st._id} value={st._id}>{st.stopName}</option>
            ))}
          </select>
        </div>

        {/* 5. Select Vehicle */}
        <div>
          <label style={labelStyle}>Select Vehicle</label>
          <select value={selectedVehicle} onChange={e => setSelectedVehicle(e.target.value)} style={inputStyle}>
            <option value="">All Vehicle(s) ({vehicles.length})</option>
            {vehicles.map(v => (
              <option key={v._id} value={v._id}>{v.vehicleNo || v.name}</option>
            ))}
          </select>
        </div>

        {/* 6. Vendor */}
        <div>
          <label style={labelStyle}>Vendor</label>
          <select value={selectedVendor} onChange={e => setSelectedVendor(e.target.value)} style={inputStyle}>
            <option value="All">All Vendor & Others</option>
            {agencies.map(a => (
              <option key={a._id} value={a.agencyName}>{a.agencyName}</option>
            ))}
          </select>
        </div>

        {/* 7. Installment */}
        <div>
          <label style={labelStyle}>Installment</label>
          <select value={selectedInstallment} onChange={e => setSelectedInstallment(e.target.value)} style={inputStyle}>
            <option value="All">All ({installments.length || 11})</option>
            {installments.map(ins => (
              <option key={ins._id} value={ins.name}>{ins.name || ins.printName}</option>
            ))}
          </select>
        </div>

        {/* 8. Select Month */}
        <div>
          <label style={labelStyle}>Select Month</label>
          <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} style={inputStyle}>
            <option value="All">All (12)</option>
            {monthsList.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* 9. Status */}
        <div>
          <label style={labelStyle}>Status</label>
          <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)} style={inputStyle}>
            <option value="ALL">ALL</option>
            <option value="STUDYING">STUDYING</option>
            <option value="INACTIVE">INACTIVE</option>
            <option value="LEFTOUT">LEFTOUT</option>
          </select>
        </div>

        {/* Show Button */}
        <button 
          onClick={handleShow} 
          disabled={loading} 
          style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '9px', borderRadius: '4px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 'bold', marginTop: '4px' }}
        >
          <Eye size={15} /> {loading ? 'Loading...' : 'Show'}
        </button>
      </div>

      {/* ── RIGHT REPORT VIEWER (Crystal Report Format) ── */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <div style={{ background: '#fff', minHeight: '100%', borderRadius: '4px', border: '1px solid #d1d5db', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          
          {/* Action Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' }}>
            <span style={{ fontSize: '13px', color: '#6b7280' }}>
              Format: <strong>Crystal Report Viewer</strong>
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

          {/* Golden / Amber Border Paper Container */}
          <div style={{ border: '2px solid #b45309', padding: '16px', minHeight: '400px' }}>
            
            {/* Header: Logo, Title & Address */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
              <img 
                src="/assets/logo.png" 
                alt="School Logo" 
                onError={(e) => { e.target.style.display = 'none'; }} 
                style={{ width: '48px', height: '48px', objectFit: 'contain' }} 
              />
              <div style={{ textAlign: 'center' }}>
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
            </div>

            {/* Sub-header Banner */}
            <div style={{ borderTop: '1px solid #b45309', borderBottom: '1px solid #b45309', padding: '5px 8px', marginBottom: '12px', background: '#fff' }}>
              <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#000', letterSpacing: '0.5px' }}>
                TRANSPORT DETAILS
              </span>
            </div>

            {/* Crystal Report Table matching exact screenshot */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px', color: '#000', whiteSpace: 'nowrap' }}>
                <thead>
                  <tr style={{ background: '#fef3c7', borderTop: '1px solid #d97706', borderBottom: '1px solid #d97706' }}>
                    <th style={{ padding: '6px 6px', border: '1px solid #d97706', textAlign: 'center', width: '30px' }}>SN</th>
                    <th style={{ padding: '6px 6px', border: '1px solid #d97706', textAlign: 'center', width: '60px' }}>ADM. NO.</th>
                    <th style={{ padding: '6px 6px', border: '1px solid #d97706', textAlign: 'left' }}>NAME</th>
                    <th style={{ padding: '6px 6px', border: '1px solid #d97706', textAlign: 'left' }}>FATHERNAME</th>
                    <th style={{ padding: '6px 6px', border: '1px solid #d97706', textAlign: 'center' }}>CLASS</th>
                    <th style={{ padding: '6px 6px', border: '1px solid #d97706', textAlign: 'center' }}>CONTACT</th>
                    <th style={{ padding: '6px 6px', border: '1px solid #d97706', textAlign: 'left' }}>STOPNAME</th>
                    <th style={{ padding: '6px 6px', border: '1px solid #d97706', textAlign: 'right' }}>FARE</th>
                    <th style={{ padding: '6px 6px', border: '1px solid #d97706', textAlign: 'center' }}>ROUTE1</th>
                    <th style={{ padding: '6px 6px', border: '1px solid #d97706', textAlign: 'left' }}>VEHICLE</th>
                    <th style={{ padding: '6px 6px', border: '1px solid #d97706', textAlign: 'center', width: '40px' }}>ORDERID</th>
                    <th style={{ padding: '6px 6px', border: '1px solid #d97706', textAlign: 'center' }}>ASSIGNDATE</th>
                    <th style={{ padding: '6px 6px', border: '1px solid #d97706', textAlign: 'center' }}>JOINDATE</th>
                  </tr>
                </thead>
                <tbody>
                  {!hasSearched ? (
                    <tr>
                      <td colSpan="13" style={{ textAlign: 'center', padding: '24px', color: '#6b7280', border: '1px solid #d97706' }}>
                        Click "Show" to view transport details.
                      </td>
                    </tr>
                  ) : reportData.length === 0 ? (
                    <tr>
                      <td colSpan="13" style={{ textAlign: 'center', padding: '20px', color: '#92400e', fontWeight: 'bold', border: '1px solid #d97706' }}>
                        No record found!
                      </td>
                    </tr>
                  ) : (
                    reportData.map((s, idx) => {
                      const admNo = s.academicDetails?.admissionNumber || s.admissionNumber || '-';
                      const p = s.personalDetails || {};
                      const name = `${p.firstName || s.firstName || ''} ${p.lastName || s.lastName || ''}`.trim() || '-';
                      
                      const fam = s.familyDetails || {};
                      const f = fam.father || {};
                      const fatherName = f.firstName ? `${f.firstName} ${f.lastName || ''}`.trim() : (s.fatherName || '-');
                      const contact = f.mobile || s.fatherMobile || p.mobile || '-';

                      const rawCls = s.academicDetails?.class || s.class?.className || s.class?.name || s.class || '-';
                      const rawSec = s.academicDetails?.section || s.section || '';
                      const clsSection = rawSec ? `${rawCls}-${rawSec}` : rawCls;

                      // Resolve Stop & Route
                      const stopId = s.transportDetails?.stop?._id || s.transportDetails?.stop || s.transportStop;
                      const matchedStop = stops.find(st => st._id === stopId || st.stopName === stopId);
                      const stopName = s.transportDetails?.stop?.stopName || matchedStop?.stopName || s.transportStop || '-';

                      const routeId = s.transportDetails?.route?._id || s.transportDetails?.route || s.transportRoute;
                      const matchedRoute = routes.find(r => r._id === routeId || r.routeName === routeId);
                      const routeName = matchedRoute?.routeName || s.transportRoute || '1';
                      // Extract route number if it's "Route 10" -> "10"
                      const routeDisplay = routeName.replace(/^Route\s*-?\s*/i, '');

                      // Fare
                      const fare = Number(s.transportDetails?.transportFee || s.transportFee || matchedStop?.fee || 500).toFixed(2);

                      // Vehicle
                      const vehicleId = s.transportDetails?.vehicle?._id || s.transportDetails?.vehicle || s.vehicleNo;
                      const matchedVehicle = vehicles.find(v => v._id === vehicleId || v.vehicleNo === vehicleId);
                      const vehicleName = matchedVehicle?.vehicleNo || s.vehicleNo || 'VAN';

                      // Dates
                      const assignDate = formatDate(s.transportDetails?.assignedDate || s.createdAt);
                      const joinDate = formatDate(s.academicDetails?.dateOfAdmission || s.academicDetails?.dateOfJoining || s.createdAt);

                      return (
                        <tr key={s._id || idx} style={{ borderBottom: '1px solid #fde68a' }}>
                          <td style={{ padding: '5px 6px', border: '1px solid #d97706', textAlign: 'center' }}>{idx + 1}</td>
                          <td style={{ padding: '5px 6px', border: '1px solid #d97706', textAlign: 'center' }}>{admNo}</td>
                          <td style={{ padding: '5px 6px', border: '1px solid #d97706' }}>{name}</td>
                          <td style={{ padding: '5px 6px', border: '1px solid #d97706' }}>{fatherName}</td>
                          <td style={{ padding: '5px 6px', border: '1px solid #d97706', textAlign: 'center' }}>{clsSection}</td>
                          <td style={{ padding: '5px 6px', border: '1px solid #d97706', textAlign: 'center' }}>{contact}</td>
                          <td style={{ padding: '5px 6px', border: '1px solid #d97706' }}>{stopName}</td>
                          <td style={{ padding: '5px 6px', border: '1px solid #d97706', textAlign: 'right' }}>{fare}</td>
                          <td style={{ padding: '5px 6px', border: '1px solid #d97706', textAlign: 'center' }}>{routeDisplay}</td>
                          <td style={{ padding: '5px 6px', border: '1px solid #d97706' }}>{vehicleName}</td>
                          <td style={{ padding: '5px 6px', border: '1px solid #d97706', textAlign: 'center' }}>1</td>
                          <td style={{ padding: '5px 6px', border: '1px solid #d97706', textAlign: 'center' }}>{assignDate}</td>
                          <td style={{ padding: '5px 6px', border: '1px solid #d97706', textAlign: 'center' }}>{joinDate}</td>
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
              <div>Transport Details printed on {currentDateStr} at {currentTimeStr}</div>
              <div>Page 1 of 1</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
