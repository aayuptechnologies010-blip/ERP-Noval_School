import React from 'react';
import { HelpCircle, Info, Settings, GraduationCap, PieChart } from 'lucide-react';
import { FaMoneyBillAlt } from 'react-icons/fa';

export default function PayrollHeader() {
  return (
    <div className="payroll-header">
      <div className="header-left">
        <div className="school-name">NAVALS NATIONAL ACADEMY</div>
        <div className="payroll-brand">
          <FaMoneyBillAlt size={22} color="white" />
          Payroll
        </div>
        
        <div className="header-dropdown-group">
          <GraduationCap size={18} />
          <span>Academic Year :</span>
          <select className="header-select" defaultValue="2026-2027">
            <option value="2026-2027">2026-2027</option>
          </select>
        </div>
        
        <div className="header-dropdown-group" style={{ marginLeft: '10px' }}>
          <PieChart size={18} />
          <span>Financial Year :</span>
          <select className="header-select" defaultValue="2026-2027">
            <option value="2026-2027">2026-2027</option>
          </select>
        </div>
      </div>
      
      <div className="header-right">
        <a href="https://franciscanecare.zohodesk.com/portal/en/signin" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
          <HelpCircle size={20} style={{ cursor: 'pointer' }} />
        </a>
        <a href="https://franciscanwebsolutions.com/manuals/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
          <Info size={20} style={{ cursor: 'pointer' }} />
        </a>
        <Settings size={20} style={{ cursor: 'pointer' }} />
        
        <div className="user-profile">
          ANKIT KUMAR
          <span style={{ fontSize: '10px', marginLeft: '5px' }}>▼</span>
        </div>
      </div>
    </div>
  );
}
