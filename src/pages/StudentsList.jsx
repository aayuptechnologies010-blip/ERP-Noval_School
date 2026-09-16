import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaEye, FaListUl, FaThLarge, FaPlus, FaStar, FaRegStar, 
  FaEdit, FaTrash, FaSearch, FaFilter, FaFileExcel, FaPrint,
  FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight,
  FaUserGraduate
} from 'react-icons/fa';
import { toast } from 'react-toastify';

function StudentsList({ favoritesOnly = false }) {
  const [sensitiveData, setSensitiveData] = useState(true);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filtering states
  const [searchBy, setSearchBy] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedSection, setSelectedSection] = useState('All');
  const [studentTypeFilter, setStudentTypeFilter] = useState('All');
  const [favOnly, setFavOnly] = useState(favoritesOnly);

  // Sorting states
  const [sortField, setSortField] = useState('admissionNumber');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const navigate = useNavigate();

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/students`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok && Array.isArray(data)) {
        setStudents(data);
      } else {
        toast.error("Failed to fetch students list.");
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("An error occurred while fetching students.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Extract unique available classes and sections from students
  const availableClasses = useMemo(() => {
    const set = new Set();
    students.forEach(s => {
      const c = s.academicDetails?.class;
      if (c) set.add(c);
    });
    const order = ['NUR', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    return Array.from(set).sort((a, b) => {
      const idxA = order.indexOf(a);
      const idxB = order.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b, undefined, { numeric: true });
    });
  }, [students]);

  const availableSections = useMemo(() => {
    const set = new Set();
    students.forEach(s => {
      const sec = s.academicDetails?.section;
      if (sec) set.add(sec);
    });
    return Array.from(set).sort();
  }, [students]);

  const toggleFavorite = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/students/${id}/favorite`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isFavorite: !currentStatus })
      });
      if (response.ok) {
        setStudents(students.map(s => s._id === id ? { ...s, isFavorite: !currentStatus } : s));
        toast.success(currentStatus ? "Removed from favorites" : "Added to favorites");
      } else {
        toast.error("Failed to update favorite status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating favorite status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/students/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setStudents(students.filter(s => s._id !== id));
        toast.success("Student deleted successfully");
      } else {
        toast.error("Failed to delete student");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting student");
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Filter Logic
  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      if (favOnly && !s.isFavorite) return false;
      
      const p = s.personalDetails || {};
      const a = s.academicDetails || {};
      const f = s.familyDetails || {};
      const c = s.contactAddress || {};

      // Class Filter
      if (selectedClass !== 'All' && String(a.class) !== String(selectedClass)) return false;

      // Section Filter
      if (selectedSection !== 'All' && String(a.section) !== String(selectedSection)) return false;

      // Boarding/Day Scholar filter
      if (studentTypeFilter === 'Boarding') {
        const bh = (p.boardingHostel || '').toLowerCase();
        if (!bh.includes('hostel') && !bh.includes('board') && bh !== 'yes') return false;
      }
      if (studentTypeFilter === 'Day Scholar') {
        const bh = (p.boardingHostel || '').toLowerCase();
        if (bh.includes('hostel') || bh === 'yes') return false;
      }

      // Search text filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const fullName = `${p.firstName || ''} ${p.middleName || ''} ${p.lastName || ''}`.toLowerCase();
        const adm = (a.admissionNumber || '').toLowerCase();
        const roll = (a.rollNumber || '').toLowerCase();
        const cls = (`${a.class || ''}-${a.section || ''}`).toLowerCase();
        const fatherName = `${f.father?.firstName || ''} ${f.father?.lastName || ''}`.toLowerCase();
        const phone = (c.contactNumber || '').toLowerCase();
        const city = (c.city || '').toLowerCase();
        const barcode = (s.uniqueIds?.rfidCardNumber || '').toLowerCase();

        if (searchBy === 'All') {
          if (!fullName.includes(q) && !adm.includes(q) && !roll.includes(q) && !cls.includes(q) && !fatherName.includes(q) && !phone.includes(q) && !city.includes(q) && !barcode.includes(q)) {
            return false;
          }
        } else if (searchBy === 'Name') {
          if (!fullName.includes(q)) return false;
        } else if (searchBy === 'Admission No') {
          if (!adm.includes(q)) return false;
        } else if (searchBy === 'Roll No') {
          if (!roll.includes(q)) return false;
        } else if (searchBy === 'Class') {
          if (!cls.includes(q) && !String(a.class || '').toLowerCase().includes(q)) return false;
        } else if (searchBy === 'Father Name') {
          if (!fatherName.includes(q)) return false;
        } else if (searchBy === 'Contact Number') {
          if (!phone.includes(q)) return false;
        }
      }

      return true;
    });
  }, [students, favOnly, selectedClass, selectedSection, studentTypeFilter, searchQuery, searchBy]);

  // Sorted list
  const sortedStudents = useMemo(() => {
    const list = [...filteredStudents];
    list.sort((a, b) => {
      let valA = '';
      let valB = '';

      if (sortField === 'admissionNumber') {
        valA = a.academicDetails?.admissionNumber || '';
        valB = b.academicDetails?.admissionNumber || '';
        const numA = parseInt(valA, 10);
        const numB = parseInt(valB, 10);
        if (!isNaN(numA) && !isNaN(numB)) return sortOrder === 'asc' ? numA - numB : numB - numA;
      } else if (sortField === 'name') {
        valA = `${a.personalDetails?.firstName || ''} ${a.personalDetails?.lastName || ''}`.toLowerCase();
        valB = `${b.personalDetails?.firstName || ''} ${b.personalDetails?.lastName || ''}`.toLowerCase();
      } else if (sortField === 'class') {
        valA = `${a.academicDetails?.class || ''}-${a.academicDetails?.section || ''}`.toLowerCase();
        valB = `${b.academicDetails?.class || ''}-${b.academicDetails?.section || ''}`.toLowerCase();
      } else if (sortField === 'dob') {
        valA = a.personalDetails?.dateOfBirth ? new Date(a.personalDetails.dateOfBirth).getTime() : 0;
        valB = b.personalDetails?.dateOfBirth ? new Date(b.personalDetails.dateOfBirth).getTime() : 0;
        return sortOrder === 'asc' ? valA - valB : valB - valA;
      } else if (sortField === 'father') {
        valA = `${a.familyDetails?.father?.firstName || ''} ${a.familyDetails?.father?.lastName || ''}`.toLowerCase();
        valB = `${b.familyDetails?.father?.firstName || ''} ${b.familyDetails?.father?.lastName || ''}`.toLowerCase();
      } else if (sortField === 'mother') {
        valA = `${a.familyDetails?.mother?.firstName || ''} ${a.familyDetails?.mother?.lastName || ''}`.toLowerCase();
        valB = `${b.familyDetails?.mother?.firstName || ''} ${b.familyDetails?.mother?.lastName || ''}`.toLowerCase();
      } else if (sortField === 'contact') {
        valA = a.contactAddress?.contactNumber || '';
        valB = b.contactAddress?.contactNumber || '';
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    return list;
  }, [filteredStudents, sortField, sortOrder]);

  // Paginated records
  const totalPages = pageSize === 'All' ? 1 : Math.ceil(sortedStudents.length / (pageSize || 50));
  const paginatedStudents = useMemo(() => {
    if (pageSize === 'All') return sortedStudents;
    const size = parseInt(pageSize, 10) || 50;
    const start = (currentPage - 1) * size;
    return sortedStudents.slice(start, start + size);
  }, [sortedStudents, currentPage, pageSize]);

  // Reset to page 1 on filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedClass, selectedSection, studentTypeFilter, searchBy, favOnly, pageSize]);

  // Export to CSV
  const handleExportCSV = () => {
    if (sortedStudents.length === 0) {
      toast.info("No students to export.");
      return;
    }
    const headers = ["Admission No", "Roll No", "Student Name", "Class", "Section", "DOB", "Gender", "Father Name", "Mother Name", "Contact Number", "Address", "City", "Religion", "Category", "Barcode"];
    const rows = sortedStudents.map(s => {
      const p = s.personalDetails || {};
      const a = s.academicDetails || {};
      const f = s.familyDetails || {};
      const c = s.contactAddress || {};
      const dob = p.dateOfBirth ? new Date(p.dateOfBirth).toISOString().split('T')[0] : '';
      return [
        `"${a.admissionNumber || ''}"`,
        `"${a.rollNumber || ''}"`,
        `"${p.firstName || ''} ${p.middleName || ''} ${p.lastName || ''}".trim()`,
        `"${a.class || ''}"`,
        `"${a.section || ''}"`,
        `"${dob}"`,
        `"${p.gender || ''}"`,
        `"${f.father?.firstName || ''} ${f.father?.lastName || ''}".trim()`,
        `"${f.mother?.firstName || ''} ${f.mother?.lastName || ''}".trim()`,
        `"${c.contactNumber || ''}"`,
        `"${c.currentAddress || ''}"`,
        `"${c.city || ''}"`,
        `"${p.religion || ''}"`,
        `"${p.schoolCategory || ''}"`,
        `"${s.uniqueIds?.rfidCardNumber || ''}"`
      ].join(',');
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Students_Report_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Exported ${sortedStudents.length} students to CSV`);
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* Top Header Banner */}
      <div style={{ padding: '24px 32px 16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1e293b', margin: 0 }}>
              {favOnly ? 'Favorite Students' : 'Students Directory'}
            </h1>
            <span style={{ background: '#dbeafe', color: '#1d4ed8', fontSize: 13, fontWeight: 700, padding: '4px 12px', borderRadius: 20 }}>
              Total: {students.length}
            </span>
            {filteredStudents.length !== students.length && (
              <span style={{ background: '#fef3c7', color: '#b45309', fontSize: 13, fontWeight: 700, padding: '4px 12px', borderRadius: 20 }}>
                Filtered: {filteredStudents.length}
              </span>
            )}
          </div>
          <p style={{ margin: '4px 0 0 0', fontSize: 13, color: '#64748b' }}>
            Comprehensive list of all registered students with complete profile details
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button 
            onClick={handleExportCSV}
            style={{ 
              background: '#0284c7', color: '#fff', border: 'none', borderRadius: 8, 
              padding: '10px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 2px 4px rgba(2,132,199,0.2)'
            }}
            title="Export to CSV"
          >
            <FaFileExcel /> Export Excel/CSV
          </button>
          
          <button 
            onClick={() => navigate('/dashboard/students/create')}
            style={{ 
              background: '#16a34a', color: '#fff', border: 'none', borderRadius: 8, 
              padding: '10px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 2px 4px rgba(22,163,74,0.2)'
            }}
          >
            <FaPlus /> Add Student
          </button>
        </div>
      </div>

      {/* Modern Filter Toolbar */}
      <div style={{ margin: '0 32px 20px 32px', background: '#fff', borderRadius: 12, padding: '18px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          
          {/* Search Category */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 160 }}>
            <label style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>SEARCH BY</label>
            <select 
              value={searchBy} onChange={e => setSearchBy(e.target.value)}
              style={{ border: '1px solid #cbd5e1', borderRadius: 6, padding: '8px 12px', fontSize: 13, color: '#1e293b', outline: 'none', background: '#f8fafc' }}>
              <option value="All">All Fields</option>
              <option value="Name">Student Name</option>
              <option value="Admission No">Admission No</option>
              <option value="Roll No">Roll No</option>
              <option value="Class">Class / Section</option>
              <option value="Father Name">Father Name</option>
              <option value="Contact Number">Contact Number</option>
            </select>
          </div>

          {/* Search Input Box */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: '1 1 240px' }}>
            <label style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>SEARCH QUERY</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <FaSearch style={{ position: 'absolute', left: 12, color: '#94a3b8', fontSize: 13 }} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search name, admission no, father, phone, address..." 
                style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: 6, padding: '8px 12px 8px 34px', fontSize: 13, color: '#1e293b', outline: 'none', background: '#f8fafc' }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} style={{ position: 'absolute', right: 10, background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 12 }}>✕</button>
              )}
            </div>
          </div>

          {/* Class Filter */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 130 }}>
            <label style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>CLASS</label>
            <select 
              value={selectedClass} onChange={e => setSelectedClass(e.target.value)}
              style={{ border: '1px solid #cbd5e1', borderRadius: 6, padding: '8px 12px', fontSize: 13, color: '#1e293b', outline: 'none', background: '#f8fafc' }}>
              <option value="All">All Classes</option>
              {availableClasses.map(c => (
                <option key={c} value={c}>Class {c}</option>
              ))}
            </select>
          </div>

          {/* Section Filter */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 110 }}>
            <label style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>SECTION</label>
            <select 
              value={selectedSection} onChange={e => setSelectedSection(e.target.value)}
              style={{ border: '1px solid #cbd5e1', borderRadius: 6, padding: '8px 12px', fontSize: 13, color: '#1e293b', outline: 'none', background: '#f8fafc' }}>
              <option value="All">All Sec</option>
              {availableSections.map(s => (
                <option key={s} value={s}>Sec {s}</option>
              ))}
            </select>
          </div>

          {/* Page Size */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 110 }}>
            <label style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>PER PAGE</label>
            <select 
              value={pageSize} onChange={e => setPageSize(e.target.value === 'All' ? 'All' : Number(e.target.value))}
              style={{ border: '1px solid #cbd5e1', borderRadius: 6, padding: '8px 12px', fontSize: 13, color: '#1e293b', outline: 'none', background: '#f8fafc' }}>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="All">All (1237)</option>
            </select>
          </div>
        </div>

        {/* Sub filter row: Student Type & Favorites */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: 12, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>TYPE:</span>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#334155', cursor: 'pointer' }}>
              <input type="radio" name="studentType" checked={studentTypeFilter === 'All'} onChange={() => setStudentTypeFilter('All')} style={{ accentColor: '#2563eb' }} /> All
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#334155', cursor: 'pointer' }}>
              <input type="radio" name="studentType" checked={studentTypeFilter === 'Day Scholar'} onChange={() => setStudentTypeFilter('Day Scholar')} style={{ accentColor: '#2563eb' }} /> Day Scholar
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#334155', cursor: 'pointer' }}>
              <input type="radio" name="studentType" checked={studentTypeFilter === 'Boarding'} onChange={() => setStudentTypeFilter('Boarding')} style={{ accentColor: '#2563eb' }} /> Boarding / Hosteller
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: favOnly ? '#d97706' : '#64748b', cursor: 'pointer', fontWeight: 600, marginLeft: 12 }}>
              <input type="checkbox" checked={favOnly} onChange={e => setFavOnly(e.target.checked)} style={{ accentColor: '#d97706' }} /> ⭐ Favorites Only
            </label>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#64748b' }}>Show Sensitive Data</span>
            <div 
              onClick={() => setSensitiveData(!sensitiveData)}
              style={{ 
                width: 44, height: 22, borderRadius: 12, background: sensitiveData ? '#16a34a' : '#cbd5e1', 
                position: 'relative', cursor: 'pointer', transition: 'all 0.3s' 
              }}
            >
              <div style={{ 
                position: 'absolute', top: 2, left: sensitiveData ? 24 : 2, width: 18, height: 18, 
                borderRadius: '50%', background: '#fff', transition: 'all 0.3s', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' 
              }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div style={{ margin: '0 32px 32px 32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#fff', borderRadius: 12, flex: 1, display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          
          {/* Table Container */}
          <div style={{ flex: 1, overflowX: 'auto', minHeight: 400 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th onClick={() => handleSort('admissionNumber')} style={{ padding: '14px 20px', fontSize: 12, fontWeight: 700, color: '#334155', borderBottom: '2px solid #e2e8f0', whiteSpace: 'nowrap', cursor: 'pointer' }}>
                    Admission No {sortField === 'admissionNumber' ? (sortOrder === 'asc' ? '↑' : '↓') : '↕'}
                  </th>
                  <th onClick={() => handleSort('name')} style={{ padding: '14px 20px', fontSize: 12, fontWeight: 700, color: '#334155', borderBottom: '2px solid #e2e8f0', whiteSpace: 'nowrap', cursor: 'pointer' }}>
                    Name {sortField === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : '↕'}
                  </th>
                  <th onClick={() => handleSort('class')} style={{ padding: '14px 20px', fontSize: 12, fontWeight: 700, color: '#334155', borderBottom: '2px solid #e2e8f0', whiteSpace: 'nowrap', cursor: 'pointer' }}>
                    Class {sortField === 'class' ? (sortOrder === 'asc' ? '↑' : '↓') : '↕'}
                  </th>
                  <th onClick={() => handleSort('dob')} style={{ padding: '14px 20px', fontSize: 12, fontWeight: 700, color: '#334155', borderBottom: '2px solid #e2e8f0', whiteSpace: 'nowrap', cursor: 'pointer' }}>
                    DOB {sortField === 'dob' ? (sortOrder === 'asc' ? '↑' : '↓') : '↕'}
                  </th>
                  <th onClick={() => handleSort('father')} style={{ padding: '14px 20px', fontSize: 12, fontWeight: 700, color: '#334155', borderBottom: '2px solid #e2e8f0', whiteSpace: 'nowrap', cursor: 'pointer' }}>
                    Father Name {sortField === 'father' ? (sortOrder === 'asc' ? '↑' : '↓') : '↕'}
                  </th>
                  <th onClick={() => handleSort('mother')} style={{ padding: '14px 20px', fontSize: 12, fontWeight: 700, color: '#334155', borderBottom: '2px solid #e2e8f0', whiteSpace: 'nowrap', cursor: 'pointer' }}>
                    Mother Name {sortField === 'mother' ? (sortOrder === 'asc' ? '↑' : '↓') : '↕'}
                  </th>
                  <th onClick={() => handleSort('contact')} style={{ padding: '14px 20px', fontSize: 12, fontWeight: 700, color: '#334155', borderBottom: '2px solid #e2e8f0', whiteSpace: 'nowrap', cursor: 'pointer' }}>
                    Contact Number {sortField === 'contact' ? (sortOrder === 'asc' ? '↑' : '↓') : '↕'}
                  </th>
                  <th style={{ padding: '14px 20px', textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#334155', borderBottom: '2px solid #e2e8f0', whiteSpace: 'nowrap' }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 32, height: 32, border: '3px solid #e2e8f0', borderTop: '3px solid #2563eb', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                        <span>Loading 1,237 students data...</span>
                      </div>
                    </td>
                  </tr>
                ) : paginatedStudents.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                      No students found matching the selected filters.
                    </td>
                  </tr>
                ) : (
                  paginatedStudents.map((student, index) => {
                    const p = student.personalDetails || {};
                    const a = student.academicDetails || {};
                    const f = student.familyDetails || {};
                    const c = student.contactAddress || {};
                    const fullName = `${p.firstName || ''} ${p.middleName || ''} ${p.lastName || ''}`.trim().replace(/\s+/g, ' ') || 'Student';
                    const fatherName = f.father ? `${f.father.title ? f.father.title + ' ' : ''}${f.father.firstName || ''} ${f.father.lastName || ''}`.trim() : '';
                    const motherName = f.mother ? `${f.mother.title ? f.mother.title + ' ' : ''}${f.mother.firstName || ''} ${f.mother.lastName || ''}`.trim() : '';
                    const dobDate = p.dateOfBirth ? new Date(p.dateOfBirth).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-';
                    const className = `${a.class || ''}-${a.section || ''}`.replace(/^-|-$/, '');
                    
                    return (
                      <tr 
                        key={student._id} 
                        style={{ 
                          borderBottom: '1px solid #f1f5f9',
                          background: index % 2 === 0 ? '#fff' : '#fafafa',
                          transition: 'background 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#f0fdf4'}
                        onMouseLeave={e => e.currentTarget.style.background = index % 2 === 0 ? '#fff' : '#fafafa'}
                      >
                        <td style={{ padding: '14px 20px', fontSize: 13, color: '#0f172a', fontWeight: 600 }}>
                          {a.admissionNumber}
                        </td>
                        <td style={{ padding: '14px 20px', fontSize: 13, color: '#1e293b', fontWeight: 600 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap' }}>
                            <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#6366f1', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                              {fullName.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()}
                            </div>
                            <div>
                              <span>{fullName}</span>
                              {a.rollNumber && <span style={{ marginLeft: 6, fontSize: 11, color: '#64748b' }}>(Roll: {a.rollNumber})</span>}
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '14px 20px', fontSize: 13, color: '#334155', fontWeight: 600 }}>
                          <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '3px 8px', borderRadius: 4, fontSize: 12 }}>
                            {className}
                          </span>
                        </td>
                        <td style={{ padding: '14px 20px', fontSize: 13, color: '#475569' }}>
                          {sensitiveData ? dobDate : '***'}
                        </td>
                        <td style={{ padding: '14px 20px', fontSize: 13, color: '#475569' }}>
                          {fatherName || '-'}
                        </td>
                        <td style={{ padding: '14px 20px', fontSize: 13, color: '#475569' }}>
                          {motherName || '-'}
                        </td>
                        <td style={{ padding: '14px 20px', fontSize: 13, color: '#475569', fontWeight: 500 }}>
                          {sensitiveData ? (c.contactNumber || '-') : '***'}
                        </td>
                        <td style={{ padding: '14px 20px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                          <button 
                            onClick={() => toggleFavorite(student._id, student.isFavorite)}
                            style={{ background: 'none', border: 'none', color: student.isFavorite ? '#eab308' : '#cbd5e1', cursor: 'pointer', fontSize: 15, marginRight: 10 }}
                            title="Toggle Favorite"
                          >
                            {student.isFavorite ? <FaStar /> : <FaRegStar />}
                          </button>
                          <button 
                            onClick={() => navigate('/dashboard/students/edit/' + student._id)}
                            style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', fontSize: 15, marginRight: 10 }}
                            title="Edit Student Profile"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            onClick={() => navigate('/dashboard/students/profile/' + student._id)}
                            style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 15, marginRight: 10 }}
                            title="View Full Profile"
                          >
                            <FaEye />
                          </button>
                          <button 
                            onClick={() => handleDelete(student._id)}
                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 15 }}
                            title="Delete Student"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, background: '#f8fafc' }}>
            <div style={{ fontSize: 13, color: '#64748b' }}>
              Showing <span style={{ fontWeight: 700, color: '#0f172a' }}>
                {sortedStudents.length === 0 ? 0 : (pageSize === 'All' ? 1 : ((currentPage - 1) * pageSize + 1))}
              </span> to <span style={{ fontWeight: 700, color: '#0f172a' }}>
                {pageSize === 'All' ? sortedStudents.length : Math.min(currentPage * pageSize, sortedStudents.length)}
              </span> of <span style={{ fontWeight: 700, color: '#0f172a' }}>{sortedStudents.length}</span> students
            </div>

            {pageSize !== 'All' && totalPages > 1 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <button 
                  onClick={() => setCurrentPage(1)} 
                  disabled={currentPage === 1}
                  style={{ border: '1px solid #cbd5e1', background: '#fff', borderRadius: 6, padding: '6px 10px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', color: currentPage === 1 ? '#cbd5e1' : '#334155', fontSize: 12 }}
                >
                  <FaAngleDoubleLeft />
                </button>
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                  disabled={currentPage === 1}
                  style={{ border: '1px solid #cbd5e1', background: '#fff', borderRadius: 6, padding: '6px 10px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', color: currentPage === 1 ? '#cbd5e1' : '#334155', fontSize: 12 }}
                >
                  <FaChevronLeft />
                </button>

                {/* Visible page numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      style={{
                        border: currentPage === pageNum ? 'none' : '1px solid #cbd5e1',
                        background: currentPage === pageNum ? '#2563eb' : '#fff',
                        color: currentPage === pageNum ? '#fff' : '#334155',
                        borderRadius: 6,
                        padding: '6px 12px',
                        fontSize: 12,
                        fontWeight: currentPage === pageNum ? 700 : 500,
                        cursor: 'pointer'
                      }}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                  disabled={currentPage === totalPages}
                  style={{ border: '1px solid #cbd5e1', background: '#fff', borderRadius: 6, padding: '6px 10px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', color: currentPage === totalPages ? '#cbd5e1' : '#334155', fontSize: 12 }}
                >
                  <FaChevronRight />
                </button>
                <button 
                  onClick={() => setCurrentPage(totalPages)} 
                  disabled={currentPage === totalPages}
                  style={{ border: '1px solid #cbd5e1', background: '#fff', borderRadius: 6, padding: '6px 10px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', color: currentPage === totalPages ? '#cbd5e1' : '#334155', fontSize: 12 }}
                >
                  <FaAngleDoubleRight />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentsList;
