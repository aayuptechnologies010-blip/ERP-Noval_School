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
const departments = [
  "All Departments",
  "ADMINISTRATION DEPT.",
  "OFFICE STAFF",
  "NON-TEACHING STAFF",
  "PRE-PRIMARY TEACHERS",
  "PRIMARY TEACHERS",
  "SENIOR TEACHERS",
  "MIDDLE SECTION TEACHER",
];

function AssignLeaveToStaff() {
  const navigate = useNavigate();
  const [school, setSchool] = useState("All Schools");
  const [employeeType, setEmployeeType] = useState(employeeTypes[0]);
  const [department, setDepartment] = useState(departments[0]);
  const [leave, setLeave] = useState("");
  const [shown, setShown] = useState(false);

  return (
    <section className="holiday-page assign-leave-page">
      <div className="holiday-tab current-tab">
        <span>Assign Leave To Staff</span>
        <button
          onClick={() => navigate("/attendance")}
          aria-label="Close Assign Leave To Staff"
        >
          <FaTimes />
        </button>
      </div>
      <div className="assign-leave-form">
        <label>
          School Name :
          <select
            value={school}
            onChange={(event) => setSchool(event.target.value)}
          >
            <option>All Schools</option>
            <option>NAVALS NATIONAL ACADEMY</option>
          </select>
        </label>
        <label>
          Employee Type :
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
          Department :
          <select
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
          >
            {departments.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label>
          Please select Leave :
          <select
            value={leave}
            onChange={(event) => setLeave(event.target.value)}
          >
            <option value="">Select Leave</option>
            <option value="Casual Leave">Casual Leave</option>
          </select>
        </label>
        <div className="assign-leave-actions">
          <button type="button" onClick={() => setShown(true)}>
            <FaEye /> Show
          </button>
          <button
            type="button"
            onClick={() => {
              setShown(false);
              setLeave("");
            }}
          >
            <FaTimes /> Cancel
          </button>
        </div>
        {shown && (
          <p className="assign-leave-result">
            Leave selection ready for staff assignment.
          </p>
        )}
      </div>
    </section>
  );
}

export default AssignLeaveToStaff;
