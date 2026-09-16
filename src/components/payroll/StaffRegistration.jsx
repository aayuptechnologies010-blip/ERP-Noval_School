import React, { useState, useEffect } from 'react';
import { Save, Eye, X, Search, Plus, Trash2, Edit } from 'lucide-react';
const initialSalaryHeads = [
  { id: 1, name: 'Dearness Allowance', val: '95.00', type: 'Percentage', selected: true },
  { id: 2, name: 'House Rent Allowance', val: '5.00', type: 'Percentage', selected: true },
  { id: 3, name: 'Transport Allowance', val: '1600.00', type: 'Amount', selected: true },
  { id: 4, name: 'Medical Allowance', val: '75.00', type: 'Amount', selected: true },
  { id: 5, name: 'City expenses', val: '300.00', type: 'Amount', selected: true },
  { id: 6, name: 'Other Allowances', val: '0.00', type: 'Occasional', selected: false },
  { id: 7, name: 'Basic Arrear', val: '0.00', type: 'Occasional', selected: false },
  { id: 8, name: 'Dearness Allowance Arrear', val: '0.00', type: 'Occasional', selected: false },
  { id: 9, name: 'House Rent Allowance Arrear', val: '0.00', type: 'Occasional', selected: false },
  { id: 10, name: 'Transport Allowance Arrear', val: '0.00', type: 'Occasional', selected: false },
  { id: 11, name: 'Provident Fund', val: '12.00', type: 'Custom', selected: true },
  { id: 12, name: 'Employee State Insurance', val: '1.75', type: 'Percentage', selected: true },
  { id: 13, name: 'Income Tax', val: '0.00', type: 'Occasional', selected: false },
  { id: 14, name: 'Advance', val: '0.00', type: 'Occasional', selected: false }
];

const initialEducation = [
  { id: 1, qual: '10th', schoolCollege: '', boardUniv: '', regCorresp: '', subjects: '', marksPercent: '', passingYear: '' },
  { id: 2, qual: '12th', schoolCollege: '', boardUniv: '', regCorresp: '', subjects: '', marksPercent: '', passingYear: '' },
  { id: 3, qual: 'Graduation B.A./B.Sc.', schoolCollege: '', boardUniv: '', regCorresp: '', subjects: '', marksPercent: '', passingYear: '' },
  { id: 4, qual: 'B.Ed.', schoolCollege: '', boardUniv: '', regCorresp: '', subjects: '', marksPercent: '', passingYear: '' },
  { id: 5, qual: 'Post Graduation', schoolCollege: '', boardUniv: '', regCorresp: '', subjects: '', marksPercent: '', passingYear: '' }
];

const defaultFormState = {
  // Tab 1: Registration
  prefNo: '',
  isActive: true,
  title: 'Mr.',
  firstName: '',
  middleName: '',
  lastName: '',
  dob: '',
  emailId: '',
  contactNo: '',
  phone: '',
  aadharCardNo: '',
  bloodGroup: '',
  gender: 'Male',
  category: 'General',
  dateOfAnniversary: '',
  fatherSpouseName: '',
  motherName: '',
  fatherSpouseContactNo: '',
  fatherSpouseRelation: '',
  nativeAddress: '',
  address: '',
  alternateEmailId: '',
  alternateMobile: '',
  emergencyContactPerson: '',
  deviceNumber: '',
  maritalStatus: 'Unmarried',
  spouseName: '',
  emergencyContactNo: '',
  qualification: '',
  doj: '',
  dateOfRetire: '',
  isRetireExtended: false,
  nationality: 'Indian',
  religion: '',
  familyId: '',
  remarks: '',
  cbseId: '',
  cbsePassword: '',
  nomineeGratuity: '',
  stateTeacherId: '',
  nationalTeacherId: '',
  subjectExpertise: '',
  nomineePF: '',
  gratuityNomineeAadhar: '',
  gratuityNomineePhone: '',
  childProtection: false,
  policeClearanceCert: false,
  medicalFitnessCert: false,
  specialEducator: false,
  autoAssignLeaves: false,

  // Tab 2: Salary Details
  empNo: '',
  pfNo: '',
  panNumber: '',
  esiNo: '',
  bankName: '',
  bankAccNo: '',
  empAccNo: '',
  uanNumber: '',
  generateSalary: true,
  salaryToBank: true,
  salaryStatus: 'Active',
  machineNo: '',
  salaryGroup: '',
  gratuityCode: '',
  ifscCode: '',
  paymentModes: 'Bank Transfer',
  rciNo: '',
  basicSalary: 0,
  gradePay: 0,
  confirmationDate: '',
  permanentDate: '',
  leavingDate: '',
  probationDate: '',
  dojEpf: '',
  leavingDateEpf: '',
  leavingDateEps: '',
  incrementDate: '',
  reasonOfLeaving: '',
  shortName: '',
  macp1: '',
  macp2: '',
  macp3: '',
  pfJoiningDate: '',
  extensionStartDate: '',

  // Tab 3: Salary Head
  salaryHeads: initialSalaryHeads,

  // Tab 4: Education Details
  educationDetails: initialEducation,

  // Tab 5: Experience Details
  experienceDetails: [
    { id: 1, institutionName: '', yearFrom: '', yearTo: '', postHold: '', natureOfJob: '', reasonOfLeaving: '' }
  ],
  isTetQualified: false,
  isCtetQualified: false,
  tetExamLevel: '',

  // Tab 6: Other Information
  childrenDetails: [
    { id: 1, name: '', dob: '' }
  ],
  extraActivities: '',
  reference1: { personName: '', mobileNumber: '', address: '', relation: '' },
  reference2: { personName: '', mobileNumber: '', address: '', relation: '' },
  otherInformation: ''
};


const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function StaffRegistration() {
  const [activeTab, setActiveTab] = useState('registration');
  const [formData, setFormData] = useState(defaultFormState);
  const [editingStaffId, setEditingStaffId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Search & Modals
  const [searchQuery, setSearchQuery] = useState('');
  const [showStaffListModal, setShowStaffListModal] = useState(false);
  const [allStaffList, setAllStaffList] = useState([]);
  const [modalSearch, setModalSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // Dynamic dropdown data
  const [qualificationsList, setQualificationsList] = useState([]);
  const [departmentsList, setDepartmentsList] = useState([]);
  const [designationsList, setDesignationsList] = useState([]);
  const [staffTypesList, setStaffTypesList] = useState([]);
  const [salaryAccountsList, setSalaryAccountsList] = useState([]);

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  // Load dropdown choices
  useEffect(() => {
    const loadMasters = async () => {
      try {
        const [qRes, dRes, desRes, stRes, saRes] = await Promise.all([
          fetch(`${API_BASE}/api/qualifications`, { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch(`${API_BASE}/api/departments`, { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch(`${API_BASE}/api/designations`, { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch(`${API_BASE}/api/staff-types`, { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch(`${API_BASE}/api/salary-accounts`, { headers: { 'Authorization': `Bearer ${token}` } })
        ]);

        if (qRes.ok) setQualificationsList(await qRes.json());
        if (dRes.ok) setDepartmentsList(await dRes.json());
        if (desRes.ok) setDesignationsList(await desRes.json());
        if (stRes.ok) setStaffTypesList(await stRes.json());
        if (saRes.ok) setSalaryAccountsList(await saRes.json());
      } catch (err) {
        console.error('Error fetching master dropdowns:', err);
      }
    };
    loadMasters();
  }, []);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }));
  };

  // Populate form with staff data
  const loadStaffIntoForm = (staff) => {
    setEditingStaffId(staff._id);
    setFormData({
      ...defaultFormState,
      ...staff,
      // Format dates for inputs if existing
      dob: staff.dob ? staff.dob.split('T')[0] : '',
      doj: staff.doj ? staff.doj.split('T')[0] : '',
      dateOfAnniversary: staff.dateOfAnniversary ? staff.dateOfAnniversary.split('T')[0] : '',
      dateOfRetire: staff.dateOfRetire ? staff.dateOfRetire.split('T')[0] : '',
      confirmationDate: staff.confirmationDate ? staff.confirmationDate.split('T')[0] : '',
      permanentDate: staff.permanentDate ? staff.permanentDate.split('T')[0] : '',
      leavingDate: staff.leavingDate ? staff.leavingDate.split('T')[0] : '',
      probationDate: staff.probationDate ? staff.probationDate.split('T')[0] : '',
      dojEpf: staff.dojEpf ? staff.dojEpf.split('T')[0] : '',
      leavingDateEpf: staff.leavingDateEpf ? staff.leavingDateEpf.split('T')[0] : '',
      leavingDateEps: staff.leavingDateEps ? staff.leavingDateEps.split('T')[0] : '',
      incrementDate: staff.incrementDate ? staff.incrementDate.split('T')[0] : '',
      pfJoiningDate: staff.pfJoiningDate ? staff.pfJoiningDate.split('T')[0] : '',
      extensionStartDate: staff.extensionStartDate ? staff.extensionStartDate.split('T')[0] : '',
      salaryHeads: staff.salaryHeads && staff.salaryHeads.length > 0 ? staff.salaryHeads : initialSalaryHeads,
      educationDetails: staff.educationDetails && staff.educationDetails.length > 0 ? staff.educationDetails : initialEducation,
      experienceDetails: staff.experienceDetails && staff.experienceDetails.length > 0 ? staff.experienceDetails : [{ id: 1, institutionName: '', yearFrom: '', yearTo: '', postHold: '', natureOfJob: '', reasonOfLeaving: '' }],
      childrenDetails: staff.childrenDetails && staff.childrenDetails.length > 0 ? staff.childrenDetails : [{ id: 1, name: '', dob: '' }],
      reference1: staff.reference1 || { personName: '', mobileNumber: '', address: '', relation: '' },
      reference2: staff.reference2 || { personName: '', mobileNumber: '', address: '', relation: '' }
    });
  };

  // Search by top bar
  const handleSearchByName = async () => {
    if (!searchQuery.trim()) {
      alert('Please enter a name or code to search');
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/staffs`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) {
        const list = await res.json();
        const found = list.find(s => 
          (s.firstName && s.firstName.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (s.lastName && s.lastName.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (s.userName && s.userName.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (s.prefNo && s.prefNo.toString().includes(searchQuery))
        );
        if (found) {
          loadStaffIntoForm(found);
          alert(`Found staff: ${found.firstName} ${found.lastName} (${found.userName || found.prefNo})`);
        } else {
          alert('No staff member found matching: ' + searchQuery);
        }
      }
    } catch (err) {
      console.error(err);
      alert('Error searching staff');
    } finally {
      setLoading(false);
    }
  };

  // Search by Pref No. (Get button)
  const handleGetByPrefNo = async () => {
    if (!formData.prefNo) {
      alert('Please enter a Pref No.');
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/staffs`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) {
        const list = await res.json();
        const found = list.find(s => s.prefNo === formData.prefNo || s.userName === `SF${formData.prefNo.padStart(3, '0')}`);
        if (found) {
          loadStaffIntoForm(found);
          alert(`Loaded staff record for Pref No. ${formData.prefNo}`);
        } else {
          alert(`No staff found with Pref No. ${formData.prefNo}`);
        }
      }
    } catch (err) {
      console.error(err);
      alert('Error fetching by Pref No.');
    } finally {
      setLoading(false);
    }
  };

  // Open "View" Modal (List of all staff)
  const handleOpenViewModal = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/staffs`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) {
        const list = await res.json();
        setAllStaffList(list);
        setShowStaffListModal(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete staff from modal
  const handleDeleteStaff = async (id) => {
    if (!window.confirm('Are you sure you want to delete this staff member?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/staffs/${id}`, {
        method: 'DELETE',
        headers
      });
      if (res.ok) {
        setAllStaffList(prev => prev.filter(s => s._id !== id));
        if (editingStaffId === id) {
          handleReset();
        }
        alert('Staff deleted successfully');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting staff');
    }
  };

  // Save / Update staff
  const handleSaveStaff = async () => {
    if (!formData.firstName.trim()) {
      alert('First Name is required');
      setActiveTab('registration');
      return;
    }

    try {
      setLoading(true);
      const userName = formData.userName || (formData.prefNo ? `SF${formData.prefNo.padStart(3, '0')}` : `SF${Math.floor(100 + Math.random() * 900)}`);
      
      const payload = {
        ...formData,
        userName,
        lastName: formData.lastName || '---',
        prefNo: formData.prefNo || userName.replace('SF', '')
      };

      const url = editingStaffId ? `${API_BASE}/api/staffs/${editingStaffId}` : `${API_BASE}/api/staffs`;
      const method = editingStaffId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const saved = await res.json();
        setEditingStaffId(saved._id);
        alert(`Staff ${saved.firstName} ${saved.lastName} (${saved.userName}) saved successfully!`);
      } else {
        const err = await res.json();
        alert(err.message || 'Failed to save staff member');
      }
    } catch (err) {
      console.error('Error saving staff:', err);
      alert('Error saving staff record');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setEditingStaffId(null);
    setFormData(defaultFormState);
    setSearchQuery('');
  };

  // Experience row add/delete
  const handleAddExperienceRow = () => {
    const nextId = formData.experienceDetails.length + 1;
    setFormData(prev => ({
      ...prev,
      experienceDetails: [
        ...prev.experienceDetails,
        { id: nextId, institutionName: '', yearFrom: '', yearTo: '', postHold: '', natureOfJob: '', reasonOfLeaving: '' }
      ]
    }));
  };

  const handleDeleteExperienceRow = (idx) => {
    setFormData(prev => ({
      ...prev,
      experienceDetails: prev.experienceDetails.filter((_, i) => i !== idx)
    }));
  };

  // Children row add/delete
  const handleAddChildrenRow = () => {
    const nextId = formData.childrenDetails.length + 1;
    setFormData(prev => ({
      ...prev,
      childrenDetails: [
        ...prev.childrenDetails,
        { id: nextId, name: '', dob: '' }
      ]
    }));
  };

  const handleDeleteChildrenRow = (idx) => {
    setFormData(prev => ({
      ...prev,
      childrenDetails: prev.childrenDetails.filter((_, i) => i !== idx)
    }));
  };

  return (
    <div className="global-settings-container">
      {/* Navigation Tabs */}
      <div className="settings-tabs" style={{ gap: '0', borderBottom: '1px solid #dee2e6', marginBottom: '20px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <div 
          className={`settings-tab ${activeTab === 'registration' ? 'active-tab' : 'inactive-tab'}`} 
          style={{ borderRadius: '0', padding: '12px 20px', cursor: 'pointer' }}
          onClick={() => setActiveTab('registration')}
        >
          Staff Registration
        </div>
        <div 
          className={`settings-tab ${activeTab === 'salary-details' ? 'active-tab' : 'inactive-tab'}`} 
          style={{ borderRadius: '0', padding: '12px 20px', cursor: 'pointer' }}
          onClick={() => setActiveTab('salary-details')}
        >
          Staff Salary Details
        </div>
        <div 
          className={`settings-tab ${activeTab === 'salary-head' ? 'active-tab' : 'inactive-tab'}`} 
          style={{ borderRadius: '0', padding: '12px 20px', cursor: 'pointer' }}
          onClick={() => setActiveTab('salary-head')}
        >
          Staff Salary Head
        </div>
        <div 
          className={`settings-tab ${activeTab === 'education-details' ? 'active-tab' : 'inactive-tab'}`} 
          style={{ borderRadius: '0', padding: '12px 20px', cursor: 'pointer' }}
          onClick={() => setActiveTab('education-details')}
        >
          Staff Education Details
        </div>
        <div 
          className={`settings-tab ${activeTab === 'experience-details' ? 'active-tab' : 'inactive-tab'}`} 
          style={{ borderRadius: '0', padding: '12px 20px', cursor: 'pointer' }}
          onClick={() => setActiveTab('experience-details')}
        >
          Staff Experience Details
        </div>
        <div 
          className={`settings-tab ${activeTab === 'other-information' ? 'active-tab' : 'inactive-tab'}`} 
          style={{ borderRadius: '0', padding: '12px 20px', cursor: 'pointer' }}
          onClick={() => setActiveTab('other-information')}
        >
          Other Information
        </div>
      </div>

      {/* Top Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '25px' }}>
        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #dee2e6', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ padding: '8px 15px', backgroundColor: '#f8f9fa', color: '#495057', fontSize: '13px', fontWeight: '500', borderRight: '1px solid #dee2e6' }}>
            Enter/Search Name
          </div>
          <input 
            type="text" 
            placeholder="e.g. Ayup or SF072"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchByName()}
            style={{ padding: '8px 12px', border: 'none', width: '300px', outline: 'none', fontSize: '13px' }} 
          />
          <button 
            onClick={handleSearchByName}
            style={{ padding: '8px 20px', backgroundColor: 'white', color: '#159BD7', border: 'none', borderLeft: '1px solid #dee2e6', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}
          >
            <Search size={14} /> Search
          </button>
        </div>
      </div>

      {editingStaffId && (
        <div style={{ backgroundColor: '#e8f5e9', border: '1px solid #c8e6c9', color: '#2e7d32', padding: '10px 20px', borderRadius: '4px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Editing Staff: <strong>{formData.title} {formData.firstName} {formData.lastName} ({formData.userName || formData.prefNo})</strong></span>
          <button onClick={handleReset} style={{ background: 'none', border: 'none', color: '#2e7d32', cursor: 'pointer', textDecoration: 'underline', fontSize: '12px' }}>Clear & Create New</button>
        </div>
      )}

      <div style={{ padding: '0 20px' }}>
        
        {/* ================= TAB 1: REGISTRATION ================= */}
        {activeTab === 'registration' && (
          <>
            {/* Row 1 */}
            <div className="settings-row" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
              <div className="form-group" style={{ gridColumn: 'span 2', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
                <div>
                  <label>Pref No.</label>
                  <input 
                    type="text" 
                    className="settings-input" 
                    value={formData.prefNo} 
                    onChange={(e) => handleChange('prefNo', e.target.value)}
                    placeholder="e.g. 72" 
                    style={{ width: '100%' }} 
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <button 
                    type="button"
                    onClick={handleGetByPrefNo}
                    style={{ padding: '8px 20px', backgroundColor: 'white', color: '#159BD7', border: '1px solid #159BD7', borderRadius: '4px', cursor: 'pointer', width: '100%', fontWeight: '500' }}
                  >
                    Get
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>Status</label>
                <label className="checkbox-label" style={{ marginTop: '8px', color: '#333' }}>
                  <input 
                    type="checkbox" 
                    checked={formData.isActive}
                    onChange={(e) => handleChange('isActive', e.target.checked)}
                  /> Active
                </label>
              </div>
            </div>

            {/* Row 2 */}
            <div className="settings-row" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
              <div className="form-group">
                <label>Title</label>
                <select 
                  className="settings-input"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                >
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Miss">Miss</option>
                  <option value="Dr.">Dr.</option>
                </select>
              </div>
              <div className="form-group">
                <label>First Name <span style={{ color: '#dc3545' }}>*</span></label>
                <input 
                  type="text" 
                  className="settings-input" 
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  placeholder="e.g. Ayup"
                />
              </div>
              <div className="form-group">
                <label>Middle Name</label>
                <input 
                  type="text" 
                  className="settings-input" 
                  value={formData.middleName}
                  onChange={(e) => handleChange('middleName', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input 
                  type="text" 
                  className="settings-input" 
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  placeholder="e.g. Khan"
                />
              </div>
              <div className="form-group">
                <label>Date of Birth</label>
                <input 
                  type="date" 
                  className="settings-input" 
                  value={formData.dob}
                  onChange={(e) => handleChange('dob', e.target.value)}
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="settings-row" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  className="settings-input" 
                  value={formData.emailId}
                  onChange={(e) => handleChange('emailId', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Mobile</label>
                <input 
                  type="text" 
                  className="settings-input" 
                  value={formData.contactNo}
                  onChange={(e) => handleChange('contactNo', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input 
                  type="text" 
                  className="settings-input" 
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Aadhar Card No.</label>
                <input 
                  type="text" 
                  className="settings-input" 
                  value={formData.aadharCardNo}
                  onChange={(e) => handleChange('aadharCardNo', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Select Blood Group</label>
                <select 
                  className="settings-input"
                  value={formData.bloodGroup}
                  onChange={(e) => handleChange('bloodGroup', e.target.value)}
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>

            {/* Row 4 */}
            <div className="settings-row" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
              <div className="form-group">
                <label>Gender</label>
                <div style={{ display: 'flex', gap: '15px', marginTop: '8px' }}>
                  <label className="checkbox-label" style={{ fontWeight: 'normal' }}>
                    <input 
                      type="radio" 
                      name="gender" 
                      checked={formData.gender === 'Male'} 
                      onChange={() => handleChange('gender', 'Male')} 
                    /> Male
                  </label>
                  <label className="checkbox-label" style={{ fontWeight: 'normal' }}>
                    <input 
                      type="radio" 
                      name="gender" 
                      checked={formData.gender === 'Female'} 
                      onChange={() => handleChange('gender', 'Female')} 
                    /> Female
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label>Category</label>
                <select 
                  className="settings-input"
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                >
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date of Anniversary</label>
                <input 
                  type="date" 
                  className="settings-input" 
                  value={formData.dateOfAnniversary}
                  onChange={(e) => handleChange('dateOfAnniversary', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Father/Spouse Name</label>
                <input 
                  type="text" 
                  className="settings-input" 
                  value={formData.fatherSpouseName}
                  onChange={(e) => handleChange('fatherSpouseName', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Mother Name</label>
                <input 
                  type="text" 
                  className="settings-input" 
                  value={formData.motherName}
                  onChange={(e) => handleChange('motherName', e.target.value)}
                />
              </div>
            </div>

            {/* Row 5 */}
            <div className="settings-row" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
              <div className="form-group">
                <label>Father/Spouse Mobile</label>
                <input 
                  type="text" 
                  className="settings-input" 
                  value={formData.fatherSpouseContactNo}
                  onChange={(e) => handleChange('fatherSpouseContactNo', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Father/Spouse Relation</label>
                <select 
                  className="settings-input"
                  value={formData.fatherSpouseRelation}
                  onChange={(e) => handleChange('fatherSpouseRelation', e.target.value)}
                >
                  <option value="">Select Relation</option>
                  <option value="Father">Father</option>
                  <option value="Husband">Husband</option>
                  <option value="Wife">Wife</option>
                  <option value="Mother">Mother</option>
                  <option value="Guardian">Guardian</option>
                </select>
              </div>
              <div className="form-group">
                <label>Native Address</label>
                <input 
                  type="text" 
                  className="settings-input" 
                  value={formData.nativeAddress}
                  onChange={(e) => handleChange('nativeAddress', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Current Address</label>
                <input 
                  type="text" 
                  className="settings-input" 
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Alternate Email</label>
                <input 
                  type="email" 
                  className="settings-input" 
                  value={formData.alternateEmailId}
                  onChange={(e) => handleChange('alternateEmailId', e.target.value)}
                />
              </div>
            </div>

            {/* Row 6 */}
            <div className="settings-row" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px', marginBottom: '20px' }}>
              <div className="form-group">
                <label>Alternate Mobile</label>
                <input 
                  type="text" 
                  className="settings-input" 
                  value={formData.alternateMobile}
                  onChange={(e) => handleChange('alternateMobile', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Emergency Contact Person Name</label>
                <input 
                  type="text" 
                  className="settings-input" 
                  value={formData.emergencyContactPerson}
                  onChange={(e) => handleChange('emergencyContactPerson', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Device Number</label>
                <input 
                  type="text" 
                  className="settings-input" 
                  value={formData.deviceNumber}
                  onChange={(e) => handleChange('deviceNumber', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Designation</label>
                <select 
                  className="settings-input"
                  value={formData.designation}
                  onChange={(e) => handleChange('designation', e.target.value)}
                >
                  <option value="">Select Designation</option>
                  {designationsList.map(d => (
                    <option key={d._id} value={d.type}>{d.type}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Department</label>
                <select 
                  className="settings-input"
                  value={formData.department}
                  onChange={(e) => handleChange('department', e.target.value)}
                >
                  <option value="">Select Department</option>
                  {departmentsList.map(dep => (
                    <option key={dep._id} value={dep.type}>{dep.type}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 7: Additional Statutory Fields */}
            <div className="settings-row" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
              <div className="form-group">
                <label>Marital Status</label>
                <div style={{ display: 'flex', gap: '10px', marginTop: '8px', flexWrap: 'wrap' }}>
                  <label className="checkbox-label" style={{ fontWeight: 'normal' }}>
                    <input 
                      type="radio" 
                      name="marital" 
                      checked={formData.maritalStatus === 'Married'}
                      onChange={() => handleChange('maritalStatus', 'Married')}
                    /> Married
                  </label>
                  <label className="checkbox-label" style={{ fontWeight: 'normal' }}>
                    <input 
                      type="radio" 
                      name="marital" 
                      checked={formData.maritalStatus === 'Unmarried'}
                      onChange={() => handleChange('maritalStatus', 'Unmarried')}
                    /> Unmarried
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label>Spouse Name</label>
                <input 
                  type="text" 
                  className="settings-input" 
                  value={formData.spouseName}
                  onChange={(e) => handleChange('spouseName', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Emergency Mobile</label>
                <input 
                  type="text" 
                  className="settings-input" 
                  value={formData.emergencyContactNo}
                  onChange={(e) => handleChange('emergencyContactNo', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Qualification</label>
                <select 
                  className="settings-input"
                  value={formData.qualification}
                  onChange={(e) => handleChange('qualification', e.target.value)}
                >
                  <option value="">Select Qualification</option>
                  {qualificationsList.map(q => (
                    <option key={q._id} value={q.type}>{q.type}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Date of Joining</label>
                <input 
                  type="date" 
                  className="settings-input" 
                  value={formData.doj}
                  onChange={(e) => handleChange('doj', e.target.value)}
                />
              </div>
            </div>

            {/* Row 8 */}
            <div className="settings-row" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
              <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '10px', alignItems: 'end' }}>
                <div>
                  <label>Date of Retire</label>
                  <input 
                    type="date" 
                    className="settings-input" 
                    value={formData.dateOfRetire}
                    onChange={(e) => handleChange('dateOfRetire', e.target.value)}
                    style={{ width: '100%' }} 
                  />
                </div>
                <label className="checkbox-label" style={{ marginBottom: '8px' }}>
                  <input 
                    type="checkbox" 
                    checked={formData.isRetireExtended}
                    onChange={(e) => handleChange('isRetireExtended', e.target.checked)}
                  /> Extend
                </label>
              </div>
              <div className="form-group">
                <label>Nationality</label>
                <input 
                  type="text" 
                  className="settings-input" 
                  value={formData.nationality}
                  onChange={(e) => handleChange('nationality', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Religion</label>
                <input 
                  type="text" 
                  className="settings-input" 
                  value={formData.religion}
                  onChange={(e) => handleChange('religion', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Family Id</label>
                <input 
                  type="text" 
                  className="settings-input" 
                  value={formData.familyId}
                  onChange={(e) => handleChange('familyId', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Remarks</label>
                <input 
                  type="text" 
                  className="settings-input" 
                  value={formData.remarks}
                  onChange={(e) => handleChange('remarks', e.target.value)}
                />
              </div>
            </div>

            {/* Row 9: Teacher IDs */}
            <div className="settings-row" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
              <div className="form-group">
                <label>CBSE ID</label>
                <input 
                  type="text" 
                  className="settings-input" 
                  value={formData.cbseId}
                  onChange={(e) => handleChange('cbseId', e.target.value)}
                />
              </div>
              <div className="form-group" style={{ position: 'relative' }}>
                <label>CBSE Password</label>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  className="settings-input" 
                  value={formData.cbsePassword}
                  onChange={(e) => handleChange('cbsePassword', e.target.value)}
                />
                <Eye 
                  size={16} 
                  color={showPassword ? '#159BD7' : '#6c757d'} 
                  style={{ position: 'absolute', right: '10px', top: '32px', cursor: 'pointer' }} 
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
              <div className="form-group">
                <label>Nominee for Gratuity</label>
                <input 
                  type="text" 
                  className="settings-input" 
                  value={formData.nomineeGratuity}
                  onChange={(e) => handleChange('nomineeGratuity', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>State Teacher Code</label>
                <input 
                  type="text" 
                  className="settings-input" 
                  value={formData.stateTeacherId}
                  onChange={(e) => handleChange('stateTeacherId', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>National Teacher Code</label>
                <input 
                  type="text" 
                  className="settings-input" 
                  value={formData.nationalTeacherId}
                  onChange={(e) => handleChange('nationalTeacherId', e.target.value)}
                />
              </div>
            </div>

            {/* Row 10: Nominee & Certs */}
            <div className="settings-row" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginTop: '10px' }}>
              <div className="form-group">
                <label>Nominee for PF</label>
                <input 
                  type="text" 
                  className="settings-input" 
                  value={formData.nomineePF}
                  onChange={(e) => handleChange('nomineePF', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Gratuity Nominee Aadhar</label>
                <input 
                  type="text" 
                  className="settings-input" 
                  value={formData.gratuityNomineeAadhar}
                  onChange={(e) => handleChange('gratuityNomineeAadhar', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Gratuity Nominee Phone</label>
                <input 
                  type="text" 
                  className="settings-input" 
                  value={formData.gratuityNomineePhone}
                  onChange={(e) => handleChange('gratuityNomineePhone', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Subject Expertise</label>
                <input 
                  type="text" 
                  className="settings-input" 
                  value={formData.subjectExpertise}
                  onChange={(e) => handleChange('subjectExpertise', e.target.value)}
                />
              </div>
            </div>

            {/* Checkboxes row */}
            <div className="settings-row" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px', backgroundColor: '#f8f9fa', padding: '15px', border: '1px solid #dee2e6', marginTop: '15px' }}>
              <label className="checkbox-label" style={{ fontWeight: 'normal' }}>
                <input 
                  type="checkbox" 
                  checked={formData.childProtection}
                  onChange={(e) => handleChange('childProtection', e.target.checked)}
                /> Child Protection
              </label>
              <label className="checkbox-label" style={{ fontWeight: 'normal' }}>
                <input 
                  type="checkbox" 
                  checked={formData.policeClearanceCert}
                  onChange={(e) => handleChange('policeClearanceCert', e.target.checked)}
                /> Police Clearance
              </label>
              <label className="checkbox-label" style={{ fontWeight: 'normal' }}>
                <input 
                  type="checkbox" 
                  checked={formData.medicalFitnessCert}
                  onChange={(e) => handleChange('medicalFitnessCert', e.target.checked)}
                /> Medical Fitness
              </label>
              <label className="checkbox-label" style={{ fontWeight: 'normal' }}>
                <input 
                  type="checkbox" 
                  checked={formData.specialEducator}
                  onChange={(e) => handleChange('specialEducator', e.target.checked)}
                /> Special Educator
              </label>
              <label className="checkbox-label" style={{ fontWeight: 'normal' }}>
                <input 
                  type="checkbox" 
                  checked={formData.autoAssignLeaves}
                  onChange={(e) => handleChange('autoAssignLeaves', e.target.checked)}
                /> Auto Assign Leaves
              </label>
            </div>
          </>
        )}

        {/* ================= TAB 2: SALARY DETAILS ================= */}
        {activeTab === 'salary-details' && (
          <div style={{ marginTop: '10px' }}>
            <div className="settings-row" style={{ gridTemplateColumns: 'repeat(6, 1fr)', gap: '15px' }}>
              <div className="form-group"><label>Emp No</label><input type="text" className="settings-input" value={formData.empNo} onChange={(e) => handleChange('empNo', e.target.value)} /></div>
              <div className="form-group"><label>PF No</label><input type="text" className="settings-input" value={formData.pfNo} onChange={(e) => handleChange('pfNo', e.target.value)} /></div>
              <div className="form-group"><label>PAN No</label><input type="text" className="settings-input" value={formData.panNumber} onChange={(e) => handleChange('panNumber', e.target.value)} /></div>
              <div className="form-group"><label>ESI No</label><input type="text" className="settings-input" value={formData.esiNo} onChange={(e) => handleChange('esiNo', e.target.value)} /></div>
              <div className="form-group">
                <label>Bank Name</label>
                <input type="text" className="settings-input" value={formData.bankName} onChange={(e) => handleChange('bankName', e.target.value)} />
              </div>
              <div className="form-group"><label>Bank Acc No</label><input type="text" className="settings-input" value={formData.bankAccNo} onChange={(e) => handleChange('bankAccNo', e.target.value)} /></div>
            </div>

            <div className="settings-row" style={{ gridTemplateColumns: 'repeat(6, 1fr)', gap: '15px' }}>
              <div className="form-group"><label>Emp Acc No</label><input type="text" className="settings-input" value={formData.empAccNo} onChange={(e) => handleChange('empAccNo', e.target.value)} /></div>
              <div className="form-group"><label>UAN No</label><input type="text" className="settings-input" value={formData.uanNumber} onChange={(e) => handleChange('uanNumber', e.target.value)} /></div>
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', paddingTop: '20px' }}>
                <label className="checkbox-label" style={{ fontWeight: 'normal' }}>
                  <input type="checkbox" checked={formData.generateSalary} onChange={(e) => handleChange('generateSalary', e.target.checked)} /> Generate Salary
                </label>
              </div>
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', paddingTop: '20px' }}>
                <label className="checkbox-label" style={{ fontWeight: 'normal' }}>
                  <input type="checkbox" checked={formData.salaryToBank} onChange={(e) => handleChange('salaryToBank', e.target.checked)} /> Salary To Bank
                </label>
              </div>
              <div className="form-group">
                <label>Salary Status</label>
                <select className="settings-input" value={formData.salaryStatus} onChange={(e) => handleChange('salaryStatus', e.target.value)}>
                  <option value="Active">Active</option>
                  <option value="Hold">Hold</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="form-group"><label>Machine no</label><input type="text" className="settings-input" value={formData.machineNo} onChange={(e) => handleChange('machineNo', e.target.value)} /></div>
            </div>

            <div className="settings-row" style={{ gridTemplateColumns: 'repeat(6, 1fr)', gap: '15px' }}>
              <div className="form-group">
                <label>Salary Account</label>
                <select className="settings-input" value={formData.salaryAccount} onChange={(e) => handleChange('salaryAccount', e.target.value)}>
                  <option value="">Select Salary Account</option>
                  {salaryAccountsList.map(a => (
                    <option key={a._id} value={a.accountName}>{a.accountName}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Salary Group / Staff Type</label>
                <select className="settings-input" value={formData.staffType} onChange={(e) => handleChange('staffType', e.target.value)}>
                  <option value="">Select Staff Type</option>
                  {staffTypesList.map(st => (
                    <option key={st._id} value={st.type}>{st.type}</option>
                  ))}
                </select>
              </div>
              <div className="form-group"><label>Gratuity Code</label><input type="text" className="settings-input" value={formData.gratuityCode} onChange={(e) => handleChange('gratuityCode', e.target.value)} /></div>
              <div className="form-group"><label>IFSC Code</label><input type="text" className="settings-input" value={formData.ifscCode} onChange={(e) => handleChange('ifscCode', e.target.value)} /></div>
              <div className="form-group"><label>Payment Modes</label><select className="settings-input" value={formData.paymentModes} onChange={(e) => handleChange('paymentModes', e.target.value)}><option value="Bank Transfer">Bank Transfer</option><option value="Cheque">Cheque</option><option value="Cash">Cash</option></select></div>
              <div className="form-group"><label>RCI No</label><input type="text" className="settings-input" value={formData.rciNo} onChange={(e) => handleChange('rciNo', e.target.value)} /></div>
            </div>

            {/* Basic Salary Part */}
            <div style={{ backgroundColor: '#f8f9fa', padding: '10px 15px', fontWeight: 'bold', fontSize: '13px', color: '#495057', border: '1px solid #dee2e6', marginTop: '20px' }}>
              Basic Salary Part
            </div>
            <div className="mail-table-wrapper" style={{ borderTop: 'none', borderRadius: '0' }}>
              <table className="mail-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th style={{ width: '200px' }}>Value (₹)</th>
                    <th>Level</th>
                    <th>Applied On</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="row-odd">
                    <td style={{ fontWeight: '500' }}>Basic Salary</td>
                    <td>
                      <input 
                        type="number" 
                        className="settings-input" 
                        value={formData.basicSalary}
                        onChange={(e) => handleChange('basicSalary', Number(e.target.value))}
                        style={{ width: '100%' }} 
                      />
                    </td>
                    <td>Level 0</td>
                    <td>Regular</td>
                  </tr>
                  <tr className="row-even">
                    <td style={{ fontWeight: '500' }}>Grade Pay</td>
                    <td>
                      <input 
                        type="number" 
                        className="settings-input" 
                        value={formData.gradePay}
                        onChange={(e) => handleChange('gradePay', Number(e.target.value))}
                        style={{ width: '100%' }} 
                      />
                    </td>
                    <td>Level 0</td>
                    <td>Regular</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Dates in Salary */}
            <div className="settings-row" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px', marginTop: '20px' }}>
              <div className="form-group"><label>Confirmation Date</label><input type="date" className="settings-input" value={formData.confirmationDate} onChange={(e) => handleChange('confirmationDate', e.target.value)} /></div>
              <div className="form-group"><label>Permanent Date</label><input type="date" className="settings-input" value={formData.permanentDate} onChange={(e) => handleChange('permanentDate', e.target.value)} /></div>
              <div className="form-group"><label>Leaving Date</label><input type="date" className="settings-input" value={formData.leavingDate} onChange={(e) => handleChange('leavingDate', e.target.value)} /></div>
              <div className="form-group"><label>Probation Date</label><input type="date" className="settings-input" value={formData.probationDate} onChange={(e) => handleChange('probationDate', e.target.value)} /></div>
              <div className="form-group"><label>Joining Date EPF</label><input type="date" className="settings-input" value={formData.dojEpf} onChange={(e) => handleChange('dojEpf', e.target.value)} /></div>
            </div>

            <div className="settings-row" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
              <div className="form-group"><label>Leaving Date EPF</label><input type="date" className="settings-input" value={formData.leavingDateEpf} onChange={(e) => handleChange('leavingDateEpf', e.target.value)} /></div>
              <div className="form-group"><label>Leaving Date EPS</label><input type="date" className="settings-input" value={formData.leavingDateEps} onChange={(e) => handleChange('leavingDateEps', e.target.value)} /></div>
              <div className="form-group"><label>Increment Date</label><input type="date" className="settings-input" value={formData.incrementDate} onChange={(e) => handleChange('incrementDate', e.target.value)} /></div>
              <div className="form-group"><label>Reason Of Leaving</label><input type="text" className="settings-input" value={formData.reasonOfLeaving} onChange={(e) => handleChange('reasonOfLeaving', e.target.value)} /></div>
              <div className="form-group"><label>Short Name</label><input type="text" className="settings-input" value={formData.shortName} onChange={(e) => handleChange('shortName', e.target.value)} /></div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: SALARY HEADS ================= */}
        {activeTab === 'salary-head' && (
          <div style={{ marginTop: '10px' }}>
            <div className="mail-table-wrapper">
              <table className="mail-table">
                <thead>
                  <tr>
                    <th style={{ width: '60px', textAlign: 'center' }}>Sr. No.</th>
                    <th style={{ width: '80px', textAlign: 'center' }}>Select</th>
                    <th>Head Name</th>
                    <th>Value</th>
                    <th>ValueType</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.salaryHeads.map((head, i) => (
                    <tr key={head.id} className={i % 2 === 0 ? 'row-odd' : 'row-even'}>
                      <td style={{ textAlign: 'center' }}>{head.id}</td>
                      <td style={{ textAlign: 'center' }}>
                        <input 
                          type="checkbox" 
                          checked={head.selected || false}
                          onChange={(e) => {
                            const updated = [...formData.salaryHeads];
                            updated[i] = { ...updated[i], selected: e.target.checked };
                            handleChange('salaryHeads', updated);
                          }}
                        />
                      </td>
                      <td style={{ fontWeight: '500' }}>{head.name}</td>
                      <td>
                        <input 
                          type="text" 
                          className="settings-input" 
                          value={head.val} 
                          onChange={(e) => {
                            const updated = [...formData.salaryHeads];
                            updated[i] = { ...updated[i], val: e.target.value };
                            handleChange('salaryHeads', updated);
                          }}
                          style={{ width: '150px', padding: '4px 8px' }} 
                        />
                      </td>
                      <td>{head.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 4: EDUCATION DETAILS ================= */}
        {activeTab === 'education-details' && (
          <div style={{ marginTop: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#333' }}>DETAILS OF QUALIFICATION:</div>
              <div style={{ fontSize: '11px', color: '#6c757d' }}>R:REGULAR; C:CORRESPONDENCE</div>
            </div>
            
            <div className="mail-table-wrapper">
              <table className="mail-table">
                <thead>
                  <tr>
                    <th style={{ width: '50px', textAlign: 'center' }}>Sl No.</th>
                    <th style={{ width: '150px' }}>Qualification</th>
                    <th>Name of School/College</th>
                    <th>Board/University</th>
                    <th>Regular/Correspondence</th>
                    <th>Subjects</th>
                    <th style={{ width: '90px' }}>% Marks</th>
                    <th style={{ width: '100px' }}>Year</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.educationDetails.map((row, i) => (
                    <tr key={row.id} className={i % 2 === 0 ? 'row-even' : 'row-odd'}>
                      <td style={{ textAlign: 'center' }}>{row.id}</td>
                      <td style={{ fontWeight: '500' }}>{row.qual}</td>
                      <td>
                        <input 
                          type="text" 
                          className="settings-input" 
                          value={row.schoolCollege || ''}
                          onChange={(e) => {
                            const updated = [...formData.educationDetails];
                            updated[i] = { ...updated[i], schoolCollege: e.target.value };
                            handleChange('educationDetails', updated);
                          }}
                          style={{ width: '100%', padding: '4px 8px' }} 
                        />
                      </td>
                      <td>
                        <input 
                          type="text" 
                          className="settings-input" 
                          value={row.boardUniv || ''}
                          onChange={(e) => {
                            const updated = [...formData.educationDetails];
                            updated[i] = { ...updated[i], boardUniv: e.target.value };
                            handleChange('educationDetails', updated);
                          }}
                          style={{ width: '100%', padding: '4px 8px' }} 
                        />
                      </td>
                      <td>
                        <input 
                          type="text" 
                          className="settings-input" 
                          value={row.regCorresp || ''}
                          onChange={(e) => {
                            const updated = [...formData.educationDetails];
                            updated[i] = { ...updated[i], regCorresp: e.target.value };
                            handleChange('educationDetails', updated);
                          }}
                          style={{ width: '100%', padding: '4px 8px' }} 
                        />
                      </td>
                      <td>
                        <input 
                          type="text" 
                          className="settings-input" 
                          value={row.subjects || ''}
                          onChange={(e) => {
                            const updated = [...formData.educationDetails];
                            updated[i] = { ...updated[i], subjects: e.target.value };
                            handleChange('educationDetails', updated);
                          }}
                          style={{ width: '100%', padding: '4px 8px' }} 
                        />
                      </td>
                      <td>
                        <input 
                          type="text" 
                          className="settings-input" 
                          value={row.marksPercent || ''}
                          onChange={(e) => {
                            const updated = [...formData.educationDetails];
                            updated[i] = { ...updated[i], marksPercent: e.target.value };
                            handleChange('educationDetails', updated);
                          }}
                          style={{ width: '100%', padding: '4px 8px' }} 
                        />
                      </td>
                      <td>
                        <input 
                          type="text" 
                          className="settings-input" 
                          value={row.passingYear || ''}
                          onChange={(e) => {
                            const updated = [...formData.educationDetails];
                            updated[i] = { ...updated[i], passingYear: e.target.value };
                            handleChange('educationDetails', updated);
                          }}
                          style={{ width: '100%', padding: '4px 8px' }} 
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 5: EXPERIENCE DETAILS ================= */}
        {activeTab === 'experience-details' && (
          <div style={{ marginTop: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#333' }}>DETAILS OF EXPERIENCE:</div>
              <button 
                type="button"
                onClick={handleAddExperienceRow}
                style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '6px 15px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Plus size={14} /> Add Row
              </button>
            </div>
            
            <div className="mail-table-wrapper">
              <table className="mail-table">
                <thead>
                  <tr>
                    <th style={{ width: '50px', textAlign: 'center' }}>SL.NO.</th>
                    <th>Name & Address of Institution</th>
                    <th style={{ width: '100px' }}>Year (From)</th>
                    <th style={{ width: '100px' }}>Year (To)</th>
                    <th>Post Held</th>
                    <th>Nature of Job</th>
                    <th>Reason Of Leaving</th>
                    <th style={{ width: '60px', textAlign: 'center' }}>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.experienceDetails.map((row, idx) => (
                    <tr key={idx} className="row-even">
                      <td style={{ textAlign: 'center' }}>{idx + 1}</td>
                      <td>
                        <input 
                          type="text" 
                          className="settings-input" 
                          value={row.institutionName || ''}
                          onChange={(e) => {
                            const updated = [...formData.experienceDetails];
                            updated[idx] = { ...updated[idx], institutionName: e.target.value };
                            handleChange('experienceDetails', updated);
                          }}
                          style={{ width: '100%', padding: '4px 8px' }} 
                        />
                      </td>
                      <td>
                        <input 
                          type="text" 
                          className="settings-input" 
                          value={row.yearFrom || ''}
                          onChange={(e) => {
                            const updated = [...formData.experienceDetails];
                            updated[idx] = { ...updated[idx], yearFrom: e.target.value };
                            handleChange('experienceDetails', updated);
                          }}
                          style={{ width: '100%', padding: '4px 8px' }} 
                        />
                      </td>
                      <td>
                        <input 
                          type="text" 
                          className="settings-input" 
                          value={row.yearTo || ''}
                          onChange={(e) => {
                            const updated = [...formData.experienceDetails];
                            updated[idx] = { ...updated[idx], yearTo: e.target.value };
                            handleChange('experienceDetails', updated);
                          }}
                          style={{ width: '100%', padding: '4px 8px' }} 
                        />
                      </td>
                      <td>
                        <input 
                          type="text" 
                          className="settings-input" 
                          value={row.postHold || ''}
                          onChange={(e) => {
                            const updated = [...formData.experienceDetails];
                            updated[idx] = { ...updated[idx], postHold: e.target.value };
                            handleChange('experienceDetails', updated);
                          }}
                          style={{ width: '100%', padding: '4px 8px' }} 
                        />
                      </td>
                      <td>
                        <input 
                          type="text" 
                          className="settings-input" 
                          value={row.natureOfJob || ''}
                          onChange={(e) => {
                            const updated = [...formData.experienceDetails];
                            updated[idx] = { ...updated[idx], natureOfJob: e.target.value };
                            handleChange('experienceDetails', updated);
                          }}
                          style={{ width: '100%', padding: '4px 8px' }} 
                        />
                      </td>
                      <td>
                        <input 
                          type="text" 
                          className="settings-input" 
                          value={row.reasonOfLeaving || ''}
                          onChange={(e) => {
                            const updated = [...formData.experienceDetails];
                            updated[idx] = { ...updated[idx], reasonOfLeaving: e.target.value };
                            handleChange('experienceDetails', updated);
                          }}
                          style={{ width: '100%', padding: '4px 8px' }} 
                        />
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        {formData.experienceDetails.length > 1 && (
                          <button 
                            type="button"
                            onClick={() => handleDeleteExperienceRow(idx)}
                            style={{ backgroundColor: 'white', border: '1px solid #dc3545', color: '#dc3545', padding: '3px 6px', borderRadius: '4px', cursor: 'pointer' }}
                          >
                            <Trash2 size={12} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', gap: '30px', marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}>
              <label className="checkbox-label" style={{ fontWeight: 'normal' }}>
                <input 
                  type="checkbox" 
                  checked={formData.isTetQualified}
                  onChange={(e) => handleChange('isTetQualified', e.target.checked)}
                /> Whether TET qualified?
              </label>
              <label className="checkbox-label" style={{ fontWeight: 'normal' }}>
                <input 
                  type="checkbox" 
                  checked={formData.isCtetQualified}
                  onChange={(e) => handleChange('isCtetQualified', e.target.checked)}
                /> Is CTET Qualified?
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Level of TET Exam:</label>
                <select 
                  className="settings-input" 
                  value={formData.tetExamLevel}
                  onChange={(e) => handleChange('tetExamLevel', e.target.value)}
                  style={{ padding: '4px 8px' }}
                >
                  <option value="">Select Level</option>
                  <option value="Level 1">Level 1</option>
                  <option value="Level 2">Level 2</option>
                  <option value="Both">Both</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 6: OTHER INFORMATION ================= */}
        {activeTab === 'other-information' && (
          <div style={{ marginTop: '10px' }}>
            {/* Children Details */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#333' }}>CHILDREN DETAILS:</div>
              <button 
                type="button"
                onClick={handleAddChildrenRow}
                style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '6px 15px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Plus size={14} /> Add Row
              </button>
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
                  {formData.childrenDetails.map((child, idx) => (
                    <tr key={idx} className="row-even">
                      <td style={{ textAlign: 'center' }}>{idx + 1}</td>
                      <td>
                        <input 
                          type="text" 
                          className="settings-input" 
                          value={child.name || ''}
                          onChange={(e) => {
                            const updated = [...formData.childrenDetails];
                            updated[idx] = { ...updated[idx], name: e.target.value };
                            handleChange('childrenDetails', updated);
                          }}
                          style={{ width: '300px', padding: '4px 8px' }} 
                        />
                      </td>
                      <td>
                        <input 
                          type="date" 
                          className="settings-input" 
                          value={child.dob || ''}
                          onChange={(e) => {
                            const updated = [...formData.childrenDetails];
                            updated[idx] = { ...updated[idx], dob: e.target.value };
                            handleChange('childrenDetails', updated);
                          }}
                          style={{ width: '200px', padding: '4px 8px' }} 
                        />
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        {formData.childrenDetails.length > 1 && (
                          <button 
                            type="button"
                            onClick={() => handleDeleteChildrenRow(idx)}
                            style={{ backgroundColor: 'white', border: '1px solid #dc3545', color: '#dc3545', padding: '3px 6px', borderRadius: '4px', cursor: 'pointer' }}
                          >
                            <Trash2 size={12} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Extra Curricular */}
            <div style={{ border: '1px solid #dee2e6', marginBottom: '20px', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ backgroundColor: '#f8f9fa', padding: '10px 15px', fontWeight: 'bold', fontSize: '13px', color: '#333', borderBottom: '1px solid #dee2e6' }}>
                EXTRA CURRICULAR ACTIVITIES / ACHIEVEMENTS:
              </div>
              <div style={{ padding: '15px' }}>
                <input 
                  type="text" 
                  className="settings-input" 
                  value={formData.extraActivities}
                  onChange={(e) => handleChange('extraActivities', e.target.value)}
                  placeholder="e.g. National Level Athlete, Science Olympiad Mentor"
                  style={{ width: '100%' }} 
                />
              </div>
            </div>

            {/* Reference 1 */}
            <div style={{ border: '1px solid #dee2e6', marginBottom: '20px', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ backgroundColor: '#f8f9fa', padding: '10px 15px', fontWeight: 'bold', fontSize: '13px', color: '#333', borderBottom: '1px solid #dee2e6' }}>
                REFERENCE 1:
              </div>
              <div className="settings-row" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', padding: '15px' }}>
                <div className="form-group">
                  <label>Person Name</label>
                  <input type="text" className="settings-input" value={formData.reference1.personName} onChange={(e) => handleNestedChange('reference1', 'personName', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Mobile Number</label>
                  <input type="text" className="settings-input" value={formData.reference1.mobileNumber} onChange={(e) => handleNestedChange('reference1', 'mobileNumber', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input type="text" className="settings-input" value={formData.reference1.address} onChange={(e) => handleNestedChange('reference1', 'address', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Relation</label>
                  <input type="text" className="settings-input" value={formData.reference1.relation} onChange={(e) => handleNestedChange('reference1', 'relation', e.target.value)} />
                </div>
              </div>
            </div>

            {/* Reference 2 */}
            <div style={{ border: '1px solid #dee2e6', marginBottom: '20px', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ backgroundColor: '#f8f9fa', padding: '10px 15px', fontWeight: 'bold', fontSize: '13px', color: '#333', borderBottom: '1px solid #dee2e6' }}>
                REFERENCE 2:
              </div>
              <div className="settings-row" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', padding: '15px' }}>
                <div className="form-group">
                  <label>Person Name</label>
                  <input type="text" className="settings-input" value={formData.reference2.personName} onChange={(e) => handleNestedChange('reference2', 'personName', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Mobile Number</label>
                  <input type="text" className="settings-input" value={formData.reference2.mobileNumber} onChange={(e) => handleNestedChange('reference2', 'mobileNumber', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input type="text" className="settings-input" value={formData.reference2.address} onChange={(e) => handleNestedChange('reference2', 'address', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Relation</label>
                  <input type="text" className="settings-input" value={formData.reference2.relation} onChange={(e) => handleNestedChange('reference2', 'relation', e.target.value)} />
                </div>
              </div>
            </div>

            {/* Other Information */}
            <div style={{ border: '1px solid #dee2e6', marginBottom: '20px', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ backgroundColor: '#f8f9fa', padding: '10px 15px', fontWeight: 'bold', fontSize: '13px', color: '#333', borderBottom: '1px solid #dee2e6' }}>
                ANY OTHER INFORMATION:
              </div>
              <div style={{ padding: '15px' }}>
                <input 
                  type="text" 
                  className="settings-input" 
                  value={formData.otherInformation}
                  onChange={(e) => handleChange('otherInformation', e.target.value)}
                  style={{ width: '100%' }} 
                />
              </div>
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', padding: '20px 0', borderTop: '1px solid #dee2e6', marginTop: '20px' }}>
          <button 
            type="button"
            onClick={handleSaveStaff}
            disabled={loading}
            style={{ backgroundColor: 'white', border: '1px solid #28a745', color: '#28a745', padding: '8px 24px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: '500' }}
          >
            <Save size={16} /> {editingStaffId ? 'Update' : 'Save'}
          </button>
          <button 
            type="button"
            onClick={handleOpenViewModal}
            style={{ backgroundColor: 'white', border: '1px solid #159BD7', color: '#159BD7', padding: '8px 24px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: '500' }}
          >
            <Eye size={16} /> View
          </button>
          <button 
            type="button"
            onClick={handleReset}
            style={{ backgroundColor: 'white', border: '1px solid #ffc107', color: '#856404', padding: '8px 24px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: '500' }}
          >
            <X size={16} /> Reset
          </button>
        </div>

      </div>

      {/* Staff List View Modal */}
      {showStaffListModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            width: '850px',
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 20px',
              backgroundColor: '#159BD7',
              color: 'white'
            }}>
              <span style={{ fontWeight: 'bold', fontSize: '15px' }}>Registered Staff Members</span>
              <button
                onClick={() => setShowStaffListModal(false)}
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '15px 20px', borderBottom: '1px solid #dee2e6' }}>
              <input
                type="text"
                placeholder="Filter staff by name, code or designation..."
                value={modalSearch}
                onChange={(e) => setModalSearch(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ced4da', borderRadius: '4px', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ padding: '10px 20px', overflowY: 'auto', flex: 1 }}>
              <table className="mail-table">
                <thead>
                  <tr>
                    <th style={{ width: '50px', textAlign: 'center' }}>Sr.</th>
                    <th>Code / Pref</th>
                    <th>Staff Name</th>
                    <th>Designation</th>
                    <th>Salary A/C</th>
                    <th>Status</th>
                    <th style={{ width: '100px', textAlign: 'center' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allStaffList
                    .filter(s => {
                      const q = modalSearch.toLowerCase();
                      return (
                        (s.firstName && s.firstName.toLowerCase().includes(q)) ||
                        (s.lastName && s.lastName.toLowerCase().includes(q)) ||
                        (s.userName && s.userName.toLowerCase().includes(q)) ||
                        (s.designation && s.designation.toLowerCase().includes(q)) ||
                        (s.salaryAccount && s.salaryAccount.toLowerCase().includes(q))
                      );
                    })
                    .map((s, idx) => {
                      const isAyup = s.firstName.toLowerCase().includes('ayup') || (s.lastName && s.lastName.toLowerCase().includes('ayup'));
                      return (
                        <tr key={s._id} className={idx % 2 === 0 ? 'row-even' : 'row-odd'}>
                          <td style={{ textAlign: 'center' }}>{idx + 1}</td>
                          <td style={{ fontWeight: '500' }}>{s.userName || s.prefNo || '---'}</td>
                          <td style={{ fontWeight: isAyup ? 'bold' : 'normal', color: isAyup ? '#159BD7' : 'inherit' }}>
                            {s.title ? `${s.title} ` : ''}{s.firstName} {s.lastName}
                            {isAyup && <span style={{ marginLeft: '6px', fontSize: '10px', backgroundColor: '#e1f5fe', color: '#0288d1', padding: '1px 6px', borderRadius: '4px' }}>Verified</span>}
                          </td>
                          <td>{s.designation || '---'}</td>
                          <td>{s.salaryAccount || '---'}</td>
                          <td style={{ textAlign: 'center' }}>
                            <span style={{
                              padding: '2px 8px',
                              borderRadius: '10px',
                              fontSize: '11px',
                              backgroundColor: s.isActive ? '#e8f5e9' : '#ffebee',
                              color: s.isActive ? '#2e7d32' : '#c62828'
                            }}>
                              {s.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                              <button
                                onClick={() => {
                                  loadStaffIntoForm(s);
                                  setShowStaffListModal(false);
                                }}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#159BD7' }}
                                title="Edit / Load Details"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteStaff(s._id)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc3545' }}
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>

            <div style={{ padding: '12px 20px', borderTop: '1px solid #dee2e6', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowStaffListModal(false)}
                style={{ padding: '6px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
