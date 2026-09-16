import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSave, FaSearch, FaTimes, FaPlusCircle } from "react-icons/fa";

function ReportSettings() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formats, setFormats] = useState({});

  // Fetch reports from API
  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/report-layout-settings`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setReports(data);
        
        // Initialize formats state from backend data
        const initialFormats = {};
        data.forEach(r => {
          if(r.format) initialFormats[r._id] = r.format;
        });
        setFormats(initialFormats);
      }
    } catch (error) {
      console.error("Error fetching report settings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const updatePromises = reports.map(report => {
        const selectedFormat = formats[report._id];
        if (selectedFormat && selectedFormat !== report.format) {
          return fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/report-layout-settings/${report._id}`, {
            method: "PUT",
            headers: { 
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ format: selectedFormat })
          });
        }
        return Promise.resolve();
      });

      await Promise.all(updatePromises);
      alert("Report Settings saved successfully!");
      fetchReports();
    } catch (error) {
      console.error("Error saving report settings:", error);
      alert("Error saving settings");
    }
  };

  const filteredReports = reports.filter(r => r.reportName?.toLowerCase().includes(search.toLowerCase()));

  return (
    <section className="holiday-page report-settings-page">
      <div className="holiday-tabs">
        <div className="holiday-tab previous-tab" onClick={() => navigate("/attendance/define-holiday")}>
          <span>Define Holiday</span>
          <button onClick={(e) => { e.stopPropagation(); navigate("/attendance/define-holiday"); }} aria-label="Open Define Holiday"><FaTimes /></button>
        </div>
        <div className="holiday-tab previous-tab" onClick={() => navigate("/attendance/define-leave")}>
          <span>Define Leave</span>
          <button onClick={(e) => { e.stopPropagation(); navigate("/attendance/define-leave"); }} aria-label="Open Define Leave"><FaTimes /></button>
        </div>
        <div className="holiday-tab previous-tab" onClick={() => navigate("/attendance/define-shift-master")}>
          <span>Define Shift Master</span>
          <button onClick={(e) => { e.stopPropagation(); navigate("/attendance/define-shift-master"); }} aria-label="Open Define Shift Master"><FaTimes /></button>
        </div>
        <div className="holiday-tab current-tab">
          <span>Report Settings</span>
          <button onClick={() => navigate("/attendance")} aria-label="Close Report Settings"><FaTimes /></button>
        </div>
      </div>

      <div className="report-settings-content">
        <h2>REPORT SETTINGS</h2>
        <label className="report-search">
          <strong>Search:</strong>
          <span>
            <FaSearch />
            <input value={search} onChange={(e) => setSearch(e.target.value)} aria-label="Search reports" />
          </span>
        </label>
        <table className="report-settings-table">
          <thead>
            <tr>
              <th>SN. <span>▲</span></th>
              <th>Report Name <span>◆</span></th>
              <th>Format <span>◆</span></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="3">Loading...</td></tr>
            ) : filteredReports.length === 0 ? (
              <tr><td colSpan="3">No data available</td></tr>
            ) : (
              filteredReports.map((report, index) => (
                <tr key={report._id}>
                  <td>{index + 1}</td>
                  <td>{report.reportName}</td>
                  <td>
                    <select
                      value={formats[report._id] || ""}
                      onChange={(e) => setFormats({ ...formats, [report._id]: e.target.value })}
                      aria-label={`${report.reportName} format`}
                    >
                      <option value="">Select</option>
                      <option value="Format 1">Format 1</option>
                      <option value="Format 2">Format 2</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="report-settings-footer">
          <span>Showing {filteredReports.length > 0 ? 1 : 0} to {filteredReports.length} of {filteredReports.length} entries</span>
          <button type="button" onClick={handleSave} aria-label="Save report settings">
            <FaSave /> Save
          </button>
        </div>
      </div>
    </section>
  );
}

export default ReportSettings;
