import React from 'react';
import { Eye, Save, X, Italic, Bold, Underline, Link, Image, Code, HelpCircle, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

export default function JobPosting() {
  return (
    <div className="global-settings-container">
      <div style={{ padding: '20px 40px', maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Job Title */}
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold' }}>Job Title</label>
          <input type="text" className="settings-input" />
        </div>

        {/* Row 2 */}
        <div className="settings-row" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '30px', marginBottom: '20px' }}>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>Department</label>
            <select className="settings-input"><option>Select Department</option></select>
          </div>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>Required Experience (In Yrs)</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <select className="settings-input" style={{ flex: 1 }}><option>Select</option></select>
              <span style={{ fontWeight: 'bold' }}>To</span>
              <select className="settings-input" style={{ flex: 1 }}><option>Select</option></select>
            </div>
          </div>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>Required Qualification</label>
            <select className="settings-input"><option>Select Qualification</option></select>
          </div>
        </div>

        {/* Row 3 */}
        <div className="settings-row" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '30px', marginBottom: '20px' }}>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>No. of Vacancies</label>
            <input type="text" className="settings-input" />
          </div>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>Employment Type</label>
            <select className="settings-input"><option>Select</option></select>
          </div>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>Age Limit (Optional)</label>
            <input type="text" className="settings-input" />
          </div>
        </div>

        {/* Row 4 */}
        <div className="settings-row" style={{ gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>Annual CTC</label>
            <input type="text" className="settings-input" />
          </div>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>Required Skills</label>
            <input type="text" className="settings-input" />
          </div>
        </div>

        {/* Rich Text Editor */}
        <div className="form-group" style={{ marginBottom: '30px' }}>
          <label style={{ fontWeight: 'bold' }}>Job Description</label>
          <div style={{ border: '1px solid #ced4da', borderRadius: '4px' }}>
            <div style={{ display: 'flex', gap: '5px', padding: '10px', borderBottom: '1px solid #ced4da', backgroundColor: '#f8f9fa', flexWrap: 'wrap', alignItems: 'center' }}>
              <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '5px' }}><Italic size={16} /></button>
              <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '5px' }}><Bold size={16} /></button>
              <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '5px' }}><Underline size={16} /></button>
              <span style={{ borderLeft: '1px solid #ccc', height: '20px', margin: '0 5px' }}></span>
              <select style={{ border: '1px solid #ced4da', borderRadius: '4px', padding: '2px 5px' }}><option>Rubik</option></select>
              <select style={{ border: '1px solid #ced4da', borderRadius: '4px', padding: '2px 5px' }}><option>14</option></select>
              <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '5px', fontWeight: 'bold', color: 'black', borderBottom: '3px solid yellow' }}>A</button>
              <span style={{ borderLeft: '1px solid #ccc', height: '20px', margin: '0 5px' }}></span>
              <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '5px' }}><AlignLeft size={16} /></button>
              <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '5px' }}><AlignCenter size={16} /></button>
              <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '5px' }}><AlignRight size={16} /></button>
              <span style={{ borderLeft: '1px solid #ccc', height: '20px', margin: '0 5px' }}></span>
              <span style={{ fontWeight: 'bold', fontFamily: 'serif', padding: '5px', cursor: 'pointer' }}>Tt<span style={{ fontSize: '10px' }}>▼</span></span>
              <span style={{ borderLeft: '1px solid #ccc', height: '20px', margin: '0 5px' }}></span>
              <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '5px' }}>▦</button>
              <span style={{ borderLeft: '1px solid #ccc', height: '20px', margin: '0 5px' }}></span>
              <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '5px' }}><Link size={16} /></button>
              <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '5px' }}><Image size={16} /></button>
              <span style={{ borderLeft: '1px solid #ccc', height: '20px', margin: '0 5px' }}></span>
              <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '5px' }}><Code size={16} /></button>
              <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '5px' }}><HelpCircle size={16} /></button>
            </div>
            <textarea style={{ width: '100%', height: '250px', border: 'none', padding: '15px', resize: 'none', outline: 'none' }}></textarea>
          </div>
        </div>

        {/* Bottom Dates and Status */}
        <div className="settings-row" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '30px', marginBottom: '40px' }}>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>Publish Vacancy On</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="text" className="settings-input" defaultValue="30-Aug-2026" style={{ flex: 2 }} />
              <select className="settings-input" style={{ flex: 1 }}><option>0: 0 AM</option></select>
            </div>
          </div>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>Publish Vacancy Till</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="text" className="settings-input" defaultValue="30-Aug-2026" style={{ flex: 2 }} />
              <select className="settings-input" style={{ flex: 1 }}><option>0: 0 AM</option></select>
            </div>
          </div>
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <label style={{ fontWeight: 'bold' }}>Status</label>
            <div style={{ marginTop: '10px', width: '40px', height: '20px', backgroundColor: '#e9ecef', borderRadius: '20px', position: 'relative', border: '1px solid #ced4da', cursor: 'pointer' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '1px', left: '1px', border: '1px solid #ccc' }}></div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <button style={{ backgroundColor: 'white', color: '#159BD7', border: '1px solid #159BD7', padding: '6px 20px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <Eye size={16} /> View
          </button>
          <button style={{ backgroundColor: 'white', color: '#28a745', border: '1px solid #28a745', padding: '6px 20px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <Save size={16} /> Save & Publish
          </button>
          <button style={{ backgroundColor: 'white', color: '#ff9800', border: '1px solid #ff9800', padding: '6px 20px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <X size={16} /> Reset
          </button>
        </div>

      </div>
    </div>
  );
}
