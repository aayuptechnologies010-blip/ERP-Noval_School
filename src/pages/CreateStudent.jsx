import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaCamera, FaSave, FaPlus, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function CreateStudent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  const [loading, setLoading] = useState(false);

  // Define Form State matching JSON structure
  const [personalDetails, setPersonalDetails] = useState({
    firstName: '', middleName: '', lastName: '', dateOfBirth: '', gender: 'Male',
    religion: 'HINDU', caste: 'General', subCaste: '', nationality: 'Indian', placeOfBirth: '',
    motherTongue: 'Hindi', parish: '0', schoolCategory: 'General', houseNames: '',
    isNachEcs: false, isEwsCwsn: '0', isMinority: false, isDisabilityCwsn: false,
    disabilityDescription: '', isRte: '0', clubs: '', cadetType: '', statesNationalCompetitions: '0',
    foodStatus: 'Veg', boardingHostel: 'No', isOnlyChild: false
  });

  const [academicDetails, setAcademicDetails] = useState({
    admissionNumber: '', admissionStatus: 'Continuous', currentStatus: 'STUDYING',
    reason: 'New Admission', rollNumber: '', class: '', section: '', board: 'CBSE',
    dateOfAdmission: '', dateOfJoining: '', stream: 'None', optionalSubject: '',
    previousClass: '0', sixSubject: ''
  });

  const [uniqueIds, setUniqueIds] = useState({
    udiseNumber: '', pen: '', apaarId: '', ePunjabNumber: '', feesNumber: '',
    saralNumber: '', srnNumber: '', issen: false, abhaNumber: '', billGrNumber: '',
    studentNumber: '', rfidCardNumber: ''
  });

  const [contactAddress, setContactAddress] = useState({
    contactNumber: '', secondaryContactNo: '', studentEmail: '', currentAddress: '',
    pinCode: '', city: '', state: '', permanentAddress: '', permanentPinCode: '',
    permanentCity: '', permanentState: '', domicileState: ''
  });

  const [familyDetails, setFamilyDetails] = useState({
    familyId: '', parentStatus: 'Married', staffName: '',
    father: {
      title: 'Mr.', firstName: '', middleName: '', lastName: '', aadharNumber: '',
      panNumber: '', annualIncome: '', dob: '', mobile: '', phone: '', email: '',
      residenceAddress: '', qualification: '', profession: '', professionDetails: '',
      designation: '', designationDetails: '', companyName: '', businessDetails: '',
      serviceIn: '', officeAddress: '', officePhone: '', officeMobile: '', officeExtension: '',
      officeEmail: '', officeWebsite: '', isAlumni: 'No', batchYear: ''
    },
    mother: {
      title: 'Mrs.', firstName: '', middleName: '', lastName: '', aadharNumber: '',
      panNumber: '', annualIncome: '', dob: '', mobile: '', phone: '', email: '',
      residenceAddress: '', qualification: '', profession: '', professionDetails: '',
      designation: '', designationDetails: '', companyName: '', businessDetails: '',
      serviceIn: '', officeAddress: '', officePhone: '', officeMobile: '', officeExtension: '',
      officeEmail: '', officeWebsite: '', isAlumni: 'No', batchYear: '', anniversaryDate: ''
    }
  });

  const [guardianDetails, setGuardianDetails] = useState({
    title: 'Mr.', name: '', dob: '', income: '', relationship: '', mobile: '', phone: '',
    email: '', residenceAddress: '', qualification: '', profession: '', professionDetails: '',
    designation: '', companyName: '', businessDetails: '', serviceIn: '', officeAddress: '',
    officePhone: '', officeMobile: '', officeExtension: '', officeEmail: '', officeWebsite: '',
    secondaryGuardianName: '', secondaryGuardianMobile: '', secondaryGuardianRelationship: ''
  });

  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: '', smsNumber: '', email: '', mobileNumber: '', phoneNumber: '', address: '', relation: '' }
  ]);

  // Files
  const [files, setFiles] = useState({
    studentPhoto: null, fatherPhoto: null, motherPhoto: null, familyPhoto: null
  });

  useEffect(() => {
    if (isEditMode) {
      const fetchStudentData = async () => {
        setLoading(true);
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/students/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (response.ok) {
            const data = await response.json();
            if (data.personalDetails) setPersonalDetails(data.personalDetails);
            if (data.academicDetails) setAcademicDetails(data.academicDetails);
            if (data.uniqueIds) setUniqueIds(data.uniqueIds);
            if (data.contactAddress) setContactAddress(data.contactAddress);
            if (data.familyDetails) setFamilyDetails(data.familyDetails);
            if (data.guardianDetails) setGuardianDetails(data.guardianDetails);
            if (data.emergencyContacts && data.emergencyContacts.length > 0) {
              setEmergencyContacts(data.emergencyContacts);
            }
          } else {
            toast.error("Failed to load student data.");
          }
        } catch (error) {
          console.error("Error fetching student:", error);
          toast.error("An error occurred while fetching student data.");
        } finally {
          setLoading(false);
        }
      };
      fetchStudentData();
    }
  }, [id, isEditMode]);

  // Handlers for state updates
  const handleNestedChange = (setter, category) => (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    if (category) {
      setter(prev => ({ ...prev, [category]: { ...prev[category], [name]: val } }));
    } else {
      setter(prev => ({ ...prev, [name]: val }));
    }
  };

  const handleArrayChange = (setter, index) => (e) => {
    const { name, value } = e.target;
    setter(prev => {
      const newArr = [...prev];
      newArr[index] = { ...newArr[index], [name]: value };
      return newArr;
    });
  };

  const addEmergencyContact = () => {
    setEmergencyContacts(prev => [...prev, { name: '', smsNumber: '', email: '', mobileNumber: '', phoneNumber: '', address: '', relation: '' }]);
  };

  const removeEmergencyContact = (index) => {
    setEmergencyContacts(prev => prev.filter((_, i) => i !== index));
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    if (selectedFiles && selectedFiles[0]) {
      setFiles(prev => ({ ...prev, [name]: selectedFiles[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const payload = {
        personalDetails, academicDetails, uniqueIds, contactAddress,
        familyDetails, guardianDetails, emergencyContacts
      };

      const formData = new FormData();
      formData.append('data', JSON.stringify(payload));
      
      if (files.studentPhoto) formData.append('studentPhoto', files.studentPhoto);
      if (files.fatherPhoto) formData.append('fatherPhoto', files.fatherPhoto);
      if (files.motherPhoto) formData.append('motherPhoto', files.motherPhoto);
      if (files.familyPhoto) formData.append('familyPhoto', files.familyPhoto);

      const url = isEditMode ? `${import.meta.env.VITE_API_BASE_URL}/api/students/${id}` : `${import.meta.env.VITE_API_BASE_URL}/api/students`;
      const response = await fetch(url, {
        method: isEditMode ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(isEditMode ? "Student updated successfully!" : "Student created successfully!");
        navigate('/dashboard/students');
      } else {
        toast.error(data.message || (isEditMode ? "Failed to update student." : "Failed to create student."));
      }
    } catch (error) {
      console.error(isEditMode ? "Error updating student:" : "Error creating student:", error);
      toast.error(isEditMode ? "An error occurred while updating student." : "An error occurred while creating student.");
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
    <div className="flex flex-col gap-1">
      <label className="text-xs font-bold text-gray-600 uppercase">{label}</label>
      {type === 'checkbox' ? (
        <input type="checkbox" name={name} checked={value} onChange={onChange} className="h-5 w-5 mt-1 accent-green-500" />
      ) : (
        <input 
          type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-green-500"
        />
      )}
    </div>
  );

  return (
    <div className="flex-1 bg-[#f8f9fc] rounded-tl-[2rem] p-6 lg:p-10 overflow-y-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#2b3674]">Create New Student</h1>
        <button type="button" onClick={() => navigate('/dashboard/students')} className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition font-bold text-sm">
          <FaArrowLeft /> Back to List
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm">
        
        {/* PERSONAL DETAILS */}
        <SectionTitle title="Personal Details" />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <InputField label="First Name" name="firstName" value={personalDetails.firstName} onChange={handleNestedChange(setPersonalDetails)} />
          <InputField label="Middle Name" name="middleName" value={personalDetails.middleName} onChange={handleNestedChange(setPersonalDetails)} />
          <InputField label="Last Name" name="lastName" value={personalDetails.lastName} onChange={handleNestedChange(setPersonalDetails)} />
          <InputField label="Date of Birth" type="date" name="dateOfBirth" value={personalDetails.dateOfBirth} onChange={handleNestedChange(setPersonalDetails)} />
          
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-600 uppercase">Gender</label>
            <select name="gender" value={personalDetails.gender} onChange={handleNestedChange(setPersonalDetails)} className="border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <InputField label="Religion" name="religion" value={personalDetails.religion} onChange={handleNestedChange(setPersonalDetails)} />
          <InputField label="Caste" name="caste" value={personalDetails.caste} onChange={handleNestedChange(setPersonalDetails)} />
          <InputField label="Nationality" name="nationality" value={personalDetails.nationality} onChange={handleNestedChange(setPersonalDetails)} />
          <InputField label="Place of Birth" name="placeOfBirth" value={personalDetails.placeOfBirth} onChange={handleNestedChange(setPersonalDetails)} />
          <InputField label="Mother Tongue" name="motherTongue" value={personalDetails.motherTongue} onChange={handleNestedChange(setPersonalDetails)} />
          <InputField label="House Name" name="houseNames" value={personalDetails.houseNames} onChange={handleNestedChange(setPersonalDetails)} />
          
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-600 uppercase">Boarding/Hostel</label>
            <select name="boardingHostel" value={personalDetails.boardingHostel} onChange={handleNestedChange(setPersonalDetails)} className="border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          <InputField label="Is Only Child" type="checkbox" name="isOnlyChild" value={personalDetails.isOnlyChild} onChange={handleNestedChange(setPersonalDetails)} />
        </div>

        {/* ACADEMIC DETAILS */}
        <SectionTitle title="Academic Details" />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <InputField label="Admission Number" name="admissionNumber" value={academicDetails.admissionNumber} onChange={handleNestedChange(setAcademicDetails)} />
          <InputField label="Roll Number" name="rollNumber" value={academicDetails.rollNumber} onChange={handleNestedChange(setAcademicDetails)} />
          <InputField label="Class" name="class" value={academicDetails.class} onChange={handleNestedChange(setAcademicDetails)} />
          <InputField label="Section" name="section" value={academicDetails.section} onChange={handleNestedChange(setAcademicDetails)} />
          <InputField label="Date of Admission" type="date" name="dateOfAdmission" value={academicDetails.dateOfAdmission} onChange={handleNestedChange(setAcademicDetails)} />
          <InputField label="Date of Joining" type="date" name="dateOfJoining" value={academicDetails.dateOfJoining} onChange={handleNestedChange(setAcademicDetails)} />
          <InputField label="Board" name="board" value={academicDetails.board} onChange={handleNestedChange(setAcademicDetails)} />
          <InputField label="Admission Status" name="admissionStatus" value={academicDetails.admissionStatus} onChange={handleNestedChange(setAcademicDetails)} />
          <InputField label="Current Status" name="currentStatus" value={academicDetails.currentStatus} onChange={handleNestedChange(setAcademicDetails)} />
        </div>

        {/* CONTACT ADDRESS */}
        <SectionTitle title="Contact & Address" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InputField label="Contact Number" name="contactNumber" value={contactAddress.contactNumber} onChange={handleNestedChange(setContactAddress)} />
          <InputField label="Student Email" type="email" name="studentEmail" value={contactAddress.studentEmail} onChange={handleNestedChange(setContactAddress)} />
          <InputField label="Secondary Contact" name="secondaryContactNo" value={contactAddress.secondaryContactNo} onChange={handleNestedChange(setContactAddress)} />
          
          <div className="md:col-span-3">
            <InputField label="Current Address" name="currentAddress" value={contactAddress.currentAddress} onChange={handleNestedChange(setContactAddress)} />
          </div>
          <InputField label="City" name="city" value={contactAddress.city} onChange={handleNestedChange(setContactAddress)} />
          <InputField label="State" name="state" value={contactAddress.state} onChange={handleNestedChange(setContactAddress)} />
          <InputField label="Pin Code" name="pinCode" value={contactAddress.pinCode} onChange={handleNestedChange(setContactAddress)} />

          <div className="md:col-span-3">
            <InputField label="Permanent Address" name="permanentAddress" value={contactAddress.permanentAddress} onChange={handleNestedChange(setContactAddress)} />
          </div>
        </div>

        {/* UNIQUE IDS */}
        <SectionTitle title="Unique IDs" />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <InputField label="UDISE Number" name="udiseNumber" value={uniqueIds.udiseNumber} onChange={handleNestedChange(setUniqueIds)} />
          <InputField label="PEN" name="pen" value={uniqueIds.pen} onChange={handleNestedChange(setUniqueIds)} />
          <InputField label="APAAR ID" name="apaarId" value={uniqueIds.apaarId} onChange={handleNestedChange(setUniqueIds)} />
          <InputField label="ABHA Number" name="abhaNumber" value={uniqueIds.abhaNumber} onChange={handleNestedChange(setUniqueIds)} />
        </div>

        {/* FAMILY DETAILS */}
        <SectionTitle title="Family Details" />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-12 gap-y-6">
          {/* Father */}
          <div>
            <h3 className="font-bold text-green-600 border-b border-green-200 pb-2 mb-4">Father's Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="First Name" name="firstName" value={familyDetails.father.firstName} onChange={handleNestedChange(setFamilyDetails, 'father')} />
              <InputField label="Last Name" name="lastName" value={familyDetails.father.lastName} onChange={handleNestedChange(setFamilyDetails, 'father')} />
              <InputField label="Mobile" name="mobile" value={familyDetails.father.mobile} onChange={handleNestedChange(setFamilyDetails, 'father')} />
              <InputField label="Email" name="email" value={familyDetails.father.email} onChange={handleNestedChange(setFamilyDetails, 'father')} />
              <InputField label="Profession" name="profession" value={familyDetails.father.profession} onChange={handleNestedChange(setFamilyDetails, 'father')} />
              <InputField label="Annual Income" name="annualIncome" value={familyDetails.father.annualIncome} onChange={handleNestedChange(setFamilyDetails, 'father')} />
            </div>
          </div>
          
          {/* Mother */}
          <div>
            <h3 className="font-bold text-green-600 border-b border-green-200 pb-2 mb-4">Mother's Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="First Name" name="firstName" value={familyDetails.mother.firstName} onChange={handleNestedChange(setFamilyDetails, 'mother')} />
              <InputField label="Last Name" name="lastName" value={familyDetails.mother.lastName} onChange={handleNestedChange(setFamilyDetails, 'mother')} />
              <InputField label="Mobile" name="mobile" value={familyDetails.mother.mobile} onChange={handleNestedChange(setFamilyDetails, 'mother')} />
              <InputField label="Email" name="email" value={familyDetails.mother.email} onChange={handleNestedChange(setFamilyDetails, 'mother')} />
              <InputField label="Profession" name="profession" value={familyDetails.mother.profession} onChange={handleNestedChange(setFamilyDetails, 'mother')} />
              <InputField label="Annual Income" name="annualIncome" value={familyDetails.mother.annualIncome} onChange={handleNestedChange(setFamilyDetails, 'mother')} />
            </div>
          </div>
        </div>

        {/* GUARDIAN DETAILS */}
        <SectionTitle title="Guardian Details" />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <InputField label="Guardian Name" name="name" value={guardianDetails.name} onChange={handleNestedChange(setGuardianDetails)} />
          <InputField label="Relationship" name="relationship" value={guardianDetails.relationship} onChange={handleNestedChange(setGuardianDetails)} />
          <InputField label="Mobile" name="mobile" value={guardianDetails.mobile} onChange={handleNestedChange(setGuardianDetails)} />
          <InputField label="Email" name="email" value={guardianDetails.email} onChange={handleNestedChange(setGuardianDetails)} />
        </div>

        {/* EMERGENCY CONTACTS */}
        <SectionTitle title="Emergency Contacts" />
        <div className="flex flex-col gap-6">
          {emergencyContacts.map((contact, idx) => (
            <div key={idx} className="p-4 border border-gray-200 rounded-lg relative bg-gray-50">
              <div className="absolute top-4 right-4">
                <button type="button" onClick={() => removeEmergencyContact(idx)} className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 pr-10">
                <InputField label="Name" name="name" value={contact.name} onChange={handleArrayChange(setEmergencyContacts, idx)} />
                <InputField label="Relation" name="relation" value={contact.relation} onChange={handleArrayChange(setEmergencyContacts, idx)} />
                <InputField label="Mobile" name="mobileNumber" value={contact.mobileNumber} onChange={handleArrayChange(setEmergencyContacts, idx)} />
                <div className="md:col-span-2">
                  <InputField label="Address" name="address" value={contact.address} onChange={handleArrayChange(setEmergencyContacts, idx)} />
                </div>
              </div>
            </div>
          ))}
          <button type="button" onClick={addEmergencyContact} className="self-start flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-md font-bold text-sm border border-blue-200 hover:bg-blue-100 transition">
            <FaPlus /> Add Emergency Contact
          </button>
        </div>

        {/* FILE UPLOADS */}
        <SectionTitle title="Photo Uploads" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {['studentPhoto', 'fatherPhoto', 'motherPhoto', 'familyPhoto'].map((photoType) => (
            <div key={photoType} className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center gap-3 relative hover:border-green-400 transition bg-gray-50">
              <FaCamera className="text-3xl text-gray-400" />
              <span className="text-sm font-bold text-gray-600 capitalize">{photoType.replace(/([A-Z])/g, ' $1').trim()}</span>
              {files[photoType] && <span className="text-xs text-green-600 truncate max-w-full font-semibold">{files[photoType].name}</span>}
              <input type="file" name={photoType} onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
            </div>
          ))}
        </div>

        {/* SUBMIT */}
        <div className="mt-12 flex justify-end border-t border-gray-200 pt-6">
          <button type="submit" disabled={loading} className="flex items-center gap-2 bg-green-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-600 transition shadow-md disabled:opacity-50 text-lg">
            {loading ? 'Saving...' : <><FaSave /> Save Student</>}
          </button>
        </div>

      </form>
    </div>
  );
}
