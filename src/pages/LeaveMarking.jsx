import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaSave, FaTimes, FaEye, FaTrash } from "react-icons/fa";

function LeaveMarking() {
  const navigate = useNavigate();
  const [employeeCode, setEmployeeCode] = useState("");
  
  const [employees, setEmployees] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  
  // State for the form row
  const [selectedStaffId, setSelectedStaffId] = useState("");
  const [leaveName, setLeaveName] = useState("");
  const [leaveDates, setLeaveDates] = useState("");
  const [remark, setRemark] = useState("");
  
  const [days, setDays] = useState(0);
  const [sanc, setSanc] = useState(0);
  const [lwp, setLwp] = useState(0);

  // Leave history
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { "Authorization": `Bearer ${token}` };

        // Fetch staff
        const staffRes = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/staffs`, { headers });
        if (staffRes.ok) {
          const data = await staffRes.json();
          setEmployees(data || []);
        }

        // Fetch leave types
        const leaveRes = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/leave-types`, { headers });
        if (leaveRes.ok) {
          const data = await leaveRes.json();
          setLeaveTypes(data || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const filteredEmployees = useMemo(() => {
    if (!employeeCode) return employees;
    const lower = employeeCode.toLowerCase();
    return employees.filter(e => 
      (e.userName && e.userName.toLowerCase().includes(lower)) || 
      (e.firstName && e.firstName.toLowerCase().includes(lower)) || 
      (e.lastName && e.lastName.toLowerCase().includes(lower))
    );
  }, [employees, employeeCode]);

  const handleDatesChange = (e) => {
    const val = e.target.value;
    setLeaveDates(val);
    
    // Auto-calculate days
    let calculatedDays = 0;
    if (val) {
      if (val.includes("-")) {
        const parts = val.split("-");
        if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
          calculatedDays = Math.max(0, parseInt(parts[1]) - parseInt(parts[0]) + 1);
        }
      } else {
        const parts = val.split(",");
        calculatedDays = parts.filter(p => p.trim() !== "").length;
      }
    }
    setDays(calculatedDays);
    setSanc(calculatedDays); // Default sanc to days
  };

  const selectedLeave = useMemo(() => {
    return leaveTypes.find(lt => lt.leaveName === leaveName);
  }, [leaveName, leaveTypes]);

  const handleApply = async () => {
    if (!selectedStaffId) {
      alert("Please select a staff member from the search results.");
      return;
    }
    if (!leaveName || !leaveDates || !remark) {
      alert("Please fill all fields (Leave, Leave Dates, Remark).");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth(); // 0-11
      
      let fromDate, toDate;
      // Basic parsing of "1-5" or "5"
      if (leaveDates.includes("-")) {
        const [start, end] = leaveDates.split("-");
        fromDate = new Date(currentYear, currentMonth, parseInt(start.trim()));
        toDate = new Date(currentYear, currentMonth, parseInt(end.trim()));
      } else {
        // Single date or comma separated (just taking first and last for simplicity in this demo)
        const parts = leaveDates.split(",");
        fromDate = new Date(currentYear, currentMonth, parseInt(parts[0].trim()));
        toDate = new Date(currentYear, currentMonth, parseInt(parts[parts.length-1].trim()));
      }

      const payload = {
        staffId: selectedStaffId,
        leaveType: leaveName,
        fromDate: fromDate.toISOString(),
        toDate: toDate.toISOString(),
        reason: remark
      };

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/staff-leaves`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert("Leave applied successfully!");
        setLeaveName("");
        setLeaveDates("");
        setRemark("");
        setDays(0);
        setSanc(0);
        setLwp(0);
        setSelectedStaffId("");
        setEmployeeCode("");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to apply leave.");
      }
    } catch (error) {
      console.error("Error applying leave:", error);
      alert("An error occurred while applying leave.");
    }
  };

  const handleView = async () => {
    if (!selectedStaffId) {
      alert("Please select a staff member first to view their leave history.");
      return;
    }
    setLoadingHistory(true);
    setShowHistory(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/staff-leaves/my-leaves?staffId=${selectedStaffId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setLeaveHistory(data.records || []);
      } else {
        alert("Failed to fetch leave history.");
      }
    } catch (error) {
      console.error("Error fetching history:", error);
      alert("An error occurred while fetching history.");
    } finally {
      setLoadingHistory(false);
    }
  };

  return (
    <section className="holiday-page leave-marking-page">
      <div className="holiday-tabs">
        <div className="holiday-tab previous-tab">
          <span>Assign Leave To Staff</span>
          <button
            onClick={() => navigate("/attendance/assign-leave-to-staff")}
            aria-label="Open Assign Leave To Staff"
          >
            <FaTimes />
          </button>
        </div>
        <div className="holiday-tab previous-tab">
          <span>Process Attendance for Payroll</span>
          <button
            onClick={() => navigate("/attendance/process-attendance-payroll")}
            aria-label="Open Process Attendance for Payroll"
          >
            <FaTimes />
          </button>
        </div>
        <div className="holiday-tab previous-tab">
          <span>Mark Manual Attendance</span>
          <button
            onClick={() => navigate("/attendance/mark-manual-attendance")}
            aria-label="Open Mark Manual Attendance"
          >
            <FaTimes />
          </button>
        </div>
        <div className="holiday-tab current-tab">
          <span>Leave Marking</span>
          <button
            onClick={() => navigate("/attendance")}
            aria-label="Close Leave Marking"
          >
            <FaTimes />
          </button>
        </div>
      </div>
      <div className="leave-marking-content">
        <input
          className="leave-employee-search"
          value={employeeCode}
          onChange={(event) => setEmployeeCode(event.target.value)}
          placeholder="Search by Name or Emp. Code"
          aria-label="Search by name or employee code"
        />
        
        {employeeCode && filteredEmployees.length > 0 && (
          <div style={{marginBottom: '15px', padding: '10px', backgroundColor: '#f9f9f9', border: '1px solid #ddd'}}>
            <p style={{margin: '0 0 10px 0', fontWeight: 'bold'}}>Search Results (Select one):</p>
            {filteredEmployees.slice(0, 5).map(emp => (
              <label key={emp._id} style={{display: 'block', margin: '5px 0', cursor: 'pointer'}}>
                <input 
                  type="radio" 
                  name="selectedStaff" 
                  value={emp._id} 
                  checked={selectedStaffId === emp._id}
                  onChange={() => setSelectedStaffId(emp._id)}
                  style={{marginRight: '8px'}}
                />
                {emp.userName} - {emp.firstName} {emp.lastName} ({emp.designation || 'Staff'})
              </label>
            ))}
            {filteredEmployees.length > 5 && <p style={{fontSize: '12px', color: '#666'}}>And {filteredEmployees.length - 5} more... please refine search.</p>}
          </div>
        )}

        <p className="leave-session-message">
          Salary of this session generated
        </p>
        <div className="leave-marking-table-wrap">
          <table className="leave-marking-table">
            <thead>
              <tr>
                {["NAME", "LEAVE", "BALANCE", "LEAVE DATE(S)", "REMARK", "DAY(S)", "SANC(S)", "LWP(S)", "ACTION"].map((heading) => (
                  <th key={heading}>{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {selectedStaffId 
                    ? (() => {
                        const s = employees.find(e => e._id === selectedStaffId);
                        return s ? `${s.firstName} ${s.lastName}` : '';
                      })() 
                    : "Select staff above"}
                </td>
                <td>
                  <select
                    value={leaveName}
                    onChange={(event) => setLeaveName(event.target.value)}
                  >
                    <option value="">Select</option>
                    {leaveTypes.map(lt => (
                      <option key={lt._id} value={lt.leaveName}>{lt.leaveName}</option>
                    ))}
                  </select>
                </td>
                <td>{selectedLeave ? selectedLeave.maxLimit : 0}</td>
                <td>
                  <input
                    value={leaveDates}
                    onChange={handleDatesChange}
                    placeholder="Enter either 1-5 or 1,2,3,4,5"
                  />
                </td>
                <td>
                  <input
                    value={remark}
                    onChange={(event) => setRemark(event.target.value)}
                    placeholder="Remark"
                  />
                </td>
                <td>
                  <input value={days} onChange={(e) => setDays(e.target.value)} type="number" min="0" />
                </td>
                <td>
                  <input value={sanc} onChange={(e) => setSanc(e.target.value)} type="number" min="0" />
                </td>
                <td>
                  <input value={lwp} onChange={(e) => setLwp(e.target.value)} type="number" min="0" />
                </td>
                <td>
                  <FaTrash style={{cursor: 'pointer', marginRight: '10px'}} onClick={() => {
                    setLeaveName("");
                    setLeaveDates("");
                    setRemark("");
                    setDays(0);
                    setSanc(0);
                    setLwp(0);
                  }}/>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="leave-marking-actions">
          <button onClick={handleApply}>
            <FaSave /> Apply
          </button>
          <button onClick={handleView}>
            <FaEye /> {loadingHistory ? "Loading..." : "View"}
          </button>
          <button
            onClick={() => {
              setEmployeeCode("");
              setLeaveName("");
              setLeaveDates("");
              setRemark("");
              setDays(0);
              setSanc(0);
              setLwp(0);
              setSelectedStaffId("");
              setShowHistory(false);
            }}
          >
            <FaTimes /> Cancel
          </button>
        </div>

        {showHistory && (
          <div style={{marginTop: '20px', padding: '15px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px'}}>
              <h3 style={{margin: 0}}>Leave History</h3>
              <button onClick={() => setShowHistory(false)} style={{background: 'none', border: 'none', cursor: 'pointer', color: 'red'}}>
                <FaTimes size={18} />
              </button>
            </div>
            {leaveHistory.length === 0 ? (
              <p>No leave history found for this staff member.</p>
            ) : (
              <table className="leave-marking-table">
                <thead>
                  <tr>
                    <th>Applied On</th>
                    <th>Leave Type</th>
                    <th>From Date</th>
                    <th>To Date</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveHistory.map(record => (
                    <tr key={record.id}>
                      <td>{record.appliedOn}</td>
                      <td>{record.leaveType}</td>
                      <td>{record.fromDate}</td>
                      <td>{record.toDate}</td>
                      <td>{record.reason}</td>
                      <td style={{
                        color: record.status === 'Approved' ? 'green' : 
                               record.status === 'Rejected' ? 'red' : 
                               record.status === 'Cancelled' ? 'gray' : 'orange',
                        fontWeight: 'bold'
                      }}>
                        {record.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default LeaveMarking;
