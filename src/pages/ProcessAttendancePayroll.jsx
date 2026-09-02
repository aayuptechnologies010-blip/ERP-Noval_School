import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaTimes } from "react-icons/fa";

const employeeTypes = [
  "All Employee Types",
  "Management",
  "Support Staff",
  "PRIMARY TEACHERS",
  "PRE-PRIM. TEACHERS",
  "TEACHERS",
  "Front Office/Accounts",
  "OTHER",
  "ADHOC",
  "NON TEACHING",
  "Cont Emp",
  "ADMIN DEPT",
  "Temporary Staff",
  "Principal",
];

function ProcessAttendancePayroll() {
  const navigate = useNavigate();
  const [school, setSchool] = useState("All Schools");
  const [employeeType, setEmployeeType] = useState(employeeTypes[0]);
  const [month, setMonth] = useState("");

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
            <option>All Schools</option>
            <option>NAVALS NATIONAL ACADEMY</option>
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
            <option>August - 2026</option>
            <option>July - 2026</option>
          </select>
        </label>
        <div className="assign-leave-actions">
          <button type="button">
            <FaEye /> View
          </button>
          <button
            type="button"
            onClick={() => {
              setMonth("");
              setSchool("All Schools");
              setEmployeeType(employeeTypes[0]);
            }}
          >
            <FaTimes /> Cancel
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProcessAttendancePayroll;
