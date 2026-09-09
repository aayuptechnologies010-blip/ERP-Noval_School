import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimes } from "react-icons/fa";

// We will dynamically fetch employee types

function MarkManualAttendance() {
  const navigate = useNavigate();
  const [employeeTypes, setEmployeeTypes] = useState(["All Employee Types"]);
  const [employeeType, setEmployeeType] = useState("All Employee Types");
  
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [dateText, setDateText] = useState("");
  
  const [time, setTime] = useState("09:00 AM");
  const [status, setStatus] = useState("Present");
  
  const [picker, setPicker] = useState("");
  const [clockHour, setClockHour] = useState("09");
  const [clockMinute, setClockMinute] = useState("00");
  const [clockPeriod, setClockPeriod] = useState("AM");
  const [clockMode, setClockMode] = useState("hour");
  
  const calendarDays = Array.from({ length: 31 }, (_, index) => index + 1);
  const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();

  const clockNumbers =
    clockMode === "hour"
      ? ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]
      : ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];
  
  const clockValue = clockMode === "hour" ? clockHour.replace(/^0/, "") : clockMinute;

  useEffect(() => {
    // Format initial date text
    const d = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    setDateText(`${String(d.getDate()).padStart(2, "0")}-${months[d.getMonth()]}-${d.getFullYear()}`);
    
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/staffs`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setEmployees(data || []);
          const uniqueRoles = new Set(data.map(s => s.role?.roleName).filter(Boolean));
          setEmployeeTypes(["All Employee Types", ...Array.from(uniqueRoles)]);
        }
      } catch (error) {
        console.error("Error fetching staff:", error);
      }
    };
    fetchEmployees();
  }, []);

  // Filter employees based on employeeType if necessary
  // Assuming employeeType maps to designation or role
  const filteredEmployees = employees.filter(emp => {
    if (employeeType === "All Employee Types") return true;
    const roleName = emp.role ? emp.role.roleName : 'OTHER';
    return emp.designation === employeeType || roleName === employeeType;
  });

  const selectClockValue = (value) => {
    if (clockMode === "hour") setClockHour(value.padStart(2, "0"));
    else setClockMinute(value);
  };

  const handleClockDrag = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - (bounds.left + bounds.width / 2);
    const y = event.clientY - (bounds.top + bounds.height / 2);
    let angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;
    const index = Math.round(angle / 30) % 12;
    selectClockValue(clockNumbers[index]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!employeeId) {
      alert("Please select an employee.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const payload = {
        date,
        department: employeeType === "All Employee Types" ? "All" : employeeType,
        records: [
          {
            staffId: employeeId,
            status,
            checkIn: time,
            remarks: "Marked Manually"
          }
        ]
      };

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/staff-attendance/mark`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert("Attendance marked successfully!");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to mark attendance.");
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
      alert("Error occurred while marking attendance.");
    }
  };

  return (
    <section className="holiday-page manual-attendance-page">
      <div className="holiday-tabs">
        <div className="holiday-tab previous-tab">
          <span>Assign Leave To Staff</span>
          <button
            onClick={() => navigate("/attendance/assign-leave-to-staff")}
            aria-label="Open Assign Leave To Staff"
          >
            <FaTimes />
          </button>
        </div>
        <div className="holiday-tab previous-tab">
          <span>Process Attendance for Payroll</span>
          <button
            onClick={() => navigate("/attendance/process-attendance-payroll")}
            aria-label="Open Process Attendance for Payroll"
          >
            <FaTimes />
          </button>
        </div>
        <div className="holiday-tab current-tab">
          <span>Mark Manual Attendance</span>
          <button
            onClick={() => navigate("/attendance")}
            aria-label="Close Mark Manual Attendance"
          >
            <FaTimes />
          </button>
        </div>
      </div>
      <form
        className="manual-attendance-form"
        onSubmit={handleSubmit}
      >
        <label>
          Employee Type :
          <select
            value={employeeType}
            onChange={(event) => setEmployeeType(event.target.value)}
          >
            {employeeTypes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label>
          Employee Name :
          <select
            value={employeeId}
            onChange={(event) => setEmployeeId(event.target.value)}
            required
          >
            <option value="">Select Employee Name</option>
            {filteredEmployees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.userName} - {emp.firstName} {emp.lastName}
              </option>
            ))}
          </select>
        </label>
        <label>
          Date :
          <div className="manual-picker-field">
            <input
              value={dateText}
              onChange={(event) => setDateText(event.target.value)}
              onFocus={() => setPicker("date")}
              onClick={() => setPicker("date")}
              aria-label="Date"
              readOnly
            />
            {picker === "date" && (
              <div className="manual-date-picker">
                <div>
                  <b onClick={() => setPicker("")}>Close</b>
                </div>
                <div className="manual-calendar-title">
                  <span>{new Date(date).toLocaleString("default", { month: "long" })}</span>
                  <span>{new Date(date).getFullYear()}</span>
                </div>
                <div className="manual-calendar-grid">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <b key={day}>{day}</b>
                  ))}
                  {Array.from({ length: firstDay }, (_, index) => (
                    <span key={`empty-${index}`} />
                  ))}
                  {calendarDays.map((day) => (
                    <button
                      type="button"
                      className={day === parseInt(date.split('-')[2]) ? "selected-day" : ""}
                      key={day}
                      onClick={() => {
                        const d = new Date(new Date().getFullYear(), new Date().getMonth(), day);
                        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                        setDate(`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2, "0")}-${String(day).padStart(2, "0")}`);
                        setDateText(`${String(day).padStart(2, "0")}-${months[d.getMonth()]}-${d.getFullYear()}`);
                        setPicker("");
                      }}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </label>
        <label>
          Time :
          <div className="manual-picker-field">
            <input
              value={time}
              onChange={(event) => setTime(event.target.value)}
              onFocus={() => setPicker("time")}
              onClick={() => setPicker("time")}
              aria-label="Time"
              readOnly
            />
            {picker === "time" && (
              <div className="manual-clock-picker">
                <strong>
                  <button type="button" onClick={() => setClockMode("hour")}>
                    {clockHour}
                  </button>{" "}
                  :{" "}
                  <button type="button" onClick={() => setClockMode("minute")}>
                    {clockMinute}
                  </button>
                </strong>
                <div
                  className="clock-face"
                  onPointerDown={(event) => {
                    event.currentTarget.setPointerCapture(event.pointerId);
                    handleClockDrag(event);
                  }}
                  onPointerMove={(event) => {
                    if (event.currentTarget.hasPointerCapture(event.pointerId))
                      handleClockDrag(event);
                  }}
                  onPointerUp={() => {
                    if (clockMode === "hour") setClockMode("minute");
                  }}
                >
                  {clockNumbers.map((hour, index) => (
                    <button
                      type="button"
                      key={hour}
                      className={hour === clockValue ? "clock-selected" : ""}
                      style={{ "--angle": `${index * 30}deg` }}
                      onClick={() => selectClockValue(hour)}
                    >
                      {hour}
                    </button>
                  ))}
                  <span
                    className="clock-hand"
                    style={{
                      transform: `rotate(${clockNumbers.indexOf(clockValue) * 30 - 90}deg)`,
                    }}
                  />
                </div>
                <div className="clock-period">
                  <button
                    type="button"
                    onClick={() => setClockPeriod("AM")}
                    className={clockPeriod === "AM" ? "period-selected" : ""}
                  >
                    AM
                  </button>
                  <button
                    type="button"
                    onClick={() => setClockPeriod("PM")}
                    className={clockPeriod === "PM" ? "period-selected" : ""}
                  >
                    PM
                  </button>
                </div>
                <button
                  type="button"
                  className="clock-done"
                  onClick={() => {
                    setTime(`${clockHour}:${clockMinute} ${clockPeriod}`);
                    setPicker("");
                  }}
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </label>
        
        <label>
          Status :
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="HalfDay">Half Day</option>
            <option value="Late">Late</option>
            <option value="Leave">Leave</option>
          </select>
        </label>
        
        <div className="assign-leave-actions">
          <button type="submit">
            <FaCheckCircle /> Mark
          </button>
          <button type="button" onClick={() => navigate("/attendance")}>
            <FaTimes /> Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

export default MarkManualAttendance;
