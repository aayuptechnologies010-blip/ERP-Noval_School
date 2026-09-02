import React from "react";
import { useNavigate } from "react-router-dom";
import { FaExchangeAlt, FaTimes } from "react-icons/fa";

function ChangeAcademicYear() {
  const navigate = useNavigate();

  return (
    <section className="holiday-page academic-year-page">
      <div className="holiday-tabs">
        <div className="holiday-tab current-tab">
          <span>Change Academic Year</span>
          <button
            onClick={() => navigate("/attendance")}
            aria-label="Close Change Academic Year"
          >
            <FaTimes />
          </button>
        </div>
      </div>
      <form
        className="academic-year-form"
        onSubmit={(event) => event.preventDefault()}
      >
        <label>
          Academic Year
          <select defaultValue="2026-2027">
            <option>2026-2027</option>
            <option>2025-2026</option>
          </select>
        </label>
        <label>
          Financial Year
          <select defaultValue="2026-2027">
            <option>2026-2027</option>
            <option>2025-2026</option>
          </select>
        </label>
        <label>
          School
          <select defaultValue="NAVALS NATIONAL ACADEMY">
            <option>NAVALS NATIONAL ACADEMY</option>
          </select>
        </label>
        <button className="academic-year-submit" type="submit">
          <FaExchangeAlt /> Change
        </button>
      </form>
    </section>
  );
}

export default ChangeAcademicYear;
