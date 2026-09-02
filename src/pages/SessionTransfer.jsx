import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFileAlt,
  FaGraduationCap,
  FaUniversity,
  FaUserTie,
  FaTimes,
} from "react-icons/fa";

const managers = [
  { label: "Account Manager", icon: FaFileAlt },
  { label: "Fee Manager", icon: FaUniversity },
  { label: "Payroll Manager", icon: FaUserTie },
  { label: "Admission Manager", icon: FaGraduationCap },
];

function SessionTransfer() {
  const navigate = useNavigate();

  return (
    <section className="holiday-page session-transfer-page">
      <div className="holiday-tabs">
        <div
          className="holiday-tab previous-tab"
          onClick={() => navigate("/attendance/define-leave")}
        >
          <span>Define Leave</span>
          <button
            onClick={(event) => {
              event.stopPropagation();
              navigate("/attendance/define-leave");
            }}
            aria-label="Open Define Leave"
          >
            <FaTimes />
          </button>
        </div>
        <div
          className="holiday-tab previous-tab"
          onClick={() => navigate("/attendance/define-shift-master")}
        >
          <span>Define Shift Master</span>
          <button
            onClick={(event) => {
              event.stopPropagation();
              navigate("/attendance/define-shift-master");
            }}
            aria-label="Open Define Shift Master"
          >
            <FaTimes />
          </button>
        </div>
        <div
          className="holiday-tab previous-tab"
          onClick={() => navigate("/attendance/report-settings")}
        >
          <span>Report Settings</span>
          <button
            onClick={(event) => {
              event.stopPropagation();
              navigate("/attendance/report-settings");
            }}
            aria-label="Open Report Settings"
          >
            <FaTimes />
          </button>
        </div>
        <div
          className="holiday-tab current-tab"
          onClick={() => navigate("/attendance/session-transfer")}
        >
          <span>Session Transfer</span>
          <button
            onClick={(event) => {
              event.stopPropagation();
              navigate("/attendance");
            }}
            aria-label="Close Session Transfer"
          >
            <FaTimes />
          </button>
        </div>
      </div>
      <div className="session-transfer-cards">
        {managers.map(({ label, icon: Icon }) => (
          <button className="session-manager-card" key={label}>
            <Icon />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default SessionTransfer;
