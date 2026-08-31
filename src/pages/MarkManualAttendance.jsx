import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimes } from "react-icons/fa";

const employeeTypes = [
  "All Employee Type",
  "Management",
  "Support Staff",
  "PRIMARY TEACHERS",
  "PRE-PRIM. TEACHERS",
  "TEACHERS",
  "Front Office/Accounts",
  "OTHER",
  "ADHOC",
  "NON TEACHING",
  "Cont Emp",
  "ADMIN DEPT",
  "Temporary Staff",
  "Principal",
];
const employees = [
  "Select Employee Name",
  "RAM SAKAL SAHANI",
  "REKHA GUPTA",
  "SAHABUDDIN ALI",
  "SANJU CHAUDHARY",
  "SATYAM SINGH",
  "SEEMA GIRI",
  "SHAMA PARVEEN",
  "SHIKHA OJHA",
  "SIMRAN GUPTA",
  "SONIYA SINGH",
  "SUNITA",
  "SUSHIL KUMAR YADAV",
  "VASIM AHMAD",
  "VISHKHA THAMI",
  "VISHAL SONAR",
  "VIVEKANAND TIWARI",
];

function MarkManualAttendance() {
  const navigate = useNavigate();
  const [employeeType, setEmployeeType] = useState(employeeTypes[0]);
  const [employee, setEmployee] = useState(employees[0]);
  const [date, setDate] = useState("2026-08-26");
  const [dateText, setDateText] = useState("26-Aug-2026");
  const [time, setTime] = useState("15:38");
  const [picker, setPicker] = useState("");
  const [clockHour, setClockHour] = useState("03");
  const [clockMinute, setClockMinute] = useState("00");
  const [clockPeriod, setClockPeriod] = useState("PM");
  const [clockMode, setClockMode] = useState("hour");
  const calendarDays = Array.from({ length: 31 }, (_, index) => index + 1);
  const firstDay = new Date(2026, 7, 1).getDay();
  const clockNumbers =
    clockMode === "hour"
      ? ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]
      : [
          "00",
          "05",
          "10",
          "15",
          "20",
          "25",
          "30",
          "35",
          "40",
          "45",
          "50",
          "55",
        ];
  const clockValue =
    clockMode === "hour" ? clockHour.replace(/^0/, "") : clockMinute;

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
        onSubmit={(event) => event.preventDefault()}
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
            value={employee}
            onChange={(event) => setEmployee(event.target.value)}
          >
            {employees.map((item) => (
              <option key={item}>{item}</option>
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
            />
            {picker === "date" && (
              <div className="manual-date-picker">
                <div>
                  <b>Clear</b>
                  <b onClick={() => setPicker("")}>Close</b>
                </div>
                <div>
                  <b>&lt;Prev</b>
                  <b>Today</b>
                  <b>Next&gt;</b>
                </div>
                <div className="manual-calendar-title">
                  <span>August</span>
                  <span>2026</span>
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
                      className={day === 26 ? "selected-day" : ""}
                      key={day}
                      onClick={() => {
                        setDate(`2026-08-${String(day).padStart(2, "0")}`);
                        setDateText(`${String(day).padStart(2, "0")}-Aug-2026`);
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
                    setTime(`${clockHour}:${clockMinute}`);
                    setPicker("");
                  }}
                >
                  Done
                </button>
              </div>
            )}
          </div>
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
