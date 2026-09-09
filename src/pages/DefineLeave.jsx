import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaDownload,
  FaPlusCircle,
  FaSearch,
  FaTimes,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

function DefineLeave() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState("10");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [editId, setEditId] = useState(null);
  const [leaveName, setLeaveName] = useState("");
  const [leaveAbbr, setLeaveAbbr] = useState("");
  const [leaveType, setLeaveType] = useState("CL");
  const [maxLimit, setMaxLimit] = useState(0);
  const [lifetimeServiceMaxLimit, setLifetimeServiceMaxLimit] = useState(0);
  const [payDeductionPerLeave, setPayDeductionPerLeave] = useState(0);
  const [maxAcceptableInMonth, setMaxAcceptableInMonth] = useState(0);
  const [maxAcceptableInContinuation, setMaxAcceptableInContinuation] = useState(0);
  const [applyBeforeDays, setApplyBeforeDays] = useState(0);
  const [lateDaysForLwp, setLateDaysForLwp] = useState(0);
  const [applyBeforeEmploymentDays, setApplyBeforeEmploymentDays] = useState(0);
  const [carryForward, setCarryForward] = useState(false);
  const [prefixSuffixOnly, setPrefixSuffixOnly] = useState(false);
  const [enableUploadFile, setEnableUploadFile] = useState(false);
  const [allowPreviousMonthCL, setAllowPreviousMonthCL] = useState(false);
  const [autoAssigning, setAutoAssigning] = useState(false);
  const [showOnEcare, setShowOnEcare] = useState(true);

  const fetchLeaves = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/leave-types`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setLeaves(data);
      }
    } catch (error) {
      console.error("Error fetching leaves:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const resetForm = () => {
    setEditId(null);
    setLeaveName("");
    setLeaveAbbr("");
    setLeaveType("CL");
    setMaxLimit(0);
    setLifetimeServiceMaxLimit(0);
    setPayDeductionPerLeave(0);
    setMaxAcceptableInMonth(0);
    setMaxAcceptableInContinuation(0);
    setApplyBeforeDays(0);
    setLateDaysForLwp(0);
    setApplyBeforeEmploymentDays(0);
    setCarryForward(false);
    setPrefixSuffixOnly(false);
    setEnableUploadFile(false);
    setAllowPreviousMonthCL(false);
    setAutoAssigning(false);
    setShowOnEcare(true);
  };

  const openEdit = (leave) => {
    setIsEditMode(true);
    setEditId(leave._id);
    setLeaveName(leave.leaveName || "");
    setLeaveAbbr(leave.leaveAbbr || "");
    setLeaveType(leave.leaveType || "CL");
    setMaxLimit(leave.maxLimit || 0);
    setLifetimeServiceMaxLimit(leave.lifetimeServiceMaxLimit || 0);
    setPayDeductionPerLeave(leave.payDeductionPerLeave || 0);
    setMaxAcceptableInMonth(leave.maxAcceptableInMonth || 0);
    setMaxAcceptableInContinuation(leave.maxAcceptableInContinuation || 0);
    setApplyBeforeDays(leave.applyBeforeDays || 0);
    setLateDaysForLwp(leave.lateDaysForLwp || 0);
    setApplyBeforeEmploymentDays(leave.applyBeforeEmploymentDays || 0);
    setCarryForward(leave.carryForward || false);
    setPrefixSuffixOnly(leave.prefixSuffixOnly || false);
    setEnableUploadFile(leave.enableUploadFile || false);
    setAllowPreviousMonthCL(leave.allowPreviousMonthCL || false);
    setAutoAssigning(leave.autoAssigning || false);
    setShowOnEcare(leave.showOnEcare !== undefined ? leave.showOnEcare : true);
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const payload = {
      leaveName, leaveAbbr, leaveType, maxLimit, lifetimeServiceMaxLimit,
      payDeductionPerLeave, maxAcceptableInMonth, maxAcceptableInContinuation,
      applyBeforeDays, lateDaysForLwp, applyBeforeEmploymentDays,
      carryForward, prefixSuffixOnly, enableUploadFile, allowPreviousMonthCL,
      autoAssigning, showOnEcare
    };

    try {
      const url = isEditMode 
        ? `${import.meta.env.VITE_API_BASE_URL || ''}/api/leave-types/${editId}`
        : `${import.meta.env.VITE_API_BASE_URL || ''}/api/leave-types`;
      
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
        fetchLeaves();
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to save leave type");
      }
    } catch (error) {
      console.error("Error saving leave:", error);
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this leave type?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/leave-types/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        fetchLeaves();
      }
    } catch (error) {
      console.error("Error deleting leave:", error);
    }
  };

  const filteredLeaves = leaves.filter(l => l.leaveName?.toLowerCase().includes(search.toLowerCase()) || l.leaveAbbr?.toLowerCase().includes(search.toLowerCase()));

  return (
    <section className="holiday-page leave-page">
      <div className="holiday-tabs">
        <div className="holiday-tab previous-tab" onClick={() => navigate("/attendance/define-holiday")}>
          <span>Define Holiday</span>
          <button aria-label="Close Define Holiday" title="Close" onClick={(e) => { e.stopPropagation(); navigate("/attendance/define-holiday"); }}>
            <FaTimes />
          </button>
        </div>
        <div className="holiday-tab current-tab">
          <span>Define Leave</span>
          <button aria-label="Close Define Leave" title="Close" onClick={() => navigate("/attendance")}>
            <FaTimes />
          </button>
        </div>
      </div>

      <div className="holiday-toolbar">
        <label className="holiday-search">
          <FaSearch />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search"
            aria-label="Search leaves"
          />
        </label>
        <div className="holiday-actions">
          <button
            className="holiday-action"
            onClick={() => {
              setIsEditMode(false);
              resetForm();
              setIsModalOpen(true);
            }}
          >
            <FaPlusCircle /> Add New Leave
          </button>
          <button className="holiday-action">
            <FaDownload /> Export
          </button>
        </div>
      </div>

      <div className="holiday-table-wrap leave-table-wrap">
        <table className="holiday-table leave-table">
          <thead>
            <tr>
              {[
                "Sl No.", "Leave Name", "Leave Abbr.", "Leave Type", "Max Limit",
                "Service Limit", "Deduction", "Max Acceptable", "Continuation",
                "Late LWP", "Carry Forward", "Auto Assign", "Show On Ecare", "Action"
              ].map((heading) => (
                <th key={heading}>{heading} <span>◆</span></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="14">Loading...</td></tr>
            ) : filteredLeaves.length === 0 ? (
              <tr><td colSpan="14">No data available in table</td></tr>
            ) : (
              filteredLeaves.map((leave, index) => (
                <tr key={leave._id}>
                  <td>{index + 1}</td>
                  <td>{leave.leaveName}</td>
                  <td>{leave.leaveAbbr}</td>
                  <td>{leave.leaveType}</td>
                  <td>{leave.maxLimit}</td>
                  <td>{leave.lifetimeServiceMaxLimit}</td>
                  <td>{leave.payDeductionPerLeave}</td>
                  <td>{leave.maxAcceptableInMonth}</td>
                  <td>{leave.maxAcceptableInContinuation}</td>
                  <td>{leave.lateDaysForLwp}</td>
                  <td>{leave.carryForward ? "Yes" : "No"}</td>
                  <td>{leave.autoAssigning ? "True" : "False"}</td>
                  <td>{leave.showOnEcare ? "True" : "False"}</td>
                  <td className="leave-actions">
                    <FaEdit onClick={() => openEdit(leave)} title="Edit Leave" />
                    <FaTrash onClick={() => handleDelete(leave._id)} title="Delete Leave" />
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
          <select value={pageSize} onChange={(event) => setPageSize(event.target.value)}>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <strong>entries</strong>
          <span>Showing {filteredLeaves.length > 0 ? 1 : 0} to {filteredLeaves.length} of {filteredLeaves.length} entries</span>
        </label>
        <div>
          <button disabled>Previous</button>
          <button disabled>Next</button>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="attendance-modal-backdrop"
          role="presentation"
          onMouseDown={(event) =>
            event.target === event.currentTarget && setIsModalOpen(false)
          }
        >
          <div
            className="attendance-form-modal leave-form-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="leave-form-title"
          >
            <div className="attendance-form-header">
              <h2 id="leave-form-title">
                {isEditMode ? "Edit Leave" : "Add New Leave"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                aria-label="Close form"
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSave}>
              <select value={leaveType} onChange={e => setLeaveType(e.target.value)}>
                <option value="">Select Leave Type</option>
                <option value="CL">CL</option>
                <option value="SL">SL</option>
                <option value="EL">EL</option>
                <option value="ML">ML</option>
                <option value="LOP">LOP</option>
                <option value="Paid Leave">Paid Leave</option>
                <option value="Unpaid Leave">Unpaid Leave</option>
              </select>
              <div className="leave-form-grid">
                <label>Leave Name <input type="text" required value={leaveName} onChange={e => setLeaveName(e.target.value)} /></label>
                <label>Leave Abbr. <input type="text" required value={leaveAbbr} onChange={e => setLeaveAbbr(e.target.value)} /></label>
                <label>Max Limit <input type="number" required value={maxLimit} onChange={e => setMaxLimit(e.target.value)} /></label>
                <label>Lifetime Service Max Limit <input type="number" value={lifetimeServiceMaxLimit} onChange={e => setLifetimeServiceMaxLimit(e.target.value)} /></label>
                <label>Pay Deduction Per Leave (%) <input type="number" value={payDeductionPerLeave} onChange={e => setPayDeductionPerLeave(e.target.value)} /></label>
                <label>Max. Acceptable In Month <input type="number" value={maxAcceptableInMonth} onChange={e => setMaxAcceptableInMonth(e.target.value)} /></label>
                <label>Max. Acceptable in Continuation <input type="number" value={maxAcceptableInContinuation} onChange={e => setMaxAcceptableInContinuation(e.target.value)} /></label>
                <label>Able to apply for leave before <input type="number" value={applyBeforeDays} onChange={e => setApplyBeforeDays(e.target.value)} /></label>
                <label>No of Late Days for 1 LWP <input type="number" value={lateDaysForLwp} onChange={e => setLateDaysForLwp(e.target.value)} /></label>
                <label>No Employee able to apply before <input type="number" value={applyBeforeEmploymentDays} onChange={e => setApplyBeforeEmploymentDays(e.target.value)} /></label>
              </div>
              <div className="leave-options">
                <label><input type="checkbox" checked={carryForward} onChange={e => setCarryForward(e.target.checked)} /> Carry Forward</label>
                <label><input type="checkbox" checked={prefixSuffixOnly} onChange={e => setPrefixSuffixOnly(e.target.checked)} /> Either Prefix or Suffix of holidays IS ONLY allowed</label>
                <label><input type="checkbox" checked={enableUploadFile} onChange={e => setEnableUploadFile(e.target.checked)} /> Enable Upload File</label>
                <label><input type="checkbox" checked={allowPreviousMonthCL} onChange={e => setAllowPreviousMonthCL(e.target.checked)} /> Allow to Add Previous Month CL</label>
                <label><input type="checkbox" checked={autoAssigning} onChange={e => setAutoAssigning(e.target.checked)} /> Auto assigning</label>
                <label><input type="checkbox" checked={showOnEcare} onChange={e => setShowOnEcare(e.target.checked)} /> Show On E-care</label>
              </div>
              <button className="shift-save" type="submit">
                {isEditMode ? "Update" : "Save"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default DefineLeave;
