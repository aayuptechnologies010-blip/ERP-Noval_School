import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaDownload,
  FaEdit,
  FaPlusCircle,
  FaSearch,
  FaTimes,
  FaTrash,
} from "react-icons/fa";

const shifts = [
  [
    "1",
    "Office Staff|Timing",
    "08:08",
    "16:30",
    "No",
    "No",
    "NA",
    "00:00",
    "00:00",
    "00:00",
    "0",
    "NA",
  ],
  [
    "2",
    "Teacher's|Timing",
    "08:15",
    "14:30",
    "No",
    "No",
    "NA",
    "00:00",
    "00:00",
    "00:00",
    "0",
    "NA",
  ],
];

const exportHeaders = [
  "ShiftID",
  "ShiftName",
  "starttime",
  "EndTime",
  "WeekOffStarttime",
  "WeekOffEndTime",
  "EndTimeforOutPunch",
  "latenallowed",
  "maxlatein",
  "IsHalfDay",
  "WeekOffStart",
  "WeekOffEnd",
  "IsWeekOFF",
  "WeekOFFDay",
];

function downloadShiftExport() {
  const rows = shifts.map((shift, index) => [
    index === 0 ? "3" : "2",
    shift[1].replace("|", " "),
    shift[2],
    shift[3],
    "00:00",
    "00:00",
    "00:00",
    shift[10],
    "-1",
    "No",
    "2",
    "2",
    "No",
    "NA",
  ]);
  const csv = [exportHeaders, ...rows]
    .map((row) =>
      row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","),
    )
    .join("\r\n");
  const url = URL.createObjectURL(
    new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "Shift_Master_Details.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function DefineShiftMaster() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [shiftName, setShiftName] = useState("");

  return (
    <section className="holiday-page shift-page">
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
        <div className="holiday-tab current-tab">
          <span>Define Shift Master</span>
          <button
            onClick={() => navigate("/attendance")}
            aria-label="Close Define Shift Master"
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
            aria-label="Search shifts"
          />
        </label>
        <div className="holiday-actions">
          <button
            className="holiday-action"
            onClick={() => {
              setIsEditMode(false);
              setShiftName("");
              setIsModalOpen(true);
            }}
          >
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
              {[
                "Sl No.",
                "Shift Name",
                "Start Time",
                "End Time",
                "Half Day",
                "W/O",
                "W/O Half Day",
                "Half Day Start Time",
                "Half Day End Time",
                "End Time For Out Punch",
                "Late In Allowed/Minutes",
                "Max Late In/Minutes",
                "Action",
              ].map((heading) => (
                <th key={heading}>
                  {heading} <span>◆</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shifts.map((shift) => (
              <tr key={shift[0]}>
                {shift.map((value, index) => (
                  <td key={`${shift[0]}-${index}`}>
                    {index === 1
                      ? value.split("|").map((part) => (
                          <React.Fragment key={part}>
                            {part}
                            <br />
                          </React.Fragment>
                        ))
                      : value}
                  </td>
                ))}
                <td className="leave-actions">
                  <FaEdit
                    onClick={() => {
                      setIsEditMode(true);
                      setShiftName("Office Staff Timing");
                      setIsModalOpen(true);
                    }}
                    title="Edit Shift"
                  />
                  <FaTrash />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="holiday-pagination">
        <label>
          <strong>Show</strong>
          <select defaultValue="10">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <strong>entries</strong>
        </label>
        <div>
          <button disabled>Previous</button>
          <button disabled>Next</button>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="shift-modal-backdrop"
          role="presentation"
          onMouseDown={(event) =>
            event.target === event.currentTarget && setIsModalOpen(false)
          }
        >
          <div
            className="shift-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="shift-form-title"
          >
            <div className="shift-modal-header">
              <h2 id="shift-form-title">
                {isEditMode ? "Edit Shift" : "Add New Shift"}
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
              <label>
                Shift Name :
                <input
                  value={shiftName}
                  onChange={(event) => setShiftName(event.target.value)}
                  autoFocus
                  required
                />
              </label>
              <fieldset>
                <legend>Shift Start Time :</legend>
                <div>
                  <select defaultValue={isEditMode ? "08" : ""}>
                    <option value="" disabled>
                      Hour
                    </option>
                    {isEditMode && <option value="08">08 HH</option>}
                    {Array.from({ length: 24 }, (_, hour) => (
                      <option key={hour} value={String(hour).padStart(2, "0")}>
                        {String(hour).padStart(2, "0")} HH
                      </option>
                    ))}
                  </select>
                  <select defaultValue={isEditMode ? "08" : ""}>
                    <option value="" disabled>
                      Minute
                    </option>
                    <option value="08">08 MM</option>
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
                  <select defaultValue={isEditMode ? "16" : ""}>
                    <option value="" disabled>
                      Hour
                    </option>
                    {isEditMode && <option value="16">16 HH</option>}
                    {Array.from({ length: 24 }, (_, hour) => (
                      <option key={hour} value={String(hour).padStart(2, "0")}>
                        {String(hour).padStart(2, "0")} HH
                      </option>
                    ))}
                  </select>
                  <select defaultValue={isEditMode ? "30" : ""}>
                    <option value="" disabled>
                      Minute
                    </option>
                    <option value="30">30 MM</option>
                    <option value="00">00 MM</option>
                    <option value="15">15 MM</option>
                    <option value="45">45 MM</option>
                  </select>
                </div>
              </fieldset>
              <label>
                Late In Allowed [Minutes] :
                <select defaultValue={isEditMode ? "00" : ""}>
                  <option value="" disabled>
                    Late In Minute
                  </option>
                  <option value="00">00 Minute</option>
                  <option value="15">15 Minute</option>
                  <option value="30">30 Minute</option>
                </select>
              </label>
              <div className="shift-radio-group">
                {[
                  "None",
                  "Half Day",
                  "2nd WO Only",
                  "Alternate WO",
                  "All WO",
                ].map((item, index) => (
                  <label key={item}>
                    <input
                      type="radio"
                      name="weekly-off"
                      defaultChecked={index === 0}
                    />
                    {item}
                  </label>
                ))}
              </div>
              <button
                className={`shift-save ${isEditMode ? "is-update" : ""}`}
                type="submit"
              >
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
