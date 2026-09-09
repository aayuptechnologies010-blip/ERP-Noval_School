import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaDownload,
  FaEdit,
  FaPlusCircle,
  FaSearch,
  FaTimes,
  FaTrash,
} from "react-icons/fa";

function DefineShiftMaster() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState("10");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [editId, setEditId] = useState(null);
  const [shiftName, setShiftName] = useState("");
  const [startTimeHour, setStartTimeHour] = useState("");
  const [startTimeMinute, setStartTimeMinute] = useState("");
  const [endTimeHour, setEndTimeHour] = useState("");
  const [endTimeMinute, setEndTimeMinute] = useState("");
  const [lateInAllowed, setLateInAllowed] = useState("00");
  const [weeklyOff, setWeeklyOff] = useState("None");

  const fetchShifts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/shift-masters`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setShifts(data);
      }
    } catch (error) {
      console.error("Error fetching shifts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShifts();
  }, []);

  const resetForm = () => {
    setEditId(null);
    setShiftName("");
    setStartTimeHour("");
    setStartTimeMinute("");
    setEndTimeHour("");
    setEndTimeMinute("");
    setLateInAllowed("00");
    setWeeklyOff("None");
  };

  const openEdit = (shift) => {
    setIsEditMode(true);
    setEditId(shift._id);
    setShiftName(shift.shiftName || "");
    setStartTimeHour(shift.startTimeHour || "");
    setStartTimeMinute(shift.startTimeMinute || "");
    setEndTimeHour(shift.endTimeHour || "");
    setEndTimeMinute(shift.endTimeMinute || "");
    setLateInAllowed(shift.lateInAllowed || "00");
    setWeeklyOff(shift.weeklyOff || "None");
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const payload = {
      shiftName, startTimeHour, startTimeMinute, endTimeHour, endTimeMinute, lateInAllowed, weeklyOff
    };

    try {
      const url = isEditMode 
        ? `${import.meta.env.VITE_API_BASE_URL || ''}/api/shift-masters/${editId}`
        : `${import.meta.env.VITE_API_BASE_URL || ''}/api/shift-masters`;
      
      const response = await fetch(url, {
        method: isEditMode ? "PUT" : "POST",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        setIsModalOpen(false);
        resetForm();
        fetchShifts();
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to save shift master");
      }
    } catch (error) {
      console.error("Error saving shift:", error);
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this shift?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/shift-masters/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        fetchShifts();
      }
    } catch (error) {
      console.error("Error deleting shift:", error);
    }
  };

  const downloadShiftExport = () => {
    const exportHeaders = ["ShiftName", "StartTime", "EndTime", "LateInAllowed", "WeeklyOff"];
    const rows = shifts.map(shift => [
      shift.shiftName,
      `${shift.startTimeHour}:${shift.startTimeMinute}`,
      `${shift.endTimeHour}:${shift.endTimeMinute}`,
      shift.lateInAllowed,
      shift.weeklyOff
    ]);
    const csv = [exportHeaders, ...rows]
      .map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(","))
      .join("\r\n");
    const url = URL.createObjectURL(new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "Shift_Master_Details.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredShifts = shifts.filter(s => s.shiftName?.toLowerCase().includes(search.toLowerCase()));

  return (
    <section className="holiday-page shift-page">
      <div className="holiday-tabs">
        <div className="holiday-tab previous-tab" onClick={() => navigate("/attendance/define-holiday")}>
          <span>Define Holiday</span>
          <button onClick={(e) => { e.stopPropagation(); navigate("/attendance/define-holiday"); }} aria-label="Open Define Holiday"><FaTimes /></button>
        </div>
        <div className="holiday-tab previous-tab" onClick={() => navigate("/attendance/define-leave")}>
          <span>Define Leave</span>
          <button onClick={(e) => { e.stopPropagation(); navigate("/attendance/define-leave"); }} aria-label="Open Define Leave"><FaTimes /></button>
        </div>
        <div className="holiday-tab current-tab">
          <span>Define Shift Master</span>
          <button onClick={() => navigate("/attendance")} aria-label="Close Define Shift Master"><FaTimes /></button>
        </div>
      </div>

      <div className="holiday-toolbar">
        <label className="holiday-search">
          <FaSearch />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" aria-label="Search shifts" />
        </label>
        <div className="holiday-actions">
          <button className="holiday-action" onClick={() => { setIsEditMode(false); resetForm(); setIsModalOpen(true); }}>
            <FaPlusCircle /> Add New Shift
          </button>
          <button className="holiday-action" onClick={downloadShiftExport}>
            <FaDownload /> Export
          </button>
        </div>
      </div>

      <div className="holiday-table-wrap shift-table-wrap">
        <table className="holiday-table shift-table">
          <thead>
            <tr>
              {["Sl No.", "Shift Name", "Start Time", "End Time", "Late In Allowed/Min", "W/O", "Action"].map(heading => (
                <th key={heading}>{heading} <span>◆</span></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7">Loading...</td></tr>
            ) : filteredShifts.length === 0 ? (
              <tr><td colSpan="7">No data available in table</td></tr>
            ) : (
              filteredShifts.map((shift, index) => (
                <tr key={shift._id}>
                  <td>{index + 1}</td>
                  <td>{shift.shiftName}</td>
                  <td>{shift.startTimeHour}:{shift.startTimeMinute}</td>
                  <td>{shift.endTimeHour}:{shift.endTimeMinute}</td>
                  <td>{shift.lateInAllowed}</td>
                  <td>{shift.weeklyOff}</td>
                  <td className="leave-actions">
                    <FaEdit onClick={() => openEdit(shift)} title="Edit Shift" />
                    <FaTrash onClick={() => handleDelete(shift._id)} title="Delete Shift" />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="holiday-pagination">
        <label>
          <strong>Show</strong>
          <select value={pageSize} onChange={(e) => setPageSize(e.target.value)}>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <strong>entries</strong>
        </label>
        <div>
          <button disabled>Previous</button>
          <button disabled>Next</button>
        </div>
      </div>

      {isModalOpen && (
        <div className="shift-modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && setIsModalOpen(false)}>
          <div className="shift-modal" role="dialog" aria-modal="true" aria-labelledby="shift-form-title">
            <div className="shift-modal-header">
              <h2 id="shift-form-title">{isEditMode ? "Edit Shift" : "Add New Shift"}</h2>
              <button onClick={() => setIsModalOpen(false)} aria-label="Close form"><FaTimes /></button>
            </div>
            <form onSubmit={handleSave}>
              <label>
                Shift Name :
                <input value={shiftName} onChange={(e) => setShiftName(e.target.value)} autoFocus required />
              </label>
              <fieldset>
                <legend>Shift Start Time :</legend>
                <div>
                  <select required value={startTimeHour} onChange={e => setStartTimeHour(e.target.value)}>
                    <option value="" disabled>Hour</option>
                    {Array.from({ length: 24 }, (_, hour) => (
                      <option key={hour} value={String(hour).padStart(2, "0")}>{String(hour).padStart(2, "0")} HH</option>
                    ))}
                  </select>
                  <select required value={startTimeMinute} onChange={e => setStartTimeMinute(e.target.value)}>
                    <option value="" disabled>Minute</option>
                    <option value="00">00 MM</option>
                    <option value="15">15 MM</option>
                    <option value="30">30 MM</option>
                    <option value="45">45 MM</option>
                  </select>
                </div>
              </fieldset>
              <fieldset>
                <legend>Shift End Time :</legend>
                <div>
                  <select required value={endTimeHour} onChange={e => setEndTimeHour(e.target.value)}>
                    <option value="" disabled>Hour</option>
                    {Array.from({ length: 24 }, (_, hour) => (
                      <option key={hour} value={String(hour).padStart(2, "0")}>{String(hour).padStart(2, "0")} HH</option>
                    ))}
                  </select>
                  <select required value={endTimeMinute} onChange={e => setEndTimeMinute(e.target.value)}>
                    <option value="" disabled>Minute</option>
                    <option value="00">00 MM</option>
                    <option value="15">15 MM</option>
                    <option value="30">30 MM</option>
                    <option value="45">45 MM</option>
                  </select>
                </div>
              </fieldset>
              <label>
                Late In Allowed [Minutes] :
                <select value={lateInAllowed} onChange={e => setLateInAllowed(e.target.value)}>
                  <option value="" disabled>Late In Minute</option>
                  <option value="00">00 Minute</option>
                  <option value="15">15 Minute</option>
                  <option value="30">30 Minute</option>
                </select>
              </label>
              <div className="shift-radio-group">
                {["None", "Half Day", "2nd WO Only", "Alternate WO", "All WO"].map((item) => (
                  <label key={item}>
                    <input type="radio" name="weekly-off" value={item} checked={weeklyOff === item} onChange={e => setWeeklyOff(e.target.value)} />
                    {item}
                  </label>
                ))}
              </div>
              <button className={`shift-save ${isEditMode ? "is-update" : ""}`} type="submit">
                {isEditMode ? "Update" : "Save"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default DefineShiftMaster;
