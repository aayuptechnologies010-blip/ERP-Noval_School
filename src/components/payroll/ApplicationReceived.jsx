import React, { useState, useEffect } from 'react';
import { Search, Download, Trash2, CheckCircle, AlertCircle, RefreshCw, Sparkles, FileText, Check, Award, Eye, X } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function ApplicationReceived() {
  const [applications, setApplications] = useState([]);
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(false);

  // Top Filters
  const [filterJobTitle, setFilterJobTitle] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // Table Search & Pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Offer Letter Modal
  const [offerModalApp, setOfferModalApp] = useState(null);
  const [offeredSalary, setOfferedSalary] = useState('');
  const [submittingOffer, setSubmittingOffer] = useState(false);

  // Status Change Modal
  const [statusModalApp, setStatusModalApp] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [newRound, setNewRound] = useState('');

  // Notifications
  const [statusMessage, setStatusMessage] = useState(null);

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const showNotification = (type, text) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // 1. Fetch Applications
  const fetchApplications = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filterJobTitle && filterJobTitle !== 'All') params.append('jobTitle', filterJobTitle);
      if (filterStatus && filterStatus !== 'All') params.append('status', filterStatus);
      if (fromDate) params.append('fromDate', fromDate);
      if (toDate) params.append('toDate', toDate);

      const res = await fetch(`${API_BASE}/api/recruitment/applications?${params.toString()}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setApplications(Array.isArray(data) ? data : []);
      } else {
        showNotification('error', 'Failed to fetch candidate applications');
      }
    } catch (err) {
      console.error('Error fetching applications:', err);
      showNotification('error', 'Server error loading applications');
    } finally {
      setLoading(false);
    }
  };

  // 2. Fetch Jobs for Dropdown
  const fetchJobs = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/recruitment/job-postings`, { headers });
      if (res.ok) {
        const data = await res.json();
        setJobPostings(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };

  useEffect(() => {
    fetchApplications();
    fetchJobs();
  }, []);

  // Filter Apply
  const handleApplyFilters = () => {
    fetchApplications();
    showNotification('success', 'Filters applied');
  };

  // Handle Select All Checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredApplications.map(a => a._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Open Offer Letter Modal
  const handleOpenOfferModal = (app) => {
    setOfferModalApp(app);
    setOfferedSalary(app.offeredSalary || app.expectedCtc || '₹12,00,000 PA');
  };

  // Submit Offer Letter
  const handleSubmitOffer = async (e) => {
    e.preventDefault();
    if (!offerModalApp) return;

    try {
      setSubmittingOffer(true);
      const res = await fetch(`${API_BASE}/api/recruitment/applications/${offerModalApp._id}/offer-letter`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ offeredSalary })
      });

      if (res.ok) {
        showNotification('success', `Offer letter generated for ${offerModalApp.candidateName}!`);
        setOfferModalApp(null);
        fetchApplications();
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Failed to generate offer letter');
      }
    } catch (err) {
      console.error('Error generating offer:', err);
      showNotification('error', 'Server error generating offer letter');
    } finally {
      setSubmittingOffer(false);
    }
  };

  // Update Status Modal
  const handleOpenStatusModal = (app) => {
    setStatusModalApp(app);
    setNewStatus(app.status || 'Applied');
    setNewRound(app.round || 'Screening');
  };

  const handleSubmitStatus = async (e) => {
    e.preventDefault();
    if (!statusModalApp) return;

    try {
      const res = await fetch(`${API_BASE}/api/recruitment/applications/${statusModalApp._id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ status: newStatus, round: newRound })
      });

      if (res.ok) {
        showNotification('success', 'Candidate status updated!');
        setStatusModalApp(null);
        fetchApplications();
      } else {
        showNotification('error', 'Failed to update status');
      }
    } catch (err) {
      console.error('Error updating status:', err);
      showNotification('error', 'Server error updating status');
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (applications.length === 0) {
      showNotification('error', 'No records to export');
      return;
    }
    const headersList = ['Sr.No.', 'Candidate Name', 'Qualification', 'Job Title', 'Application Date', 'Interview Status', 'Round', 'Offer Letter Status'];
    const rows = filteredApplications.map((a, idx) => [
      idx + 1,
      `"${a.candidateName || ''}"`,
      `"${a.qualification || ''}"`,
      `"${a.jobTitle || ''}"`,
      a.applicationDate ? new Date(a.applicationDate).toLocaleDateString() : '',
      `"${a.status || 'Applied'}"`,
      `"${a.round || ''}"`,
      a.offerLetterGenerated ? '"Generated"' : '"Not Generated"'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headersList.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Applications_Received_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('success', 'Exported applications to CSV');
  };

  // Filter Computation
  const filteredApplications = applications.filter(a => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      (a.candidateName && a.candidateName.toLowerCase().includes(term)) ||
      (a.jobTitle && a.jobTitle.toLowerCase().includes(term)) ||
      (a.qualification && a.qualification.toLowerCase().includes(term)) ||
      (a.email && a.email.toLowerCase().includes(term))
    );
  });

  const totalPages = Math.ceil(filteredApplications.length / pageSize) || 1;
  const paginatedApplications = filteredApplications.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="global-settings-container" style={{ padding: '24px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Toast Notification */}
      {statusMessage && (
        <div style={{
          position: 'fixed', top: '24px', right: '24px', zIndex: 9999,
          padding: '12px 20px', borderRadius: '8px',
          backgroundColor: statusMessage.type === 'success' ? '#10b981' : '#ef4444',
          color: '#ffffff', fontWeight: '500', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
          display: 'flex', alignItems: 'center', gap: '8px'
        }}>
          {statusMessage.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Recruitment</span>
            <span>/</span>
            <span style={{ color: '#159BD7', fontWeight: '600' }}>Application Received</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText size={26} color="#159BD7" />
            Applications Received Pipeline
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={fetchApplications}
            style={{ padding: '8px 16px', backgroundColor: '#fff', color: '#475569', border: '1px solid #cbd5e1', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500', cursor: 'pointer' }}
          >
            <RefreshCw size={15} /> Refresh
          </button>
        </div>
      </div>

      {/* Top Filter Bar */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px 24px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr)) auto', gap: '16px', alignItems: 'end' }}>
          
          <div className="form-group">
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px', display: 'block' }}>
              Job Title
            </label>
            <select
              value={filterJobTitle}
              onChange={(e) => setFilterJobTitle(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}
            >
              <option value="All">All Job Titles</option>
              {jobPostings.map(j => (
                <option key={j._id} value={j.jobTitle}>{j.jobTitle}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px', display: 'block' }}>
              Interview Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}
            >
              <option value="All">All Statuses</option>
              <option value="Applied">Applied</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px', display: 'block' }}>
              From Date
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
            />
          </div>

          <div className="form-group">
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px', display: 'block' }}>
              To Date
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleApplyFilters}
              style={{ backgroundColor: '#159BD7', color: 'white', border: 'none', padding: '9px 24px', borderRadius: '6px', cursor: 'pointer', fontWeight: '700', fontSize: '13px', boxShadow: '0 2px 4px rgba(21, 155, 215, 0.2)' }}
            >
              GO
            </button>
            <button
              onClick={() => { setFilterJobTitle('All'); setFilterStatus('All'); setFromDate(''); setToDate(''); fetchApplications(); }}
              style={{ backgroundColor: '#fff', color: '#64748b', border: '1px solid #cbd5e1', padding: '9px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
        
        {/* Table Toolbar */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search candidate, job, qualification..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              style={{ width: '100%', padding: '7px 12px 7px 32px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handleExportCSV}
              style={{ padding: '7px 14px', backgroundColor: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}
            >
              <Download size={15} /> Export
            </button>
            <select
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
              style={{ padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        {/* Applications Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px', minWidth: '1050px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: '600' }}>
                <th style={{ padding: '12px 16px', width: '50px' }}>Sr.No.</th>
                <th style={{ padding: '12px 16px', width: '50px', textAlign: 'center' }}>
                  <input type="checkbox" onChange={handleSelectAll} checked={filteredApplications.length > 0 && selectedIds.length === filteredApplications.length} />
                </th>
                <th style={{ padding: '12px 16px' }}>Candidate Name</th>
                <th style={{ padding: '12px 16px' }}>Qualification</th>
                <th style={{ padding: '12px 16px' }}>Job Title</th>
                <th style={{ padding: '12px 16px' }}>Application Date</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Interview Status</th>
                <th style={{ padding: '12px 16px' }}>Round</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Generate Offer Letter</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} style={{ padding: '36px', textAlign: 'center', color: '#64748b' }}>
                    <RefreshCw size={24} className="spin" style={{ margin: '0 auto 8px', display: 'block', animation: 'spin 1s linear infinite' }} />
                    Loading applications...
                  </td>
                </tr>
              ) : paginatedApplications.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                    <FileText size={36} style={{ margin: '0 auto 10px', color: '#cbd5e1' }} />
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#475569' }}>No Applications Found</div>
                  </td>
                </tr>
              ) : (
                paginatedApplications.map((app, idx) => {
                  const isAyup = app.candidateName && app.candidateName.toLowerCase().includes('ayup');
                  return (
                    <tr 
                      key={app._id} 
                      style={{ 
                        borderBottom: '1px solid #f1f5f9', 
                        backgroundColor: isAyup ? '#f0fdf4' : (idx % 2 === 0 ? '#ffffff' : '#fcfcfd')
                      }}
                    >
                      <td style={{ padding: '12px 16px', color: '#64748b', fontWeight: '500' }}>
                        {(currentPage - 1) * pageSize + idx + 1}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(app._id)}
                          onChange={() => handleSelectRow(app._id)}
                        />
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: '700', color: '#0f172a' }}>{app.candidateName}</span>
                          {isAyup && (
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '3px',
                              backgroundColor: '#dcfce7',
                              color: '#15803d',
                              fontSize: '11px',
                              fontWeight: '700',
                              padding: '2px 8px',
                              borderRadius: '12px',
                              border: '1px solid #bbf7d0'
                            }}>
                              <Sparkles size={11} /> AYUP TECH
                            </span>
                          )}
                        </div>
                        {app.phone && <div style={{ fontSize: '11px', color: '#64748b' }}>{app.phone} • {app.email}</div>}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#334155' }}>
                        <div>{app.qualification || 'N/A'}</div>
                        {app.experienceYrs > 0 && <div style={{ fontSize: '11px', color: '#64748b' }}>Exp: {app.experienceYrs} Yrs</div>}
                      </td>
                      <td style={{ padding: '12px 16px', fontWeight: '600', color: '#159BD7' }}>
                        {app.jobTitle}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#475569' }}>
                        {app.applicationDate ? new Date(app.applicationDate).toLocaleDateString() : 'N/A'}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <button
                          type="button"
                          onClick={() => handleOpenStatusModal(app)}
                          title="Click to update status"
                          style={{
                            padding: '3px 10px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: '600',
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor: app.status === 'Selected' ? '#dcfce7' : (app.status === 'Interview Scheduled' ? '#e0f2fe' : (app.status === 'Rejected' ? '#fee2e2' : '#fef3c7')),
                            color: app.status === 'Selected' ? '#166534' : (app.status === 'Interview Scheduled' ? '#0369a1' : (app.status === 'Rejected' ? '#991b1b' : '#92400e'))
                          }}
                        >
                          {app.status || 'Applied'} ✎
                        </button>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#475569' }}>
                        <span style={{ backgroundColor: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', border: '1px solid #e2e8f0', fontSize: '12px' }}>
                          {app.round || 'Screening'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        {app.offerLetterGenerated ? (
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#166534', fontWeight: '700', fontSize: '12px', backgroundColor: '#dcfce7', padding: '4px 10px', borderRadius: '6px' }}>
                            <Check size={14} /> Offer Released
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleOpenOfferModal(app)}
                            style={{
                              backgroundColor: '#159BD7',
                              color: '#fff',
                              border: 'none',
                              padding: '5px 14px',
                              borderRadius: '4px',
                              fontSize: '12px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <Award size={13} /> Generate Offer
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: '#64748b' }}>
          <div>Showing {filteredApplications.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, filteredApplications.length)} of {filteredApplications.length} entries</div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              style={{ padding: '5px 12px', borderRadius: '4px', border: '1px solid #cbd5e1', backgroundColor: currentPage <= 1 ? '#f1f5f9' : '#fff', cursor: currentPage <= 1 ? 'not-allowed' : 'pointer' }}
            >
              Previous
            </button>
            <span style={{ padding: '5px 10px', fontWeight: '600', color: '#0f172a' }}>{currentPage} / {totalPages}</span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              style={{ padding: '5px 12px', borderRadius: '4px', border: '1px solid #cbd5e1', backgroundColor: currentPage >= totalPages ? '#f1f5f9' : '#fff', cursor: currentPage <= totalPages ? 'not-allowed' : 'pointer' }}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modal: Generate Offer Letter */}
      {offerModalApp && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(2px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px'
        }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', width: '100%', maxWidth: '480px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={20} color="#159BD7" />
                Generate Candidate Offer Letter
              </h3>
              <button onClick={() => setOfferModalApp(null)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitOffer} style={{ padding: '20px' }}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Candidate
                </label>
                <div style={{ padding: '8px 12px', backgroundColor: '#f1f5f9', borderRadius: '6px', fontWeight: '700', color: '#0f172a' }}>
                  {offerModalApp.candidateName} ({offerModalApp.jobTitle})
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Offered Annual CTC / Salary *
                </label>
                <input
                  type="text"
                  placeholder="e.g. ₹13,50,000 PA"
                  value={offeredSalary}
                  onChange={(e) => setOfferedSalary(e.target.value)}
                  required
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setOfferModalApp(null)}
                  style={{ padding: '7px 16px', border: '1px solid #cbd5e1', borderRadius: '6px', background: '#fff', cursor: 'pointer', fontSize: '13px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingOffer}
                  style={{ padding: '7px 22px', backgroundColor: '#159BD7', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '700', cursor: 'pointer', fontSize: '13px' }}
                >
                  {submittingOffer ? 'Generating...' : 'Confirm & Release Offer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Update Candidate Status */}
      {statusModalApp && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(2px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px'
        }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', width: '100%', maxWidth: '440px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>
                Update Interview Stage & Status
              </h3>
              <button onClick={() => setStatusModalApp(null)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitStatus} style={{ padding: '20px' }}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Candidate
                </label>
                <div style={{ padding: '8px 12px', backgroundColor: '#f1f5f9', borderRadius: '6px', fontWeight: '600', color: '#0f172a' }}>
                  {statusModalApp.candidateName}
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Pipeline Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}
                >
                  <option value="Applied">Applied</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Current Round
                </label>
                <input
                  type="text"
                  placeholder="e.g. Round 2 - HR & Leadership"
                  value={newRound}
                  onChange={(e) => setNewRound(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setStatusModalApp(null)}
                  style={{ padding: '7px 16px', border: '1px solid #cbd5e1', borderRadius: '6px', background: '#fff', cursor: 'pointer', fontSize: '13px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '7px 20px', backgroundColor: '#159BD7', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
