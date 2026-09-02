import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarPlus,
  FaChevronDown,
  FaDownload,
  FaFileImport,
  FaSearch,
  FaTimes,
} from "react-icons/fa";

function DefineHoliday() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState("10");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="holiday-page">
      <div className="holiday-tab">
        <span>Define Holiday</span>
        <button
          aria-label="Close Define Holiday"
          title="Close"
          onClick={() => navigate("/attendance")}
        >
          <FaTimes />
        </button>
      </div>

      <div className="holiday-toolbar">
        <label className="holiday-search">
          <FaSearch />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search"
            aria-label="Search holidays"
          />
        </label>
        <div className="holiday-actions">
          <button
            className="holiday-action primary"
            onClick={() => setIsModalOpen(true)}
          >
            <FaCalendarPlus /> Add New Holiday
          </button>
          <button className="holiday-action">
            <FaDownload /> Export
          </button>
          <button className="holiday-action">
            <FaFileImport /> Import Holiday
          </button>
        </div>
      </div>

      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th>
                Sr. No. <span>▲</span>
              </th>
              <th>
                From Date <span>◆</span>
              </th>
              <th>
                To Date <span>◆</span>
              </th>
              <th>
                Day <span>◆</span>
              </th>
              <th>
                Holiday Name <span>◆</span>
              </th>
              <th>
                Department Name <span>◆</span>
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="7">No data available in table</td>
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
          <span>Showing 0 to 0 of 0 entries</span>
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
            className="attendance-form-modal holiday-form-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-holiday-title"
          >
            <div className="attendance-form-header">
              <h2 id="add-holiday-title">Add New Holiday</h2>
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
                Holiday Name
                <input required />
              </label>
              <label>
                Department
                <select defaultValue="">
                  <option value="">None selected</option>
                  <option>All Departments</option>
                  <option>Teaching Staff</option>
                  <option>Office Staff</option>
                </select>
              </label>
              <label>
                From Date
                <input type="date" defaultValue="2026-08-26" required />
              </label>
              <label>
                To Date
                <input type="date" defaultValue="2026-08-26" required />
              </label>
              <button className="shift-save" type="submit">
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default DefineHoliday;
