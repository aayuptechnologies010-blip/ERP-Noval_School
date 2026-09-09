import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarPlus,
  FaDownload,
  FaFileImport,
  FaSearch,
  FaTimes,
  FaTrash
} from "react-icons/fa";

function DefineHoliday() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState("10");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [holidayName, setHolidayName] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const fetchHolidays = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/holidays`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setHolidays(data);
      }
    } catch (error) {
      console.error("Error fetching holidays:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  const handleAddHoliday = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/holidays`, {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ holidayName, department, fromDate, toDate })
      });
      if (response.ok) {
        setIsModalOpen(false);
        setHolidayName("");
        setDepartment("All Departments");
        setFromDate("");
        setToDate("");
        fetchHolidays();
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to add holiday");
      }
    } catch (error) {
      console.error("Error adding holiday:", error);
      alert("Error adding holiday");
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this holiday?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/holidays/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        fetchHolidays();
      }
    } catch (error) {
      console.error("Error deleting holiday:", error);
    }
  };

  const filteredHolidays = holidays.filter(h => h.holidayName.toLowerCase().includes(search.toLowerCase()));

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
              <th>Sr. No. <span>▲</span></th>
              <th>From Date <span>◆</span></th>
              <th>To Date <span>◆</span></th>
              <th>Day <span>◆</span></th>
              <th>Holiday Name <span>◆</span></th>
              <th>Department Name <span>◆</span></th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7">Loading...</td></tr>
            ) : filteredHolidays.length === 0 ? (
              <tr><td colSpan="7">No data available in table</td></tr>
            ) : (
              filteredHolidays.map((holiday, index) => {
                const from = new Date(holiday.fromDate);
                const to = new Date(holiday.toDate);
                const days = Math.round((to - from) / (1000 * 60 * 60 * 24)) + 1;
                return (
                  <tr key={holiday._id}>
                    <td>{index + 1}</td>
                    <td>{from.toLocaleDateString()}</td>
                    <td>{to.toLocaleDateString()}</td>
                    <td>{days} Day{days > 1 ? 's' : ''}</td>
                    <td>{holiday.holidayName}</td>
                    <td>{holiday.department}</td>
                    <td>
                      <FaTrash onClick={() => handleDelete(holiday._id)} style={{cursor: 'pointer', color: '#ff6b6b'}} />
                    </td>
                  </tr>
                );
              })
            )}
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
          <span>Showing {filteredHolidays.length > 0 ? 1 : 0} to {filteredHolidays.length} of {filteredHolidays.length} entries</span>
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
            <form onSubmit={handleAddHoliday}>
              <label>
                Holiday Name
                <input required value={holidayName} onChange={e => setHolidayName(e.target.value)} />
              </label>
              <label>
                Department
                <select value={department} onChange={e => setDepartment(e.target.value)}>
                  <option value="">None selected</option>
                  <option>All Departments</option>
                  <option>Teaching Staff</option>
                  <option>Office Staff</option>
                </select>
              </label>
              <label>
                From Date
                <input type="date" required value={fromDate} onChange={e => setFromDate(e.target.value)} />
              </label>
              <label>
                To Date
                <input type="date" required value={toDate} onChange={e => setToDate(e.target.value)} />
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
