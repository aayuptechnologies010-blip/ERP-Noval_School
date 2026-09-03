import React, { useState, useEffect } from 'react';
import { FaBookOpen, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';

function Ebooks() {
  const [ebooks, setEbooks] = useState([]);
  const [subject, setSubject] = useState('All');
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEbooks();
  }, []);

  const fetchEbooks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/ebooks`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        const list = Array.isArray(data) ? data : (data.ebooks || []);
        setEbooks(list);
        // Build unique subjects from fetched data
        const uniqueSubjects = ['All', ...new Set(list.map(b => b.subject).filter(Boolean))];
        setSubjects(uniqueSubjects);
      } else {
        toast.error("Failed to load e-books");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error loading e-books");
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = ebooks.filter(b => subject === 'All' || b.subject === subject);

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '24px 32px 16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>E-Books Library</h1>
        <select value={subject} onChange={e => setSubject(e.target.value)} style={inputStyle}>
          {subjects.length > 0 ? (
            subjects.map(s => <option key={s} value={s}>{s === 'All' ? 'All Subjects' : s}</option>)
          ) : (
            <option value="All">All Subjects</option>
          )}
        </select>
      </div>

      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'auto' }}>
        {loading ? (
          <p style={{ color: '#94a3b8', textAlign: 'center', marginTop: 48 }}>Loading e-books...</p>
        ) : filteredBooks.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: 64 }}>
            <FaBookOpen size={48} style={{ color: '#cbd5e1', marginBottom: 16 }} />
            <p style={{ color: '#94a3b8', fontSize: 15 }}>No e-books found{subject !== 'All' ? ` for subject: ${subject}` : ''}.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '24px' }}>
            {filteredBooks.map(book => (
              <div key={book._id || book.id} style={{ background: '#fff', borderRadius: '8px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ width: 80, height: 100, background: '#e0e7ff', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <FaBookOpen size={32} color="#4f46e5" />
                </div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: 16, color: '#1e293b' }}>{book.title}</h3>
                <p style={{ margin: '0 0 4px 0', fontSize: 13, color: '#64748b' }}>{book.author || 'Unknown'}</p>
                <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
                  {book.class && (
                    <span style={{ fontSize: 12, background: '#f1f5f9', padding: '4px 8px', borderRadius: 4, color: '#475569', fontWeight: 600 }}>{book.class}</span>
                  )}
                  {book.subject && (
                    <span style={{ fontSize: 12, background: '#f1f5f9', padding: '4px 8px', borderRadius: 4, color: '#475569', fontWeight: 600 }}>{book.subject}</span>
                  )}
                </div>
                <a
                  href={book.fileUrl || book.pdfUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginTop: 24, width: '100%', padding: '10px', background: book.fileUrl || book.pdfUrl ? '#3b82f6' : '#94a3b8', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textDecoration: 'none' }}
                  onClick={e => { if (!book.fileUrl && !book.pdfUrl) { e.preventDefault(); toast.info("No file available for this e-book."); }}}
                >
                  <FaDownload size={12} /> Download PDF
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  padding: '8px 16px',
  borderRadius: 4,
  border: '1px solid #cbd5e1',
  outline: 'none',
  fontSize: 14,
  color: '#334155'
};

export default Ebooks;
