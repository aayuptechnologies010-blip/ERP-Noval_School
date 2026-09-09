import React, { useState, useEffect, useRef } from 'react';
import { Search, ShieldAlert, ShieldCheck, Upload, Trash2, CheckCircle2, AlertCircle, RefreshCw, Sparkles, FileText, Image as ImageIcon, ExternalLink, Download, Check, X, User } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function UploadStaffDocument() {
  const [staffList, setStaffList] = useState([]);
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [docTypes, setDocTypes] = useState([]);
  const [loadingStaff, setLoadingStaff] = useState(false);
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Search input for staff
  const [staffSearchQuery, setStaffSearchQuery] = useState('');

  // Upload Form State
  const [uploadDocType, setUploadDocType] = useState('');
  const [uploadDocName, setUploadDocName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadRemarks, setUploadRemarks] = useState('');
  const fileInputRef = useRef(null);

  // Preview Modal
  const [previewDoc, setPreviewDoc] = useState(null);

  // Delete Confirmation Modal
  const [deleteConfirmDocId, setDeleteConfirmDocId] = useState(null);

  // Notification
  const [statusMessage, setStatusMessage] = useState(null);

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`
  };

  const showNotification = (type, text) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // 1. Fetch Staff List
  const fetchStaffList = async () => {
    try {
      setLoadingStaff(true);
      const res = await fetch(`${API_BASE}/api/staffs`, { headers });
      if (res.ok) {
        const data = await res.json();
        const list = Array.isArray(data) ? data : [];
        setStaffList(list);

        // Prefer Ayup Tech if found, otherwise first staff
        const ayup = list.find(s => 
          (s.firstName && s.firstName.toLowerCase().includes('ayup')) ||
          (s.userName && s.userName === 'SF072')
        );
        if (ayup) {
          setSelectedStaffId(ayup._id);
          setSelectedStaff(ayup);
          fetchStaffDocuments(ayup._id);
        } else if (list.length > 0) {
          setSelectedStaffId(list[0]._id);
          setSelectedStaff(list[0]);
          fetchStaffDocuments(list[0]._id);
        }
      }
    } catch (err) {
      console.error('Error fetching staff list:', err);
      showNotification('error', 'Failed to load staff members');
    } finally {
      setLoadingStaff(false);
    }
  };

  // 2. Fetch Document Types
  const fetchDocTypes = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/staff-document-types`, { headers });
      if (res.ok) {
        const data = await res.json();
        const types = Array.isArray(data) ? data.map(d => d.type).filter(Boolean) : [];
        const defaults = ['Aadhaar Card', 'PAN Card', 'Educational Certificate', 'Experience Certificate', 'Appointment Letter', 'Bank Passbook / Cancelled Cheque'];
        const merged = Array.from(new Set([...types, ...defaults]));
        setDocTypes(merged);
        if (merged.length > 0) setUploadDocType(merged[0]);
      }
    } catch (err) {
      console.error('Error fetching document types:', err);
    }
  };

  // 3. Fetch Documents for Specific Staff
  const fetchStaffDocuments = async (staffId) => {
    if (!staffId) return;
    try {
      setLoadingDocs(true);
      const res = await fetch(`${API_BASE}/api/staffs/${staffId}/documents`, { headers });
      if (res.ok) {
        const data = await res.json();
        setDocuments(Array.isArray(data) ? data : []);
      } else {
        showNotification('error', 'Failed to load staff documents');
      }
    } catch (err) {
      console.error('Error fetching staff documents:', err);
      showNotification('error', 'Server error loading documents');
    } finally {
      setLoadingDocs(false);
    }
  };

  useEffect(() => {
    fetchStaffList();
    fetchDocTypes();
  }, []);

  // When staff selection changes
  const handleSelectStaff = (staffId) => {
    const found = staffList.find(s => s._id === staffId);
    if (found) {
      setSelectedStaffId(staffId);
      setSelectedStaff(found);
      fetchStaffDocuments(staffId);
      setStaffSearchQuery('');
    }
  };

  // Handle file select
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (!uploadDocName) {
        setUploadDocName(file.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  // Handle Document Upload
  const handleUploadDocument = async (e) => {
    e.preventDefault();
    if (!selectedStaffId) {
      showNotification('error', 'Please select a staff member first');
      return;
    }
    if (!selectedFile) {
      showNotification('error', 'Please select a file to upload');
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('documentFile', selectedFile);
      formData.append('documentType', uploadDocType || 'Other Document');
      formData.append('documentName', uploadDocName || selectedFile.name);
      if (uploadRemarks) formData.append('remarks', uploadRemarks);

      const res = await fetch(`${API_BASE}/api/staffs/${selectedStaffId}/documents`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();
      if (res.ok) {
        showNotification('success', 'Document uploaded successfully!');
        setSelectedFile(null);
        setUploadDocName('');
        setUploadRemarks('');
        if (fileInputRef.current) fileInputRef.current.value = '';
        fetchStaffDocuments(selectedStaffId);
      } else {
        showNotification('error', data.message || 'Upload failed');
      }
    } catch (err) {
      console.error('Error uploading document:', err);
      showNotification('error', 'Server error while uploading document');
    } finally {
      setUploading(false);
    }
  };

  // Toggle Document Verification Status
  const handleToggleVerify = async (docId, currentStatus) => {
    if (!selectedStaffId) return;
    try {
      const res = await fetch(`${API_BASE}/api/staffs/${selectedStaffId}/documents/${docId}/verify`, {
        method: 'PATCH',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isVerified: !currentStatus })
      });

      const data = await res.json();
      if (res.ok) {
        showNotification('success', !currentStatus ? 'Document verified successfully!' : 'Document marked as unverified');
        fetchStaffDocuments(selectedStaffId);
      } else {
        showNotification('error', data.message || 'Verification update failed');
      }
    } catch (err) {
      console.error('Error toggling verify:', err);
      showNotification('error', 'Server error updating verification status');
    }
  };

  // Delete Document
  const confirmDeleteDocument = async () => {
    if (!selectedStaffId || !deleteConfirmDocId) return;
    try {
      const res = await fetch(`${API_BASE}/api/staffs/${selectedStaffId}/documents/${deleteConfirmDocId}`, {
        method: 'DELETE',
        headers
      });
      const data = await res.json();
      if (res.ok) {
        showNotification('success', 'Document removed successfully!');
        setDeleteConfirmDocId(null);
        fetchStaffDocuments(selectedStaffId);
      } else {
        showNotification('error', data.message || 'Failed to delete document');
      }
    } catch (err) {
      console.error('Error deleting document:', err);
      showNotification('error', 'Server error deleting document');
    }
  };

  // Filtered staff list for search autocomplete
  const filteredStaffSuggestions = staffList.filter(s => {
    if (!staffSearchQuery) return false;
    const query = staffSearchQuery.toLowerCase();
    const fullName = `${s.firstName || ''} ${s.middleName ? s.middleName + ' ' : ''}${s.lastName || ''}`.toLowerCase();
    const empNo = (s.empNo || s.userName || '').toLowerCase();
    return fullName.includes(query) || empNo.includes(query);
  });

  const isSelectedStaffAyup = selectedStaff && (
    (selectedStaff.firstName && selectedStaff.firstName.toLowerCase().includes('ayup')) ||
    (selectedStaff.userName === 'SF072')
  );

  const verifiedCount = documents.filter(d => d.isVerified).length;
  const pendingCount = documents.length - verifiedCount;

  return (
    <div className="global-settings-container" style={{ padding: '24px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Toast Notification */}
      {statusMessage && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 9999,
          padding: '12px 20px',
          borderRadius: '8px',
          backgroundColor: statusMessage.type === 'success' ? '#10b981' : '#ef4444',
          color: '#ffffff',
          fontWeight: '500',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          animation: 'fadeIn 0.2s ease-in-out'
        }}>
          {statusMessage.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Payroll Master</span>
            <span>/</span>
            <span>Staff Records</span>
            <span>/</span>
            <span style={{ color: '#159BD7', fontWeight: '600' }}>Upload Staff Document</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText size={26} color="#159BD7" />
            Upload Staff Document
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => { fetchStaffList(); if (selectedStaffId) fetchStaffDocuments(selectedStaffId); }}
            style={{
              padding: '8px 16px',
              backgroundColor: '#ffffff',
              color: '#475569',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            <RefreshCw size={15} /> Refresh
          </button>
        </div>
      </div>

      {/* 2-Column Main Layout */}
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        
        {/* Left Column: Staff Profile Card */}
        <div style={{
          width: '320px',
          flexShrink: 0,
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
        }}>
          {/* Avatar / Photo */}
          <div style={{
            border: '2px dashed #cbd5e1',
            width: '180px',
            height: '190px',
            margin: '0 auto 20px auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isSelectedStaffAyup ? '#f0fdf4' : '#f8fafc',
            borderRadius: '10px',
            overflow: 'hidden',
            position: 'relative'
          }}>
            {selectedStaff && selectedStaff.staffPhoto ? (
              <img 
                src={selectedStaff.staffPhoto.startsWith('http') ? selectedStaff.staffPhoto : `${API_BASE}${selectedStaff.staffPhoto}`} 
                alt="Staff Profile" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            ) : (
              <>
                <User size={64} color={isSelectedStaffAyup ? '#16a34a' : '#94a3b8'} />
                <div style={{ fontWeight: '600', fontSize: '13px', color: '#64748b', marginTop: '8px' }}>
                  {selectedStaff ? 'Staff Profile' : 'No Staff Selected'}
                </div>
              </>
            )}
            {isSelectedStaffAyup && (
              <div style={{
                position: 'absolute',
                bottom: '8px',
                backgroundColor: '#16a34a',
                color: '#fff',
                fontSize: '10px',
                fontWeight: '700',
                padding: '2px 8px',
                borderRadius: '10px'
              }}>
                AYUP TECH
              </div>
            )}
          </div>

          {/* Details List */}
          {selectedStaff ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Staff Name</div>
                <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                  {selectedStaff.firstName} {selectedStaff.middleName || ''} {selectedStaff.lastName || ''}
                </div>
                {isSelectedStaffAyup && (
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    backgroundColor: '#dcfce7',
                    color: '#15803d',
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    border: '1px solid #bbf7d0',
                    marginTop: '4px'
                  }}>
                    <Sparkles size={11} /> VERIFIED AYUP TECH
                  </span>
                )}
              </div>

              <div>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Staff ID / Code</div>
                <div style={{ fontWeight: '600', color: '#159BD7' }}>
                  {selectedStaff.empNo || selectedStaff.userName || 'N/A'}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Designation / Dept</div>
                <div style={{ color: '#334155', fontWeight: '500' }}>
                  {selectedStaff.designation || 'Staff'} {selectedStaff.department ? `(${selectedStaff.department})` : ''}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Contact No.</div>
                <div style={{ color: '#334155', fontWeight: '500' }}>
                  {selectedStaff.contactNo || selectedStaff.phone || '9876543210'}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Address</div>
                <div style={{ color: '#334155', lineHeight: 1.4 }}>
                  {selectedStaff.address || 'Tech City, India'}
                </div>
              </div>

              {/* Document Summary Stats */}
              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '14px', marginTop: '6px' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase', marginBottom: '8px' }}>Documents Status</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '600' }}>
                    {verifiedCount} Verified
                  </span>
                  <span style={{ backgroundColor: '#fef3c7', color: '#92400e', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '600' }}>
                    {pendingCount} Pending
                  </span>
                  <span style={{ backgroundColor: '#f1f5f9', color: '#334155', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '600' }}>
                    {documents.length} Total
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: '#94a3b8', padding: '20px 0' }}>
              Select a staff member from the right to view details.
            </div>
          )}
        </div>

        {/* Right Column: Search, Upload & Documents Table */}
        <div style={{ flex: 1, minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Staff Search & Selector Bar */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            padding: '20px 24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
              <label style={{ fontWeight: '700', color: '#0f172a', fontSize: '14px', minWidth: '150px' }}>
                Enter/Search Name
              </label>

              <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
                <select
                  value={selectedStaffId}
                  onChange={(e) => handleSelectStaff(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                    backgroundColor: '#fff',
                    fontWeight: '600',
                    color: '#0f172a'
                  }}
                >
                  <option value="">-- Select Staff Member --</option>
                  {staffList.map(s => {
                    const fullName = `${s.firstName || ''} ${s.middleName ? s.middleName + ' ' : ''}${s.lastName || ''}`.trim();
                    const isAyup = fullName.toLowerCase().includes('ayup');
                    return (
                      <option key={s._id} value={s._id}>
                        {s.empNo ? `[${s.empNo}] ` : ''}{fullName} {isAyup ? '⭐ (AYUP TECH)' : ''}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Quick shortcut to select Ayup Tech */}
              {staffList.some(s => s.firstName && s.firstName.toLowerCase().includes('ayup')) && (
                <button
                  type="button"
                  onClick={() => {
                    const ayup = staffList.find(s => s.firstName && s.firstName.toLowerCase().includes('ayup'));
                    if (ayup) handleSelectStaff(ayup._id);
                  }}
                  style={{
                    backgroundColor: '#dcfce7',
                    color: '#15803d',
                    border: '1px solid #86efac',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Sparkles size={15} /> Select Ayup Tech
                </button>
              )}
            </div>
          </div>

          {/* File Upload Section Card */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
          }}>
            <div style={{ marginBottom: '16px', fontWeight: '700', fontSize: '15px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Upload size={18} color="#159BD7" />
              Upload New Staff Document
            </div>

            <form onSubmit={handleUploadDocument}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                
                {/* Document Type */}
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px', display: 'block' }}>
                    Document Type *
                  </label>
                  <select
                    value={uploadDocType}
                    onChange={(e) => setUploadDocType(e.target.value)}
                    required
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}
                  >
                    {docTypes.map(dt => (
                      <option key={dt} value={dt}>{dt}</option>
                    ))}
                  </select>
                </div>

                {/* Document Title / Name */}
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px', display: 'block' }}>
                    Document Title / Number *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ayup Tech Aadhaar Card"
                    value={uploadDocName}
                    onChange={(e) => setUploadDocName(e.target.value)}
                    required
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>

                {/* File Picker */}
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px', display: 'block' }}>
                    Select File (PNG, JPG, PDF, DOC) *
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.xls,.xlsx"
                    style={{
                      width: '100%',
                      padding: '7px 10px',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      fontSize: '12px',
                      backgroundColor: '#f8fafc'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', alignItems: 'center' }}>
                {selectedFile && (
                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                    Selected: <strong>{selectedFile.name}</strong> ({(selectedFile.size / 1024).toFixed(1)} KB)
                  </span>
                )}
                <button
                  type="submit"
                  disabled={uploading || !selectedStaffId}
                  style={{
                    backgroundColor: '#159BD7',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 24px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: (uploading || !selectedStaffId) ? 'not-allowed' : 'pointer',
                    fontWeight: '600',
                    fontSize: '13px',
                    boxShadow: '0 2px 4px rgba(21, 155, 215, 0.2)'
                  }}
                >
                  <Upload size={16} />
                  {uploading ? 'Uploading...' : 'Upload Document'}
                </button>
              </div>
            </form>
          </div>

          {/* Uploaded Documents Table Card */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
          }}>
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#f8fafc'
            }}>
              <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '14px' }}>
                Uploaded Documents for {selectedStaff ? `${selectedStaff.firstName} ${selectedStaff.lastName || ''}` : 'Staff'} ({documents.length})
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: '600' }}>
                    <th style={{ padding: '12px 16px', width: '70px' }}>Sr.No.</th>
                    <th style={{ padding: '12px 16px', width: '130px' }}>Document Preview</th>
                    <th style={{ padding: '12px 16px' }}>Document Type</th>
                    <th style={{ padding: '12px 16px' }}>Document Name & Details</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center' }}>Verification Status</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', width: '180px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingDocs ? (
                    <tr>
                      <td colSpan={6} style={{ padding: '36px', textAlign: 'center', color: '#64748b' }}>
                        <RefreshCw size={24} className="spin" style={{ margin: '0 auto 8px', display: 'block', animation: 'spin 1s linear infinite' }} />
                        Loading staff documents...
                      </td>
                    </tr>
                  ) : documents.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                        <FileText size={36} style={{ margin: '0 auto 10px', color: '#cbd5e1' }} />
                        <div style={{ fontSize: '15px', fontWeight: '600', color: '#475569' }}>No Documents Uploaded</div>
                        <div style={{ fontSize: '13px', marginTop: '4px' }}>Upload certificates, ID proofs, or salary documents above.</div>
                      </td>
                    </tr>
                  ) : (
                    documents.map((doc, idx) => {
                      const isImage = doc.documentUrl && (doc.documentUrl.endsWith('.png') || doc.documentUrl.endsWith('.jpg') || doc.documentUrl.endsWith('.jpeg') || doc.documentUrl.endsWith('.webp') || doc.mimeType?.includes('image'));
                      const fileFullUrl = doc.documentUrl?.startsWith('http') ? doc.documentUrl : `${API_BASE}${doc.documentUrl}`;

                      return (
                        <tr key={doc._id || idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '12px 16px', color: '#64748b', fontWeight: '500' }}>
                            {idx + 1}
                          </td>

                          {/* Document Photo / Preview */}
                          <td style={{ padding: '12px 16px' }}>
                            <div 
                              onClick={() => setPreviewDoc(doc)}
                              style={{
                                width: '56px',
                                height: '56px',
                                borderRadius: '6px',
                                border: '1px solid #e2e8f0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#f8fafc',
                                cursor: 'pointer',
                                overflow: 'hidden'
                              }}
                              title="Click to preview"
                            >
                              {isImage ? (
                                <img src={fileFullUrl} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              ) : (
                                <FileText size={24} color="#159BD7" />
                              )}
                            </div>
                          </td>

                          {/* Document Type */}
                          <td style={{ padding: '12px 16px' }}>
                            <span style={{
                              backgroundColor: '#e0f2fe',
                              color: '#0369a1',
                              fontWeight: '600',
                              fontSize: '12px',
                              padding: '3px 10px',
                              borderRadius: '4px'
                            }}>
                              {doc.documentType}
                            </span>
                          </td>

                          {/* Document Name & Details */}
                          <td style={{ padding: '12px 16px' }}>
                            <div style={{ fontWeight: '600', color: '#0f172a' }}>{doc.documentName}</div>
                            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '3px' }}>
                              Uploaded: {doc.uploadDate ? new Date(doc.uploadDate).toLocaleDateString() : 'Recent'} 
                              {doc.fileSize ? ` • ${(doc.fileSize / 1024).toFixed(0)} KB` : ''}
                            </div>
                            {doc.remarks && <div style={{ fontSize: '11px', color: '#475569', fontStyle: 'italic', marginTop: '2px' }}>Note: {doc.remarks}</div>}
                          </td>

                          {/* Verification Status */}
                          <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                            {doc.isVerified ? (
                              <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                backgroundColor: '#dcfce7',
                                color: '#166534',
                                padding: '3px 10px',
                                borderRadius: '12px',
                                fontSize: '11px',
                                fontWeight: '700'
                              }}>
                                <Check size={12} /> Verified
                              </span>
                            ) : (
                              <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                backgroundColor: '#fef3c7',
                                color: '#92400e',
                                padding: '3px 10px',
                                borderRadius: '12px',
                                fontSize: '11px',
                                fontWeight: '600'
                              }}>
                                Pending
                              </span>
                            )}
                          </td>

                          {/* Action Buttons */}
                          <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center' }}>
                              
                              {/* Verify / Unverify Button */}
                              <button
                                type="button"
                                onClick={() => handleToggleVerify(doc._id, doc.isVerified)}
                                title={doc.isVerified ? 'Mark as Unverified' : 'Verify Document'}
                                style={{
                                  padding: '5px 10px',
                                  backgroundColor: doc.isVerified ? '#f8fafc' : '#159BD7',
                                  color: doc.isVerified ? '#475569' : '#ffffff',
                                  border: doc.isVerified ? '1px solid #cbd5e1' : 'none',
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                  fontSize: '11px',
                                  fontWeight: '600',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}
                              >
                                <Search size={12} />
                                {doc.isVerified ? 'Unverify' : 'Verify'}
                              </button>

                              {/* Download Link */}
                              <a
                                href={fileFullUrl}
                                target="_blank"
                                rel="noreferrer"
                                download
                                title="Download Document"
                                style={{
                                  padding: '5px',
                                  backgroundColor: '#f1f5f9',
                                  border: '1px solid #cbd5e1',
                                  borderRadius: '4px',
                                  color: '#334155',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  textDecoration: 'none'
                                }}
                              >
                                <Download size={14} />
                              </a>

                              {/* Remove Document */}
                              <button
                                type="button"
                                onClick={() => setDeleteConfirmDocId(doc._id)}
                                title="Remove Document"
                                style={{
                                  padding: '5px',
                                  backgroundColor: '#fee2e2',
                                  border: '1px solid #fecaca',
                                  borderRadius: '4px',
                                  color: '#dc2626',
                                  cursor: 'pointer'
                                }}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

      {/* Modal: Document Preview */}
      {previewDoc && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(2px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '700px',
            maxHeight: '90vh',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#f8fafc'
            }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>
                  {previewDoc.documentName}
                </h3>
                <span style={{ fontSize: '12px', color: '#64748b' }}>{previewDoc.documentType}</span>
              </div>
              <button onClick={() => setPreviewDoc(null)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '24px', overflowY: 'auto', textAlign: 'center' }}>
              {previewDoc.documentUrl && (previewDoc.documentUrl.endsWith('.png') || previewDoc.documentUrl.endsWith('.jpg') || previewDoc.documentUrl.endsWith('.jpeg') || previewDoc.documentUrl.endsWith('.webp')) ? (
                <img
                  src={previewDoc.documentUrl.startsWith('http') ? previewDoc.documentUrl : `${API_BASE}${previewDoc.documentUrl}`}
                  alt="Document Preview"
                  style={{ maxWidth: '100%', maxHeight: '60vh', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
              ) : (
                <div style={{ padding: '40px 20px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
                  <FileText size={60} color="#159BD7" style={{ margin: '0 auto 16px' }} />
                  <div style={{ fontWeight: '600', color: '#0f172a', marginBottom: '8px' }}>{previewDoc.documentName}</div>
                  <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>This file cannot be previewed directly. You can open or download it below.</div>
                  <a
                    href={previewDoc.documentUrl?.startsWith('http') ? previewDoc.documentUrl : `${API_BASE}${previewDoc.documentUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: '#159BD7',
                      color: '#ffffff',
                      padding: '8px 20px',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '13px'
                    }}
                  >
                    <ExternalLink size={15} /> Open Document
                  </a>
                </div>
              )}
            </div>

            <div style={{ padding: '12px 20px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', backgroundColor: '#f8fafc' }}>
              <button
                onClick={() => setPreviewDoc(null)}
                style={{ padding: '7px 18px', border: '1px solid #cbd5e1', borderRadius: '6px', background: '#fff', cursor: 'pointer', fontSize: '13px' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Delete Confirmation */}
      {deleteConfirmDocId && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(2px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '400px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            padding: '24px',
            textAlign: 'center'
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Trash2 size={24} />
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>Remove Document</h3>
            <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
              Are you sure you want to delete this staff document? The uploaded file will be permanently removed.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button
                onClick={() => setDeleteConfirmDocId(null)}
                style={{ padding: '8px 18px', border: '1px solid #cbd5e1', borderRadius: '6px', background: '#fff', cursor: 'pointer', fontSize: '13px' }}
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteDocument}
                style={{ padding: '8px 20px', backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
