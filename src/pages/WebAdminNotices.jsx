import React, { useState, useEffect, useRef } from 'react';
import { 
  FaBullhorn, FaCalendarAlt, FaCloudUploadAlt, FaBold, FaItalic, FaStrikethrough, 
  FaListUl, FaListOl, FaAlignLeft, FaAlignCenter, 
  FaAlignRight, FaSearch, FaEye, FaEdit, FaTrash,
  FaSyncAlt, FaFilePdf, FaImage, FaTimes
} from 'react-icons/fa';

export default function WebAdminNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [viewModalNotice, setViewModalNotice] = useState(null);

  // Form State
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [activationDate, setActivationDate] = useState(new Date().toISOString().split('T')[0]);
  const [deactivationDate, setDeactivationDate] = useState('');
  const [enableEndDate, setEnableEndDate] = useState(false);
  const [status, setStatus] = useState(true);
  const [showOnWebsite, setShowOnWebsite] = useState(true);
  const [noticeFor, setNoticeFor] = useState('School');

  // Media state: PDF and Cover Image
  const [attachment, setAttachment] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [isDraggingPdf, setIsDraggingPdf] = useState(false);
  const [isDraggingImg, setIsDraggingImg] = useState(false);

  const actDateRef = useRef(null);
  const deactDateRef = useRef(null);
  const pdfInputRef = useRef(null);
  const imgInputRef = useRef(null);

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/notices`);
      const data = await res.json();
      if (data.success && data.data) {
        setNotices(data.data);
      }
    } catch (err) {
      console.error('Error fetching notices:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handlePdfFile = (file) => {
    if (!file) return;
    setAttachmentName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      setAttachment(e.target.result);
      setErrorMsg('');
    };
    reader.readAsDataURL(file);
  };

  const handleImgFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setCoverImage(e.target.result);
      setErrorMsg('');
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    setHeading('');
    setDescription('');
    setAttachment('');
    setAttachmentName('');
    setCoverImage('');
    setActivationDate(new Date().toISOString().split('T')[0]);
    setDeactivationDate('');
    setEnableEndDate(false);
    setStatus(true);
    setShowOnWebsite(true);
    setNoticeFor('School');
    setErrorMsg('');
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!heading.trim()) {
      setErrorMsg('Please enter Notice Heading');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/notices`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: heading,
          heading,
          category: noticeFor,
          noticeDate: activationDate,
          activationDate,
          deactivationDate: enableEndDate ? deactivationDate : null,
          attachment,
          coverImage,
          showOnWebsite,
          description,
          status: status ? 'Active' : 'Inactive'
        })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Notice saved successfully!');
        fetchNotices();
        handleReset();
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        setErrorMsg(data.message || 'Failed to save notice');
      }
    } catch (err) {
      setErrorMsg('Error connecting to backend server');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this notice?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/notices/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Notice deleted successfully!');
        setNotices(prev => prev.filter(n => (n._id || n.id) !== id));
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        setErrorMsg(data.message || 'Failed to delete notice');
      }
    } catch (err) {
      setErrorMsg('Error deleting notice');
    }
  };

  const handleEdit = (notice) => {
    setHeading(notice.heading || notice.title || '');
    setDescription(notice.description || '');
    setActivationDate(notice.activationDate ? new Date(notice.activationDate).toISOString().split('T')[0] : (notice.startDate ? new Date(notice.startDate).toISOString().split('T')[0] : ''));
    if (notice.deactivationDate || notice.endDate) {
      setDeactivationDate(new Date(notice.deactivationDate || notice.endDate).toISOString().split('T')[0]);
      setEnableEndDate(true);
    } else {
      setDeactivationDate('');
      setEnableEndDate(false);
    }
    setNoticeFor(notice.category || notice.noticeFor || 'School');
    setAttachment(notice.attachment || notice.pdfUrl || '');
    setAttachmentName(notice.attachment ? 'Attached Document' : '');
    setCoverImage(notice.coverImage || '');
    setStatus(notice.status !== 'Inactive' && notice.isActive !== false);
    setShowOnWebsite(notice.showOnWebsite !== false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredNotices = notices.filter(n =>
    !search ||
    (n.title || n.heading || '').toLowerCase().includes(search.toLowerCase()) ||
    (n.noticeFor || n.targetAudience || n.category || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">Notice Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> Notice
        </div>
      </div>

      {/* Alert Notifications */}
      {successMsg && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm flex items-center justify-between shadow-sm">
          <span>✓ {successMsg}</span>
          <button onClick={() => setSuccessMsg('')} className="text-green-600 hover:text-green-800"><FaTimes /></button>
        </div>
      )}
      {errorMsg && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center justify-between shadow-sm">
          <span>⚠ {errorMsg}</span>
          <button onClick={() => setErrorMsg('')} className="text-red-600 hover:text-red-800"><FaTimes /></button>
        </div>
      )}

      {/* Add Notice Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <FaBullhorn className="text-gray-800 text-sm" />
          <h2 className="text-sm font-bold text-gray-800">Add Notice</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Column - Form Fields */}
            <div className="flex-1 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Heading <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={heading}
                  onChange={e => setHeading(e.target.value)}
                  placeholder="Enter Notice Heading (e.g. Annual Sports Meet 2026, Summer Vacation Dates)..." 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                <div className="border border-gray-300 rounded overflow-hidden">
                  <div className="bg-[#f8f9fa] border-b border-gray-200 px-2 py-1.5 flex flex-wrap gap-1 items-center text-gray-600">
                    <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaBold /></button>
                    <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaItalic /></button>
                    <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaStrikethrough /></button>
                    <div className="w-px h-4 bg-gray-300 mx-1"></div>
                    <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaListUl /></button>
                    <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaListOl /></button>
                    <div className="w-px h-4 bg-gray-300 mx-1"></div>
                    <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaAlignLeft /></button>
                    <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaAlignCenter /></button>
                    <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaAlignRight /></button>
                  </div>
                  <textarea 
                    rows="6" 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Enter complete notice circular details..." 
                    className="w-full p-3 text-sm outline-none resize-y"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Right Column - Media Uploads (PDF & Cover Image) */}
            <div className="w-full lg:w-1/3 flex flex-col gap-4">
              {/* PDF Attachment */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Attach PDF File</label>
                <input 
                  type="file" 
                  ref={pdfInputRef}
                  accept=".pdf,application/pdf"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) handlePdfFile(e.target.files[0]);
                  }}
                  className="hidden"
                />

                {attachment ? (
                  <div className="border-2 border-red-300 rounded-lg p-3 bg-red-50/50 flex flex-col items-center justify-center h-[125px] relative">
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">PDF</span>
                    <FaFilePdf className="text-red-500 text-3xl mb-1" />
                    <span className="text-xs font-medium text-gray-800 truncate max-w-[200px]">{attachmentName || 'Document Attached'}</span>
                    <div className="flex gap-2 mt-2">
                      <button 
                        type="button" 
                        onClick={() => pdfInputRef.current?.click()}
                        className="text-[11px] text-blue-600 hover:underline"
                      >
                        Change
                      </button>
                      <button 
                        type="button" 
                        onClick={() => { setAttachment(''); setAttachmentName(''); }}
                        className="text-[11px] text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div 
                    onDragOver={(e) => { e.preventDefault(); setIsDraggingPdf(true); }}
                    onDragLeave={() => setIsDraggingPdf(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDraggingPdf(false);
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) handlePdfFile(e.dataTransfer.files[0]);
                    }}
                    onClick={() => pdfInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-lg p-3 flex flex-col items-center justify-center bg-white relative h-[125px] cursor-pointer transition-colors ${
                      isDraggingPdf ? 'border-red-500 bg-red-50/30' : 'border-gray-300 hover:border-red-400'
                    }`}
                  >
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">PDF</span>
                    <FaCloudUploadAlt className="text-gray-400 text-2xl mb-1" />
                    <div className="text-xs font-medium text-gray-700">Drag & drop <span className="font-normal">or</span> <span className="text-blue-500 underline">browse</span></div>
                    <div className="text-[10px] text-gray-400 mt-0.5">PDF Only | Max 5MB</div>
                  </div>
                )}
              </div>
              
              {/* Cover Image */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Cover Image</label>
                <input 
                  type="file" 
                  ref={imgInputRef}
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) handleImgFile(e.target.files[0]);
                  }}
                  className="hidden"
                />

                {coverImage ? (
                  <div className="border-2 border-blue-300 rounded-lg p-2 bg-blue-50/30 flex items-center gap-3 h-[125px] relative">
                    <span className="absolute top-2 left-2 bg-blue-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">IMAGE</span>
                    <img src={coverImage} alt="Cover Preview" className="w-24 h-20 object-cover rounded shadow-sm border border-gray-200 ml-2" />
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-semibold text-gray-800">Cover Uploaded</span>
                      <button 
                        type="button" 
                        onClick={() => imgInputRef.current?.click()}
                        className="text-[11px] text-blue-600 hover:underline text-left"
                      >
                        Change Photo
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setCoverImage('')}
                        className="text-[11px] text-red-600 hover:underline text-left"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div 
                    onDragOver={(e) => { e.preventDefault(); setIsDraggingImg(true); }}
                    onDragLeave={() => setIsDraggingImg(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDraggingImg(false);
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) handleImgFile(e.dataTransfer.files[0]);
                    }}
                    onClick={() => imgInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-lg p-3 flex flex-col items-center justify-center bg-white relative h-[125px] cursor-pointer transition-colors ${
                      isDraggingImg ? 'border-blue-500 bg-blue-50/30' : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    <span className="absolute top-2 left-2 bg-blue-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">IMAGE</span>
                    <FaCloudUploadAlt className="text-gray-400 text-2xl mb-1" />
                    <div className="text-xs font-medium text-gray-700">Drag & drop <span className="font-normal">or</span> <span className="text-blue-500 underline">browse</span></div>
                    <div className="text-[10px] text-gray-400 mt-0.5">JPG • PNG • GIF</div>
                  </div>
                )}
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4 pt-4 border-t border-gray-100">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Activation Date <span className="text-red-500">*</span></label>
              <div 
                className="relative cursor-pointer"
                onClick={() => actDateRef.current?.showPicker ? actDateRef.current.showPicker() : actDateRef.current?.focus()}
              >
                <input 
                  type="date" 
                  ref={actDateRef}
                  value={activationDate}
                  onChange={e => setActivationDate(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 cursor-pointer" 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Deactivation Date</label>
              <div className="relative flex items-center gap-2">
                <div 
                  className="relative flex-1 cursor-pointer"
                  onClick={() => enableEndDate && (deactDateRef.current?.showPicker ? deactDateRef.current.showPicker() : deactDateRef.current?.focus())}
                >
                  <input 
                    type="date" 
                    ref={deactDateRef}
                    disabled={!enableEndDate}
                    value={deactivationDate}
                    onChange={e => setDeactivationDate(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 disabled:bg-gray-100 cursor-pointer" 
                  />
                </div>
                <label className="flex items-center gap-1 text-[11px] text-gray-600 cursor-pointer whitespace-nowrap">
                  <input 
                    type="checkbox" 
                    checked={enableEndDate}
                    onChange={e => setEnableEndDate(e.target.checked)}
                    className="rounded border-gray-300" 
                  /> Enable
                </label>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-6">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Status</label>
                  <div className="flex items-center gap-2">
                    <div 
                      className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${status ? 'bg-blue-500' : 'bg-gray-300'}`}
                      onClick={() => setStatus(!status)}
                    >
                      <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${status ? 'translate-x-5' : ''}`}></div>
                    </div>
                    {status ? (
                      <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Active</span>
                    ) : (
                      <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Inactive</span>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Show On Website</label>
                  <div className="flex items-center gap-2">
                    <div 
                      className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${showOnWebsite ? 'bg-blue-500' : 'bg-gray-300'}`}
                      onClick={() => setShowOnWebsite(!showOnWebsite)}
                    >
                      <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${showOnWebsite ? 'translate-x-5' : ''}`}></div>
                    </div>
                    {showOnWebsite ? (
                      <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Yes</span>
                    ) : (
                      <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase">No</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Notice For</label>
              <select 
                value={noticeFor}
                onChange={e => setNoticeFor(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 bg-white outline-none focus:border-blue-500"
              >
                <option value="School">School</option>
                <option value="Students">Students</option>
                <option value="Teachers">Teachers</option>
                <option value="Parents">Parents</option>
                <option value="All">All</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end items-center gap-4 mt-8 pt-4 border-t border-gray-100">
            <button 
              type="button"
              onClick={handleReset}
              className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium py-2 px-6 rounded transition cursor-pointer"
            >
              Reset
            </button>
            <button 
              type="button"
              disabled={saving}
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded transition shadow-sm disabled:opacity-60 cursor-pointer"
            >
              {saving ? 'Saving...' : 'Save Notice'}
            </button>
          </div>
        </div>
      </div>

      {/* All Notices Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaListUl className="text-gray-800 text-lg" />
            <h2 className="text-sm font-bold text-gray-800">All Notices <span className="text-xs font-normal text-gray-500">({notices.length} total)</span></h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button onClick={fetchNotices} className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 cursor-pointer" title="Refresh">
              <FaSyncAlt className={`text-xs text-blue-600 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
              <div className="relative border-r border-gray-200">
                <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-xs" />
                <input 
                  type="text" 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search notices..." 
                  className="w-64 border-none px-3 py-1.5 pl-8 text-xs text-gray-600 outline-none" 
                />
              </div>
              <select className="border-none px-2 py-1.5 text-xs text-gray-600 outline-none bg-gray-50/50">
                <option>10</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[11px] text-left">
            <thead className="text-gray-600 uppercase bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-3 py-3 font-semibold text-center w-12">S.NO.</th>
                <th className="px-3 py-3 font-semibold">HEADING</th>
                <th className="px-3 py-3 font-semibold text-center">ACTIVATION DATE</th>
                <th className="px-3 py-3 font-semibold text-center">DEACTIVATION DATE</th>
                <th className="px-3 py-3 font-semibold text-center">ATTACHMENT</th>
                <th className="px-3 py-3 font-semibold text-center">WEBSITE</th>
                <th className="px-3 py-3 font-semibold text-center">STATUS</th>
                <th className="px-3 py-3 font-semibold text-center">NOTICE FOR</th>
                <th className="px-3 py-3 font-semibold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="py-6 text-center text-xs text-gray-500">
                    Loading notices from database...
                  </td>
                </tr>
              ) : filteredNotices.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-6 text-center text-xs text-gray-500">
                    No notices found
                  </td>
                </tr>
              ) : (
                filteredNotices.map((notice, index) => {
                  const headingText = notice.heading || notice.title;
                  const activation = notice.activationDate ? new Date(notice.activationDate).toLocaleDateString() : (notice.startDate ? new Date(notice.startDate).toLocaleDateString() : (notice.createdAt ? new Date(notice.createdAt).toLocaleDateString() : '-'));
                  const deactivation = notice.deactivationDate ? new Date(notice.deactivationDate).toLocaleDateString() : (notice.endDate ? new Date(notice.endDate).toLocaleDateString() : '-');
                  const forTarget = notice.category || notice.noticeFor || notice.targetAudience || 'School';
                  const isWeb = notice.showOnWebsite !== undefined ? notice.showOnWebsite : (notice.website !== undefined ? notice.website : true);
                  const isAct = notice.status === 'Active' || notice.isActive === true;

                  return (
                    <tr key={notice._id || notice.id || index} className="border-b border-gray-100 hover:bg-gray-50/50 transition text-gray-700">
                      <td className="px-3 py-4 text-center">{index + 1}</td>
                      <td className="px-3 py-4 font-bold text-gray-800 max-w-[240px]">{headingText}</td>
                      <td className="px-3 py-4 text-center font-mono">{activation}</td>
                      <td className={`px-3 py-4 text-center font-mono ${deactivation !== '-' ? 'text-red-500' : 'text-gray-500'}`}>{deactivation}</td>
                      <td className="px-3 py-4 text-center text-gray-500">
                        {notice.attachment || notice.pdfUrl ? (
                          <button 
                            onClick={() => setViewModalNotice(notice)}
                            className="text-blue-600 hover:text-blue-800 underline font-medium flex items-center justify-center gap-1 mx-auto cursor-pointer"
                          >
                            <FaFilePdf className="text-red-500 text-xs" /> View
                          </button>
                        ) : 'No File'}
                      </td>
                      <td className="px-3 py-4 text-center">
                        {isWeb ? <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded font-bold">Yes</span> : <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-bold">No</span>}
                      </td>
                      <td className="px-3 py-4 text-center">
                        {isAct ? 
                          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">Active</span> : 
                          <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold">Inactive</span>
                        }
                      </td>
                      <td className="px-3 py-4 text-center text-blue-600 font-medium">
                        {forTarget}
                      </td>
                      <td className="px-3 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => setViewModalNotice(notice)}
                            className="text-blue-500 hover:text-blue-700 cursor-pointer" 
                            title="View"
                          >
                            <FaEye />
                          </button>
                          <button 
                            onClick={() => handleEdit(notice)}
                            className="text-indigo-500 hover:text-indigo-700 cursor-pointer" 
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            onClick={() => handleDelete(notice._id || notice.id)}
                            className="text-red-500 hover:text-red-700 cursor-pointer" 
                            title="Delete"
                          >
                            <FaTrash />
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

        <div className="p-4 flex items-center justify-between border-t border-gray-100 bg-white">
          <div className="text-[11px] text-gray-500">
            Showing {filteredNotices.length} of {notices.length} entries
          </div>
        </div>
      </div>

      {/* View Notice Modal */}
      {viewModalNotice && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-[#f8f9fb] px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaBullhorn className="text-blue-600" />
                <h3 className="font-bold text-gray-800 text-base">{viewModalNotice.heading || viewModalNotice.title}</h3>
              </div>
              <button 
                onClick={() => setViewModalNotice(null)}
                className="text-gray-400 hover:text-gray-600 p-1 text-base cursor-pointer"
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {viewModalNotice.coverImage && (
                <img 
                  src={viewModalNotice.coverImage} 
                  alt="Notice Banner" 
                  className="w-full h-48 object-cover rounded-lg shadow-sm"
                />
              )}
              <div className="grid grid-cols-2 gap-2 text-xs border-b pb-3">
                <div>
                  <span className="text-gray-500 block">Notice For:</span>
                  <span className="font-semibold text-gray-800">{viewModalNotice.category || viewModalNotice.noticeFor || 'School'}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Status:</span>
                  <span className="font-semibold text-green-600">{viewModalNotice.status || 'Active'}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Activation Date:</span>
                  <span className="font-semibold text-gray-800">{viewModalNotice.activationDate ? new Date(viewModalNotice.activationDate).toLocaleDateString() : '-'}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Deactivation Date:</span>
                  <span className="font-semibold text-gray-800">{viewModalNotice.deactivationDate ? new Date(viewModalNotice.deactivationDate).toLocaleDateString() : 'No expiry'}</span>
                </div>
              </div>
              
              <div>
                <span className="text-xs text-gray-500 font-medium block mb-1">Notice Description:</span>
                <p className="text-gray-700 text-xs bg-gray-50 p-3 rounded leading-relaxed whitespace-pre-wrap">
                  {viewModalNotice.description || 'No description provided.'}
                </p>
              </div>

              {(viewModalNotice.attachment || viewModalNotice.pdfUrl) && (
                <div className="p-3 bg-red-50/60 border border-red-200 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-red-700">
                    <FaFilePdf className="text-lg" />
                    <span>Attached Document / Circular PDF</span>
                  </div>
                  <a 
                    href={viewModalNotice.attachment || viewModalNotice.pdfUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    download="Notice_Circular.pdf"
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded shadow-sm"
                  >
                    Open / Download
                  </a>
                </div>
              )}
            </div>
            <div className="bg-gray-50 px-6 py-3 border-t flex justify-end">
              <button 
                onClick={() => setViewModalNotice(null)}
                className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold rounded cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="text-center text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-4">
        COPYRIGHT © 2017 FRANCISCAN.
      </div>
    </div>
  );
}
