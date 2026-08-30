import React from 'react';

export default function SalaryCalculation() {
  return (
    <div className="global-settings-container">
      <div className="settings-section" style={{ maxWidth: '800px', margin: '0 auto', border: '1px solid #dee2e6' }}>
        <div className="section-header" style={{ marginBottom: '20px' }}>Salary Calculation Based on</div>
        
        <div style={{ padding: '0 30px 30px 30px' }}>
          <div style={{ display: 'flex', gap: '30px', marginBottom: '15px' }}>
            <label className="checkbox-label" style={{ fontWeight: 'normal' }}>
              <input type="radio" name="calc_base" /> Monthly Gross
            </label>
            <label className="checkbox-label" style={{ fontWeight: 'normal' }}>
              <input type="radio" name="calc_base" /> Monthly Basic
            </label>
          </div>

          <div style={{ fontSize: '12px', color: '#666', marginBottom: '30px', lineHeight: '1.5' }}>
            Note: Selected option will calculate Basic & Salary head(s)(HRA, Allowances) on the basis of monthly Gross of employee(s).<br/>
            Note: Selected option will calculate Salary head(s)(HRA, Allowances) on the basis of monthly Basic of employee(s).<br/>
            <span style={{ color: '#dc3545' }}>Note: Once salary is generated than we cannot change this setting.</span>
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label>Basic (% of CTC)</label>
            <input type="text" className="settings-input" />
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label>HRA (% of CTC)</label>
            <input type="text" className="settings-input" />
          </div>

          <div className="form-group" style={{ marginBottom: '30px' }}>
            <label>Allowance (% of CTC)</label>
            <input type="text" className="settings-input" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button className="blue-btn" style={{ padding: '8px 25px' }}>
              ↻ Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
