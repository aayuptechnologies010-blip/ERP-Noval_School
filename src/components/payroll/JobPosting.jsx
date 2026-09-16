import React, { useState, useEffect } from 'react';
import { Eye, Save, X, Italic, Bold, Underline, Search, Download, Edit, Trash2, CheckCircle, AlertCircle, RefreshCw, Sparkles, Briefcase, Plus } from 'lucide-react';
const DEPARTMENTS = [
  'Information Technology',
  'Academics',
  'Administration',
  'Human Resources',
  'Finance & Accounts',
  'Sports & Physical Education',
  'Arts & Music'
];

const QUALIFICATIONS = [
  'MCA / B.Tech Computer Science',
  'M.Sc Mathematics with B.Ed',
  'M.A. English with B.Ed',
  'M.Sc Physics / Chemistry / Biology',
  'MBA / Post Graduate Diploma in HR',
  'Graduate with B.Ed',
  'Any Bachelor / Master Degree'
];


const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function JobPosting() {
  const [activeTab, setActiveTab] = useState('form'); // 'form' or 'list'
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    jobTitle: '',
    department: 'Information Technology',
    minExp: 2,
    maxExp: 6,
    qualification: 'MCA / B.Tech Computer Science',
    vacancies: 1,
    employmentType: 'Full Time',
    ageLimit: '24 - 42 Years',
    annualCtc: '₹8,00,000 - ₹12,00,000 PA',
    skills: 'React, Node.js, Express, MongoDB, System Design',
    jobDescription: '',
    publishFromDate: '2026-09-01',
    publishTillDate: '2026-11-30',
    status: 'Published'
  });

  // Table Search & Pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Delete Confirmation
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Toast Notification
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

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/recruitment/job-postings`, { headers });
      if (res.ok) {
        const data = await res.json();
        setJobs(Array.isArray(data) ? data : []);
      } else {
        showNotification('error', 'Failed to fetch job postings');
      }
    } catch (err) {
      console.error('Error loading jobs:', err);
      showNotification('error', 'Server error while loading jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleResetForm = () => {
    setEditingId(null);
    setFormData({
      jobTitle: '',
      department: 'Information Technology',
      minExp: 2,
      maxExp: 6,
      qualification: 'MCA / B.Tech Computer Science',
      vacancies: 1,
      employmentType: 'Full Time',
      ageLimit: '24 - 42 Years',
      annualCtc: '₹8,00,000 - ₹12,00,000 PA',
      skills: 'React, Node.js, Express, MongoDB, System Design',
      jobDescription: '',
      publishFromDate: '2026-09-01',
      publishTillDate: '2026-11-30',
      status: 'Published'
    });
  };

  const handleEditJob = (job) => {
    setEditingId(job._id);
    setFormData({
      jobTitle: job.jobTitle || '',
      department: job.department || 'Information Technology',
      minExp: job.minExp !== undefined ? job.minExp : 0,
      maxExp: job.maxExp !== undefined ? job.maxExp : 5,
      qualification: job.qualification || '',
      vacancies: job.vacancies || 1,
      employmentType: job.employmentType || 'Full Time',
      ageLimit: job.ageLimit || '',
      annualCtc: job.annualCtc || '',
      skills: job.skills || '',
      jobDescription: job.jobDescription || '',
      publishFromDate: job.publishFrom ? new Date(job.publishFrom).toISOString().split('T')[0] : '2026-09-01',
      publishTillDate: job.publishTill ? new Date(job.publishTill).toISOString().split('T')[0] : '2026-11-30',
      status: job.status || 'Published'
    });
    setActiveTab('form');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.jobTitle.trim()) {
      showNotification('error', 'Job Title is required');
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        ...formData,
        publishFrom: formData.publishFromDate ? new Date(formData.publishFromDate) : new Date(),
        publishTill: formData.publishTillDate ? new Date(formData.publishTillDate) : null
      };

      const url = editingId 
        ? `${API_BASE}/api/recruitment/job-postings/${editingId}`
        : `${API_BASE}/api/recruitment/job-postings`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showNotification('success', editingId ? 'Job posting updated successfully!' : 'Job posted and published successfully!');
        handleResetForm();
        fetchJobs();
        setActiveTab('list');
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Operation failed');
      }
    } catch (err) {
      console.error('Error saving job:', err);
      showNotification('error', 'Server error while saving job posting');
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      const res = await fetch(`${API_BASE}/api/recruitment/job-postings/${deleteConfirmId}`, {
        method: 'DELETE',
        headers
      });
      if (res.ok) {
        showNotification('success', 'Job posting deleted successfully!');
        setDeleteConfirmId(null);
        fetchJobs();
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Failed to delete');
      }
    } catch (err) {
      console.error('Error deleting job:', err);
      showNotification('error', 'Server error deleting job');
    }
  };

  const handleExportCSV = () => {
    if (jobs.length === 0) {
      showNotification('error', 'No jobs to export');
      return;
    }
    const headersList = ['Job Title', 'Department', 'Experience', 'Qualification', 'Vacancies', 'CTC', 'Status'];
    const rows = filteredJobs.map(j => [
      `"${j.jobTitle || ''}"`,
      `"${j.department || ''}"`,
      `"${j.minExp || 0} - ${j.maxExp || 0} Yrs"`,
      `"${j.qualification || ''}"`,
      j.vacancies || 1,
      `"${j.annualCtc || ''}"`,
      `"${j.status || 'Published'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headersList.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Job_Postings_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('success', 'Exported job postings to CSV');
  };

  const filteredJobs = jobs.filter(j => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      (j.jobTitle && j.jobTitle.toLowerCase().includes(term)) ||
      (j.department && j.department.toLowerCase().includes(term)) ||
      (j.skills && j.skills.toLowerCase().includes(term))
    );
  });

  const totalPages = Math.ceil(filteredJobs.length / pageSize) || 1;
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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
            <span style={{ color: '#159BD7', fontWeight: '600' }}>Job Posting</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Briefcase size={26} color="#159BD7" />
            Job Posting & Requisitions
          </h1>
        </div>

        {/* Tab Switcher Buttons */}
        <div style={{ display: 'flex', gap: '8px', backgroundColor: '#e2e8f0', padding: '4px', borderRadius: '8px' }}>
          <button
            onClick={() => setActiveTab('form')}
            style={{
              padding: '7px 18px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: activeTab === 'form' ? '#ffffff' : 'transparent',
              color: activeTab === 'form' ? '#159BD7' : '#475569',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: activeTab === 'form' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Plus size={15} /> {editingId ? 'Edit Job' : 'Create Job Posting'}
          </button>
          <button
            onClick={() => { setActiveTab('list'); fetchJobs(); }}
            style={{
              padding: '7px 18px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: activeTab === 'list' ? '#ffffff' : 'transparent',
              color: activeTab === 'list' ? '#159BD7' : '#475569',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: activeTab === 'list' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Eye size={15} /> View Published Jobs ({jobs.length})
          </button>
        </div>
      </div>

      {activeTab === 'form' ? (
        /* CREATE / EDIT JOB FORM */
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '30px 40px', maxWidth: '1000px', margin: '0 auto', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <form onSubmit={handleSubmit}>
            {/* Job Title */}
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', marginBottom: '6px', display: 'block' }}>
                Job Title *
              </label>
              <input
                type="text"
                placeholder="e.g. Senior Fullstack Lead - Ayup Tech Labs"
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                required
                style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: '600' }}
              />
            </div>

            {/* Row 2: Department, Experience, Qualification */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '20px' }}>
              <div className="form-group">
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', marginBottom: '6px', display: 'block' }}>
                  Department *
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}
                >
                  {DEPARTMENTS.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', marginBottom: '6px', display: 'block' }}>
                  Required Experience (In Yrs)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="number"
                    min="0"
                    placeholder="Min"
                    value={formData.minExp}
                    onChange={(e) => setFormData({ ...formData, minExp: e.target.value })}
                    style={{ flex: 1, padding: '9px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                  <span style={{ fontWeight: 'bold', color: '#64748b' }}>To</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="Max"
                    value={formData.maxExp}
                    onChange={(e) => setFormData({ ...formData, maxExp: e.target.value })}
                    style={{ flex: 1, padding: '9px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', marginBottom: '6px', display: 'block' }}>
                  Required Qualification
                </label>
                <select
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}
                >
                  {QUALIFICATIONS.map(q => (
                    <option key={q} value={q}>{q}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3: Vacancies, Employment Type, Age Limit */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '20px' }}>
              <div className="form-group">
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', marginBottom: '6px', display: 'block' }}>
                  No. of Vacancies
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.vacancies}
                  onChange={(e) => setFormData({ ...formData, vacancies: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>

              <div className="form-group">
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', marginBottom: '6px', display: 'block' }}>
                  Employment Type
                </label>
                <select
                  value={formData.employmentType}
                  onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}
                >
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Contractual">Contractual</option>
                  <option value="Visiting Faculty">Visiting Faculty</option>
                </select>
              </div>

              <div className="form-group">
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', marginBottom: '6px', display: 'block' }}>
                  Age Limit (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 25 - 45 Years"
                  value={formData.ageLimit}
                  onChange={(e) => setFormData({ ...formData, ageLimit: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>
            </div>

            {/* Row 4: Annual CTC & Required Skills */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '20px' }}>
              <div className="form-group">
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', marginBottom: '6px', display: 'block' }}>
                  Annual CTC
                </label>
                <input
                  type="text"
                  placeholder="e.g. ₹9,00,000 - ₹14,00,000 PA"
                  value={formData.annualCtc}
                  onChange={(e) => setFormData({ ...formData, annualCtc: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>

              <div className="form-group">
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', marginBottom: '6px', display: 'block' }}>
                  Required Skills
                </label>
                <input
                  type="text"
                  placeholder="e.g. React, Node.js, Express, MongoDB, System Design"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>
            </div>

            {/* Job Description Textarea with Toolbar */}
            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', marginBottom: '6px', display: 'block' }}>
                Job Description
              </label>
              <div style={{ border: '1px solid #cbd5e1', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ display: 'flex', gap: '8px', padding: '8px 12px', borderBottom: '1px solid #cbd5e1', backgroundColor: '#f8fafc', alignItems: 'center', fontSize: '12px' }}>
                  <button type="button" style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '4px' }}><Bold size={15} /></button>
                  <button type="button" style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '4px' }}><Italic size={15} /></button>
                  <button type="button" style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '4px' }}><Underline size={15} /></button>
                  <span style={{ color: '#cbd5e1' }}>|</span>
                  <span style={{ color: '#64748b' }}>Full job overview, expectations, and benefits</span>
                </div>
                <textarea
                  rows={5}
                  placeholder="Write full job description, expectations, and role details here..."
                  value={formData.jobDescription}
                  onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                  style={{ width: '100%', border: 'none', padding: '14px', resize: 'vertical', outline: 'none', fontSize: '13px', lineHeight: 1.6 }}
                />
              </div>
            </div>

            {/* Bottom Dates and Status */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '30px' }}>
              <div className="form-group">
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', marginBottom: '6px', display: 'block' }}>
                  Publish Vacancy On
                </label>
                <input
                  type="date"
                  value={formData.publishFromDate}
                  onChange={(e) => setFormData({ ...formData, publishFromDate: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>

              <div className="form-group">
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', marginBottom: '6px', display: 'block' }}>
                  Publish Vacancy Till
                </label>
                <input
                  type="date"
                  value={formData.publishTillDate}
                  onChange={(e) => setFormData({ ...formData, publishTillDate: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>

              <div className="form-group">
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', marginBottom: '6px', display: 'block' }}>
                  Publish Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', borderTop: '1px solid #f1f5f9', paddingTop: '24px' }}>
              <button
                type="button"
                onClick={() => { setActiveTab('list'); fetchJobs(); }}
                style={{ backgroundColor: 'white', color: '#159BD7', border: '1px solid #159BD7', padding: '8px 24px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}
              >
                <Eye size={16} /> View All Jobs
              </button>

              <button
                type="submit"
                disabled={submitting}
                style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '8px 26px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px', cursor: submitting ? 'not-allowed' : 'pointer', fontWeight: '700', fontSize: '13px', boxShadow: '0 2px 4px rgba(40, 167, 69, 0.2)' }}
              >
                <Save size={16} /> {submitting ? 'Saving...' : (editingId ? 'Update Job' : 'Save & Publish')}
              </button>

              <button
                type="button"
                onClick={handleResetForm}
                style={{ backgroundColor: 'white', color: '#ff9800', border: '1px solid #ff9800', padding: '8px 24px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}
              >
                <X size={16} /> Reset
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* PUBLISHED JOBS LIST TABLE VIEW */
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
              <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Search job title, dept, skills..."
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

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: '600' }}>
                  <th style={{ padding: '12px 16px', width: '60px' }}>#</th>
                  <th style={{ padding: '12px 16px' }}>Job Title</th>
                  <th style={{ padding: '12px 16px' }}>Department</th>
                  <th style={{ padding: '12px 16px' }}>Experience & Vacancies</th>
                  <th style={{ padding: '12px 16px' }}>Annual CTC</th>
                  <th style={{ padding: '12px 16px' }}>Publish Dates</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center' }}>Status</th>
                  <th style={{ padding: '12px 16px', width: '90px', textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} style={{ padding: '36px', textAlign: 'center', color: '#64748b' }}>
                      <RefreshCw size={24} className="spin" style={{ margin: '0 auto 8px', display: 'block', animation: 'spin 1s linear infinite' }} />
                      Loading job postings...
                    </td>
                  </tr>
                ) : paginatedJobs.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                      <Briefcase size={36} style={{ margin: '0 auto 10px', color: '#cbd5e1' }} />
                      <div style={{ fontSize: '15px', fontWeight: '600', color: '#475569' }}>No Job Postings Found</div>
                    </td>
                  </tr>
                ) : (
                  paginatedJobs.map((item, idx) => {
                    const isAyup = item.jobTitle && item.jobTitle.toLowerCase().includes('ayup');
                    return (
                      <tr 
                        key={item._id} 
                        style={{ 
                          borderBottom: '1px solid #f1f5f9', 
                          backgroundColor: isAyup ? '#f0fdf4' : (idx % 2 === 0 ? '#ffffff' : '#fcfcfd')
                        }}
                      >
                        <td style={{ padding: '12px 16px', fontWeight: '600', color: '#64748b' }}>
                          {(currentPage - 1) * pageSize + idx + 1}
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontWeight: '700', color: '#0f172a' }}>{item.jobTitle}</span>
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
                                <Sparkles size={11} /> AYUP TECH JOB
                              </span>
                            )}
                          </div>
                          {item.skills && <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>Skills: {item.skills}</div>}
                        </td>
                        <td style={{ padding: '12px 16px', color: '#334155', fontWeight: '500' }}>
                          {item.department}
                        </td>
                        <td style={{ padding: '12px 16px', color: '#334155' }}>
                          <div>{item.minExp} - {item.maxExp} Yrs</div>
                          <div style={{ fontSize: '11px', color: '#64748b' }}>{item.vacancies} {item.vacancies > 1 ? 'Openings' : 'Opening'}</div>
                        </td>
                        <td style={{ padding: '12px 16px', color: '#059669', fontWeight: '600' }}>
                          {item.annualCtc || 'Competitive'}
                        </td>
                        <td style={{ padding: '12px 16px', fontSize: '12px', color: '#475569' }}>
                          <div>From: {item.publishFrom ? new Date(item.publishFrom).toLocaleDateString() : 'Immediate'}</div>
                          <div>Till: {item.publishTill ? new Date(item.publishTill).toLocaleDateString() : 'Open'}</div>
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                          <span style={{
                            padding: '3px 10px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: '600',
                            backgroundColor: item.status === 'Published' ? '#dcfce7' : (item.status === 'Draft' ? '#fef3c7' : '#fee2e2'),
                            color: item.status === 'Published' ? '#166534' : (item.status === 'Draft' ? '#92400e' : '#991b1b')
                          }}>
                            {item.status || 'Published'}
                          </span>
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                            <button
                              onClick={() => handleEditJob(item)}
                              title="Edit"
                              style={{ padding: '5px', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', color: '#159BD7', cursor: 'pointer' }}
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(item._id)}
                              title="Delete"
                              style={{ padding: '5px', backgroundColor: '#fee2e2', border: '1px solid #fecaca', borderRadius: '4px', color: '#dc2626', cursor: 'pointer' }}
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

          <div style={{ padding: '12px 20px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: '#64748b' }}>
            <div>Showing {filteredJobs.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, filteredJobs.length)} of {filteredJobs.length} entries</div>
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
                style={{ padding: '5px 12px', borderRadius: '4px', border: '1px solid #cbd5e1', backgroundColor: currentPage >= totalPages ? '#f1f5f9' : '#fff', cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer' }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(2px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px'
        }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', width: '100%', maxWidth: '380px', padding: '24px', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Trash2 size={24} />
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>Delete Job Posting</h3>
            <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#64748b' }}>Are you sure you want to delete this job vacancy posting?</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <button onClick={() => setDeleteConfirmId(null)} style={{ padding: '7px 16px', border: '1px solid #cbd5e1', borderRadius: '6px', background: '#fff', cursor: 'pointer' }}>
                Cancel
              </button>
              <button onClick={confirmDelete} style={{ padding: '7px 18px', backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
