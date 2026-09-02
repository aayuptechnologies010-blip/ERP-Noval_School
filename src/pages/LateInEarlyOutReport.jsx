import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaTimes } from "react-icons/fa";

const staffTypes = [
  "All (13)",
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
const designations = [
  "All (38)",
  "Principal",
  "Coordinator",
  "Senior Teacher",
  "Primary Teacher",
  "Office Staff",
  "Accountant",
  "Support Staff",
];
const shifts = ["All (2)", "Office Staff Timing", "Teacher's Timing"];

function LateInEarlyOutReport() {
  const navigate = useNavigate();
  const [school, setSchool] = useState("All Schools");
  const [staffType, setStaffType] = useState(staffTypes[0]);
  const [designation, setDesignation] = useState(designations[0]);
  const [shift, setShift] = useState(shifts[0]);
  const [fromDate, setFromDate] = useState("26-Aug-2026");
  const [toDate, setToDate] = useState("26-Aug-2026");

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
      <div className="late-report-layout">
        <form
          className="late-report-filters"
          onSubmit={(event) => event.preventDefault()}
        >
          <label>
            School Name
            <select
              value={school}
              onChange={(event) => setSchool(event.target.value)}
            >
              <option>All Schools</option>
              <option>NAVALS NATIONAL ACADEMY</option>
            </select>
          </label>
          <label>
            Staff Type
            <select
              value={staffType}
              onChange={(event) => setStaffType(event.target.value)}
            >
              {staffTypes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            Designation
            <select
              value={designation}
              onChange={(event) => setDesignation(event.target.value)}
            >
              {designations.map((item) => (
                <option key={item}>{item}</option>
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
              value={fromDate}
              onChange={(event) => setFromDate(event.target.value)}
            />
          </label>
          <label>
            To Date
            <input
              value={toDate}
              onChange={(event) => setToDate(event.target.value)}
            />
          </label>
          <button className="late-report-show" type="submit">
            <FaSearch /> Show
          </button>
        </form>
        <div className="late-report-preview">
          <span className="late-preview-arrow">&#9664;</span>
        </div>
      </div>
    </section>
  );
}

export default LateInEarlyOutReport;
