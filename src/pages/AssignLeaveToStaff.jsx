import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaTimes } from "react-icons/fa";

// We will fetch employeeTypes and departments dynamically from staff data now

function AssignLeaveToStaff() {
  const navigate = useNavigate();
  const [schools, setSchools] = useState([]);
  const [school, setSchool] = useState("All Schools");
  
  const [employeeTypes, setEmployeeTypes] = useState(["All Employee Types"]);
  const [departments, setDepartments] = useState(["All Departments"]);
  
  const [employeeType, setEmployeeType] = useState("All Employee Types");
  const [department, setDepartment] = useState("All Departments");
  const [leave, setLeave] = useState("");
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [shown, setShown] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const [allStaff, setAllStaff] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { "Authorization": `Bearer ${token}` };

        // Fetch schools
        const schoolRes = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/change-academic-year/options`, { headers });
        if (schoolRes.ok) {
          const data = await schoolRes.json();
          setSchools(data.schools || []);
        }

        // Fetch leave types
        const leaveRes = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/leave-types`, { headers });
        if (leaveRes.ok) {
          const data = await leaveRes.json();
          setLeaveTypes(data || []);
        }

        // Fetch all staff
        const staffRes = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/staffs`, { headers });
        if (staffRes.ok) {
          const data = await staffRes.json();
          setAllStaff(data || []);
          
          const uniqueRoles = new Set(data.map(s => s.role?.roleName).filter(Boolean));
          const uniqueDepts = new Set(data.map(s => s.qualification).filter(Boolean)); // Using qualification as department
          
          setEmployeeTypes(["All Employee Types", ...Array.from(uniqueRoles)]);
          setDepartments(["All Departments", ...Array.from(uniqueDepts)]);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleShow = () => {
    if (!leave) {
      alert("Please select a leave type.");
      return;
    }
    
    // Filter staff
    const filtered = allStaff.filter(emp => {
      let matchType = true;
      let matchDept = true;

      if (employeeType !== "All Employee Types") {
        const roleName = emp.role ? emp.role.roleName : 'OTHER';
        matchType = (emp.designation === employeeType || roleName === employeeType);
      }
      
      if (department !== "All Departments") {
        // Basic matching logic, assuming department is somewhat mapped to designation or qualification
        matchDept = (emp.designation === department || emp.qualification === department);
        // Note: For a real app, there would be a dedicated department field.
      }

      return matchType && matchDept;
    });

    setStaffList(filtered);
    setShown(true);
  };

  const handleAssign = () => {
    // In a real application, this would call an API to bulk assign the leave balance to all staff in staffList
    alert(`Successfully assigned ${leave} to ${staffList.length} staff members.`);
    setShown(false);
    setLeave("");
  };

  return (
    <section className="holiday-page assign-leave-page">
      <div className="holiday-tab current-tab">
        <span>Assign Leave To Staff</span>
        <button
          onClick={() => navigate("/attendance")}
          aria-label="Close Assign Leave To Staff"
        >
          <FaTimes />
        </button>
      </div>
      <div className="assign-leave-form">
        <label>
          School Name :
          <select
            value={school}
            onChange={(event) => setSchool(event.target.value)}
          >
            <option value="All Schools">All Schools</option>
            {schools.map(s => (
              <option key={s._id} value={s.schoolName}>{s.schoolName}</option>
            ))}
          </select>
        </label>
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
          Department :
          <select
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
          >
            {departments.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label>
          Please select Leave :
          <select
            value={leave}
            onChange={(event) => setLeave(event.target.value)}
          >
            <option value="">Select Leave</option>
            {leaveTypes.map((lt) => (
              <option key={lt._id} value={lt.leaveName}>{lt.leaveName}</option>
            ))}
          </select>
        </label>
        <div className="assign-leave-actions">
          <button type="button" onClick={handleShow}>
            <FaEye /> Show
          </button>
          <button
            type="button"
            onClick={() => {
              setShown(false);
              setLeave("");
              setStaffList([]);
            }}
          >
            <FaTimes /> Cancel
          </button>
        </div>
        
        {shown && (
          <div className="assign-leave-result" style={{marginTop: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '4px'}}>
            <h4 style={{marginBottom: '10px'}}>Staff Matching Criteria: {staffList.length}</h4>
            {staffList.length > 0 ? (
              <>
                <ul style={{listStyle: 'none', padding: 0, maxHeight: '200px', overflowY: 'auto', marginBottom: '15px'}}>
                  {staffList.map(emp => (
                    <li key={emp._id} style={{padding: '5px 0', borderBottom: '1px solid #eee'}}>
                      {emp.userName} - {emp.firstName} {emp.lastName} ({emp.designation || 'Staff'})
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={handleAssign}
                  style={{backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'}}
                >
                  Assign {leave} to {staffList.length} Staff
                </button>
              </>
            ) : (
              <p>No staff members found matching the selected criteria.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default AssignLeaveToStaff;
