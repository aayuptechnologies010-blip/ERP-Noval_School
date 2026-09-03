import React, { useState, useEffect } from 'react';
import { FaBook, FaSearch, FaBookOpen } from 'react-icons/fa';
import { toast } from 'react-toastify';

function Library() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All'); // 'All', 'Available', 'Issued'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/books`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setBooks(Array.isArray(data) ? data : (data.books || []));
      } else {
        toast.error("Failed to load library books");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error loading library books");
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = (book.title || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (book.author || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (book.accessionNo || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status mapping: if API returns different casing
    const isAvailable = (book.status || '').toLowerCase() === 'available';
    const currentStatus = isAvailable ? 'Available' : 'Issued';

    if (activeTab === 'All') return matchesSearch;
    return matchesSearch && currentStatus === activeTab;
  });

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 16px 32px' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Library Management</h1>
      </div>

      {/* Main Content Card */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* Top Controls: Tabs and Search */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            
            {/* Tabs */}
            <div style={{ display: 'flex', gap: 8, background: '#f1f5f9', padding: 4, borderRadius: 8 }}>
              {['All', 'Available', 'Issued'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '8px 24px',
                    borderRadius: 6,
                    border: 'none',
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: 'pointer',
                    background: activeTab === tab ? '#fff' : 'transparent',
                    color: activeTab === tab ? '#3b82f6' : '#64748b',
                    boxShadow: activeTab === tab ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  {tab} Books
                </button>
              ))}
            </div>

            {/* Search */}
            <div style={{ position: 'relative', width: 300 }}>
              <FaSearch style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                type="text" 
                placeholder="Search by Title, Author, or Acc No..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{
                  width: '100%', padding: '10px 12px 10px 36px', borderRadius: 6,
                  border: '1px solid #cbd5e1', outline: 'none', fontSize: 14, color: '#334155'
                }}
              />
            </div>
            
          </div>

          {/* Book List Table */}
          <div style={{ overflowX: 'auto', borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={thStyle}>Acc No.</th>
                  <th style={thStyle}>Book Details</th>
                  <th style={thStyle}>Category</th>
                  <th style={thStyle}>Status</th>
                  <th style={{ ...thStyle, textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '48px', color: '#94a3b8' }}>
                      <p>Loading books...</p>
                    </td>
                  </tr>
                ) : filteredBooks.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '48px', color: '#94a3b8' }}>
                      <FaBook size={48} style={{ opacity: 0.2, marginBottom: 16 }} />
                      <p>No books found matching your criteria.</p>
                    </td>
                  </tr>
                ) : (
                  filteredBooks.map((book) => {
                    const isAvailable = (book.status || '').toLowerCase() === 'available';
                    return (
                      <tr key={book._id || book.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={tdStyle}>
                          <span style={{ fontWeight: 600, color: '#64748b' }}>{book.accessionNo || '-'}</span>
                        </td>
                        <td style={tdStyle}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 8, background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <FaBook color="#4f46e5" size={18} />
                            </div>
                            <div>
                              <p style={{ margin: 0, fontWeight: 700, color: '#1e293b', fontSize: 14 }}>{book.title}</p>
                              <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>by {book.author || 'Unknown'}</p>
                            </div>
                          </div>
                        </td>
                        <td style={tdStyle}>{book.category || '-'}</td>
                        <td style={tdStyle}>
                          <span style={{ 
                            padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                            background: isAvailable ? '#dcfce7' : '#fee2e2',
                            color: isAvailable ? '#16a34a' : '#ef4444'
                          }}>
                            {isAvailable ? 'Available' : 'Issued'}
                          </span>
                        </td>
                        <td style={{ ...tdStyle, textAlign: 'center' }}>
                          <button 
                            style={{
                              background: isAvailable ? '#3b82f6' : '#94a3b8',
                              color: '#fff', border: 'none', padding: '6px 16px', borderRadius: 4, 
                              fontSize: 12, fontWeight: 600, cursor: isAvailable ? 'pointer' : 'not-allowed',
                              display: 'inline-flex', alignItems: 'center', gap: 6
                            }}
                            disabled={!isAvailable}
                            onClick={() => toast.success(`Requested ${book.title}`)}
                          >
                            <FaBookOpen size={12} /> {isAvailable ? 'Request' : 'Issued'}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

const thStyle = {
  padding: '16px',
  textAlign: 'left',
  fontSize: 13,
  fontWeight: 700,
  color: '#0f172a',
  borderBottom: '2px solid #e2e8f0',
  whiteSpace: 'nowrap'
};

const tdStyle = {
  padding: '16px',
  fontSize: 14,
  color: '#475569',
  verticalAlign: 'middle'
};

export default Library;
