import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaTimes, FaFileExcel, FaPrint } from "react-icons/fa";

const shifts = ["All (2)", "Office Staff Timing", "Teacher's Timing"];

function LateInEarlyOutReport() {
  const navigate = useNavigate();
  const [schools, setSchools] = useState([]);
  const [school, setSchool] = useState("All Schools");
  const [staffType, setStaffType] = useState("All");
  const [designation, setDesignation] = useState("All");
  const [shift, setShift] = useState(shifts[0]);
  
  // Use today's date formatted as YYYY-MM-DD for input type="date"
  const todayStr = new Date().toISOString().split("T")[0];
  const [fromDate, setFromDate] = useState(todayStr);
  const [toDate, setToDate] = useState(todayStr);

  const [staffList, setStaffList] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { "Authorization": `Bearer ${token}` };

        // Fetch schools
        const schoolRes = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/change-academic-year/options`, { headers });
        if (schoolRes.ok) {
          const sData = await schoolRes.json();
          setSchools(sData.schools || []);
        }

        // Fetch staff
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/staffs`, { headers });
        if (res.ok) {
          const data = await res.json();
          setStaffList(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Error fetching options:", err);
      }
    };
    fetchOptions();
  }, []);

  const dynamicStaffTypes = useMemo(() => {
    const types = new Set();
    staffList.forEach(s => {
      if (s.role && s.role.roleName) types.add(s.role.roleName);
    });
    return ["All", ...Array.from(types)];
  }, [staffList]);

  const dynamicDesignations = useMemo(() => {
    const desigs = new Set();
    staffList.forEach(s => {
      if (s.designation) desigs.add(s.designation);
    });
    return ["All", ...Array.from(desigs)];
  }, [staffList]);

  const handleShow = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const query = new URLSearchParams({
        fromDate,
        toDate,
        staffType,
        designation,
        shift
      }).toString();

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/reports/late-early-out?${query}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setReportData(data.records || []);
      } else {
        alert("Failed to fetch report");
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching report");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="late-report-page">
      <div
        className="holiday-tab current-tab"
        onClick={() => navigate("/attendance/late-in-early-out")}
      >
        <span>Late In Early Out Report</span>
        <button
          onClick={() => navigate("/attendance")}
          aria-label="Close Late In Early Out Report"
        >
          <FaTimes />
        </button>
      </div>
      <div className="late-report-layout" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <form
          className="late-report-filters"
          onSubmit={handleShow}
          style={{ marginBottom: '20px' }}
        >
          <label>
            School Name
            <select
              value={school}
              onChange={(event) => setSchool(event.target.value)}
            >
              <option value="All Schools">All Schools</option>
              {schools.map(s => (
                <option key={s._id} value={s.schoolName}>{s.schoolName}</option>
              ))}
            </select>
          </label>
          <label>
            Staff Type
            <select
              value={staffType}
              onChange={(event) => setStaffType(event.target.value)}
            >
              {dynamicStaffTypes.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            Designation
            <select
              value={designation}
              onChange={(event) => setDesignation(event.target.value)}
            >
              {dynamicDesignations.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            Shift Name
            <select
              value={shift}
              onChange={(event) => setShift(event.target.value)}
            >
              {shifts.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            From Date
            <input
              type="date"
              value={fromDate}
              onChange={(event) => setFromDate(event.target.value)}
            />
          </label>
          <label>
            To Date
            <input
              type="date"
              value={toDate}
              onChange={(event) => setToDate(event.target.value)}
            />
          </label>
          <button className="late-report-show" type="submit" disabled={loading}>
            <FaSearch /> {loading ? "Loading..." : "Show"}
          </button>
        </form>
        
        <div className="late-report-preview" style={{ flex: 1, backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', overflowY: 'auto' }}>
          {reportData.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ backgroundColor: '#f1f5f9', position: 'sticky', top: 0 }}>
                <tr>
                  <th style={{ padding: '12px 16px', borderBottom: '1px solid #cbd5e1' }}>Date</th>
                  <th style={{ padding: '12px 16px', borderBottom: '1px solid #cbd5e1' }}>Emp Code</th>
                  <th style={{ padding: '12px 16px', borderBottom: '1px solid #cbd5e1' }}>Name</th>
                  <th style={{ padding: '12px 16px', borderBottom: '1px solid #cbd5e1' }}>Designation</th>
                  <th style={{ padding: '12px 16px', borderBottom: '1px solid #cbd5e1' }}>Shift</th>
                  <th style={{ padding: '12px 16px', borderBottom: '1px solid #cbd5e1' }}>Punch In</th>
                  <th style={{ padding: '12px 16px', borderBottom: '1px solid #cbd5e1' }}>Punch Out</th>
                  <th style={{ padding: '12px 16px', borderBottom: '1px solid #cbd5e1', color: '#ef4444' }}>Late In</th>
                  <th style={{ padding: '12px 16px', borderBottom: '1px solid #cbd5e1', color: '#f59e0b' }}>Early Out</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 16px' }}>{row.date}</td>
                    <td style={{ padding: '12px 16px' }}>{row.empCode}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 'bold' }}>{row.staffName}</td>
                    <td style={{ padding: '12px 16px' }}>{row.designation}</td>
                    <td style={{ padding: '12px 16px' }}>{row.shift}</td>
                    <td style={{ padding: '12px 16px', color: '#10b981' }}>{row.punchIn}</td>
                    <td style={{ padding: '12px 16px', color: '#10b981' }}>{row.punchOut}</td>
                    <td style={{ padding: '12px 16px', color: '#ef4444', fontWeight: 'bold' }}>{row.lateIn}</td>
                    <td style={{ padding: '12px 16px', color: '#f59e0b', fontWeight: 'bold' }}>{row.earlyOut}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
              <p>No late-in or early-out records found for the selected criteria.</p>
              <span style={{ fontSize: '30px', opacity: 0.2 }}>&#9664;</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default LateInEarlyOutReport;
