import React, { useState, useEffect, useRef } from 'react';
import { 
  FaPen, FaListUl, FaBold, FaItalic, FaStrikethrough, 
  FaListOl, FaAlignLeft, FaAlignCenter, 
  FaAlignRight, FaSearch, FaSyncAlt, FaEye, FaEdit, FaTrash,
  FaCloudUploadAlt, FaTimes, FaImage
} from 'react-icons/fa';


const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function WebAdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [viewModalBlog, setViewModalBlog] = useState(null);

  // Form State
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('General');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(true);
  const [coverImage, setCoverImage] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/blogs`);
      const data = await res.json();
      if (data.success && data.data) {
        setBlogs(data.data);
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleImageFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (JPG, PNG, JPEG)');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setCoverImage(e.target.result);
      setErrorMsg('');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleReset = () => {
    setTitle('');
    setAuthor('');
    setCategory('General');
    setDescription('');
    setStatus(true);
    setCoverImage('');
    setErrorMsg('');
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!title.trim()) {
      setErrorMsg('Please enter Blog Title');
      return;
    }
    if (!author.trim()) {
      setErrorMsg('Please enter Author Name');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/blogs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          author,
          category,
          content: description,
          description,
          coverImage,
          status: status ? 'Published' : 'Draft'
        })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Blog post saved successfully!');
        fetchBlogs();
        handleReset();
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        setErrorMsg(data.message || 'Failed to save blog');
      }
    } catch (err) {
      setErrorMsg('Error connecting to backend server');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/blogs/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Blog deleted successfully!');
        setBlogs(prev => prev.filter(b => b._id !== id));
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        setErrorMsg(data.message || 'Failed to delete blog');
      }
    } catch (err) {
      setErrorMsg('Error deleting blog');
    }
  };

  const handleEdit = (blog) => {
    setTitle(blog.title || '');
    setAuthor(blog.author || '');
    setCategory(blog.category || 'General');
    setDescription(blog.content || blog.description || '');
    setStatus(blog.status !== 'Draft' && blog.status !== 'Inactive');
    setCoverImage(blog.coverImage || blog.icon || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredBlogs = blogs.filter(b =>
    !search ||
    (b.title || '').toLowerCase().includes(search.toLowerCase()) ||
    (b.author || '').toLowerCase().includes(search.toLowerCase()) ||
    (b.category || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">Blog Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> Blog
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

      {/* Add Blog Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <FaPen className="text-gray-800 text-sm" />
          <h2 className="text-sm font-bold text-gray-800">Add Blog</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col gap-6">
            
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Blog Title <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Enter Blog Title..." 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Blog Author <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                  placeholder="Enter Author Name (e.g. Principal, Student Council, Editorial Staff)..." 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
                />
              </div>
              <div className="w-full sm:w-1/4">
                <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                <select 
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 bg-white"
                >
                  <option value="General">General</option>
                  <option value="Academic">Academic</option>
                  <option value="Technology">Technology</option>
                  <option value="Campus Life">Campus Life</option>
                  <option value="Arts & Literature">Arts & Literature</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Blog Content / Description <span className="text-red-500">*</span></label>
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
                  placeholder="Write the full blog article content here..." 
                  className="w-full p-3 text-sm outline-none resize-y"
                ></textarea>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Cover Image Upload */}
              <div className="flex-1 w-full">
                <label className="block text-xs font-medium text-gray-700 mb-1">Blog Cover Photo / Icon</label>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) handleImageFile(e.target.files[0]);
                  }}
                  className="hidden"
                />

                {coverImage ? (
                  <div className="border-2 border-blue-400 rounded-lg p-3 bg-white relative flex items-center gap-4">
                    <img src={coverImage} alt="Cover Preview" className="w-24 h-20 object-cover rounded shadow-sm" />
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-semibold text-gray-800">Cover Image Attached</span>
                      <div className="flex gap-2">
                        <button 
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 px-2 py-1 rounded"
                        >
                          Change
                        </button>
                        <button 
                          type="button"
                          onClick={() => setCoverImage('')}
                          className="text-xs bg-red-50 text-red-600 hover:bg-red-100 px-2 py-1 rounded"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div 
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center bg-white cursor-pointer transition-colors ${
                      isDragging ? 'border-blue-500 bg-blue-50/50' : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    <FaCloudUploadAlt className="text-gray-400 text-3xl mb-1" />
                    <div className="text-xs font-medium text-gray-700">Drag & drop <span className="font-normal">or</span> <span className="text-blue-500 underline font-semibold">browse</span></div>
                    <div className="text-[10px] text-gray-400">JPG • PNG • JPEG</div>
                  </div>
                )}
              </div>

              {/* Status */}
              <div className="w-full sm:w-1/3 pt-2">
                <label className="block text-xs font-medium text-gray-700 mb-2">Publish Status</label>
                <div className="flex items-center gap-3">
                  <div 
                    className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${status ? 'bg-blue-500' : 'bg-gray-300'}`}
                    onClick={() => setStatus(!status)}
                  >
                    <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${status ? 'translate-x-5' : ''}`}></div>
                  </div>
                  {status ? (
                    <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-0.5 rounded">Published</span>
                  ) : (
                    <span className="bg-gray-100 text-gray-500 text-xs font-semibold px-2 py-0.5 rounded">Draft</span>
                  )}
                </div>
              </div>
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
              {saving ? 'Saving...' : 'Save Blog'}
            </button>
          </div>
        </div>
      </div>

      {/* All Blogs Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaListUl className="text-gray-800 text-lg" />
            <h2 className="text-sm font-bold text-gray-800">All Blogs <span className="text-xs font-normal text-gray-500">({blogs.length} total)</span></h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button onClick={fetchBlogs} className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 cursor-pointer" title="Refresh">
              <FaSyncAlt className={`text-xs text-blue-600 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
              <div className="relative border-r border-gray-200">
                <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-xs" />
                <input 
                  type="text" 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search blogs..." 
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
          <table className="w-full text-sm text-left">
            <thead className="text-[11px] text-gray-600 uppercase bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-semibold text-center w-16">S.NO.</th>
                <th className="px-4 py-3 font-semibold text-center w-20">COVER</th>
                <th className="px-4 py-3 font-semibold text-center">TITLE</th>
                <th className="px-4 py-3 font-semibold text-center">AUTHOR</th>
                <th className="px-4 py-3 font-semibold text-center">CATEGORY</th>
                <th className="px-4 py-3 font-semibold text-center">STATUS</th>
                <th className="px-4 py-3 font-semibold text-center">DATE</th>
                <th className="px-4 py-3 font-semibold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-4 py-8 text-center text-gray-500 text-sm bg-gray-50/20">
                    Loading blogs from database...
                  </td>
                </tr>
              ) : filteredBlogs.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-4 py-8 text-center text-gray-500 text-sm bg-gray-50/20">
                    No blogs found
                  </td>
                </tr>
              ) : (
                filteredBlogs.map((blog, index) => {
                  const img = blog.coverImage || blog.icon;
                  return (
                    <tr key={blog._id || index} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
                      <td className="px-4 py-4 text-center text-gray-600">{index + 1}</td>
                      <td className="px-4 py-4 text-center">
                        <div className="w-10 h-10 border border-gray-200 rounded flex items-center justify-center bg-gray-50 mx-auto overflow-hidden">
                          {img ? (
                            <img src={img} alt="Cover" className="w-full h-full object-cover" />
                          ) : (
                            <FaPen className="text-gray-400 text-xs" />
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 font-bold text-gray-800 text-center">{blog.title}</td>
                      <td className="px-4 py-4 text-center text-gray-600">{blog.author || 'Editorial Team'}</td>
                      <td className="px-4 py-4 text-center">
                        <span className="bg-purple-50 text-purple-700 text-[10px] font-semibold px-2 py-0.5 rounded border border-purple-200">
                          {blog.category || 'General'}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          blog.status === 'Draft' || blog.status === 'Inactive' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {blog.status || 'Published'}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center text-gray-600 font-mono text-xs">
                        {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : (blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : '-')}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center gap-3">
                          <button 
                            onClick={() => setViewModalBlog(blog)}
                            className="text-blue-500 hover:text-blue-700 cursor-pointer" 
                            title="View"
                          >
                            <FaEye />
                          </button>
                          <button 
                            onClick={() => handleEdit(blog)}
                            className="text-indigo-500 hover:text-indigo-700 cursor-pointer" 
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            onClick={() => handleDelete(blog._id)}
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
            Showing {filteredBlogs.length} of {blogs.length} entries
          </div>
        </div>
      </div>

      {/* View Blog Modal */}
      {viewModalBlog && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-[#f8f9fb] px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaPen className="text-blue-600" />
                <h3 className="font-bold text-gray-800 text-base">{viewModalBlog.title}</h3>
              </div>
              <button 
                onClick={() => setViewModalBlog(null)}
                className="text-gray-400 hover:text-gray-600 p-1 text-base cursor-pointer"
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {(viewModalBlog.coverImage || viewModalBlog.icon) && (
                <img 
                  src={viewModalBlog.coverImage || viewModalBlog.icon} 
                  alt="Blog Cover" 
                  className="w-full h-52 object-cover rounded-lg shadow-sm"
                />
              )}
              <div className="grid grid-cols-2 gap-3 text-xs border-b pb-3">
                <div>
                  <span className="text-gray-500 block">Author:</span>
                  <span className="font-semibold text-gray-800">{viewModalBlog.author || 'Editorial'}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Category:</span>
                  <span className="font-semibold text-purple-600">{viewModalBlog.category || 'General'}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Status:</span>
                  <span className="font-semibold text-green-600">{viewModalBlog.status || 'Published'}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Date:</span>
                  <span className="font-semibold text-gray-800">{viewModalBlog.publishedAt ? new Date(viewModalBlog.publishedAt).toLocaleDateString() : '-'}</span>
                </div>
              </div>
              <div>
                <span className="text-xs text-gray-500 font-medium block mb-1">Article Content:</span>
                <p className="text-gray-700 text-xs bg-gray-50 p-3 rounded leading-relaxed whitespace-pre-wrap">
                  {viewModalBlog.content || viewModalBlog.description || 'No content provided.'}
                </p>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 border-t flex justify-end">
              <button 
                onClick={() => setViewModalBlog(null)}
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
