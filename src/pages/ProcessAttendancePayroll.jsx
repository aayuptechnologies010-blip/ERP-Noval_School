import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaTimes } from "react-icons/fa";

// Employee types will be dynamically fetched now

function ProcessAttendancePayroll() {
  const navigate = useNavigate();
  const [schools, setSchools] = useState([]);
  const [school, setSchool] = useState("All Schools");
  const [employeeTypes, setEmployeeTypes] = useState(["All Employee Types"]);
  const [employeeType, setEmployeeType] = useState("All Employee Types");
  const [month, setMonth] = useState("");
  const [availableMonths, setAvailableMonths] = useState([]);
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Generate last 12 months for dropdown
    const months = [];
    const today = new Date();
    for (let i = 0; i < 12; i++) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthName = d.toLocaleString("default", { month: "long" });
      months.push(`${monthName} - ${d.getFullYear()}`);
    }
    setAvailableMonths(months);

    // Fetch schools
    const fetchOptions = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { "Authorization": `Bearer ${token}` };

        // Fetch schools
        const schoolRes = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/change-academic-year/options`, { headers });
        if (schoolRes.ok) {
          const data = await schoolRes.json();
          setSchools(data.schools || []);
        }

        // Fetch all staff to get unique employee types
        const staffRes = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/staffs`, { headers });
        if (staffRes.ok) {
          const data = await staffRes.json();
          const uniqueRoles = new Set(data.map(s => s.role?.roleName).filter(Boolean));
          setEmployeeTypes(["All Employee Types", ...Array.from(uniqueRoles)]);
        }
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };
    fetchOptions();
  }, []);

  const handleView = async () => {
    if (!month) {
      alert("Please select Month - Year");
      return;
    }
    setLoading(true);
    setSummaryData(null);
    try {
      const [monthStr, yearStr] = month.split(" - ");
      const dateForMonth = new Date(`${monthStr} 1, ${yearStr}`);
      const m = dateForMonth.getMonth() + 1;
      const y = dateForMonth.getFullYear();

      const token = localStorage.getItem("token");
      let url = `${import.meta.env.VITE_API_BASE_URL || ''}/api/staff-attendance/monthly-summary?month=${m}&year=${y}`;
      if (employeeType !== "All Employee Types") {
        url += `&employeeType=${encodeURIComponent(employeeType)}`;
      }

      const response = await fetch(url, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setSummaryData(data.summary || []);
      } else {
        console.error("Failed to fetch summary");
        alert("Failed to fetch summary data");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="holiday-page payroll-page">
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
        <div className="holiday-tab current-tab">
          <span>Process Attendance for Payroll</span>
          <button
            onClick={() => navigate("/attendance")}
            aria-label="Close Process Attendance for Payroll"
          >
            <FaTimes />
          </button>
        </div>
      </div>
      <div className="payroll-form">
        <label>
          School Name:
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
          Employee Type:
          <select
            value={employeeType}
            onChange={(event) => setEmployeeType(event.target.value)}
          >
            {employeeTypes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label>
          Month - Year:
          <select
            value={month}
            onChange={(event) => setMonth(event.target.value)}
          >
            <option value="">Select</option>
            {availableMonths.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </label>
        <div className="assign-leave-actions">
          <button type="button" onClick={handleView} disabled={loading}>
            <FaEye /> {loading ? 'Loading...' : 'View'}
          </button>
          <button
            type="button"
            onClick={() => {
              setMonth("");
              setSchool("All Schools");
              setEmployeeType(employeeTypes[0]);
              setSummaryData(null);
            }}
          >
            <FaTimes /> Cancel
          </button>
        </div>
      </div>

      {summaryData && (
        <div className="leave-marking-table-wrap" style={{marginTop: '20px', backgroundColor: '#fff', padding: '15px', borderRadius: '4px', borderTop: '2px solid #20a9d8'}}>
          <h3 style={{marginBottom: '15px', color: '#333'}}>Attendance Summary for {month}</h3>
          {summaryData.length === 0 ? (
            <p>No attendance records found for the selected criteria.</p>
          ) : (
            <table className="leave-marking-table">
              <thead>
                <tr>
                  <th>Emp. ID</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Present</th>
                  <th>Absent</th>
                  <th>Leave</th>
                  <th>Half Day</th>
                  <th>Late</th>
                  <th>Total Logs</th>
                </tr>
              </thead>
              <tbody>
                {summaryData.map((row) => (
                  <tr key={row.staffId}>
                    <td>{row.userName}</td>
                    <td>{row.name}</td>
                    <td>{row.designation}</td>
                    <td>{row.Present}</td>
                    <td>{row.Absent}</td>
                    <td>{row.Leave}</td>
                    <td>{row.HalfDay}</td>
                    <td>{row.Late}</td>
                    <td>{row.Total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </section>
  );
}

export default ProcessAttendancePayroll;
