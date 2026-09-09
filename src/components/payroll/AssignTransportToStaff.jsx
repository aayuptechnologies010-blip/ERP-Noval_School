import React, { useState, useEffect } from 'react';
import { Eye, X, Printer, Bus, CheckSquare, RefreshCw, AlertCircle, CheckCircle, Download, Trash2 } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function AssignTransportToStaff() {
  // Option States
  const [bankAccounts, setBankAccounts] = useState([]);
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [transportRoutes, setTransportRoutes] = useState([]);
  const [routeStops, setRouteStops] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  // Filter States
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedAccountNo, setSelectedAccountNo] = useState('');
  const [selectedStaffType, setSelectedStaffType] = useState('');

  // Table Data & Staff
  const [allStaff, setAllStaff] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [selectedStaffIds, setSelectedStaffIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Assignment Controls
  const [assignRoute, setAssignRoute] = useState('');
  const [assignStop, setAssignStop] = useState('');
  const [assignVehicle, setAssignVehicle] = useState('');
  const [assignMonthlyFee, setAssignMonthlyFee] = useState(1500);

  // Table Search & Pagination
  const [tableSearch, setTableSearch] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Status Notification
  const [statusMessage, setStatusMessage] = useState(null);

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const showNotification = (type, text) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // 1. Initial Load: Fetch Options and Staff
  const fetchData = async () => {
    try {
      setLoading(true);
      const [accRes, typeRes, routeRes, vehicleRes, staffRes] = await Promise.all([
        fetch(`${API_BASE}/api/salary-accounts`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_BASE}/api/staff-types`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_BASE}/api/transport/routes`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_BASE}/api/transport/vehicles`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_BASE}/api/staffs`, { headers: { 'Authorization': `Bearer ${token}` } })
      ]);

      if (accRes.ok) setBankAccounts(await accRes.json());
      if (typeRes.ok) setEmployeeTypes(await typeRes.json());
      if (routeRes.ok) {
        const rData = await routeRes.json();
        setTransportRoutes(Array.isArray(rData) ? rData : []);
        if (Array.isArray(rData) && rData.length > 0) {
          setAssignRoute(rData[0].routeName);
          // Fetch stops for first route
          fetchStopsForRoute(rData[0]._id);
        }
      }
      if (vehicleRes.ok) {
        const vData = await vehicleRes.json();
        setVehicles(Array.isArray(vData) ? vData : []);
        if (Array.isArray(vData) && vData.length > 0) {
          setAssignVehicle(vData[0].vehicleNo);
        }
      }
      if (staffRes.ok) {
        const sList = await staffRes.json();
        const arr = Array.isArray(sList) ? sList : [];
        setAllStaff(arr);
        setStaffList(arr);
      }
    } catch (err) {
      console.error('Error loading transport data:', err);
      showNotification('error', 'Server error while loading transport data');
    } finally {
      setLoading(false);
    }
  };

  const fetchStopsForRoute = async (routeId) => {
    try {
      const res = await fetch(`${API_BASE}/api/transport/routes/${routeId}/stops`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const stops = await res.json();
        setRouteStops(Array.isArray(stops) ? stops : []);
        if (Array.isArray(stops) && stops.length > 0) {
          setAssignStop(stops[0].stopName);
          if (stops[0].fee) setAssignMonthlyFee(stops[0].fee);
        }
      }
    } catch (err) {
      console.error('Error fetching stops for route:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // When Route Selection Changes
  const handleRouteChange = (routeName) => {
    setAssignRoute(routeName);
    const rObj = transportRoutes.find(r => r.routeName === routeName);
    if (rObj) {
      fetchStopsForRoute(rObj._id);
    } else {
      setRouteStops([]);
    }
  };

  // Compute Unique Options
  const uniqueAccounts = Array.from(new Set([
    ...bankAccounts.map(a => a.accountName || a.accountNo || a.bank).filter(Boolean),
    ...allStaff.map(s => s.salaryAccount).filter(Boolean)
  ])).sort();

  const uniqueAccountNos = Array.from(new Set([
    ...bankAccounts.map(a => a.accountNo || a.salaryAccountNo).filter(Boolean),
    ...allStaff.map(s => s.bankAccNo || s.empAccNo).filter(Boolean)
  ])).sort();

  const uniqueEmployeeTypes = Array.from(new Set([
    ...employeeTypes.map(t => t.type || t.staffType || t.name).filter(Boolean),
    ...allStaff.map(s => s.staffType).filter(Boolean)
  ])).sort();

  // Filter Handler
  const handleView = () => {
    let filtered = [...allStaff];

    if (selectedAccount && selectedAccount !== 'All') {
      filtered = filtered.filter(s =>
        (s.salaryAccount || '').toLowerCase().includes(selectedAccount.toLowerCase()) ||
        (s.bankName || '').toLowerCase().includes(selectedAccount.toLowerCase())
      );
    }

    if (selectedAccountNo) {
      filtered = filtered.filter(s => (s.bankAccNo || s.empAccNo || '') === selectedAccountNo);
    }

    if (selectedStaffType && selectedStaffType !== 'All') {
      filtered = filtered.filter(s => s.staffType === selectedStaffType);
    }

    setStaffList(filtered);
    setSelectedStaffIds([]);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSelectedAccount('');
    setSelectedAccountNo('');
    setSelectedStaffType('');
    setStaffList(allStaff);
    setSelectedStaffIds([]);
    setTableSearch('');
    setCurrentPage(1);
    setStatusMessage(null);
  };

  // Bulk Assign Transport
  const handleAssignTransport = async () => {
    if (selectedStaffIds.length === 0) {
      showNotification('error', 'Please select at least one staff member.');
      return;
    }
    if (!assignRoute) {
      showNotification('error', 'Please select a Transport Route.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(`${API_BASE}/api/staffs/bulk/assign-transport`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          staffIds: selectedStaffIds,
          route: assignRoute,
          stop: assignStop,
          vehicle: assignVehicle,
          monthlyFee: Number(assignMonthlyFee) || 0
        })
      });

      if (res.ok) {
        showNotification('success', `Transport assigned to ${selectedStaffIds.length} staff member(s) successfully!`);
        setSelectedStaffIds([]);
        // Refresh staff list
        const refreshRes = await fetch(`${API_BASE}/api/staffs`, { headers: { 'Authorization': `Bearer ${token}` } });
        if (refreshRes.ok) {
          const arr = await refreshRes.json();
          setAllStaff(arr);
          setStaffList(arr);
        }
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Failed to assign transport');
      }
    } catch (err) {
      console.error('Error assigning transport:', err);
      showNotification('error', 'Server error while assigning transport');
    } finally {
      setSubmitting(false);
    }
  };

  // Bulk Remove Transport
  const handleRemoveTransport = async () => {
    if (selectedStaffIds.length === 0) {
      showNotification('error', 'Please select at least one staff member to remove transport.');
      return;
    }
    if (!window.confirm(`Remove transport assignment from ${selectedStaffIds.length} staff member(s)?`)) return;

    try {
      setSubmitting(true);
      const res = await fetch(`${API_BASE}/api/staffs/bulk/remove-transport`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ staffIds: selectedStaffIds })
      });

      if (res.ok) {
        showNotification('success', `Transport removed from ${selectedStaffIds.length} staff member(s).`);
        setSelectedStaffIds([]);
        // Refresh staff list
        const refreshRes = await fetch(`${API_BASE}/api/staffs`, { headers: { 'Authorization': `Bearer ${token}` } });
        if (refreshRes.ok) {
          const arr = await refreshRes.json();
          setAllStaff(arr);
          setStaffList(arr);
        }
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Failed to remove transport');
      }
    } catch (err) {
      console.error('Error removing transport:', err);
      showNotification('error', 'Server error');
    } finally {
      setSubmitting(false);
    }
  };

  // Print Roster
  const handlePrintRoster = () => {
    const printWindow = window.open('', '_blank');
    const assignedStaff = staffList.filter(s => s.transportDetails && s.transportDetails.isTransport);

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Staff Transport Roster - Noval School</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 25px; color: #1e293b; }
          h2 { margin: 0 0 5px 0; color: #0284c7; }
          .sub { color: #64748b; font-size: 13px; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          th, td { border: 1px solid #cbd5e1; padding: 8px 12px; font-size: 12px; text-align: left; }
          th { background-color: #f1f5f9; font-weight: 600; color: #334155; }
          .badge { background: #dcfce7; color: #15803d; padding: 2px 6px; border-radius: 4px; font-weight: bold; }
          @media print {
            button { display: none; }
          }
        </style>
      </head>
      <body>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h2>NOVAL PUBLIC SCHOOL - STAFF TRANSPORT ROSTER</h2>
            <div class="sub">Generated on: ${new Date().toLocaleString('en-IN')} | Total Assigned: ${assignedStaff.length}</div>
          </div>
          <button onclick="window.print()" style="padding: 8px 16px; background: #0284c7; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">Print Roster</button>
        </div>
        <table>
          <thead>
            <tr>
              <th style="width: 40px;">#</th>
              <th>Emp No</th>
              <th>Staff Name</th>
              <th>Designation</th>
              <th>Mobile</th>
              <th>Route Name</th>
              <th>Pickup/Drop Stop</th>
              <th>Vehicle No</th>
              <th>Monthly Fee</th>
            </tr>
          </thead>
          <tbody>
            ${assignedStaff.map((s, idx) => `
              <tr>
                <td>${idx + 1}</td>
                <td><strong>${s.empNo || s.userName || '-'}</strong></td>
                <td>${s.firstName || ''} ${s.lastName || ''}</td>
                <td>${s.designation || '-'}</td>
                <td>${s.contactNo || '-'}</td>
                <td>${s.transportDetails?.route || '-'}</td>
                <td>${s.transportDetails?.stop || '-'}</td>
                <td><strong>${s.transportDetails?.vehicle || '-'}</strong></td>
                <td>₹${Number(s.transportDetails?.monthlyFee || 0).toLocaleString('en-IN')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  // Export CSV
  const handleExportCSV = () => {
    if (staffList.length === 0) return;
    const csvRows = [
      ['Emp No', 'Staff Name', 'Designation', 'Mobile', 'Transport Assigned', 'Route', 'Stop', 'Vehicle', 'Monthly Fee'],
      ...staffList.map(s => {
        const td = s.transportDetails || {};
        const fullName = `${s.firstName || ''} ${s.lastName || ''}`.trim();
        return [
          s.empNo || s.userName || '',
          fullName,
          s.designation || '',
          s.contactNo || '',
          td.isTransport ? 'Yes' : 'No',
          td.route || '',
          td.stop || '',
          td.vehicle || '',
          td.monthlyFee || 0
        ];
      })
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map(e => e.map(i => `"${i}"`).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `staff_transport_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Table Search Filter
  const searchedStaff = staffList.filter(s => {
    const fullName = `${s.firstName || ''} ${s.middleName || ''} ${s.lastName || ''}`.toLowerCase();
    const empNo = (s.empNo || s.userName || '').toLowerCase();
    const desig = (s.designation || '').toLowerCase();
    const route = (s.transportDetails?.route || '').toLowerCase();
    const stop = (s.transportDetails?.stop || '').toLowerCase();
    const vehicle = (s.transportDetails?.vehicle || '').toLowerCase();
    const q = tableSearch.toLowerCase();
    return !tableSearch || fullName.includes(q) || empNo.includes(q) || desig.includes(q) || route.includes(q) || stop.includes(q) || vehicle.includes(q);
  });

  const totalPages = Math.ceil(searchedStaff.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const currentRows = searchedStaff.slice(startIndex, startIndex + pageSize);

  const areAllOnPageSelected = currentRows.length > 0 && currentRows.every(s => selectedStaffIds.includes(s._id));

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const pageStaffIds = currentRows.map(s => s._id);
      setSelectedStaffIds(prev => Array.from(new Set([...prev, ...pageStaffIds])));
    } else {
      const pageStaffIds = new Set(currentRows.map(s => s._id));
      setSelectedStaffIds(prev => prev.filter(id => !pageStaffIds.has(id)));
    }
  };

  const handleRowSelect = (id) => {
    setSelectedStaffIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="global-settings-container" style={{ padding: '20px' }}>
      {/* Alert Notifications */}
      {statusMessage && (
        <div style={{
          padding: '12px 20px',
          borderRadius: '6px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: statusMessage.type === 'success' ? '#e8f5e9' : '#ffebee',
          color: statusMessage.type === 'success' ? '#2e7d32' : '#c62828',
          border: `1px solid ${statusMessage.type === 'success' ? '#a5d6a7' : '#ef9a9a'}`
        }}>
          {statusMessage.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          <span style={{ fontSize: '14px', fontWeight: '500' }}>{statusMessage.text}</span>
        </div>
      )}

      {/* Top Filter Card */}
      <div style={{ padding: '20px 30px', maxWidth: '850px', margin: '0 auto 25px auto', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <div className="settings-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '15px' }}>
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>Salary A/c</label>
            <select 
              className="settings-input"
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            >
              <option value="">All Salary A/c</option>
              {uniqueAccounts.map((a, i) => <option key={i} value={a}>{a}</option>)}
            </select>
          </div>

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>Salary A/c No.</label>
            <select 
              className="settings-input"
              value={selectedAccountNo}
              onChange={(e) => setSelectedAccountNo(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            >
              <option value="">All Salary A/C No.</option>
              {uniqueAccountNos.map((no, i) => <option key={i} value={no}>{no}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <div className="form-group" style={{ width: '385px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ textAlign: 'center', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Staff Type</label>
            <select 
              className="settings-input"
              value={selectedStaffType}
              onChange={(e) => setSelectedStaffType(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            >
              <option value="">All Staff Types ({uniqueEmployeeTypes.length})</option>
              {uniqueEmployeeTypes.map((t, i) => <option key={i} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <button 
            onClick={handleView}
            disabled={loading}
            style={{ 
              backgroundColor: 'white', 
              color: '#159BD7', 
              border: '1px solid #159BD7', 
              padding: '8px 24px', 
              borderRadius: '6px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: '600'
            }}
          >
            <Eye size={16} /> {loading ? 'Loading...' : 'View'}
          </button>
          <button 
            onClick={handlePrintRoster}
            style={{ 
              backgroundColor: 'white', 
              color: '#159BD7', 
              border: '1px solid #159BD7', 
              padding: '8px 24px', 
              borderRadius: '6px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            <Printer size={16} /> Print Roster
          </button>
          <button 
            onClick={handleReset}
            style={{ 
              backgroundColor: 'white', 
              color: '#ff9800', 
              border: '1px solid #ff9800', 
              padding: '8px 24px', 
              borderRadius: '6px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            <X size={16} /> Reset
          </button>
        </div>
      </div>

      {/* Main Transport Assignment Section */}
      <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        {/* Bulk Assignment Bar */}
        <div style={{
          background: '#f1f5f9',
          padding: '16px 20px',
          borderRadius: '6px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '15px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Route:</span>
              <select
                value={assignRoute}
                onChange={(e) => handleRouteChange(e.target.value)}
                style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '12px', minWidth: '180px' }}
              >
                <option value="">Select Route</option>
                {transportRoutes.map(r => <option key={r._id} value={r.routeName}>{r.routeName}</option>)}
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Stop:</span>
              <select
                value={assignStop}
                onChange={(e) => {
                  setAssignStop(e.target.value);
                  const st = routeStops.find(s => s.stopName === e.target.value);
                  if (st && st.fee) setAssignMonthlyFee(st.fee);
                }}
                style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '12px', minWidth: '150px' }}
              >
                <option value="">Select Stop</option>
                {routeStops.map(s => <option key={s._id} value={s.stopName}>{s.stopName} (₹{s.fee || 0})</option>)}
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Vehicle:</span>
              <select
                value={assignVehicle}
                onChange={(e) => setAssignVehicle(e.target.value)}
                style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '12px' }}
              >
                <option value="">Select Vehicle</option>
                {vehicles.map(v => <option key={v._id} value={v.vehicleNo}>{v.vehicleNo}</option>)}
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Monthly Fee:</span>
              <input 
                type="number"
                value={assignMonthlyFee}
                onChange={(e) => setAssignMonthlyFee(Number(e.target.value))}
                style={{ width: '90px', padding: '6px 10px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '12px' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleAssignTransport}
              disabled={submitting || selectedStaffIds.length === 0}
              style={{
                backgroundColor: '#0284c7',
                color: 'white',
                border: 'none',
                padding: '8px 18px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: (submitting || selectedStaffIds.length === 0) ? 'not-allowed' : 'pointer',
                opacity: (submitting || selectedStaffIds.length === 0) ? 0.6 : 1
              }}
            >
              <Bus size={15} /> Assign Transport ({selectedStaffIds.length})
            </button>

            <button
              onClick={handleRemoveTransport}
              disabled={submitting || selectedStaffIds.length === 0}
              style={{
                backgroundColor: '#fff',
                color: '#dc2626',
                border: '1px solid #f87171',
                padding: '8px 14px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: (submitting || selectedStaffIds.length === 0) ? 'not-allowed' : 'pointer',
                opacity: (submitting || selectedStaffIds.length === 0) ? 0.6 : 1
              }}
            >
              <Trash2 size={15} /> Remove
            </button>
          </div>
        </div>

        {/* Search Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ fontWeight: '700', fontSize: '14px', color: '#1e293b' }}>
            STAFF TRANSPORT ASSIGNMENTS ({searchedStaff.length})
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handleExportCSV}
              style={{
                backgroundColor: 'white',
                color: '#475569',
                border: '1px solid #cbd5e1',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer'
              }}
            >
              <Download size={14} /> Export CSV
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Search:</span>
              <input 
                type="text"
                placeholder="Filter by name, route, stop, vehicle..."
                value={tableSearch}
                onChange={(e) => { setTableSearch(e.target.value); setCurrentPage(1); }}
                style={{ padding: '6px 12px', borderRadius: '20px', border: '1px solid #cbd5e1', width: '240px' }}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mail-table-wrapper" style={{ overflowX: 'auto' }}>
          <table className="mail-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ width: '45px', textAlign: 'center', padding: '12px' }}>
                  <input 
                    type="checkbox"
                    checked={areAllOnPageSelected}
                    onChange={handleSelectAll}
                    style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                  />
                </th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', color: '#475569' }}>Emp No.</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', color: '#475569' }}>Staff Name</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', color: '#475569' }}>Staff Type</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', color: '#475569' }}>Designation</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', color: '#475569' }}>Assigned Route</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', color: '#475569' }}>Pickup Stop</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', color: '#475569' }}>Vehicle</th>
                <th style={{ textAlign: 'right', padding: '12px', fontSize: '13px', color: '#475569' }}>Monthly Fee (₹)</th>
                <th style={{ textAlign: 'center', padding: '12px', fontSize: '13px', color: '#475569' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="10" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                    <RefreshCw className="animate-spin" size={24} style={{ display: 'inline-block', marginBottom: '8px' }} />
                    <div>Loading staff transport data...</div>
                  </td>
                </tr>
              ) : currentRows.length === 0 ? (
                <tr>
                  <td colSpan="10" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                    No staff records found matching criteria.
                  </td>
                </tr>
              ) : (
                currentRows.map((staff, idx) => {
                  const isChecked = selectedStaffIds.includes(staff._id);
                  const fullName = `${staff.firstName || ''} ${staff.middleName ? staff.middleName + ' ' : ''}${staff.lastName || ''}`.trim();
                  const isAyup = (staff.firstName && staff.firstName.toLowerCase().includes('ayup')) || (staff.userName === 'SF072');
                  const td = staff.transportDetails || {};
                  const hasTransport = td.isTransport && td.route;

                  return (
                    <tr 
                      key={staff._id} 
                      style={{ 
                        backgroundColor: isChecked ? '#f0f9ff' : (idx % 2 === 0 ? '#ffffff' : '#f8fafc'), 
                        borderBottom: '1px solid #f1f5f9' 
                      }}
                    >
                      <td style={{ textAlign: 'center', padding: '10px' }}>
                        <input 
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleRowSelect(staff._id)}
                          style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                        />
                      </td>
                      <td style={{ padding: '10px', fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>
                        {staff.empNo || staff.userName || '-'}
                      </td>
                      <td style={{ padding: '10px', fontSize: '13px', fontWeight: isAyup ? '700' : '600', color: isAyup ? '#0288d1' : '#1e293b' }}>
                        {fullName}
                        {isAyup && (
                          <span style={{ marginLeft: '8px', fontSize: '10px', backgroundColor: '#e1f5fe', color: '#0288d1', padding: '2px 6px', borderRadius: '4px', fontWeight: '600' }}>
                            Verified (Ayup Tech)
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '10px', fontSize: '13px', color: '#475569' }}>
                        {staff.staffType || '-'}
                      </td>
                      <td style={{ padding: '10px', fontSize: '13px', color: '#475569' }}>
                        {staff.designation || '-'}
                      </td>
                      <td style={{ padding: '10px', fontSize: '13px', color: hasTransport ? '#0369a1' : '#94a3b8', fontWeight: hasTransport ? '600' : 'normal' }}>
                        {td.route || 'None'}
                      </td>
                      <td style={{ padding: '10px', fontSize: '13px', color: '#334155' }}>
                        {td.stop || '-'}
                      </td>
                      <td style={{ padding: '10px', fontSize: '13px', color: '#334155', fontWeight: '600' }}>
                        {td.vehicle || '-'}
                      </td>
                      <td style={{ textAlign: 'right', padding: '10px', fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>
                        ₹{Number(td.monthlyFee || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ textAlign: 'center', padding: '10px' }}>
                        {hasTransport ? (
                          <span style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '600' }}>
                            Assigned
                          </span>
                        ) : (
                          <span style={{ backgroundColor: '#f1f5f9', color: '#64748b', padding: '2px 8px', borderRadius: '4px', fontSize: '11px' }}>
                            Not Assigned
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', color: '#64748b', fontSize: '13px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            Showing {searchedStaff.length === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + pageSize, searchedStaff.length)} of {searchedStaff.length} entries
          </div>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{ padding: '5px 12px', border: '1px solid #cbd5e1', borderRadius: '4px', background: currentPage === 1 ? '#f8fafc' : '#fff', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
            >
              Previous
            </button>
            <span style={{ padding: '5px 12px', backgroundColor: '#159BD7', color: 'white', borderRadius: '4px', fontWeight: '600' }}>
              {currentPage}
            </span>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              style={{ padding: '5px 12px', border: '1px solid #cbd5e1', borderRadius: '4px', background: currentPage === totalPages ? '#f8fafc' : '#fff', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
