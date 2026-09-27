import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckSquare, Square, ChevronDown, Check } from 'lucide-react';
import Swal from 'sweetalert2';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005';

export default function AssignTransportToStudents() {
  const [classes, setClasses] = useState([]);
  const [classSectionMappings, setClassSectionMappings] = useState([]);
  const [availableSections, setAvailableSections] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [stops, setStops] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  // Selected Filter States
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

  // Table Students Data
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Per-row assignment states: { [studentId]: { route: '', stop: '', vehicle: '', months: ['Apr', 'May', ...], selected: boolean } }
  const [assignments, setAssignments] = useState({});

  // Active Month Picker Dropdown studentId
  const [openMonthPickerId, setOpenMonthPickerId] = useState(null);

  const allMonths = [
    'April', 'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December', 'January', 'February', 'March'
  ];

  const token = localStorage.getItem('token');
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [clsRes, secRes, rRes, sRes, vRes] = await Promise.all([
        fetch(`${API_URL}/api/school-classes`, { headers }).catch(() => ({ ok: false })),
        fetch(`${API_URL}/api/class-sections`, { headers }).catch(() => ({ ok: false })),
        fetch(`${API_URL}/api/transport/routes`, { headers }).catch(() => ({ ok: false })),
        fetch(`${API_URL}/api/transport/stops`, { headers }).catch(() => ({ ok: false })),
        fetch(`${API_URL}/api/transport/vehicles`, { headers }).catch(() => ({ ok: false }))
      ]);

      if (clsRes.ok) {
        const d = await clsRes.json();
        setClasses(Array.isArray(d) ? d : []);
      }
      if (secRes.ok) {
        const d = await secRes.json();
        setClassSectionMappings(Array.isArray(d) ? d : []);
      }
      if (rRes.ok) {
        const d = await rRes.json();
        setRoutes(Array.isArray(d) ? d : []);
      }
      if (sRes.ok) {
        const d = await sRes.json();
        setStops(Array.isArray(d) ? d : []);
      }
      if (vRes.ok) {
        const d = await vRes.json();
        setVehicles(Array.isArray(d) ? d : []);
      }
    } catch (err) {
      console.error('Error fetching initial transport masters:', err);
    }
  };

  // Whenever selectedClass changes, compute the sections for that class
  const handleClassChange = (className) => {
    setSelectedClass(className);
    setSelectedSection('');

    if (!className) {
      setAvailableSections([]);
      return;
    }

    // Match class in classSectionMappings
    const mapping = classSectionMappings.find(
      m => (m.className || m.name || '').toLowerCase() === className.toLowerCase()
    );

    if (mapping && Array.isArray(mapping.sections) && mapping.sections.length > 0) {
      const cleanSecs = mapping.sections.map(s => (typeof s === 'string' ? s : (s.name || s.sectionName || ''))).filter(Boolean);
      setAvailableSections(cleanSecs);
    } else {
      // Default standard sections if no specific mapping
      setAvailableSections(['A', 'B', 'C']);
    }
  };

  // Fetch students when Class or Section changes
  const fetchStudents = async () => {
    if (!selectedClass) {
      setStudents([]);
      setAssignments({});
      return;
    }

    try {
      setLoading(true);
      let url = `${API_URL}/api/students?class=${encodeURIComponent(selectedClass)}`;
      if (selectedSection && selectedSection !== 'Select Section') {
        url += `&section=${encodeURIComponent(selectedSection)}`;
      }

      const res = await fetch(url, { headers });
      if (res.ok) {
        const data = await res.json();
        const studentList = Array.isArray(data) ? data : [];
        setStudents(studentList);

        // Populate initial assignments map
        const initialMap = {};
        studentList.forEach(s => {
          const t = s.transportDetails || {};
          initialMap[s._id] = {
            route: t.route || '',
            stop: t.stop || '',
            vehicle: t.vehicle || '',
            months: t.months || allMonths, // default all 12 months if assigned or default
            selected: Boolean(t.isTransportStudent)
          };
        });
        setAssignments(initialMap);
      }
    } catch (err) {
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedClass) {
      fetchStudents();
    } else {
      setStudents([]);
      setAssignments({});
    }
  }, [selectedClass, selectedSection]);

  const handleRowChange = (studentId, field, value) => {
    setAssignments(prev => {
      const current = prev[studentId] || { route: '', stop: '', vehicle: '', months: allMonths, selected: false };
      return {
        ...prev,
        [studentId]: {
          ...current,
          [field]: value
        }
      };
    });
  };

  const handleToggleSelect = (studentId) => {
    setAssignments(prev => {
      const current = prev[studentId] || { route: '', stop: '', vehicle: '', months: allMonths, selected: false };
      return {
        ...prev,
        [studentId]: {
          ...current,
          selected: !current.selected
        }
      };
    });
  };

  const handleToggleMonth = (studentId, month) => {
    setAssignments(prev => {
      const current = prev[studentId] || { route: '', stop: '', vehicle: '', months: allMonths, selected: false };
      const currentMonths = current.months || [];
      const isPresent = currentMonths.includes(month);
      const updatedMonths = isPresent 
        ? currentMonths.filter(m => m !== month)
        : [...currentMonths, month];

      return {
        ...prev,
        [studentId]: {
          ...current,
          months: updatedMonths
        }
      };
    });
  };

  const handleSelectAllMonths = (studentId) => {
    setAssignments(prev => {
      const current = prev[studentId] || { route: '', stop: '', vehicle: '', months: allMonths, selected: false };
      return {
        ...prev,
        [studentId]: {
          ...current,
          months: current.months?.length === allMonths.length ? [] : [...allMonths]
        }
      };
    });
  };

  const getMonthDisplayText = (monthsList) => {
    if (!monthsList || monthsList.length === 0) return 'None selected';
    if (monthsList.length === allMonths.length) return 'All (12)';
    return `${monthsList.length} selected`;
  };

  // Update button action: saves all selected students' assignments
  const handleUpdateAll = async () => {
    const selectedIds = Object.keys(assignments).filter(id => assignments[id]?.selected);
    if (selectedIds.length === 0) {
      Swal.fire('No Selection', 'Please select at least one student to update transport.', 'warning');
      return;
    }

    setUpdating(true);
    try {
      // Loop or batch update
      const updatePromises = selectedIds.map(studentId => {
        const item = assignments[studentId];
        return fetch(`${API_URL}/api/transport/assign-student`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            studentId,
            route: item.route || undefined,
            stop: item.stop || undefined,
            vehicle: item.vehicle || undefined,
            months: item.months || [],
            isTransportStudent: true
          })
        });
      });

      await Promise.all(updatePromises);
      Swal.fire({
        icon: 'success',
        title: 'Updated Successfully',
        text: `Transport details updated for ${selectedIds.length} students.`,
        timer: 2000,
        showConfirmButton: false
      });

      fetchStudents();
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to update transport assignments.', 'error');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div style={{ padding: '16px 20px', background: '#f8fafc', minHeight: 'calc(100vh - 100px)', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      
      {/* Top Filter Bar */}
      <div style={{ background: '#fff', borderRadius: '4px', border: '1px solid #e2e8f0', padding: '16px 20px', marginBottom: '20px', display: 'flex', alignItems: 'flex-end', gap: '30px' }}>
        
        {/* Class Filter */}
        <div style={{ minWidth: '240px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#1e293b', marginBottom: '6px' }}>Class</label>
          <select
            value={selectedClass}
            onChange={(e) => handleClassChange(e.target.value)}
            style={{ width: '100%', padding: '7px 10px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '13px', color: '#334155', background: '#fff', outline: 'none' }}
          >
            <option value="">Select Class</option>
            {classes.map(c => {
              const clsVal = c.name || c.className;
              return (
                <option key={c._id} value={clsVal}>{clsVal}</option>
              );
            })}
          </select>
        </div>

        {/* Section Filter */}
        <div style={{ minWidth: '240px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#1e293b', marginBottom: '6px' }}>Section</label>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            disabled={!selectedClass}
            style={{ 
              width: '100%', 
              padding: '7px 10px', 
              border: '1px solid #cbd5e1', 
              borderRadius: '4px', 
              fontSize: '13px', 
              color: '#334155', 
              background: !selectedClass ? '#f1f5f9' : '#fff', 
              cursor: !selectedClass ? 'not-allowed' : 'pointer',
              outline: 'none' 
            }}
          >
            <option value="">Select Section</option>
            {availableSections.map((secName, idx) => (
              <option key={idx} value={secName}>
                {secName}
              </option>
            ))}
          </select>
        </div>

        {/* Update Button */}
        <div>
          <button
            onClick={handleUpdateAll}
            disabled={updating || students.length === 0}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#29a9d8',
              color: '#fff',
              border: 'none',
              padding: '8px 20px',
              borderRadius: '4px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: (updating || students.length === 0) ? 'not-allowed' : 'pointer',
              opacity: (updating || students.length === 0) ? 0.7 : 1,
              transition: 'background 0.2s'
            }}
          >
            <RefreshCw size={14} className={updating ? 'animate-spin' : ''} />
            Update
          </button>
        </div>
      </div>

      {/* Student List Section */}
      <div style={{ background: '#fff', borderRadius: '4px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        
        {/* Title Header */}
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #f1f5f9' }}>
          <h3 style={{ margin: 0, fontSize: '15px', color: '#475569', fontWeight: 600 }}>Student List</h3>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto', minHeight: '350px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', color: '#475569', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '10px 12px', fontWeight: 'bold', width: '50px' }}>Sr. No.</th>
                <th style={{ padding: '10px 12px', fontWeight: 'bold', width: '80px' }}>Adm No</th>
                <th style={{ padding: '10px 12px', fontWeight: 'bold', minWidth: '160px' }}>Student Name</th>
                <th style={{ padding: '10px 12px', fontWeight: 'bold', minWidth: '160px' }}>Father Name</th>
                <th style={{ padding: '10px 12px', fontWeight: 'bold', minWidth: '220px' }}>Address</th>
                <th style={{ padding: '10px 12px', fontWeight: 'bold', width: '110px' }}>Route</th>
                <th style={{ padding: '10px 12px', fontWeight: 'bold', width: '160px' }}>Stop</th>
                <th style={{ padding: '10px 12px', fontWeight: 'bold', width: '130px' }}>Vehicle</th>
                <th style={{ padding: '10px 12px', fontWeight: 'bold', width: '140px' }}>Months</th>
                <th style={{ padding: '10px 12px', fontWeight: 'bold', width: '60px', textAlign: 'center' }}>Select</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="10" style={{ padding: '50px', textAlign: 'center', color: '#64748b' }}>
                    Loading students...
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan="10" style={{ padding: '50px', textAlign: 'center', color: '#94a3b8' }}>
                    {selectedClass ? 'No students found in selected class/section.' : 'Please select a Class to view students.'}
                  </td>
                </tr>
              ) : (
                students.map((st, index) => {
                  const sId = st._id;
                  const rowState = assignments[sId] || { route: '', stop: '', vehicle: '', months: allMonths, selected: false };
                  const name = `${st.personalDetails?.firstName || st.firstName || ''} ${st.personalDetails?.middleName || ''} ${st.personalDetails?.lastName || st.lastName || ''}`.trim();
                  const admNo = st.academicDetails?.admissionNumber || st.admissionNumber || '-';
                  const fatherName = st.familyDetails?.father?.firstName 
                    ? `${st.familyDetails.father.firstName} ${st.familyDetails.father.lastName || ''}`.trim()
                    : (st.fatherName || '-');
                  const address = st.contactAddress?.currentAddress || st.contactAddress?.permanentAddress || st.address || '-';

                  const isSelected = rowState.selected;

                  return (
                    <tr 
                      key={sId}
                      style={{ 
                        borderBottom: '1px solid #f1f5f9',
                        background: isSelected ? '#e0f2fe' : (index % 2 === 1 ? '#fcfdfd' : '#fff'),
                        transition: 'background 0.15s'
                      }}
                    >
                      <td style={{ padding: '8px 12px', color: '#64748b', fontWeight: 500 }}>{index + 1}</td>
                      <td style={{ padding: '8px 12px', color: '#0f172a', fontWeight: 600 }}>{admNo}</td>
                      <td style={{ padding: '8px 12px', color: '#0f172a', fontWeight: 600 }}>{name}</td>
                      <td style={{ padding: '8px 12px', color: '#334155' }}>{fatherName}</td>
                      <td style={{ padding: '8px 12px', color: '#475569', fontSize: '11px' }}>{address}</td>

                      {/* Route Dropdown */}
                      <td style={{ padding: '6px 8px' }}>
                        <select
                          value={rowState.route}
                          onChange={(e) => handleRowChange(sId, 'route', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '4px 6px',
                            border: '1px solid #cbd5e1',
                            borderRadius: '3px',
                            fontSize: '11px',
                            background: '#fff',
                            color: '#334155',
                            outline: 'none'
                          }}
                        >
                          <option value="">Select</option>
                          {routes.map(r => (
                            <option key={r._id} value={r._id}>{r.routeName || r.name}</option>
                          ))}
                        </select>
                      </td>

                      {/* Stop Dropdown */}
                      <td style={{ padding: '6px 8px' }}>
                        <select
                          value={rowState.stop}
                          onChange={(e) => handleRowChange(sId, 'stop', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '4px 6px',
                            border: '1px solid #cbd5e1',
                            borderRadius: '3px',
                            fontSize: '11px',
                            background: '#fff',
                            color: '#334155',
                            outline: 'none'
                          }}
                        >
                          <option value="">Select</option>
                          {stops.map(sp => (
                            <option key={sp._id} value={sp._id}>{sp.stopName || sp.name}</option>
                          ))}
                        </select>
                      </td>

                      {/* Vehicle Dropdown */}
                      <td style={{ padding: '6px 8px' }}>
                        <select
                          value={rowState.vehicle}
                          onChange={(e) => handleRowChange(sId, 'vehicle', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '4px 6px',
                            border: '1px solid #cbd5e1',
                            borderRadius: '3px',
                            fontSize: '11px',
                            background: '#fff',
                            color: '#334155',
                            outline: 'none'
                          }}
                        >
                          <option value="">Select</option>
                          {vehicles.map(v => (
                            <option key={v._id} value={v._id}>{v.vehicleNo || v.name}</option>
                          ))}
                        </select>
                      </td>

                      {/* Months Dropdown Button & Popup */}
                      <td style={{ padding: '6px 8px', position: 'relative' }}>
                        <div 
                          onClick={() => setOpenMonthPickerId(openMonthPickerId === sId ? null : sId)}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '4px 8px',
                            border: '1px solid #cbd5e1',
                            borderRadius: '3px',
                            fontSize: '11px',
                            background: '#fff',
                            color: '#334155',
                            cursor: 'pointer',
                            userSelect: 'none'
                          }}
                        >
                          <span>{getMonthDisplayText(rowState.months)}</span>
                          <ChevronDown size={12} style={{ color: '#64748b' }} />
                        </div>

                        {/* Month Picker Floating Modal */}
                        {openMonthPickerId === sId && (
                          <div 
                            style={{
                              position: 'absolute',
                              top: '100%',
                              right: 0,
                              background: '#fff',
                              border: '1px solid #cbd5e1',
                              borderRadius: '4px',
                              boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                              zIndex: 1000,
                              padding: '10px',
                              width: '180px'
                            }}
                          >
                            <div 
                              onClick={() => handleSelectAllMonths(sId)}
                              style={{ 
                                padding: '4px 6px', 
                                borderBottom: '1px solid #f1f5f9', 
                                fontWeight: 'bold', 
                                fontSize: '11px', 
                                color: '#0284c7', 
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '4px'
                              }}
                            >
                              <span>{rowState.months?.length === allMonths.length ? 'Deselect All' : 'Select All'}</span>
                            </div>
                            <div style={{ maxHeight: '180px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              {allMonths.map(m => {
                                const isChecked = (rowState.months || []).includes(m);
                                return (
                                  <label 
                                    key={m} 
                                    style={{ 
                                      display: 'flex', 
                                      alignItems: 'center', 
                                      gap: '6px', 
                                      fontSize: '11px', 
                                      color: '#334155',
                                      cursor: 'pointer',
                                      padding: '2px 4px',
                                      borderRadius: '3px'
                                    }}
                                  >
                                    <input 
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={() => handleToggleMonth(sId, m)}
                                      style={{ cursor: 'pointer' }}
                                    />
                                    <span>{m}</span>
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </td>

                      {/* Select Checkbox */}
                      <td style={{ padding: '6px 8px', textAlign: 'center' }}>
                        <input
                          type="checkbox"
                          checked={rowState.selected || false}
                          onChange={() => handleToggleSelect(sId)}
                          style={{ width: '15px', height: '15px', cursor: 'pointer', accentColor: '#29a9d8' }}
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
