import React, { useState } from 'react';

export default function DefineGlobalSettings() {
  const [activeTab, setActiveTab] = useState('main');

  return (
    <div className="global-settings-container">
      
      <div className="settings-tabs">
        <div 
          className={`settings-tab ${activeTab === 'main' ? 'active-tab' : 'inactive-tab'}`}
          onClick={() => setActiveTab('main')}
        >
          Main Global Settings
        </div>
        <div 
          className={`settings-tab ${activeTab === 'salary' ? 'active-tab' : 'inactive-tab'}`}
          onClick={() => setActiveTab('salary')}
        >
          Salary Generate Settings
        </div>
      </div>

      {activeTab === 'main' && (
        <>
          <div className="settings-section">
            <div className="section-header">Form 16</div>
            <div className="settings-row row-3-cols">
              <div className="form-group">
                <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                  Rebate on Travelling Allowance (TA)
                  <span className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}>
                    <input type="checkbox" defaultChecked /> For 12 Month
                  </span>
                </label>
                <input type="text" className="settings-input" defaultValue="0" />
              </div>
              <div className="form-group">
                <label>HRA For Metropolitan Cities (in %)</label>
                <input type="text" className="settings-input" defaultValue="40.00" />
              </div>
              <div className="form-group">
                <label>HRA For Non Metropolitan Cities (in %)</label>
                <input type="text" className="settings-input" defaultValue="50.00" />
              </div>
            </div>
            <div className="settings-row row-3-cols">
              <div className="form-group">
                <label>Rebate on Hill Allowance (HA)</label>
                <input type="text" className="settings-input" defaultValue="0" />
              </div>
            </div>
          </div>

          <div className="settings-section">
            <div className="section-header">Provident Fund</div>
            <div className="settings-row row-3-cols">
              <div className="form-group">
                <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                  PF Basic Limit
                  <span className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}>
                    <input type="checkbox" defaultChecked /> Apply PF Min. Basic Rule
                  </span>
                </label>
                <input type="text" className="settings-input" defaultValue="15000.00" />
              </div>
              <div className="form-group">
                <label>Employee's PF Contribution (in %)</label>
                <input type="text" className="settings-input" defaultValue="12.00" />
              </div>
              <div className="form-group">
                <label>Employer's PF Contribution (in %)</label>
                <input type="text" className="settings-input" defaultValue="3.67" />
              </div>
            </div>
            <div className="settings-row row-3-cols">
              <div className="form-group">
                <label>Employer's Pension Contribution (in %)</label>
                <input type="text" className="settings-input" defaultValue="8.33" />
              </div>
              <div className="form-group">
                <label>Pension Age Limit</label>
                <input type="text" className="settings-input" defaultValue="58.00" />
              </div>
              <div className="form-group">
                <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                  Age of Retirement
                  <span className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}>
                    <input type="checkbox" /> Use Ceiling
                  </span>
                </label>
                <input type="text" className="settings-input" defaultValue="50" />
              </div>
            </div>
          </div>

          <div className="settings-section">
            <div className="section-header">Admin's Total PF Contribution towards PF A/C</div>
            <div className="settings-row row-3-cols">
              <div className="form-group">
                <label>A/C No 2 (Admin Charges) (in %)</label>
                <input type="text" className="settings-input" defaultValue="0.50" />
              </div>
              <div className="form-group">
                <label>A/C No 22 (Inspection Charges) (in %)</label>
                <input type="text" className="settings-input" defaultValue="0.02" />
              </div>
              <div className="form-group">
                <label>A/C No 21 (Death Insurance) (in %)</label>
                <input type="text" className="settings-input" defaultValue="0.50" />
              </div>
            </div>
          </div>

          <div className="settings-section">
            <div className="section-header">Inspection's Total PF Contribution towards PF A/C</div>
            <div className="settings-row row-3-cols">
              <div className="form-group">
                <label>Inspection ACC22 (in %)</label>
                <input type="text" className="settings-input" defaultValue="0.005" />
              </div>
              <div className="form-group">
                <label>Inspection ACC02 (in %)</label>
                <input type="text" className="settings-input" defaultValue="0.180" />
              </div>
            </div>
          </div>

          <div className="settings-section">
            <div className="section-header">Employee State Insurance Contribution</div>
            <div className="settings-row row-3-cols">
              <div className="form-group">
                <label>Employee's Contribution (in %)</label>
                <input type="text" className="settings-input" defaultValue="1.75" />
              </div>
              <div className="form-group">
                <label>Employer's Contribution (in %)</label>
                <input type="text" className="settings-input" defaultValue="4.75" />
              </div>
              <div className="form-group">
                <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                  Gross Salary Limit
                  <span className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}>
                    <input type="checkbox" /> Use Ceiling
                  </span>
                </label>
                <input type="text" className="settings-input" defaultValue="21000" />
              </div>
            </div>
          </div>

          <div className="settings-section">
            <div className="section-header">Change Sorting Order</div>
            <div className="settings-row row-3-cols">
              <div className="form-group">
                <label>Sort Staff Details by</label>
                <select className="settings-input" defaultValue="Pref No.">
                  <option value="Pref No.">Pref No.</option>
                </select>
              </div>
              <div className="form-group">
                <label>Sorting Type</label>
                <select className="settings-input" defaultValue="Asc.">
                  <option value="Asc.">Asc.</option>
                </select>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <div className="section-header">Salary Sheet Settings</div>
            <div className="settings-row row-3-cols">
              <div className="form-group">
                <label>Total Row One Page</label>
                <input type="text" className="settings-input" defaultValue="15" />
              </div>
              <div className="form-group">
                <label>Column Index For Total</label>
                <input type="text" className="settings-input" defaultValue="7" />
              </div>
              <div className="form-group">
                <label>Last Working Month</label>
                <select className="settings-input" defaultValue="Select Month">
                  <option value="Select Month">Select Month</option>
                </select>
              </div>
            </div>
            <div className="settings-row row-3-cols">
              <div className="form-group">
                <label>Increment Applicable to Emp of</label>
                <input type="text" className="settings-input" defaultValue="12" />
              </div>
            </div>
          </div>

          <div className="settings-section">
            <div className="section-header">Gratuity</div>
            <div className="settings-row row-3-cols">
              <div className="form-group">
                <label>Max Limit of Amount</label>
                <input type="text" className="settings-input" defaultValue="100000.00" />
              </div>
              <div className="form-group">
                <label>Total Service</label>
                <input type="text" className="settings-input" defaultValue="5.00" />
              </div>
              <div className="form-group" style={{ justifyContent: 'flex-end', paddingBottom: '10px' }}>
                <label className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}>
                  <input type="checkbox" /> Date of Confirmation
                </label>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <div className="section-header">Bonus</div>
            <div className="settings-row row-3-cols">
              <div className="form-group">
                <label>Bonus Amount</label>
                <input type="text" className="settings-input" defaultValue="25000.00" />
              </div>
              <div className="form-group">
                <label>Operand 1 (*)</label>
                <input type="text" className="settings-input" defaultValue="30.00" />
              </div>
              <div className="form-group">
                <label>Operand 2 (/)</label>
                <input type="text" className="settings-input" defaultValue="30.40" />
              </div>
            </div>
            <div className="settings-row row-3-cols">
              <div className="form-group" style={{ flexDirection: 'row', alignItems: 'flex-end', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label>Bonus Applicable to Emp of</label>
                  <input type="text" className="settings-input" defaultValue="12" style={{ width: '100%' }} />
                </div>
                <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#333', marginBottom: '8px', whiteSpace: 'nowrap' }}>Month(s) old or more</span>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <div className="section-header">Format For Emp Code</div>
            <div className="settings-row">
              <label className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}>
                <input type="checkbox" /> Automatic Generation
              </label>
            </div>
          </div>

          <div className="settings-section">
            <div className="section-header">Library Book Defaulter</div>
            <div className="settings-row">
              <label className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}>
                <input type="checkbox" /> Check Library Book Defaulter for Inactive Staff
              </label>
            </div>
          </div>
        </>
      )}

      {activeTab === 'salary' && (
        <>
          <div className="settings-section">
            <div className="section-header">Head(s) in Salary Generation Form</div>
            <div className="settings-row row-4-cols">
              
              <div className="form-group" style={{ gap: '12px' }}>
                <label className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}><input type="checkbox" defaultChecked /> Dearness Allowance</label>
                <label className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}><input type="checkbox" /> City expenses</label>
                <label className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}><input type="checkbox" /> House Rent Allowance Arrear</label>
                <label className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}><input type="checkbox" defaultChecked /> Income Tax</label>
                <label className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}><input type="checkbox" /> Staff Welfare</label>
                <label className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}><input type="checkbox" /> Telephone</label>
                <label className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}><input type="checkbox" /> Fully Furnished</label>
              </div>

              <div className="form-group" style={{ gap: '12px' }}>
                <label className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}><input type="checkbox" defaultChecked /> House Rent Allowance</label>
                <label className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}><input type="checkbox" defaultChecked /> Other Allowances</label>
                <label className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}><input type="checkbox" /> Transport Allowance Arrear</label>
                <label className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}><input type="checkbox" defaultChecked /> Advance</label>
                <label className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}><input type="checkbox" /> Petrol</label>
                <label className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}><input type="checkbox" /> Electricity</label>
                <label className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}><input type="checkbox" /> Mobile Allowance</label>
              </div>

              <div className="form-group" style={{ gap: '12px' }}>
                <label className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}><input type="checkbox" defaultChecked /> Transport Allowance</label>
                <label className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}><input type="checkbox" /> Basic Arrear</label>
                <label className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}><input type="checkbox" defaultChecked /> Provident Fund</label>
                <label className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}><input type="checkbox" defaultChecked /> Other Deduction</label>
                <label className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}><input type="checkbox" defaultChecked /> Vol Provident Fund</label>
                <label className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}><input type="checkbox" /> Fee Exempted</label>
                <label className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}><input type="checkbox" defaultChecked /> Insurance</label>
              </div>

              <div className="form-group" style={{ gap: '12px' }}>
                <label className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}><input type="checkbox" defaultChecked /> Medical Allowance</label>
                <label className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}><input type="checkbox" /> Dearness Allowance Arrear</label>
                <label className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}><input type="checkbox" defaultChecked /> Employee State Insurance</label>
                <label className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}><input type="checkbox" /> Provident Fund Arrear</label>
                <label className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}><input type="checkbox" /> Over Time</label>
                <label className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}><input type="checkbox" /> Accomidation</label>
              </div>

            </div>
          </div>

          <div className="settings-section">
            <div className="section-header">Naming Conventions</div>
            <div className="settings-row row-3-cols" style={{ padding: '0 20px' }}>
              <label className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}>
                <input type="radio" name="naming_conv" defaultChecked /> Upper-Case Letters
              </label>
              <label className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}>
                <input type="radio" name="naming_conv" /> Lower-Case Letters
              </label>
              <label className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}>
                <input type="radio" name="naming_conv" /> Capitalized Letters
              </label>
            </div>
          </div>

          <div className="settings-section">
            <div className="section-header">Salary Lock</div>
            <div className="settings-row row-4-cols" style={{ padding: '0 20px' }}>
              
              <div className="form-group" style={{ gap: '12px', justifyContent: 'center' }}>
                <label className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}><input type="checkbox" /> Allow Salary to lock</label>
                <label className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}><input type="checkbox" /> Allow Basic Salary to lock</label>
              </div>

              <div className="form-group">
                <label>Mobile No.</label>
                <input type="text" className="settings-input" />
              </div>

              <div className="form-group">
                <label>Template ID (OTP)</label>
                <input type="text" className="settings-input" />
              </div>

              <div className="form-group">
                <label>Template (OTP)</label>
                <input type="text" className="settings-input" />
              </div>

            </div>
          </div>
        </>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        <button className="blue-btn" style={{ padding: '8px 25px' }}>
          ↻ Update
        </button>
      </div>

    </div>
  );
}
