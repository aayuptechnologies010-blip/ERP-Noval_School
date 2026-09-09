import React, { useState, useEffect } from 'react';
import { Briefcase, Send, CheckCircle2, AlertCircle, RefreshCw, User, Mail, Phone, MapPin, GraduationCap, DollarSign, Clock, FileText, Sparkles, Award } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function EmploymentForm() {
  const [jobPostings, setJobPostings] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    jobId: '',
    jobTitle: '',
    candidateName: '',
    email: '',
    phone: '',
    qualification: '',
    experienceYrs: '',
    currentCompany: '',
    currentCtc: '',
    expectedCtc: '',
    noticePeriod: 'Immediate',
    resumeUrl: '',
    skills: '',
    remarks: '',
    gender: 'Male',
    city: 'New Delhi'
  });

  // Notification Toast
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

  // Fetch Published Jobs & Recent Applications
  const loadData = async () => {
    try {
      setLoadingJobs(true);
      // Fetch jobs
      const jRes = await fetch(`${API_BASE}/api/recruitment/job-postings`, { headers });
      if (jRes.ok) {
        const jobs = await jRes.json();
        const activeJobs = Array.isArray(jobs) ? jobs.filter(j => j.status === 'Published') : [];
        setJobPostings(activeJobs);
        if (activeJobs.length > 0 && !formData.jobTitle) {
          // Preselect first or Ayup Tech job if available
          const ayupJob = activeJobs.find(j => (j.jobTitle || '').toLowerCase().includes('ayup'));
          const selected = ayupJob || activeJobs[0];
          setFormData(prev => ({
            ...prev,
            jobId: selected._id,
            jobTitle: selected.jobTitle
          }));
        }
      }

      // Fetch recent applications
      const aRes = await fetch(`${API_BASE}/api/recruitment/applications`, { headers });
      if (aRes.ok) {
        const apps = await aRes.json();
        setRecentApplications(Array.isArray(apps) ? apps.slice(0, 5) : []);
      }
    } catch (err) {
      console.error('Error fetching employment jobs:', err);
    } finally {
      setLoadingJobs(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handle Job Change
  const handleJobSelect = (jobId) => {
    if (jobId === 'other') {
      setFormData({ ...formData, jobId: '', jobTitle: '' });
      return;
    }
    const found = jobPostings.find(j => j._id === jobId);
    if (found) {
      setFormData({
        ...formData,
        jobId: found._id,
        jobTitle: found.jobTitle,
        qualification: found.qualification || formData.qualification
      });
    }
  };

  // Quick Autofill for testing with Ayup Tech
  const fillSampleAyupTech = () => {
    const selectedJob = jobPostings[0]?.jobTitle || 'Senior Fullstack Lead - Ayup Tech Labs';
    setFormData({
      jobId: jobPostings[0]?._id || '',
      jobTitle: selectedJob,
      candidateName: 'Ayup Tech Lead',
      email: 'ayup.tech@novalschool.edu',
      phone: '+91 98765 43210',
      qualification: 'M.Tech in Computer Science & Engineering',
      experienceYrs: '7',
      currentCompany: 'Ayup Tech Solutions Pvt Ltd',
      currentCtc: '₹14,00,000 PA',
      expectedCtc: '₹18,50,000 PA',
      noticePeriod: '15 Days',
      resumeUrl: 'https://linkedin.com/in/ayuptech-lead',
      skills: 'React, Node.js, Express, MongoDB, Architecture, Redis, AWS',
      remarks: 'Proven track record of architecting scalable educational ERP applications with zero downtime.',
      gender: 'Male',
      city: 'Delhi NCR'
    });
    showNotification('success', 'Form autofilled with Ayup Tech profile details!');
  };

  // Submit Application
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.candidateName.trim()) {
      showNotification('error', 'Please provide Candidate Full Name');
      return;
    }
    if (!formData.jobTitle.trim()) {
      showNotification('error', 'Please select or enter the Applied Job Position');
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(`${API_BASE}/api/recruitment/applications`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          ...formData,
          experienceYrs: Number(formData.experienceYrs) || 0
        })
      });

      if (res.ok) {
        const created = await res.json();
        setSubmittedApp(created);
        showNotification('success', 'Employment Application submitted successfully!');
        loadData();
      } else {
        const errorData = await res.json();
        showNotification('error', errorData.message || 'Failed to submit application');
      }
    } catch (err) {
      console.error(err);
      showNotification('error', 'Server error while submitting application');
    } finally {
      setSubmitting(false);
    }
  };

  const selectedJobDetails = jobPostings.find(j => j._id === formData.jobId);

  return (
    <div className="global-settings-container" style={{ padding: '24px', backgroundColor: '#f8fafc', minHeight: '85vh' }}>
      
      {/* Toast Notification */}
      {statusMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          padding: '12px 20px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          backgroundColor: statusMessage.type === 'success' ? '#10b981' : '#ef4444',
          color: 'white',
          fontWeight: '500'
        }}>
          {statusMessage.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #159BD7 0%, #0d7cb1 100%)',
        borderRadius: '12px',
        padding: '28px 32px',
        color: 'white',
        marginBottom: '28px',
        boxShadow: '0 4px 12px rgba(21, 155, 215, 0.25)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>
            <Sparkles size={14} /> Official Employment Application Portal
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', margin: '0 0 6px 0', letterSpacing: '0.3px' }}>
            Staff & Faculty Recruitment Form
          </h1>
          <p style={{ margin: 0, opacity: 0.9, fontSize: '14px', maxWidth: '650px' }}>
            Submit your candidacy for academic, pedagogical, and technical administrative positions at Noval School & Ayup Tech Excellence Campus.
          </p>
        </div>

        <button
          type="button"
          onClick={fillSampleAyupTech}
          style={{
            backgroundColor: '#ffffff',
            color: '#159BD7',
            border: 'none',
            padding: '10px 18px',
            borderRadius: '8px',
            fontWeight: '700',
            fontSize: '13px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
          }}
        >
          <Sparkles size={16} color="#159BD7" /> Autofill "Ayup Tech"
        </button>
      </div>

      {submittedApp ? (
        /* SUCCESS CONFIRMATION RECEIPT */
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '40px',
          maxWidth: '750px',
          margin: '0 auto',
          textAlign: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
            <CheckCircle2 size={36} color="#16a34a" />
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px 0' }}>
            Application Submitted Successfully!
          </h2>
          <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 24px 0' }}>
            Thank you, <strong>{submittedApp.candidateName}</strong>. Your application has been registered in the Recruitment Pipeline.
          </p>

          <div style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '20px', textAlign: 'left', marginBottom: '28px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13.5px' }}>
              <div>
                <span style={{ color: '#64748b' }}>Application Ref ID:</span>
                <div style={{ fontWeight: '700', color: '#159BD7' }}>{submittedApp._id}</div>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Position Applied:</span>
                <div style={{ fontWeight: '600', color: '#0f172a' }}>{submittedApp.jobTitle}</div>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Email:</span>
                <div style={{ fontWeight: '600' }}>{submittedApp.email || 'N/A'}</div>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Mobile:</span>
                <div style={{ fontWeight: '600' }}>{submittedApp.phone || 'N/A'}</div>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Status:</span>
                <div>
                  <span style={{ backgroundColor: '#e0f2fe', color: '#0284c7', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                    {submittedApp.status || 'Applied'}
                  </span>
                </div>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Submission Date:</span>
                <div style={{ fontWeight: '500' }}>{new Date().toLocaleDateString('en-GB')}</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
            <button
              onClick={() => {
                setSubmittedApp(null);
                setFormData({
                  jobId: '',
                  jobTitle: '',
                  candidateName: '',
                  email: '',
                  phone: '',
                  qualification: '',
                  experienceYrs: '',
                  currentCompany: '',
                  currentCtc: '',
                  expectedCtc: '',
                  noticePeriod: 'Immediate',
                  resumeUrl: '',
                  skills: '',
                  remarks: '',
                  gender: 'Male',
                  city: 'New Delhi'
                });
              }}
              style={{
                backgroundColor: '#159BD7',
                color: 'white',
                border: 'none',
                padding: '10px 22px',
                borderRadius: '6px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Submit Another Application
            </button>
          </div>
        </div>
      ) : (
        /* APPLICATION FORM */
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <form onSubmit={handleSubmit} style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
            
            {/* Section 1: Position Selection */}
            <div style={{ marginBottom: '28px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Briefcase size={18} color="#159BD7" /> 1. Select Position of Interest
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                    Current Openings <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <select
                    value={formData.jobId || (formData.jobTitle ? 'custom' : '')}
                    onChange={(e) => {
                      if (e.target.value === 'custom') {
                        setFormData({ ...formData, jobId: '', jobTitle: '' });
                      } else {
                        handleJobSelect(e.target.value);
                      }
                    }}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', backgroundColor: '#fff' }}
                  >
                    <option value="">-- Choose an Open Position --</option>
                    {jobPostings.map(job => (
                      <option key={job._id} value={job._id}>
                        {job.jobTitle} ({job.department}) - {job.vacancies} Vacancy
                      </option>
                    ))}
                    <option value="custom">Other / General Application (Specify)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                    Job Title / Designation <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Fullstack Lead"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {/* Display selected job badge */}
              {selectedJobDetails && (
                <div style={{ marginTop: '12px', padding: '12px 16px', backgroundColor: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd', display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '13px', color: '#0369a1' }}>
                  <div><strong>Department:</strong> {selectedJobDetails.department}</div>
                  <div><strong>Experience:</strong> {selectedJobDetails.minExp} - {selectedJobDetails.maxExp} Years</div>
                  <div><strong>Annual CTC:</strong> {selectedJobDetails.annualCtc || 'Competitive'}</div>
                  <div><strong>Vacancies:</strong> {selectedJobDetails.vacancies}</div>
                </div>
              )}
            </div>

            <div style={{ height: '1px', backgroundColor: '#e2e8f0', marginBottom: '28px' }} />

            {/* Section 2: Candidate Personal Information */}
            <div style={{ marginBottom: '28px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={18} color="#159BD7" /> 2. Personal & Contact Information
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                    Full Name <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ayup Tech"
                    value={formData.candidateName}
                    onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                    Email Address <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. ayup.tech@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                    Mobile Number <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                    Current Location / City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Delhi NCR"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', backgroundColor: '#fff' }}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ height: '1px', backgroundColor: '#e2e8f0', marginBottom: '28px' }} />

            {/* Section 3: Academic Qualifications & Professional Experience */}
            <div style={{ marginBottom: '28px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <GraduationCap size={18} color="#159BD7" /> 3. Qualifications & Work Experience
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                    Highest Qualification / Degree
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. M.Tech / B.Tech / MCA / Ph.D / B.Ed"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                    Total Experience (Years)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 5"
                    value={formData.experienceYrs}
                    onChange={(e) => setFormData({ ...formData, experienceYrs: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                    Current Annual CTC
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹12,00,000"
                    value={formData.currentCtc}
                    onChange={(e) => setFormData({ ...formData, currentCtc: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                    Expected Annual CTC
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹16,00,000"
                    value={formData.expectedCtc}
                    onChange={(e) => setFormData({ ...formData, expectedCtc: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                    Notice Period
                  </label>
                  <select
                    value={formData.noticePeriod}
                    onChange={(e) => setFormData({ ...formData, noticePeriod: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', backgroundColor: '#fff' }}
                  >
                    <option value="Immediate">Immediate</option>
                    <option value="15 Days">15 Days</option>
                    <option value="30 Days">30 Days</option>
                    <option value="60 Days">60 Days</option>
                    <option value="90 Days">90 Days</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ height: '1px', backgroundColor: '#e2e8f0', marginBottom: '28px' }} />

            {/* Section 4: Skills, Resume & Statement */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={18} color="#159BD7" /> 4. Portfolio, Resume & Professional Summary
              </h3>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                  Online Resume / LinkedIn / Portfolio URL
                </label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/username or Google Drive link"
                  value={formData.resumeUrl}
                  onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                  Key Skills & Subject Competencies
                </label>
                <input
                  type="text"
                  placeholder="e.g. Fullstack, JavaScript, React, Node.js, Database Design, CBSE Curriculum"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                  Professional Summary / Remarks
                </label>
                <textarea
                  rows="3"
                  placeholder="Briefly state your achievements, pedagogical philosophy, or any special considerations..."
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            {/* Submission Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setFormData({
                  jobId: '',
                  jobTitle: '',
                  candidateName: '',
                  email: '',
                  phone: '',
                  qualification: '',
                  experienceYrs: '',
                  currentCompany: '',
                  currentCtc: '',
                  expectedCtc: '',
                  noticePeriod: 'Immediate',
                  resumeUrl: '',
                  skills: '',
                  remarks: '',
                  gender: 'Male',
                  city: 'New Delhi'
                })}
                style={{
                  padding: '10px 22px',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  backgroundColor: '#ffffff',
                  color: '#475569',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Clear Form
              </button>

              <button
                type="submit"
                disabled={submitting}
                style={{
                  backgroundColor: '#159BD7',
                  color: 'white',
                  border: 'none',
                  padding: '10px 30px',
                  borderRadius: '6px',
                  fontWeight: '700',
                  fontSize: '14px',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 2px 6px rgba(21, 155, 215, 0.3)'
                }}
              >
                {submitting ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    <Send size={16} /> Submit Employment Application
                  </>
                )}
              </button>
            </div>

          </form>

          {/* Recent Submissions Snapshot */}
          {recentApplications.length > 0 && (
            <div style={{ marginTop: '28px', backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px 24px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Recently Received Applications
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {recentApplications.map((app) => {
                  const isAyup = (app.candidateName || '').toLowerCase().includes('ayup');
                  return (
                    <div
                      key={app._id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px 14px',
                        borderRadius: '6px',
                        backgroundColor: isAyup ? '#f0f9ff' : '#f8fafc',
                        border: `1px solid ${isAyup ? '#bae6fd' : '#e2e8f0'}`
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <strong style={{ color: '#0f172a' }}>{app.candidateName}</strong>
                        {isAyup && (
                          <span style={{ backgroundColor: '#e0f2fe', color: '#0284c7', fontSize: '10.5px', padding: '1px 5px', borderRadius: '4px', border: '1px solid #7dd3fc', fontWeight: '700' }}>
                            ★ Ayup Tech
                          </span>
                        )}
                        <span style={{ color: '#64748b', fontSize: '13px' }}>— {app.jobTitle}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                          {new Date(app.applicationDate || app.createdAt).toLocaleDateString()}
                        </span>
                        <span style={{
                          fontSize: '11.5px',
                          fontWeight: '600',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          backgroundColor: app.status === 'Selected' ? '#dcfce7' : '#e0f2fe',
                          color: app.status === 'Selected' ? '#15803d' : '#0369a1'
                        }}>
                          {app.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
