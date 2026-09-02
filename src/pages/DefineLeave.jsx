import React, { useState } from "react";
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

  return (
    <section className="holiday-page leave-page">
      <div className="holiday-tabs">
        <div className="holiday-tab previous-tab">
          <span>Define Holiday</span>
          <button
            aria-label="Close Define Holiday"
            title="Close"
            onClick={() => navigate("/attendance/define-holiday")}
          >
            <FaTimes />
          </button>
        </div>
        <div className="holiday-tab current-tab">
          <span>Define Leave</span>
          <button
            aria-label="Close Define Leave"
            title="Close"
            onClick={() => navigate("/attendance")}
          >
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
                "Sl No.",
                "Leave Name",
                "Leave Abbr.",
                "Leave Type",
                "Max Limit",
                "Service Limit",
                "Deduction",
                "Max Leave",
                "Max Continuation",
                "Max Acceptable",
                "LWP on late day",
                "Carry Forward",
                "Auto Assign",
                "Show On Ecare",
                "Leave Calculation Date",
                "Action",
              ].map((heading) => (
                <th key={heading}>
                  {heading} <span>◆</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                Casual
                <br />
                Leave
              </td>
              <td>CL</td>
              <td>CL</td>
              <td>12</td>
              <td>0.00</td>
              <td>0.00</td>
              <td>0.00</td>
              <td>0.00</td>
              <td>0.00</td>
              <td>0.00</td>
              <td>No</td>
              <td>False</td>
              <td>True</td>
              <td>-</td>
              <td className="leave-actions">
                <FaEdit
                  onClick={() => {
                    setIsEditMode(true);
                    setIsModalOpen(true);
                  }}
                  title="Edit Leave"
                />
                <FaTrash />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="holiday-pagination">
        <label>
          <strong>Show</strong>
          <select
            value={pageSize}
            onChange={(event) => setPageSize(event.target.value)}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <strong>entries</strong>
          <span>Showing 1 to 1 of 1 entries</span>
        </label>
        <div>
          <button>Previous</button>
          <button className="page-number">1</button>
          <button>Next</button>
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
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setIsModalOpen(false);
              }}
            >
              <select defaultValue={isEditMode ? "CL" : ""}>
                <option value="">Select Leave Type</option>
                <option value="CL">CL</option>
                <option>Paid Leave</option>
                <option>Unpaid Leave</option>
              </select>
              <div className="leave-form-grid">
                {[
                  "Leave Name",
                  "Leave Abbr.",
                  "Max Limit",
                  "Lifetime Service Max Limit",
                  "Pay Deduction Per Leave (%)",
                  "Max. Acceptable In Month",
                  "Max. Acceptable in Continuation",
                  "Able to apply for leave before",
                  "No of Late Days to be counted for 1 LWP",
                  "No Employee should be able to apply before",
                ].map((label) => (
                  <label key={label}>
                    {label}
                    <input
                      type={
                        label === "Leave Name" || label === "Leave Abbr."
                          ? "text"
                          : "number"
                      }
                      defaultValue={
                        isEditMode && label === "Leave Name"
                          ? "Casual Leave"
                          : isEditMode && label === "Leave Abbr."
                            ? "CL"
                            : isEditMode && label === "Max Limit"
                              ? "12"
                              : isEditMode &&
                                  label !== "Leave Name" &&
                                  label !== "Leave Abbr."
                                ? "0.00"
                                : label.includes("Limit") ||
                                    label.includes("Deduction") ||
                                    label.includes("Month") ||
                                    label.includes("Continuation") ||
                                    label.includes("before") ||
                                    label.includes("LWP")
                                  ? "0"
                                  : undefined
                      }
                    />
                  </label>
                ))}
              </div>
              <div className="leave-options">
                {[
                  "Carry Forward",
                  "Either Prefix or Suffix of holidays IS ONLY allowed",
                  "Enable Upload File",
                  "Allow to Add Previous Month CL",
                  "Auto assigning",
                  "Show On E-care",
                ].map((label, index) => (
                  <label key={label}>
                    <input type="checkbox" defaultChecked={index === 5} />
                    {label}
                  </label>
                ))}
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
