import React, { useState } from 'react';
import { Save, Eye, X } from 'lucide-react';

export default function StaffRegistration() {
  const [activeTab, setActiveTab] = useState('registration');

  return (
    <div className="global-settings-container">
      
      <div className="settings-tabs" style={{ gap: '0', borderBottom: '1px solid #dee2e6', marginBottom: '20px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <div 
          className={`settings-tab ${activeTab === 'registration' ? 'active-tab' : 'inactive-tab'}`} 
          style={{ borderRadius: '0', padding: '12px 20px', borderBottom: 'none', borderLeft: activeTab === 'registration' ? '1px solid #dee2e6' : 'none', cursor: 'pointer' }}
          onClick={() => setActiveTab('registration')}
        >
          Staff Registration
        </div>
        <div 
          className={`settings-tab ${activeTab === 'salary-details' ? 'active-tab' : 'inactive-tab'}`} 
          style={{ borderRadius: '0', padding: '12px 20px', borderBottom: 'none', borderLeft: activeTab === 'salary-details' ? '1px solid #dee2e6' : 'none', cursor: 'pointer' }}
          onClick={() => setActiveTab('salary-details')}
        >
          Staff Salary Details
        </div>
        <div 
          className={`settings-tab ${activeTab === 'salary-head' ? 'active-tab' : 'inactive-tab'}`} 
          style={{ borderRadius: '0', padding: '12px 20px', borderBottom: 'none', borderLeft: activeTab === 'salary-head' ? '1px solid #dee2e6' : 'none', cursor: 'pointer' }}
          onClick={() => setActiveTab('salary-head')}
        >
          Staff Salary Head
        </div>
        <div 
          className={`settings-tab ${activeTab === 'education-details' ? 'active-tab' : 'inactive-tab'}`} 
          style={{ borderRadius: '0', padding: '12px 20px', borderBottom: 'none', borderLeft: activeTab === 'education-details' ? '1px solid #dee2e6' : 'none', cursor: 'pointer' }}
          onClick={() => setActiveTab('education-details')}
        >
          Staff Education Details
        </div>
        <div 
          className={`settings-tab ${activeTab === 'experience-details' ? 'active-tab' : 'inactive-tab'}`} 
          style={{ borderRadius: '0', padding: '12px 20px', borderBottom: 'none', borderLeft: activeTab === 'experience-details' ? '1px solid #dee2e6' : 'none', cursor: 'pointer' }}
          onClick={() => setActiveTab('experience-details')}
        >
          Staff Experience Details
        </div>
        <div 
          className={`settings-tab ${activeTab === 'other-information' ? 'active-tab' : 'inactive-tab'}`} 
          style={{ borderRadius: '0', padding: '12px 20px', borderBottom: 'none', borderLeft: activeTab === 'other-information' ? '1px solid #dee2e6' : 'none', cursor: 'pointer' }}
          onClick={() => setActiveTab('other-information')}
        >
          Other Information
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #dee2e6', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ padding: '8px 15px', backgroundColor: '#f8f9fa', color: '#495057', fontSize: '13px', fontWeight: '500', borderRight: '1px solid #dee2e6' }}>Enter/Search Name</div>
          <input type="text" style={{ padding: '8px 12px', border: 'none', width: '300px', outline: 'none' }} />
          <button style={{ padding: '8px 20px', backgroundColor: 'white', color: '#159BD7', border: 'none', borderLeft: '1px solid #dee2e6', cursor: 'pointer', fontSize: '13px' }}>Search</button>
        </div>
      </div>

      <div style={{ padding: '0 20px' }}>
        
        {activeTab === 'registration' && (
          <>
            {/* Row 1 */}
        <div className="settings-row" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
          <div className="form-group" style={{ gridColumn: 'span 2', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
            <div>
              <label>Pref No.</label>
              <input type="text" className="settings-input" defaultValue="72" style={{ width: '100%' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button style={{ padding: '8px 20px', backgroundColor: 'white', color: '#159BD7', border: '1px solid #159BD7', borderRadius: '4px', cursor: 'pointer', width: '100%' }}>Get</button>
            </div>
          </div>
          <div className="form-group">
            <label>Status</label>
            <label className="checkbox-label" style={{ marginTop: '8px', color: '#333' }}>
              <input type="checkbox" defaultChecked /> Active
            </label>
          </div>
        </div>

        {/* Row 2 */}
        <div className="settings-row" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
          <div className="form-group">
            <label>Title</label>
            <select className="settings-input">
              <option>Mr.</option>
              <option>Mrs.</option>
              <option>Miss</option>
            </select>
          </div>
          <div className="form-group">
            <label>First Name <span style={{ color: '#dc3545' }}>*</span></label>
            <input type="text" className="settings-input" />
          </div>
          <div className="form-group">
            <label>Middle Name</label>
            <input type="text" className="settings-input" />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" className="settings-input" />
          </div>
          <div className="form-group">
            <label>Date of Birth <span style={{ color: '#dc3545' }}>*</span></label>
            <input type="text" className="settings-input" />
          </div>
        </div>

        {/* Row 3 */}
        <div className="settings-row" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
          <div className="form-group">
            <label>Email</label>
            <input type="text" className="settings-input" />
          </div>
          <div className="form-group">
            <label>Mobile <span style={{ color: '#dc3545' }}>*</span></label>
            <input type="text" className="settings-input" />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="text" className="settings-input" />
          </div>
          <div className="form-group">
            <label>Aadhar Card No.</label>
            <input type="text" className="settings-input" />
          </div>
          <div className="form-group">
            <label>Select Blood Group</label>
            <select className="settings-input">
              <option>Select Blood Group</option>
            </select>
          </div>
        </div>

        {/* Row 4 */}
        <div className="settings-row" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
          <div className="form-group">
            <label>Gender</label>
            <div style={{ display: 'flex', gap: '15px', marginTop: '8px' }}>
              <label className="checkbox-label" style={{ fontWeight: 'normal' }}>
                <input type="radio" name="gender" defaultChecked /> Male
              </label>
              <label className="checkbox-label" style={{ fontWeight: 'normal' }}>
                <input type="radio" name="gender" /> Female
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>Category</label>
            <select className="settings-input">
              <option>Select Category</option>
            </select>
          </div>
          <div className="form-group">
            <label>Date of Anniversary</label>
            <input type="text" className="settings-input" />
          </div>
          <div className="form-group">
            <label>Father/Spouse Name</label>
            <input type="text" className="settings-input" />
          </div>
          <div className="form-group">
            <label>Mother Name</label>
            <input type="text" className="settings-input" />
          </div>
        </div>

        {/* Row 5 */}
        <div className="settings-row" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
          <div className="form-group">
            <label>Father/Spouse mobile</label>
            <input type="text" className="settings-input" />
          </div>
          <div className="form-group">
            <label>Father/Spouse Relation</label>
            <select className="settings-input">
              <option></option>
            </select>
          </div>
          <div className="form-group">
            <label>Native Address</label>
            <input type="text" className="settings-input" />
          </div>
          <div className="form-group">
            <label>Current Address</label>
            <input type="text" className="settings-input" />
          </div>
          <div className="form-group">
            <label>Alternate Email</label>
            <input type="text" className="settings-input" />
          </div>
        </div>

        {/* Row 6 */}
        <div className="settings-row" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px', marginBottom: '40px' }}>
          <div className="form-group">
            <label>Alternate Mobile</label>
            <input type="text" className="settings-input" />
          </div>
          <div className="form-group">
            <label>Emergency Contact Person Name</label>
            <input type="text" className="settings-input" />
          </div>
          <div className="form-group">
            <label>Device Number</label>
            <input type="text" className="settings-input" />
          </div>
        </div>

        {/* Row 8 - New fields from screenshots */}
        <div className="settings-row" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
          <div className="form-group">
            <label>Marital Status</label>
            <div style={{ display: 'flex', gap: '10px', marginTop: '8px', flexWrap: 'wrap' }}>
              <label className="checkbox-label" style={{ fontWeight: 'normal' }}><input type="radio" name="marital" /> Married</label>
              <label className="checkbox-label" style={{ fontWeight: 'normal' }}><input type="radio" name="marital" defaultChecked /> Unmarried</label>
              <label className="checkbox-label" style={{ fontWeight: 'normal' }}><input type="radio" name="marital" /> Others</label>
            </div>
          </div>
          <div className="form-group">
            <label>Spouse Name</label>
            <input type="text" className="settings-input" />
          </div>
          <div className="form-group">
            <label>Emergency Mobile</label>
            <input type="text" className="settings-input" />
          </div>
          <div className="form-group">
            <label>Qualification</label>
            <input type="text" className="settings-input" />
          </div>
          <div className="form-group">
            <label>Date of Joining</label>
            <input type="text" className="settings-input" defaultValue="30-Aug-2026" />
          </div>
        </div>

        {/* Row 9 */}
        <div className="settings-row" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
          <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '10px', alignItems: 'end' }}>
            <div>
              <label>Date of Retire</label>
              <input type="text" className="settings-input" defaultValue="30-Aug-2026" style={{ width: '100%' }} />
            </div>
            <label className="checkbox-label" style={{ marginBottom: '8px' }}><input type="checkbox" /> Extend</label>
          </div>
          <div className="form-group">
            <label>Select Nationality</label>
            <select className="settings-input"><option>Select Nationality</option></select>
          </div>
          <div className="form-group">
            <label>Select Religion</label>
            <select className="settings-input"><option>Select Religion</option></select>
          </div>
          <div className="form-group">
            <label>Family Id</label>
            <input type="text" className="settings-input" />
          </div>
          <div className="form-group">
            <label>Remarks</label>
            <input type="text" className="settings-input" />
          </div>
        </div>

        {/* Row 10 */}
        <div className="settings-row" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
          <div className="form-group">
            <label>CBSE ID</label>
            <input type="text" className="settings-input" />
          </div>
          <div className="form-group" style={{ position: 'relative' }}>
            <label>CBSE Password</label>
            <input type="password" className="settings-input" />
            <Eye size={16} color="#6c757d" style={{ position: 'absolute', right: '10px', top: '32px', cursor: 'pointer' }} />
          </div>
          <div className="form-group">
            <label>Nominee for Gratuity</label>
            <input type="text" className="settings-input" />
          </div>
          <div className="form-group">
            <label>State Teacher Code</label>
            <input type="text" className="settings-input" />
          </div>
          <div className="form-group">
            <label>National Teacher Code</label>
            <input type="text" className="settings-input" />
          </div>
        </div>

        {/* Row 11 */}
        <div className="settings-row" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
          <div className="form-group">
            <label>Subject Expertise</label>
            <input type="text" className="settings-input" />
          </div>
          <div className="form-group">
            <label>Nominee for PF</label>
            <input type="text" className="settings-input" />
          </div>
          <div className="form-group">
            <label>Gratuity Nominee Aadhar Number</label>
            <input type="text" className="settings-input" />
          </div>
          <div className="form-group">
            <label>Gratuity Nominee Phone Number</label>
            <input type="text" className="settings-input" />
          </div>
          <div></div>
        </div>

        {/* Row 12 - Checkboxes */}
        <div className="settings-row" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px', backgroundColor: '#f8f9fa', padding: '15px', border: '1px solid #dee2e6', marginTop: '10px' }}>
          <label className="checkbox-label" style={{ fontWeight: 'normal' }}><input type="checkbox" /> Child Protection</label>
          <label className="checkbox-label" style={{ fontWeight: 'normal' }}><input type="checkbox" /> Police Clearance Certificate</label>
          <label className="checkbox-label" style={{ fontWeight: 'normal' }}><input type="checkbox" /> Medical Fitness Certificate</label>
          <label className="checkbox-label" style={{ fontWeight: 'normal' }}><input type="checkbox" /> Special Educator</label>
          <div></div>
        </div>
        <div className="settings-row" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px', backgroundColor: '#f8f9fa', padding: '15px', border: '1px solid #dee2e6', borderTop: 'none', marginBottom: '20px' }}>
          <label className="checkbox-label" style={{ fontWeight: 'normal' }}><input type="checkbox" /> Auto Assign Leaves</label>
        </div>
          </>
        )}

        {activeTab === 'salary-details' && (
          <div style={{ marginTop: '20px' }}>
            
            <div className="settings-row" style={{ gridTemplateColumns: 'repeat(6, 1fr)', gap: '15px' }}>
              <div className="form-group"><label>Emp No</label><input type="text" className="settings-input" /></div>
              <div className="form-group"><label>PF No</label><input type="text" className="settings-input" /></div>
              <div className="form-group"><label>PAN No</label><input type="text" className="settings-input" /></div>
              <div className="form-group"><label>ESI No</label><input type="text" className="settings-input" /></div>
              <div className="form-group"><label>Bank Name</label><select className="settings-input"><option>Select</option></select></div>
              <div className="form-group"><label>Bank Acc No</label><input type="text" className="settings-input" /></div>
            </div>

            <div className="settings-row" style={{ gridTemplateColumns: 'repeat(6, 1fr)', gap: '15px' }}>
              <div className="form-group"><label>Emp Acc No</label><input type="text" className="settings-input" /></div>
              <div className="form-group"><label>UAN No</label><input type="text" className="settings-input" /></div>
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', paddingTop: '20px' }}>
                <label className="checkbox-label" style={{ fontWeight: 'normal' }}><input type="checkbox" /> Generate Salary</label>
              </div>
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', paddingTop: '20px' }}>
                <label className="checkbox-label" style={{ fontWeight: 'normal' }}><input type="checkbox" /> Salary To Bank</label>
              </div>
              <div className="form-group"><label>Status</label><select className="settings-input"><option>Select</option></select></div>
              <div className="form-group"><label>Machine no</label><input type="text" className="settings-input" /></div>
            </div>

            <div className="settings-row" style={{ gridTemplateColumns: 'repeat(6, 1fr)', gap: '15px' }}>
              <div className="form-group"><label>Salary Group</label><select className="settings-input"><option>Select Group</option></select></div>
              <div className="form-group"><label>Gratuity Code</label><input type="text" className="settings-input" /></div>
              <div className="form-group"><label>IFSC Code</label><input type="text" className="settings-input" /></div>
              <div className="form-group" style={{ gridColumn: 'span 2' }}><label>Payment Modes</label><select className="settings-input"><option>Select Payments Mode</option></select></div>
              <div className="form-group"><label>RCI No</label><input type="text" className="settings-input" /></div>
            </div>

            <div style={{ backgroundColor: '#f8f9fa', padding: '10px 15px', fontWeight: 'bold', fontSize: '13px', color: '#495057', border: '1px solid #dee2e6', marginTop: '20px' }}>
              Basic Salary Part
            </div>
            <div className="mail-table-wrapper" style={{ borderTop: 'none', borderRadius: '0' }}>
              <table className="mail-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Value</th>
                    <th>Level</th>
                    <th>Applied On</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="row-odd">
                    <td>Basic</td>
                    <td><input type="text" className="settings-input" defaultValue="0.00" style={{ width: '100%' }} /></td>
                    <td>Level 0</td>
                    <td></td>
                  </tr>
                  <tr className="row-even">
                    <td>Grade Pay</td>
                    <td><input type="text" className="settings-input" defaultValue="0.00" style={{ width: '100%' }} /></td>
                    <td>Level 0</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="settings-row" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px', marginTop: '20px' }}>
              <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end', gap: '5px' }}>
                <div><label>Confirmation Date</label><input type="text" className="settings-input" /></div>
                <label className="checkbox-label" style={{ marginBottom: '8px', fontSize: '11px' }}><input type="checkbox" defaultChecked /> N/A</label>
              </div>
              <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end', gap: '5px' }}>
                <div><label>Permanent Date</label><input type="text" className="settings-input" /></div>
                <label className="checkbox-label" style={{ marginBottom: '8px', fontSize: '11px' }}><input type="checkbox" defaultChecked /> N/A</label>
              </div>
              <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end', gap: '5px' }}>
                <div><label>Leaving Date</label><input type="text" className="settings-input" /></div>
                <label className="checkbox-label" style={{ marginBottom: '8px', fontSize: '11px' }}><input type="checkbox" defaultChecked /> N/A</label>
              </div>
              <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end', gap: '5px' }}>
                <div><label>Probation Date</label><input type="text" className="settings-input" /></div>
                <label className="checkbox-label" style={{ marginBottom: '8px', fontSize: '11px' }}><input type="checkbox" defaultChecked /> N/A</label>
              </div>
              <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end', gap: '5px' }}>
                <div><label>Joining Date EPF</label><input type="text" className="settings-input" /></div>
                <label className="checkbox-label" style={{ marginBottom: '8px', fontSize: '11px' }}><input type="checkbox" defaultChecked /> N/A</label>
              </div>
            </div>

            <div className="settings-row" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
              <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end', gap: '5px' }}>
                <div><label>Leaving Date EPF</label><input type="text" className="settings-input" /></div>
                <label className="checkbox-label" style={{ marginBottom: '8px', fontSize: '11px' }}><input type="checkbox" defaultChecked /> N/A</label>
              </div>
              <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end', gap: '5px' }}>
                <div><label>Leaving Date EPS</label><input type="text" className="settings-input" /></div>
                <label className="checkbox-label" style={{ marginBottom: '8px', fontSize: '11px' }}><input type="checkbox" defaultChecked /> N/A</label>
              </div>
              <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end', gap: '5px' }}>
                <div><label>Increment Date</label><input type="text" className="settings-input" /></div>
                <label className="checkbox-label" style={{ marginBottom: '8px', fontSize: '11px' }}><input type="checkbox" defaultChecked /> N/A</label>
              </div>
              <div className="form-group">
                <label>Reason Of Leaving</label><select className="settings-input"><option>Select</option></select>
              </div>
              <div className="form-group">
                <label>Short Name</label><select className="settings-input"><option>Select</option></select>
              </div>
            </div>

            <div className="settings-row" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
              <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end', gap: '5px' }}>
                <div><label>MACP 1</label><input type="text" className="settings-input" /></div>
                <label className="checkbox-label" style={{ marginBottom: '8px', fontSize: '11px' }}><input type="checkbox" defaultChecked /> N/A</label>
              </div>
              <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end', gap: '5px' }}>
                <div><label>MACP 2</label><input type="text" className="settings-input" /></div>
                <label className="checkbox-label" style={{ marginBottom: '8px', fontSize: '11px' }}><input type="checkbox" defaultChecked /> N/A</label>
              </div>
              <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end', gap: '5px' }}>
                <div><label>MACP 3</label><input type="text" className="settings-input" /></div>
                <label className="checkbox-label" style={{ marginBottom: '8px', fontSize: '11px' }}><input type="checkbox" defaultChecked /> N/A</label>
              </div>
              <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end', gap: '5px' }}>
                <div><label>PF Joining Date</label><input type="text" className="settings-input" /></div>
                <label className="checkbox-label" style={{ marginBottom: '8px', fontSize: '11px' }}><input type="checkbox" defaultChecked /> N/A</label>
              </div>
              <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end', gap: '5px' }}>
                <div><label>Extension Start Date</label><input type="text" className="settings-input" /></div>
                <label className="checkbox-label" style={{ marginBottom: '8px', fontSize: '11px' }}><input type="checkbox" defaultChecked /> N/A</label>
              </div>
            </div>

          </div>
        )}

        {activeTab === 'salary-head' && (
          <div style={{ marginTop: '20px' }}>
            <div className="mail-table-wrapper">
              <table className="mail-table">
                <thead>
                  <tr>
                    <th style={{ width: '60px' }}>Sr. No.</th>
                    <th style={{ width: '80px', textAlign: 'center' }}>Select</th>
                    <th>Head Name</th>
                    <th>Value</th>
                    <th>ValueType</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 1, name: 'Dearness Allowance', val: '95.00', type: 'Percentage' },
                    { id: 2, name: 'House Rent Allowance', val: '5.00', type: 'Percentage' },
                    { id: 3, name: 'Transport Allowance', val: '1600.00', type: 'Amount' },
                    { id: 4, name: 'Medical Allowance', val: '75.00', type: 'Amount' },
                    { id: 5, name: 'City expenses', val: '300.00', type: 'Amount' },
                    { id: 6, name: 'Other Allowances', val: '0.00', type: 'Occasional' },
                    { id: 7, name: 'Basic Arrear', val: '0.00', type: 'Occasional' },
                    { id: 8, name: 'Dearness Allowance Arrear', val: '0.00', type: 'Occasional' },
                    { id: 9, name: 'House Rent Allowance Arrear', val: '0.00', type: 'Occasional' },
                    { id: 10, name: 'Transport Allowance Arrear', val: '0.00', type: 'Occasional' },
                    { id: 11, name: 'Provident Fund', val: '12.00', type: 'Custom' },
                    { id: 12, name: 'Employee State Insurance', val: '1.75', type: 'Percentage' },
                    { id: 13, name: 'Income Tax', val: '0.00', type: 'Occasional' },
                    { id: 14, name: 'Advance', val: '0.00', type: 'Occasional' }
                  ].map((row, i) => (
                    <tr key={row.id} className={i % 2 === 0 ? 'row-odd' : 'row-even'}>
                      <td>{row.id}</td>
                      <td style={{ textAlign: 'center' }}><input type="checkbox" /></td>
                      <td>{row.name}</td>
                      <td><input type="text" className="settings-input" defaultValue={row.val} style={{ width: '100%', padding: '4px 8px' }} /></td>
                      <td>{row.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'education-details' && (
          <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#333', textTransform: 'uppercase' }}>Details of Qualification:</div>
              <div style={{ fontSize: '10px', color: '#6c757d', fontWeight: 'bold' }}>R:REGULAR; C:CORRESPONDENCE; FYMS:FINAL YEAR MARK SHEET:</div>
            </div>
            
            <div className="mail-table-wrapper">
              <table className="mail-table">
                <thead>
                  <tr>
                    <th style={{ width: '50px', textAlign: 'center' }}>Sl No.</th>
                    <th style={{ width: '150px' }}>Qualification</th>
                    <th>Name of the School/College</th>
                    <th>Name of the Board/University</th>
                    <th>Regular/Correspondence</th>
                    <th>Subjects</th>
                    <th style={{ width: '100px' }}>% of Marks</th>
                    <th style={{ width: '120px' }}>Year of Passing</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 1, qual: '10th' },
                    { id: 2, qual: '12th' },
                    { id: 3, qual: 'Graduation B.A./B.Sc.' },
                    { id: 4, qual: 'B.Ed.' },
                    { id: 5, qual: 'Post Graduation' }
                  ].map((row, i) => (
                    <tr key={row.id} className={i % 2 === 0 ? 'row-even' : 'row-odd'}>
                      <td style={{ textAlign: 'center' }}>{row.id}</td>
                      <td>{row.qual}</td>
                      <td><input type="text" className="settings-input" style={{ width: '100%', padding: '4px 8px' }} /></td>
                      <td><input type="text" className="settings-input" style={{ width: '100%', padding: '4px 8px' }} /></td>
                      <td><input type="text" className="settings-input" style={{ width: '100%', padding: '4px 8px' }} /></td>
                      <td><input type="text" className="settings-input" style={{ width: '100%', padding: '4px 8px' }} /></td>
                      <td><input type="text" className="settings-input" style={{ width: '100%', padding: '4px 8px' }} /></td>
                      <td><input type="text" className="settings-input" style={{ width: '100%', padding: '4px 8px' }} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'experience-details' && (
          <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#333', textTransform: 'uppercase' }}>Details of Experience:</div>
              <button style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '6px 15px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Add Row</button>
            </div>
            
            <div className="mail-table-wrapper">
              <table className="mail-table">
                <thead>
                  <tr>
                    <th style={{ width: '50px', textAlign: 'center' }}>SL.NO.</th>
                    <th style={{ width: '60px', textAlign: 'center' }}>Select</th>
                    <th>Name & Address of The Institution</th>
                    <th>Year (From)</th>
                    <th>Year (TO)</th>
                    <th>Post Hold</th>
                    <th>Nature of Job (Permanenet/Temporary)</th>
                    <th>Reason Of Leaving</th>
                    <th style={{ width: '60px', textAlign: 'center' }}>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="row-even">
                    <td style={{ textAlign: 'center' }}>1</td>
                    <td style={{ textAlign: 'center' }}><input type="checkbox" /></td>
                    <td><input type="text" className="settings-input" style={{ width: '100%', padding: '4px 8px' }} /></td>
                    <td><input type="text" className="settings-input" style={{ width: '100%', padding: '4px 8px' }} /></td>
                    <td><input type="text" className="settings-input" style={{ width: '100%', padding: '4px 8px' }} /></td>
                    <td><input type="text" className="settings-input" style={{ width: '100%', padding: '4px 8px' }} /></td>
                    <td><input type="text" className="settings-input" style={{ width: '100%', padding: '4px 8px' }} /></td>
                    <td><input type="text" className="settings-input" style={{ width: '100%', padding: '4px 8px' }} /></td>
                    <td style={{ textAlign: 'center' }}>
                      <button style={{ backgroundColor: 'white', border: '1px solid #159BD7', color: '#159BD7', padding: '2px 6px', borderRadius: '50%', cursor: 'pointer' }}><X size={12} /></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', gap: '40px', marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}>
              <label className="checkbox-label" style={{ fontWeight: 'normal' }}><input type="checkbox" /> Weather He/She is TET qualified?</label>
              <label className="checkbox-label" style={{ fontWeight: 'normal' }}><input type="checkbox" /> Is CTET Qualified?</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Level of TET Exam</label>
                <select className="settings-input" style={{ padding: '4px 8px' }}><option>Select</option></select>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'other-information' && (
          <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#333', textTransform: 'uppercase' }}>Children Details:</div>
              <button style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '6px 15px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Add Row</button>
            </div>
            
            <div className="mail-table-wrapper" style={{ marginBottom: '20px' }}>
              <table className="mail-table">
                <thead>
                  <tr>
                    <th style={{ width: '80px', textAlign: 'center' }}>SL.NO.</th>
                    <th>Name of Children</th>
                    <th>DOB</th>
                    <th style={{ width: '80px', textAlign: 'center' }}>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="row-even">
                    <td style={{ textAlign: 'center' }}>1</td>
                    <td><input type="text" className="settings-input" style={{ width: '300px', padding: '4px 8px' }} /></td>
                    <td><input type="date" className="settings-input" style={{ width: '200px', padding: '4px 8px' }} /></td>
                    <td style={{ textAlign: 'center' }}>
                      <button style={{ backgroundColor: 'white', border: '1px solid #159BD7', color: '#159BD7', padding: '4px 6px', borderRadius: '50%', cursor: 'pointer' }}><X size={14} /></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ border: '1px solid #dee2e6', marginBottom: '20px' }}>
              <div style={{ backgroundColor: '#f8f9fa', padding: '10px 15px', fontWeight: 'bold', fontSize: '13px', color: '#333', borderBottom: '1px solid #dee2e6' }}>
                EXTRA CURRICULAR ACTIVITIES/ACHIEVEMENTS:
              </div>
              <div style={{ padding: '15px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: 'bold' }}>Extra Activities</label>
                <input type="text" className="settings-input" style={{ width: '500px' }} />
              </div>
            </div>

            <div style={{ border: '1px solid #dee2e6', marginBottom: '20px' }}>
              <div style={{ backgroundColor: '#f8f9fa', padding: '10px 15px', fontWeight: 'bold', fontSize: '13px', color: '#333', borderBottom: '1px solid #dee2e6' }}>
                REFERENCE 1:
              </div>
              <div className="settings-row" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', padding: '15px' }}>
                <div className="form-group"><label>Person Name</label><input type="text" className="settings-input" /></div>
                <div className="form-group"><label>Mobile Number</label><input type="text" className="settings-input" /></div>
                <div className="form-group"><label>Address</label><input type="text" className="settings-input" /></div>
                <div className="form-group"><label>Relation</label><input type="text" className="settings-input" /></div>
              </div>
            </div>

            <div style={{ border: '1px solid #dee2e6', marginBottom: '20px' }}>
              <div style={{ backgroundColor: '#f8f9fa', padding: '10px 15px', fontWeight: 'bold', fontSize: '13px', color: '#333', borderBottom: '1px solid #dee2e6' }}>
                REFERENCE 2:
              </div>
              <div className="settings-row" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', padding: '15px' }}>
                <div className="form-group"><label>Person Name</label><input type="text" className="settings-input" /></div>
                <div className="form-group"><label>Mobile Number</label><input type="text" className="settings-input" /></div>
                <div className="form-group"><label>Address</label><input type="text" className="settings-input" /></div>
                <div className="form-group"><label>Relation</label><input type="text" className="settings-input" /></div>
              </div>
            </div>

            <div style={{ border: '1px solid #dee2e6', marginBottom: '20px' }}>
              <div style={{ backgroundColor: '#f8f9fa', padding: '10px 15px', fontWeight: 'bold', fontSize: '13px', color: '#333', borderBottom: '1px solid #dee2e6' }}>
                ANY OTHER INFORMATION:
              </div>
              <div style={{ padding: '15px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: 'bold' }}>OTHER INFORMATION</label>
                <input type="text" className="settings-input" style={{ width: '500px' }} />
              </div>
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', padding: '20px 0', borderTop: '1px solid #dee2e6', marginTop: '20px' }}>
          <button style={{ backgroundColor: 'white', border: '1px solid #28a745', color: '#28a745', padding: '6px 20px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <Save size={16} /> Save
          </button>
          <button style={{ backgroundColor: 'white', border: '1px solid #159BD7', color: '#159BD7', padding: '6px 20px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <Eye size={16} /> View
          </button>
          <button style={{ backgroundColor: 'white', border: '1px solid #ffc107', color: '#ffc107', padding: '6px 20px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <X size={16} /> Reset
          </button>
        </div>

      </div>
    </div>
  );
}
