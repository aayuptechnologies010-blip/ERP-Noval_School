import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaExchangeAlt, FaTimes } from "react-icons/fa";

function ChangeAcademicYear() {
  const navigate = useNavigate();

  const [academicYears, setAcademicYears] = useState([]);
  const [financialYears, setFinancialYears] = useState([]);
  const [schools, setSchools] = useState([]);

  const [academicYearId, setAcademicYearId] = useState("");
  const [financialYearId, setFinancialYearId] = useState("");
  const [schoolId, setSchoolId] = useState("");
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/change-academic-year/options`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        
        if (response.ok) {
          const data = await response.json();
          setAcademicYears(data.academicYears || []);
          setFinancialYears(data.financialYears || []);
          setSchools(data.schools || []);

          if (data.academicYears?.length > 0) {
            const activeAy = data.academicYears.find(a => a.isActive);
            setAcademicYearId(activeAy ? activeAy._id : data.academicYears[0]._id);
          }
          if (data.financialYears?.length > 0) {
            const activeFy = data.financialYears.find(f => f.isActive);
            setFinancialYearId(activeFy ? activeFy._id : data.financialYears[0]._id);
          }
          if (data.schools?.length > 0) {
            const activeSch = data.schools.find(s => s.isMainSchool);
            setSchoolId(activeSch ? activeSch._id : data.schools[0]._id);
          }
        }
      } catch (error) {
        console.error("Error fetching change academic year options:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOptions();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!academicYearId || !financialYearId || !schoolId) {
      alert("Please select Academic Year, Financial Year and School");
      return;
    }

    if (!window.confirm("Are you sure you want to change the global academic year?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/change-academic-year`, {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ academicYearId, financialYearId, schoolId })
      });

      if (response.ok) {
        alert("Academic Year, Financial Year, and School changed successfully globally.");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to change academic year.");
      }
    } catch (error) {
      console.error("Error submitting change academic year:", error);
      alert("Error occurred while changing academic year.");
    }
  };

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
      
      {loading ? (
        <div style={{ padding: '20px', textAlign: 'center' }}>Loading options...</div>
      ) : (
        <form className="academic-year-form" onSubmit={handleSubmit}>
          <label>
            Academic Year
            <select 
              value={academicYearId} 
              onChange={e => setAcademicYearId(e.target.value)}
              required
            >
              <option value="" disabled>Select Academic Year</option>
              {academicYears.map(ay => (
                <option key={ay._id} value={ay._id}>{ay.name || new Date(ay.startDate).getFullYear() + '-' + new Date(ay.endDate).getFullYear()}</option>
              ))}
            </select>
          </label>
          <label>
            Financial Year
            <select 
              value={financialYearId} 
              onChange={e => setFinancialYearId(e.target.value)}
              required
            >
              <option value="" disabled>Select Financial Year</option>
              {financialYears.map(fy => (
                <option key={fy._id} value={fy._id}>{fy.name || new Date(fy.startDate).getFullYear() + '-' + new Date(fy.endDate).getFullYear()}</option>
              ))}
            </select>
          </label>
          <label>
            School
            <select 
              value={schoolId} 
              onChange={e => setSchoolId(e.target.value)}
              required
            >
              <option value="" disabled>Select School</option>
              {schools.map(sch => (
                <option key={sch._id} value={sch._id}>{sch.schoolName}</option>
              ))}
            </select>
          </label>
          <button className="academic-year-submit" type="submit">
            <FaExchangeAlt /> Change
          </button>
        </form>
      )}
    </section>
  );
}

export default ChangeAcademicYear;
