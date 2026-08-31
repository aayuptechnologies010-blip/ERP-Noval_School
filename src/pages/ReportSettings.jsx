import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSave, FaSearch, FaTimes } from "react-icons/fa";

const reportNames = [
  "Attendance Report Monthly Wise",
  "Late In Early Out Report",
  "Attendance Consolidated Report",
  "LWP Year Wise Report",
  "Monthly Performance Report",
  "Staff Wise Daily Attendance Report",
  "Absent / Missing Attendance Report",
  "Biometrics Attendance Detail Department Wise",
  "Monthly Consolidated Biometric Report",
  "Weekly Attendance Report",
  "Daily Performance Report",
  "Attendance Report",
];

function ReportSettings() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [formats, setFormats] = useState({});
  const filteredReports = reportNames.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section className="holiday-page report-settings-page">
      <div className="holiday-tabs">
        <div className="holiday-tab previous-tab">
          <span>Define Holiday</span>
          <button
            onClick={() => navigate("/attendance/define-holiday")}
            aria-label="Open Define Holiday"
          >
            <FaTimes />
          </button>
        </div>
        <div className="holiday-tab previous-tab">
          <span>Define Leave</span>
          <button
            onClick={() => navigate("/attendance/define-leave")}
            aria-label="Open Define Leave"
          >
            <FaTimes />
          </button>
        </div>
        <div className="holiday-tab previous-tab">
          <span>Define Shift Master</span>
          <button
            onClick={() => navigate("/attendance/define-shift-master")}
            aria-label="Open Define Shift Master"
          >
            <FaTimes />
          </button>
        </div>
        <div className="holiday-tab current-tab">
          <span>Report Settings</span>
          <button
            onClick={() => navigate("/attendance")}
            aria-label="Close Report Settings"
          >
            <FaTimes />
          </button>
        </div>
      </div>

      <div className="report-settings-content">
        <h2>REPORT SETTINGS</h2>
        <label className="report-search">
          <strong>Search:</strong>
          <span>
            <FaSearch />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search reports"
            />
          </span>
        </label>
        <table className="report-settings-table">
          <thead>
            <tr>
              <th>
                SN. <span>▲</span>
              </th>
              <th>
                Report Name <span>◆</span>
              </th>
              <th>
                Format <span>◆</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report, index) => (
              <tr key={report}>
                <td>{index + 1}</td>
                <td>{report}</td>
                <td>
                  <select
                    value={formats[report] || ""}
                    onChange={(event) =>
                      setFormats({ ...formats, [report]: event.target.value })
                    }
                    aria-label={`${report} format`}
                  >
                    <option value="">Select</option>
                    <option value="Format 1">Format 1</option>
                    <option value="Format 2">Format 2</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="report-settings-footer">
          <span>
            Showing 1 to {filteredReports.length} of {filteredReports.length}{" "}
            entries
          </span>
          <button type="button" aria-label="Save report settings">
            <FaSave /> Save
          </button>
        </div>
      </div>
    </section>
  );
}

export default ReportSettings;
