import React, { useState, useEffect, useRef } from 'react';
import { Eye, Printer, Bus, Search, User, CreditCard, Download, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005';
const inputStyle = { width: '100%', padding: '7px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none', background: '#fff' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '5px', color: '#374151' };

export default function PrintTransportIdCard() {
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedSection, setSelectedSection] = useState('All');
  const [selectedStudentId, setSelectedStudentId] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const [idCards, setIdCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloadingId, setDownloadingId] = useState(null);
  const [downloadingAll, setDownloadingAll] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const cardRefs = useRef({});

  const getHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    const headers = getHeaders();
    fetch(`${API_URL}/api/school-classes`, { headers })
      .then(r => r.json())
      .then(d => setClasses(Array.isArray(d) ? d : (d?.data || [])))
      .catch(console.error);

    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch(`${API_URL}/api/students`, { headers: getHeaders() });
      const data = await res.json();
      if (res.ok) {
        const list = Array.isArray(data) ? data : (data.students || []);
        const transportStudents = list.filter(s => {
          const t = s.transportDetails || {};
          return s.transportAssigned || t.isTransportStudent || s.transportRoute || t.route;
        });

        setStudentsList(transportStudents);
        setFilteredStudents(transportStudents);

        const secSet = new Set();
        transportStudents.forEach(s => {
          const sec = s.academicDetails?.section || s.section;
          if (sec) secSet.add(sec);
        });
        setSections(Array.from(secSet));

        generateCardsFromList(transportStudents);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const generateCardsFromList = (list) => {
    const cards = list.map(s => {
      const admNo = s.academicDetails?.admissionNumber || s.admissionNumber || '-';
      const p = s.personalDetails || {};
      const fullName = `${p.firstName || s.firstName || ''} ${p.lastName || s.lastName || ''}`.trim() || 'Student';
      const cls = `${s.academicDetails?.class || s.class?.className || s.class?.name || s.class || ''}${s.academicDetails?.section ? '-' + s.academicDetails.section : ''}`.trim() || '-';
      
      const fam = s.familyDetails || {};
      const f = fam.father || {};
      const fatherName = f.firstName ? `${f.title || 'Mr.'} ${f.firstName} ${f.lastName || ''}`.trim() : (s.fatherName || '-');
      const emergencyContact = f.mobile || s.fatherMobile || s.contactAddress?.contactNumber || p.mobile || '-';
      
      const t = s.transportDetails || {};
      const route = s.transportRoute || (typeof t.route === 'object' ? t.route?.routeName : t.route) || 'Route 1';
      const stop = s.transportStop || (typeof t.stop === 'object' ? t.stop?.stopName : t.stop) || '-';
      const vehicle = s.vehicleNo || (typeof t.vehicle === 'object' ? t.vehicle?.vehicleNo : t.vehicle) || 'VAN';
      const fare = s.transportFee || t.transportFee || 600;

      return {
        id: s._id,
        admNo,
        fullName,
        className: cls,
        fatherName,
        emergencyContact,
        route,
        stop,
        vehicle,
        fare,
        validTill: '31-03-2027',
        photo: p.photo || s.photo || null
      };
    });

    setIdCards(cards);
    setHasSearched(true);
  };

  const handleClassChange = (cls) => {
    setSelectedClass(cls);
    filterStudentsDropdown(cls, selectedSection, searchTerm);
  };

  const handleSectionChange = (sec) => {
    setSelectedSection(sec);
    filterStudentsDropdown(selectedClass, sec, searchTerm);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    filterStudentsDropdown(selectedClass, selectedSection, term);
  };

  const filterStudentsDropdown = (cls, sec, search) => {
    let list = [...studentsList];

    if (cls && cls !== 'All') {
      const cLower = cls.toLowerCase();
      list = list.filter(s => {
        const sc = (s.academicDetails?.class || s.class?.className || s.class?.name || s.class || '').toString().toLowerCase();
        return sc.includes(cLower);
      });
    }

    if (sec && sec !== 'All') {
      list = list.filter(s => {
        const sSec = (s.academicDetails?.section || s.section || '').toString().toUpperCase();
        return sSec === sec.toUpperCase();
      });
    }

    if (search && search.trim() !== '') {
      const t = search.toLowerCase();
      list = list.filter(s => {
        const adm = (s.academicDetails?.admissionNumber || s.admissionNumber || '').toLowerCase();
        const p = s.personalDetails || {};
        const fn = `${p.firstName || s.firstName || ''} ${p.lastName || s.lastName || ''}`.toLowerCase();
        return adm.includes(t) || fn.includes(t);
      });
    }

    setFilteredStudents(list);
  };

  const handleShow = () => {
    setLoading(true);
    setError(null);
    setHasSearched(true);

    let displayList = [...filteredStudents];

    if (selectedStudentId && selectedStudentId !== 'All') {
      displayList = displayList.filter(s => s._id === selectedStudentId);
    }

    generateCardsFromList(displayList);
    setLoading(false);
  };

  // Robust Print Handler using a dedicated print window
  const handlePrint = () => {
    if (idCards.length === 0) {
      alert('No ID cards to print');
      return;
    }

    const printWindow = window.open('', '_blank', 'width=1000,height=800');
    if (!printWindow) {
      alert('Please allow popups to print ID cards.');
      return;
    }

    const cardsHtml = idCards.map(card => `
      <div class="id-card">
        <div class="card-header">
          <div class="school-name">NAVALS NATIONAL ACADEMY</div>
          <div class="sub-header">TRANSPORT BUS PASS (2026-27)</div>
        </div>
        <div class="card-body">
          <div class="photo-box">
            ${card.photo ? `<img src="${card.photo}" alt="Student" />` : '<div class="photo-placeholder">PHOTO</div>'}
          </div>
          <div class="student-info">
            <div class="student-name">${card.fullName}</div>
            <div class="info-row"><span class="lbl">Adm No:</span> <strong style="color: #0284c7;">${card.admNo}</strong></div>
            <div class="info-row"><span class="lbl">Class:</span> <strong>${card.className}</strong></div>
            <div class="info-row"><span class="lbl">Father:</span> <strong>${card.fatherName}</strong></div>
            <div class="info-row"><span class="lbl">Contact:</span> <strong>${card.emergencyContact}</strong></div>
          </div>
        </div>
        <div class="route-banner">
          <div><span class="lbl">Route:</span> <strong>${card.route}</strong></div>
          <div><span class="lbl">Vehicle:</span> <strong>${card.vehicle}</strong></div>
          <div style="grid-column: 1 / -1;"><span class="lbl">Stop:</span> <strong style="color: #0284c7;">${card.stop}</strong></div>
        </div>
        <div class="card-footer">
          <span>Fare: ₹${card.fare}/mo</span>
          <span>Valid Till: ${card.validTill}</span>
        </div>
      </div>
    `).join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Transport ID Cards - Navals National Academy</title>
          <style>
            @page {
              size: A4;
              margin: 10mm;
            }
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background: #fff;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .grid-container {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 16px;
            }
            .id-card {
              border: 2px solid #0284c7;
              border-radius: 8px;
              overflow: hidden;
              background: #fff;
              page-break-inside: avoid;
              box-sizing: border-box;
            }
            .card-header {
              background: #0284c7 !important;
              color: #fff !important;
              padding: 8px 10px;
              text-align: center;
            }
            .school-name {
              font-size: 13px;
              font-weight: bold;
              letter-spacing: 0.5px;
            }
            .sub-header {
              font-size: 10px;
              opacity: 0.95;
            }
            .card-body {
              padding: 10px;
              display: flex;
              gap: 12px;
              align-items: center;
            }
            .photo-box {
              width: 70px;
              height: 85px;
              border: 1px solid #cbd5e1;
              border-radius: 4px;
              background: #f8fafc;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
              overflow: hidden;
            }
            .photo-box img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            .photo-placeholder {
              font-size: 9px;
              color: #94a3b8;
              font-weight: bold;
            }
            .student-info {
              font-size: 11px;
              line-height: 1.45;
              flex: 1;
            }
            .student-name {
              font-size: 13px;
              font-weight: bold;
              color: #0f172a;
              margin-bottom: 2px;
            }
            .info-row {
              margin-bottom: 2px;
            }
            .lbl {
              color: #64748b;
            }
            .route-banner {
              background: #f1f5f9 !important;
              border-top: 1px dashed #cbd5e1;
              padding: 6px 10px;
              font-size: 10.5px;
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 4px;
            }
            .card-footer {
              background: #0369a1 !important;
              color: #fff !important;
              padding: 4px 10px;
              font-size: 9px;
              display: flex;
              justify-content: space-between;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="grid-container">
            ${cardsHtml}
          </div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Download Individual Card as PNG Image
  const handleDownloadCard = async (card) => {
    try {
      setDownloadingId(card.id);
      const element = cardRefs.current[card.id];
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2.5,
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `Transport_ID_${card.admNo}_${card.fullName.replace(/\s+/g, '_')}.png`;
      link.href = imgData;
      link.click();
    } catch (err) {
      console.error('Error downloading card:', err);
      alert('Could not download ID card as image');
    } finally {
      setDownloadingId(null);
    }
  };

  // Download All Currently Visible Cards
  const handleDownloadAllCards = async () => {
    if (idCards.length === 0) return;
    setDownloadingAll(true);
    try {
      for (let i = 0; i < Math.min(idCards.length, 20); i++) {
        const card = idCards[i];
        const element = cardRefs.current[card.id];
        if (element) {
          const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff'
          });
          const link = document.createElement('a');
          link.download = `Transport_ID_${card.admNo}_${card.fullName.replace(/\s+/g, '_')}.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();
          // slight delay so browser doesn't block multiple downloads
          await new Promise(r => setTimeout(r, 400));
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDownloadingAll(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100%', background: '#f8fafc', overflow: 'hidden' }}>
      {/* ── LEFT FILTER SIDEBAR ── */}
      <div className="no-print" style={{
        width: '260px',
        background: '#fff',
        borderRight: '1px solid #e2e8f0',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        flexShrink: 0,
        boxShadow: '1px 0 3px rgba(0,0,0,0.05)',
        overflowY: 'auto'
      }}>
        <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
          <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 'bold', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CreditCard size={16} color="#0284c7" /> Transport ID Card
          </h3>
        </div>

        <div>
          <label style={labelStyle}>Class</label>
          <select value={selectedClass} onChange={e => handleClassChange(e.target.value)} style={inputStyle}>
            <option value="All">All Classes ({classes.length})</option>
            {classes.map(c => {
              const name = c.className || c.name || c._id;
              return <option key={c._id || name} value={name}>{name}</option>;
            })}
          </select>
        </div>

        <div>
          <label style={labelStyle}>Section</label>
          <select value={selectedSection} onChange={e => handleSectionChange(e.target.value)} style={inputStyle}>
            <option value="All">All Sections</option>
            {sections.map(sec => <option key={sec} value={sec}>{sec}</option>)}
          </select>
        </div>

        <div>
          <label style={labelStyle}>Search Student</label>
          <div style={{ position: 'relative' }}>
            <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '8px', top: '9px' }} />
            <input
              type="text"
              placeholder="Adm / Name..."
              value={searchTerm}
              onChange={e => handleSearchChange(e.target.value)}
              style={{ ...inputStyle, paddingLeft: '28px' }}
            />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Select Specific Student</label>
          <select value={selectedStudentId} onChange={e => setSelectedStudentId(e.target.value)} style={inputStyle}>
            <option value="All">All Students ({filteredStudents.length})</option>
            {filteredStudents.map(s => {
              const p = s.personalDetails || {};
              const name = `${p.firstName || s.firstName || ''} ${p.lastName || s.lastName || ''}`.trim();
              const adm = s.academicDetails?.admissionNumber || s.admissionNumber || '';
              return <option key={s._id} value={s._id}>{adm} - {name}</option>;
            })}
          </select>
        </div>

        <button
          onClick={handleShow}
          disabled={loading}
          style={{
            background: 'linear-gradient(to right, #0284c7, #0369a1)',
            color: '#fff',
            border: 'none',
            padding: '9px 12px',
            borderRadius: '5px',
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            fontWeight: 'bold',
            marginTop: '8px'
          }}
        >
          <Eye size={14} /> {loading ? 'Loading...' : 'Filter Cards'}
        </button>
      </div>

      {/* ── RIGHT MAIN CONTENT ── */}
      <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
        <div style={{ background: '#fff', minHeight: '100%', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '16px', display: 'flex', flexDirection: 'column' }}>
          
          {/* Top Bar with Print & Download All */}
          <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '14px', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#0f172a' }}>
                Print Transport ID Cards
              </h2>
              <span style={{ fontSize: '11px', color: '#64748b' }}>
                Generated Cards: <strong>{idCards.length}</strong> | Ready for Print & Direct Download
              </span>
            </div>

            {idCards.length > 0 && (
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button
                  onClick={handleDownloadAllCards}
                  disabled={downloadingAll}
                  style={{
                    background: '#10b981',
                    color: '#fff',
                    border: 'none',
                    padding: '7px 14px',
                    borderRadius: '5px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontWeight: '600'
                  }}
                >
                  {downloadingAll ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                  {downloadingAll ? 'Downloading...' : 'Download Cards'}
                </button>

                <button
                  onClick={handlePrint}
                  style={{
                    background: '#0284c7',
                    color: '#fff',
                    border: 'none',
                    padding: '7px 16px',
                    borderRadius: '5px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontWeight: '600'
                  }}
                >
                  <Printer size={14} /> Print ID Cards
                </button>
              </div>
            )}
          </div>

          {/* Cards Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px', color: '#64748b', fontSize: '13px' }}>
              Generating transport identity cards...
            </div>
          ) : idCards.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px', color: '#64748b', fontSize: '13px' }}>
              {hasSearched ? 'No students found matching your criteria.' : 'Click "Filter Cards" to display student bus ID passes.'}
            </div>
          ) : (
            <div className="printable-area" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
              {idCards.map((card) => (
                <div
                  key={card.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    border: '2px solid #0284c7',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    background: '#fff',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.08)'
                  }}
                >
                  {/* Actual Card Render Container */}
                  <div
                    ref={el => (cardRefs.current[card.id] = el)}
                    style={{
                      background: '#fff',
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1
                    }}
                  >
                    {/* Card Header */}
                    <div style={{ background: '#0284c7', color: '#fff', padding: '10px 12px', textAlign: 'center' }}>
                      <div style={{ fontSize: '13px', fontWeight: 'bold', letterSpacing: '0.5px' }}>
                        NAVALS NATIONAL ACADEMY
                      </div>
                      <div style={{ fontSize: '10px', opacity: 0.9 }}>
                        TRANSPORT BUS PASS (2026-27)
                      </div>
                    </div>

                    {/* Card Body */}
                    <div style={{ padding: '12px', display: 'flex', gap: '12px', flex: 1, alignItems: 'center' }}>
                      <div style={{
                        width: '70px',
                        height: '85px',
                        background: '#f1f5f9',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        overflow: 'hidden'
                      }}>
                        {card.photo ? (
                          <img src={card.photo} alt={card.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <>
                            <User size={34} color="#94a3b8" />
                            <span style={{ fontSize: '9px', color: '#94a3b8', marginTop: '2px' }}>PHOTO</span>
                          </>
                        )}
                      </div>

                      <div style={{ fontSize: '11px', color: '#334155', display: 'flex', flexDirection: 'column', gap: '3px', flex: 1 }}>
                        <div style={{ fontWeight: 'bold', fontSize: '13px', color: '#0f172a' }}>
                          {card.fullName}
                        </div>
                        <div>Adm No: <strong style={{ color: '#0284c7' }}>{card.admNo}</strong></div>
                        <div>Class: <strong>{card.className}</strong></div>
                        <div>Father: <strong>{card.fatherName}</strong></div>
                        <div>Contact: <strong>{card.emergencyContact}</strong></div>
                      </div>
                    </div>

                    {/* Transport Banner */}
                    <div style={{
                      background: '#f8fafc',
                      borderTop: '1px dashed #cbd5e1',
                      padding: '8px 12px',
                      fontSize: '11px',
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '4px'
                    }}>
                      <div>Route: <strong style={{ color: '#0f172a' }}>{card.route}</strong></div>
                      <div>Vehicle: <strong style={{ color: '#0f172a' }}>{card.vehicle}</strong></div>
                      <div style={{ gridColumn: '1 / -1' }}>
                        Stop: <strong style={{ color: '#0284c7' }}>{card.stop}</strong>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div style={{ background: '#0369a1', color: '#fff', padding: '4px 10px', fontSize: '9px', display: 'flex', justifyContent: 'space-between' }}>
                      <span>Fare: ₹{card.fare}/mo</span>
                      <span>Valid Till: {card.validTill}</span>
                    </div>
                  </div>

                  {/* Individual Download Action Button */}
                  <div className="no-print" style={{ padding: '8px 12px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => handleDownloadCard(card)}
                      disabled={downloadingId === card.id}
                      style={{
                        background: '#0284c7',
                        color: '#fff',
                        border: 'none',
                        padding: '5px 12px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        fontWeight: '600'
                      }}
                    >
                      {downloadingId === card.id ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
                      {downloadingId === card.id ? 'Downloading...' : 'Download Card'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
