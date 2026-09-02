import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaSave, FaTimes, FaEye, FaTrash } from "react-icons/fa";

function LeaveMarking() {
  const navigate = useNavigate();
  const [employeeCode, setEmployeeCode] = useState("");
  const [leaveName, setLeaveName] = useState("");
  const [leaveDates, setLeaveDates] = useState("");
  const [remark, setRemark] = useState("");

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
        <p className="leave-session-message">
          Salary of this session generated
        </p>
        <div className="leave-marking-table-wrap">
          <table className="leave-marking-table">
            <thead>
              <tr>
                {[
                  "NAME",
                  "LEAVE",
                  "BALANCE",
                  "LEAVE DATE(S)",
                  "REMARK",
                  "DAY(S)",
                  "SANC(S)",
                  "LWP(S)",
                  "ACTION",
                ].map((heading) => (
                  <th key={heading}>{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>
                  <select
                    value={leaveName}
                    onChange={(event) => setLeaveName(event.target.value)}
                  >
                    <option value="">Select</option>
                    <option>Casual Leave</option>
                  </select>
                </td>
                <td>0</td>
                <td>
                  <input
                    value={leaveDates}
                    onChange={(event) => setLeaveDates(event.target.value)}
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
                  <input defaultValue="0" />
                </td>
                <td>
                  <input defaultValue="0" />
                </td>
                <td>
                  <input defaultValue="0" />
                </td>
                <td>
                  <FaTrash />
                  <FaPlus />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="leave-marking-actions">
          <button>
            <FaSave /> Apply
          </button>
          <button>
            <FaEye /> View
          </button>
          <button
            onClick={() => {
              setEmployeeCode("");
              setLeaveName("");
              setLeaveDates("");
              setRemark("");
            }}
          >
            <FaTimes /> Cancel
          </button>
        </div>
      </div>
    </section>
  );
}

export default LeaveMarking;
