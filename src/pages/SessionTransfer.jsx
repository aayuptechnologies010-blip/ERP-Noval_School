import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFileAlt,
  FaGraduationCap,
  FaUniversity,
  FaUserTie,
  FaTimes,
} from "react-icons/fa";

const managers = [
  { label: "Account Manager", icon: FaFileAlt },
  { label: "Fee Manager", icon: FaUniversity },
  { label: "Payroll Manager", icon: FaUserTie },
  { label: "Admission Manager", icon: FaGraduationCap },
];

function SessionTransfer() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState("");
  
  // Form State
  const [currentSession, setCurrentSession] = useState("");
  const [currentFinancialYear, setCurrentFinancialYear] = useState("");
  const [nextSession, setNextSession] = useState("");
  const [nextFinancialYear, setNextFinancialYear] = useState("");

  const [academicYears, setAcademicYears] = useState([]);
  const [financialYears, setFinancialYears] = useState([]);

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { "Authorization": `Bearer ${token}` };

        const [ayRes, fyRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/academic-years`, { headers }),
          fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/financial-years`, { headers })
        ]);

        if (ayRes.ok) {
          const ayData = await ayRes.json();
          setAcademicYears(ayData);
          if (ayData.length > 0) {
            setCurrentSession(ayData[0].name);
            setNextSession(ayData[0].name);
          }
        }
        
        if (fyRes.ok) {
          const fyData = await fyRes.json();
          setFinancialYears(fyData);
          if (fyData.length > 0) {
            setCurrentFinancialYear(fyData[0].name);
            setNextFinancialYear(fyData[0].name);
          }
        }
      } catch (error) {
        console.error("Error fetching years for session transfer:", error);
      }
    };
    fetchYears();
  }, []);

  const openTransferModal = (managerName) => {
    setSelectedManager(managerName);
    setIsModalOpen(true);
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    if(!window.confirm(`Are you sure you want to run Session Transfer for ${selectedManager}?`)) return;

    try {
      const token = localStorage.getItem("token");
      const payload = {
        currentSession,
        currentFinancialYear,
        nextSession,
        nextFinancialYear,
        modulesToTransfer: [selectedManager]
      };

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/session-transfer`, {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert("Session transfer completed successfully!");
        setIsModalOpen(false);
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Transfer failed");
      }
    } catch (error) {
      console.error("Error during session transfer:", error);
      alert("Error occurred during transfer.");
    }
  };

  return (
    <section className="holiday-page session-transfer-page">
      <div className="holiday-tabs">
        <div className="holiday-tab previous-tab" onClick={() => navigate("/attendance/define-leave")}>
          <span>Define Leave</span>
          <button onClick={(e) => { e.stopPropagation(); navigate("/attendance/define-leave"); }} aria-label="Open Define Leave"><FaTimes /></button>
        </div>
        <div className="holiday-tab previous-tab" onClick={() => navigate("/attendance/define-shift-master")}>
          <span>Define Shift Master</span>
          <button onClick={(e) => { e.stopPropagation(); navigate("/attendance/define-shift-master"); }} aria-label="Open Define Shift Master"><FaTimes /></button>
        </div>
        <div className="holiday-tab previous-tab" onClick={() => navigate("/attendance/report-settings")}>
          <span>Report Settings</span>
          <button onClick={(e) => { e.stopPropagation(); navigate("/attendance/report-settings"); }} aria-label="Open Report Settings"><FaTimes /></button>
        </div>
        <div className="holiday-tab current-tab">
          <span>Session Transfer</span>
          <button onClick={() => navigate("/attendance")} aria-label="Close Session Transfer"><FaTimes /></button>
        </div>
      </div>
      
      <div className="session-transfer-cards">
        {managers.map(({ label, icon: Icon }) => (
          <button className="session-manager-card" key={label} onClick={() => openTransferModal(label)}>
            <Icon />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {isModalOpen && (
        <div className="attendance-modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && setIsModalOpen(false)}>
          <div className="attendance-form-modal" role="dialog" aria-modal="true" style={{maxWidth: '450px'}}>
            <div className="attendance-form-header">
              <h2>{selectedManager} Transfer</h2>
              <button onClick={() => setIsModalOpen(false)} aria-label="Close form"><FaTimes /></button>
            </div>
            <form onSubmit={handleTransfer} style={{display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px'}}>
              <label style={{display: 'flex', flexDirection: 'column', gap: '5px', fontWeight: 'bold'}}>
                Current Session
                <select value={currentSession} onChange={e => setCurrentSession(e.target.value)} style={{padding: '8px', border: '1px solid #ddd', borderRadius: '4px'}}>
                  <option value="">Select Session</option>
                  {academicYears.map(ay => (
                    <option key={ay._id} value={ay.name}>{ay.name}</option>
                  ))}
                </select>
              </label>
              <label style={{display: 'flex', flexDirection: 'column', gap: '5px', fontWeight: 'bold'}}>
                Current Financial Year
                <select value={currentFinancialYear} onChange={e => setCurrentFinancialYear(e.target.value)} style={{padding: '8px', border: '1px solid #ddd', borderRadius: '4px'}}>
                  <option value="">Select Financial Year</option>
                  {financialYears.map(fy => (
                    <option key={fy._id} value={fy.name}>{fy.name}</option>
                  ))}
                </select>
              </label>
              <label style={{display: 'flex', flexDirection: 'column', gap: '5px', fontWeight: 'bold'}}>
                Next Session
                <select value={nextSession} onChange={e => setNextSession(e.target.value)} style={{padding: '8px', border: '1px solid #ddd', borderRadius: '4px'}}>
                  <option value="">Select Session</option>
                  {academicYears.map(ay => (
                    <option key={ay._id} value={ay.name}>{ay.name}</option>
                  ))}
                </select>
              </label>
              <label style={{display: 'flex', flexDirection: 'column', gap: '5px', fontWeight: 'bold'}}>
                Next Financial Year
                <select value={nextFinancialYear} onChange={e => setNextFinancialYear(e.target.value)} style={{padding: '8px', border: '1px solid #ddd', borderRadius: '4px'}}>
                  <option value="">Select Financial Year</option>
                  {financialYears.map(fy => (
                    <option key={fy._id} value={fy.name}>{fy.name}</option>
                  ))}
                </select>
              </label>
              <button type="submit" style={{backgroundColor: '#20a9d8', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px'}}>
                Run Session Transfer
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default SessionTransfer;
