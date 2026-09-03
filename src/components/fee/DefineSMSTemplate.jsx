import React, { useState, useEffect } from 'react';
import { Plus, Save, Eye, Printer, XCircle, Check, X } from 'lucide-react';

const Toggle = ({ label, checked, onChange }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ fontSize: '13px', color: '#333' }}>{label}</span>
      <div 
        onClick={() => onChange(!checked)}
        style={{
          width: 36, height: 20, borderRadius: 10,
          background: checked ? '#4ade80' : '#fff',
          border: checked ? '1px solid #4ade80' : '1px solid #cbd5e1',
          position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0
        }}
      >
        <div style={{
          width: 14, height: 14, borderRadius: '50%', 
          background: checked ? '#fff' : '#cbd5e1',
          position: 'absolute', top: 2, left: checked ? 18 : 2,
          transition: 'left 0.2s'
        }} />
      </div>
    </div>
  );
};

const OutlineButton = ({ icon: Icon, text, color, onClick, disabled }) => (
  <button 
    onClick={onClick}
    disabled={disabled}
    style={{
      display: 'flex', alignItems: 'center', gap: '6px',
      padding: '6px 16px', backgroundColor: '#fff', border: `1px solid ${disabled ? '#ccc' : color}`, borderRadius: '4px',
      color: disabled ? '#ccc' : color, fontSize: '13px', fontWeight: 500, cursor: disabled ? 'not-allowed' : 'pointer'
  }}>
    <Icon size={14} /> {text}
  </button>
);

const VARS_LEFT = [
  'StudentName :- S____',
  'Receiving Date :- Rd____',
  'Installment Name:- IN____',
  'School name:- #school__',
  'Salary Month:- M____',
  'Absent Days:- AB____',
  'Payment URL:- #payurl__',
  'Slot Time:- St____',
  'Expiry Date:- ExpDate__'
];

const VARS_MIDDLE = [
  'Amount :- Amt____',
  'ReceiptNo :- Rid____',
  'RegistrationNo:- #RegNo__',
  'Class Name:- #Class__',
  'Total Days:- W____',
  'Total Salary:- Sal____',
  'Adm No:- #AdmNo____',
  'Exam Location:- EL____',
  'Join Date:- JoinDate__'
];

const VARS_RIGHT = [
  'Bus Stop Name:- #Stop__',
  'VehIcle Name:- #VehIcle__',
  'Route Name:- #Route__',
  'Staff Name:- R____',
  'Present Days:- D____',
  'Line Change:- %0A',
  'Slot Date:- Sd____',
  'Designation:- Des____',
  'Travel From:- TrFrm__'
];

export default function DefineSMSTemplate() {
  const [templates, setTemplates] = useState([]);
  
  const [selectedId, setSelectedId] = useState('');
  const [subject, setSubject] = useState('');
  const [messageText, setMessageText] = useState('');
  const [templateId, setTemplateId] = useState('');
  const [smsEnable, setSmsEnable] = useState(false);
  const [isUnicode, setIsUnicode] = useState(false);
  const [pushNotificationEnable, setPushNotificationEnable] = useState(false);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [isError, setIsError] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this SMS template?')) return;
    try {
      const token = localStorage.getItem('token');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${API_URL}/api/sms/templates/${id}`, {
        method: 'DELETE',
        headers
      });

      if (!res.ok) throw new Error('Failed to delete template');
      
      setIsError(false);
      setToastMsg('Template deleted successfully');
      setTimeout(() => setToastMsg(null), 3000);
      
      if (selectedId === id) {
        handleReset();
      }
      fetchTemplates();
    } catch (error) {
      console.error(error);
      setIsError(true);
      setToastMsg(error.message || 'Error deleting template');
      setTimeout(() => setToastMsg(null), 3000);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${API_URL}/api/sms/templates`, { headers });
      if (res.ok) {
        const data = await res.json();
        setTemplates(data || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTemplate = (e) => {
    const id = e.target.value;
    setSelectedId(id);
    if (!id) {
      handleReset();
      return;
    }
    const t = templates.find(x => x._id === id);
    if (t) {
      setSubject(t.subject || '');
      setMessageText(t.message || '');
      setTemplateId(t.templateId || '');
      setSmsEnable(t.smsEnable || false);
      setIsUnicode(t.isUnicode || false);
      setPushNotificationEnable(t.pushNotificationEnable || false);
    }
  };

  const handleSave = async () => {
    if (!subject || !messageText) {
      setIsError(true);
      setToastMsg('SMS Type (Subject) and SMS Message are required.');
      setTimeout(() => setToastMsg(null), 3000);
      return;
    }

    setSubmitting(true);
    const payload = {
      subject,
      message: messageText,
      templateId,
      smsEnable,
      isUnicode,
      pushNotificationEnable
    };

    try {
      const token = localStorage.getItem('token');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      let url = `${API_URL}/api/sms/templates`;
      let method = 'POST';

      if (selectedId) {
        url = `${url}/${selectedId}`;
        method = 'PUT';
      }

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to save template');

      setIsError(false);
      setToastMsg(selectedId ? 'Template updated successfully' : 'Template created successfully');
      setTimeout(() => setToastMsg(null), 3000);
      
      handleReset();
      fetchTemplates();
    } catch (error) {
      console.error(error);
      setIsError(true);
      setToastMsg(error.message || 'An error occurred while saving');
      setTimeout(() => setToastMsg(null), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSelectedId('');
    setSubject('');
    setMessageText('');
    setTemplateId('');
    setSmsEnable(false);
    setIsUnicode(false);
    setPushNotificationEnable(false);
  };

  return (
    <div className="printable-content" style={{ background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* Toast Message */}
      {toastMsg && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', backgroundColor: isError ? '#ef4444' : '#4ade80', color: '#fff',
          borderRadius: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 3000, width: '320px',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '12px 16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            {isError ? <X size={20} color="#fff" /> : <Check size={20} color="#fff" />}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>{isError ? 'Error' : 'Success'}</span>
                <button onClick={() => setToastMsg(null)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 0 }}>
                  <X size={14} />
                </button>
              </div>
              <span style={{ fontSize: '13px' }}>{toastMsg}</span>
            </div>
          </div>
        </div>
      )}

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}>
        
        {/* Top Section */}
        <div style={{ padding: '32px 40px', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '100%', maxWidth: '900px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {loading ? (
              <div style={{ textAlign: 'center', color: '#64748b' }}>Loading templates...</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
                
                {/* Existing Templates Dropdown */}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Select Existing Template (Optional)</label>
                  <select 
                    value={selectedId}
                    onChange={handleSelectTemplate}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', color: '#333', cursor: 'pointer' }}
                  >
                    <option value="">-- Create New --</option>
                    {templates.map(t => (
                      <option key={t._id} value={t._id}>{t.subject}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>SMS Type / Subject</label>
                  <input 
                    type="text" 
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    placeholder="Enter SMS Type or Subject"
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', color: '#333' }} 
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>SMS</label>
                  <textarea 
                    value={messageText}
                    onChange={e => setMessageText(e.target.value)}
                    placeholder="Enter SMS Message Content..."
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', color: '#333', minHeight: '80px', resize: 'vertical' }} 
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Template ID</label>
                  <input 
                    type="text" 
                    value={templateId}
                    onChange={e => setTemplateId(e.target.value)}
                    placeholder="Enter Provider Template ID"
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', color: '#333' }} 
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                  <div style={{ display: 'flex', gap: '32px' }}>
                    <Toggle label="SMS Enable" checked={smsEnable} onChange={setSmsEnable} />
                    <Toggle label="Is Unicode" checked={isUnicode} onChange={setIsUnicode} />
                    <Toggle label="Push Notification Enable" checked={pushNotificationEnable} onChange={setPushNotificationEnable} />
                  </div>
                  <button 
                    onClick={handleReset}
                    title="Start New Template"
                    style={{ backgroundColor: '#29a9d8', border: 'none', borderRadius: '4px', width: '32px', height: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', cursor: 'pointer' }}
                  >
                    <Plus size={16} />
                  </button>
                </div>

              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '16px' }}>
              <OutlineButton icon={Save} text={selectedId ? "Update" : "Save"} color="#4ade80" onClick={handleSave} disabled={submitting || loading} />
              <OutlineButton icon={Eye} text="View" color="#29a9d8" onClick={() => setShowViewModal(true)} />
              {/* <OutlineButton icon={Printer} text="Print" color="#29a9d8" onClick={() => window.print()} /> */}
              <OutlineButton icon={XCircle} text="Reset" color="#f59e0b" onClick={handleReset} />
            </div>

          </div>
        </div>

        {/* View Modal */}
        {showViewModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', width: '80%', maxWidth: '800px', maxHeight: '80vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, color: '#333' }}>Existing SMS Templates</h3>
                <button onClick={() => setShowViewModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} color="#666" /></button>
              </div>
              
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '12px 8px', textAlign: 'left', color: '#64748b', fontWeight: 600 }}>Subject</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', color: '#64748b', fontWeight: 600 }}>Template ID</th>
                    <th style={{ padding: '12px 8px', textAlign: 'center', color: '#64748b', fontWeight: 600 }}>SMS</th>
                    <th style={{ padding: '12px 8px', textAlign: 'center', color: '#64748b', fontWeight: 600 }}>Push</th>
                    <th style={{ padding: '12px 8px', textAlign: 'center', color: '#64748b', fontWeight: 600 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {templates.length === 0 ? (
                    <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#9ca3af' }}>No templates found</td></tr>
                  ) : (
                    templates.map(t => (
                      <tr key={t._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '12px 8px', color: '#333' }}>{t.subject}</td>
                        <td style={{ padding: '12px 8px', color: '#333' }}>{t.templateId || 'N/A'}</td>
                        <td style={{ padding: '12px 8px', textAlign: 'center', color: t.smsEnable ? '#4ade80' : '#f87171' }}>{t.smsEnable ? 'Yes' : 'No'}</td>
                        <td style={{ padding: '12px 8px', textAlign: 'center', color: t.pushNotificationEnable ? '#4ade80' : '#f87171' }}>{t.pushNotificationEnable ? 'Yes' : 'No'}</td>
                        <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                          <button 
                            onClick={() => {
                              handleSelectTemplate({ target: { value: t._id } });
                              setShowViewModal(false);
                            }}
                            style={{ background: '#eff6ff', color: '#3b82f6', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', marginRight: '8px', fontSize: '11px', fontWeight: 600 }}
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(t._id)}
                            style={{ background: '#fef2f2', color: '#ef4444', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 600 }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bottom Section (Note and Variables) */}
        <div style={{ background: '#f4f6f8', padding: '32px 40px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '100%', maxWidth: '900px' }}>
            <p style={{ fontSize: '15px', color: '#4b5563', textAlign: 'center', marginBottom: '24px', marginTop: 0 }}>
              Note:- For using all below fields please use the symbols of that fields instead of field Name.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', fontSize: '11px', color: '#333', padding: '0 40px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {VARS_LEFT.map(v => <span key={v}>{v}</span>)}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {VARS_MIDDLE.map(v => <span key={v}>{v}</span>)}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {VARS_RIGHT.map(v => <span key={v}>{v}</span>)}
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
