import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaCamera } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function CreateStaff() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  const [loading, setLoading] = useState(false);

  const [masters, setMasters] = useState({ roles: [], religions: [] });

  // Define Form State matching JSON structure
  const [formData, setFormData] = useState({
    title: 'Mr.',
    firstName: '',
    lastName: '',
    userName: '',
    role: '',
    designation: '',
    gender: 'Male',
    doj: '',
    dob: '',
    contactNo: '',
    qualification: '',
    aadharCardNo: '',
    nationalTeacherId: '',
    stateTeacherId: '',
    cbseId: '',
    maritalStatus: 'Unmarried',
    fatherSpouseName: '',
    fatherSpouseContactNo: '',
    dateOfAnniversary: '',
    alternateMobile: '',
    emergencyContactNo: '',
    emailId: '',
    alternateEmailId: '',
    religion: '',
    nationality: 'Indian',
    address: '',
    permanentAddress: ''
  });

  const [staffPhoto, setStaffPhoto] = useState(null);

  useEffect(() => {
    const fetchMasters = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { 'Authorization': `Bearer ${token}` };
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        
        const [rolesRes, religionsRes] = await Promise.all([
          fetch(`${baseUrl}/api/roles`, { headers }).then(r => r.json()),
          fetch(`${baseUrl}/api/religions`, { headers }).then(r => r.json()),
        ]);

        setMasters({
          roles: Array.isArray(rolesRes) ? rolesRes : [],
          religions: Array.isArray(religionsRes) ? religionsRes : []
        });
      } catch (err) {
        console.error("Error fetching master data:", err);
      }
    };
    fetchMasters();
  }, []);

  useEffect(() => {
    if (isEditMode) {
      const fetchStaffData = async () => {
        setLoading(true);
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/staffs/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (response.ok) {
            const data = await response.json();
            setFormData(data);
          } else {
            toast.error("Failed to load staff data.");
          }
        } catch (error) {
          console.error("Error fetching staff:", error);
          toast.error("An error occurred while fetching staff data.");
        } finally {
          setLoading(false);
        }
      };
      fetchStaffData();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setStaffPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      
      const payload = new FormData();
      payload.append('data', JSON.stringify(formData));
      
      if (staffPhoto) {
        payload.append('staffPhoto', staffPhoto);
      }

      const url = isEditMode ? `${import.meta.env.VITE_API_BASE_URL}/api/staffs/${id}` : `${import.meta.env.VITE_API_BASE_URL}/api/staffs`;
      const response = await fetch(url, {
        method: isEditMode ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: payload
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(isEditMode ? "Staff updated successfully!" : "Staff created successfully!");
        navigate('/dashboard/staff');
      } else {
        toast.error(data.message || (isEditMode ? "Failed to update staff." : "Failed to create staff."));
      }
    } catch (error) {
      console.error("Error saving staff:", error);
      toast.error("An error occurred while saving staff.");
    } finally {
      setLoading(false);
    }
  };

  const SectionTitle = ({ title }) => (
    <div className="bg-gray-100 px-4 py-3 border-l-4 border-green-500 font-bold text-gray-700 mt-8 mb-4">
      {title}
    </div>
  );

  const InputField = ({ label, type = 'text', name, value, onChange, placeholder = '' }) => (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">
        {label} {['firstName', 'userName', 'contactNo'].includes(name) && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        required={['firstName', 'userName', 'contactNo'].includes(name)}
        className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
      />
    </div>
  );

  const SelectField = ({ label, name, value, onChange, options, optionKey, optionLabel }) => (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">{label} <span className="text-red-500">*</span></label>
      <select
        name={name}
        value={value || ''}
        onChange={onChange}
        required
        className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
      >
        <option value="">-- Select --</option>
        {options.map((opt, idx) => (
          <option key={idx} value={optionKey ? opt[optionKey] : (opt.value || opt)}>
            {optionLabel ? opt[optionLabel] : (opt.label || opt)}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="flex-1 bg-gray-50 rounded-tl-3xl p-8 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-blue-900">{isEditMode ? 'Edit Staff' : 'Create Staff'}</h1>
        <button 
          type="button"
          onClick={() => navigate('/dashboard/staff')}
          className="flex items-center gap-2 bg-white px-4 py-2 rounded shadow-sm text-sm font-semibold text-gray-600 hover:bg-gray-100"
        >
          <FaArrowLeft /> Go Back
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <form onSubmit={handleSubmit}>
          
          <div className="flex flex-col items-center mb-8">
            <div className="w-32 h-32 bg-gray-200 flex flex-col items-center justify-center text-gray-400 mb-3 overflow-hidden rounded-full border-4 border-gray-100">
              {staffPhoto ? (
                <img src={URL.createObjectURL(staffPhoto)} alt="Staff" className="w-full h-full object-cover" />
              ) : formData.staffPhoto ? (
                <img src={formData.staffPhoto} alt="Staff" className="w-full h-full object-cover" />
              ) : (
                <>
                  <FaCamera className="text-3xl mb-2" />
                  <span className="text-xs font-semibold">Upload Photo</span>
                </>
              )}
            </div>
            <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm cursor-pointer font-medium transition-colors">
              Choose File
              <input type="file" name="staffPhoto" onChange={handleFileChange} className="hidden" accept="image/*" />
            </label>
          </div>

          <SectionTitle title="Personal & Professional Details" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SelectField label="Title" name="title" value={formData.title} onChange={handleChange} options={['Mr.', 'Mrs.', 'Miss.', 'Dr.']} />
            <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
            <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
            
            <InputField label="User Name" name="userName" value={formData.userName} onChange={handleChange} />
            <SelectField label="Role" name="role" value={formData.role} onChange={handleChange} options={masters.roles} optionKey="_id" optionLabel="roleName" />
            <InputField label="Designation" name="designation" value={formData.designation} onChange={handleChange} />
            
            <SelectField label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={['Male', 'Female', 'Other']} />
            <InputField label="Date of Joining" type="date" name="doj" value={formData.doj} onChange={handleChange} />
            <InputField label="Date of Birth" type="date" name="dob" value={formData.dob} onChange={handleChange} />

            <InputField label="Contact No." name="contactNo" value={formData.contactNo} onChange={handleChange} />
            <InputField label="Qualification" name="qualification" value={formData.qualification} onChange={handleChange} />
            <InputField label="Aadhar Card No." name="aadharCardNo" value={formData.aadharCardNo} onChange={handleChange} />
            
            <InputField label="National Teacher ID" name="nationalTeacherId" value={formData.nationalTeacherId} onChange={handleChange} />
            <InputField label="State Teacher ID" name="stateTeacherId" value={formData.stateTeacherId} onChange={handleChange} />
            <InputField label="CBSE ID" name="cbseId" value={formData.cbseId} onChange={handleChange} />
          </div>

          <SectionTitle title="Family & Other Details" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SelectField label="Marital Status" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} options={['Unmarried', 'Married', 'Widowed', 'Divorced']} />
            <InputField label="Father/Spouse Name" name="fatherSpouseName" value={formData.fatherSpouseName} onChange={handleChange} />
            <InputField label="Father/Spouse Contact No." name="fatherSpouseContactNo" value={formData.fatherSpouseContactNo} onChange={handleChange} />
            
            <InputField label="Date of Anniversary" type="date" name="dateOfAnniversary" value={formData.dateOfAnniversary} onChange={handleChange} />
            <InputField label="Alternate Mobile" name="alternateMobile" value={formData.alternateMobile} onChange={handleChange} />
            <InputField label="Emergency Contact No." name="emergencyContactNo" value={formData.emergencyContactNo} onChange={handleChange} />
            
            <InputField label="Email ID" type="email" name="emailId" value={formData.emailId} onChange={handleChange} />
            <InputField label="Alternate Email ID" type="email" name="alternateEmailId" value={formData.alternateEmailId} onChange={handleChange} />
            
            <SelectField label="Religion" name="religion" value={formData.religion} onChange={handleChange} options={masters.religions} optionKey="religionName" optionLabel="religionName" />
            <InputField label="Nationality" name="nationality" value={formData.nationality} onChange={handleChange} />
          </div>

          <SectionTitle title="Address Details" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Local Address" name="address" value={formData.address} onChange={handleChange} />
            <InputField label="Permanent Address" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} />
          </div>

          <div className="mt-8 flex justify-center border-t pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-bold text-sm shadow-md transition-all disabled:opacity-50"
            >
              <FaSave className="text-lg" />
              {loading ? 'Saving...' : (isEditMode ? 'Update Staff Details' : 'Save Staff Details')}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
