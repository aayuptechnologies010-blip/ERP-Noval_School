import React, { useState, useEffect } from 'react';
import { Eye, Save, CheckSquare, Square, RefreshCw } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function AssignInfoBulk() {
  const [salaryAccounts, setSalaryAccounts] = useState([]);
  const [staffTypes, setStaffTypes] = useState([]);
  
  // Filter state
  const [selectedAccountName, setSelectedAccountName] = useState('All');
  const [selectedAccountNo, setSelectedAccountNo] = useState('All');
  const [selectedStaffType, setSelectedStaffType] = useState('All');

  // Staff list & selection
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedStaffIds, setSelectedStaffIds] = useState([]);

  // Bulk target selections
  const [bulkSalaryAccount, setBulkSalaryAccount] = useState('');
  const [bulkStaffType, setBulkStaffType] = useState('');
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  // Load dropdown options
  useEffect(() => {
    const loadDropdowns = async () => {
      try {
        const [accRes, typeRes] = await Promise.all([
          fetch(`${API_BASE}/api/salary-accounts`, { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch(`${API_BASE}/api/staff-types`, { headers: { 'Authorization': `Bearer ${token}` } })
        ]);

        if (accRes.ok) {
          const accs = await accRes.json();
          setSalaryAccounts(accs);
        }
        if (typeRes.ok) {
          const types = await typeRes.json();
          setStaffTypes(types);
        }
      } catch (err) {
        console.error('Error loading dropdown options:', err);
      }
    };
    loadDropdowns();
  }, []);

  const handleFetchStaff = async () => {
    try {
      setLoading(true);
      setHasSearched(true);
      const res = await fetch(`${API_BASE}/api/staffs`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        let list = await res.json();

        // Apply filters
        if (selectedAccountName !== 'All') {
          list = list.filter(s => s.salaryAccount === selectedAccountName);
        }
        if (selectedAccountNo !== 'All') {
          const acc = salaryAccounts.find(a => a.accountNo === selectedAccountNo);
          if (acc) {
            list = list.filter(s => s.salaryAccount === acc.accountName || s.bankAccNo === selectedAccountNo);
          }
        }
        if (selectedStaffType !== 'All') {
          list = list.filter(s => s.staffType === selectedStaffType);
        }

        setStaffList(list);
        setSelectedStaffIds([]); // reset selection
      }
    } catch (err) {
      console.error('Error fetching staff:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSelectAll = () => {
    if (selectedStaffIds.length === staffList.length) {
      setSelectedStaffIds([]);
    } else {
      setSelectedStaffIds(staffList.map(s => s._id));
    }
  };

  const handleToggleSelect = (id) => {
    if (selectedStaffIds.includes(id)) {
      setSelectedStaffIds(selectedStaffIds.filter(i => i !== id));
    } else {
      setSelectedStaffIds([...selectedStaffIds, id]);
    }
  };

  const handleApplyBulk = async () => {
    if (selectedStaffIds.length === 0) {
      alert('Please select at least one staff member');
      return;
    }
    if (!bulkSalaryAccount && !bulkStaffType) {
      alert('Please select a Salary Account or Staff Type to assign');
      return;
    }

    try {
      setSaving(true);
      const payload = {
        staffIds: selectedStaffIds
      };
      if (bulkSalaryAccount) payload.salaryAccount = bulkSalaryAccount;
      if (bulkStaffType) payload.staffType = bulkStaffType;

      const res = await fetch(`${API_BASE}/api/staffs/bulk/assign-info`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert('Assigned successfully!');
        handleFetchStaff(); // refresh list
      } else {
        const err = await res.json();
        alert(err.message || 'Failed to update bulk assignment');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating bulk assignment');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="global-settings-container">
      {/* Top Selection Filters */}
      <div className="settings-row" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
        <div className="form-group">
          <label>Salary A/C Name</label>
          <select
            className="settings-input"
            value={selectedAccountName}
            onChange={(e) => setSelectedAccountName(e.target.value)}
          >
            <option value="All">All Salary A/C</option>
            {salaryAccounts.map(acc => (
              <option key={acc._id} value={acc.accountName}>
                {acc.accountName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Salary A/C No</label>
          <select
            className="settings-input"
            value={selectedAccountNo}
            onChange={(e) => setSelectedAccountNo(e.target.value)}
          >
            <option value="All">All Salary A/C</option>
            {salaryAccounts.map(acc => (
              <option key={acc._id} value={acc.accountNo}>
                {acc.accountNo} ({acc.accountName})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Staff Type</label>
          <select
            className="settings-input"
            value={selectedStaffType}
            onChange={(e) => setSelectedStaffType(e.target.value)}
          >
            <option value="All">All Staff Types</option>
            {staffTypes.map(st => (
              <option key={st._id} value={st.type}>
                {st.type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
        <button
          onClick={handleFetchStaff}
          disabled={loading}
          style={{
            backgroundColor: 'white',
            border: '1px solid #159BD7',
            color: '#159BD7',
            padding: '8px 25px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          {loading ? <RefreshCw size={16} className="animate-spin" /> : <Eye size={16} />} View
        </button>
      </div>

      {/* Bulk Assignment Bar */}
      {hasSearched && staffList.length > 0 && (
        <div style={{
          backgroundColor: '#e3f2fd',
          border: '1px solid #90caf9',
          borderRadius: '6px',
          padding: '15px 20px',
          marginBottom: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '15px'
        }}>
          <div style={{ fontWeight: 'bold', fontSize: '13px', color: '#1976d2' }}>
            Bulk Assign to Selected ({selectedStaffIds.length}/{staffList.length}):
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: '500' }}>New Salary A/C:</span>
            <select
              value={bulkSalaryAccount}
              onChange={(e) => setBulkSalaryAccount(e.target.value)}
              style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid #ced4da', fontSize: '12px' }}
            >
              <option value="">-- Keep Current --</option>
              {salaryAccounts.map(acc => (
                <option key={acc._id} value={acc.accountName}>{acc.accountName}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: '500' }}>New Staff Type:</span>
            <select
              value={bulkStaffType}
              onChange={(e) => setBulkStaffType(e.target.value)}
              style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid #ced4da', fontSize: '12px' }}
            >
              <option value="">-- Keep Current --</option>
              {staffTypes.map(st => (
                <option key={st._id} value={st.type}>{st.type}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleApplyBulk}
            disabled={saving || selectedStaffIds.length === 0}
            style={{
              backgroundColor: selectedStaffIds.length === 0 ? '#cccccc' : '#28a745',
              color: 'white',
              border: 'none',
              padding: '6px 18px',
              borderRadius: '4px',
              cursor: selectedStaffIds.length === 0 ? 'not-allowed' : 'pointer',
              fontSize: '12px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <Save size={14} /> {saving ? 'Saving...' : 'Apply & Save'}
          </button>
        </div>
      )}

      {/* Staff Table */}
      {hasSearched && (
        <div className="mail-table-wrapper" style={{ marginTop: '10px' }}>
          <table className="mail-table">
            <thead>
              <tr>
                <th style={{ width: '50px', textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    checked={staffList.length > 0 && selectedStaffIds.length === staffList.length}
                    onChange={handleToggleSelectAll}
                    style={{ cursor: 'pointer' }}
                  />
                </th>
                <th style={{ width: '70px', textAlign: 'center' }}>Sr. No.</th>
                <th>Staff Code</th>
                <th>Staff Name</th>
                <th>Designation</th>
                <th>Current Salary A/C</th>
                <th>Current Staff Type</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#6c757d' }}>
                    Loading staff members...
                  </td>
                </tr>
              ) : staffList.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#6c757d' }}>
                    No staff found matching the selected criteria
                  </td>
                </tr>
              ) : (
                staffList.map((staff, idx) => {
                  const isAyup = staff.firstName.toLowerCase().includes('ayup') || (staff.lastName && staff.lastName.toLowerCase().includes('ayup'));
                  const isSelected = selectedStaffIds.includes(staff._id);

                  return (
                    <tr
                      key={staff._id}
                      className={idx % 2 === 0 ? 'row-even' : 'row-odd'}
                      style={{ backgroundColor: isSelected ? 'rgba(21, 155, 215, 0.08)' : undefined }}
                    >
                      <td style={{ textAlign: 'center' }}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelect(staff._id)}
                          style={{ cursor: 'pointer' }}
                        />
                      </td>
                      <td style={{ textAlign: 'center' }}>{idx + 1}</td>
                      <td style={{ fontWeight: '500' }}>{staff.userName || staff.prefNo || '---'}</td>
                      <td style={{ fontWeight: isAyup ? 'bold' : 'normal', color: isAyup ? '#159BD7' : 'inherit' }}>
                        {staff.title ? `${staff.title} ` : ''}{staff.firstName} {staff.lastName}
                        {isAyup && <span style={{ marginLeft: '6px', fontSize: '10px', backgroundColor: '#e1f5fe', color: '#0288d1', padding: '1px 6px', borderRadius: '4px' }}>Verified</span>}
                      </td>
                      <td>{staff.designation || '---'}</td>
                      <td>
                        <span style={{ fontWeight: '500', color: staff.salaryAccount ? '#2e7d32' : '#9e9e9e' }}>
                          {staff.salaryAccount || 'Not Assigned'}
                        </span>
                      </td>
                      <td>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: '10px',
                          fontSize: '11px',
                          backgroundColor: staff.staffType ? '#e8eaf6' : '#f5f5f5',
                          color: staff.staffType ? '#3f51b5' : '#757575'
                        }}>
                          {staff.staffType || 'Not Assigned'}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
