import React, { useState } from 'react';
import { FaBookOpen, FaDownload } from 'react-icons/fa';

const dummyEbooks = [
  { id: 1, title: 'Physics Fundamentals', class: 'Class 10', subject: 'Physics', author: 'NCERT' },
  { id: 2, title: 'Advanced Algebra', class: 'Class 12', subject: 'Maths', author: 'RD Sharma' },
  { id: 3, title: 'English Grammar in Use', class: 'Class 8', subject: 'English', author: 'Raymond Murphy' },
  { id: 4, title: 'History of India', class: 'Class 9', subject: 'History', author: 'Romila Thapar' }
];

function Ebooks() {
  const [subject, setSubject] = useState('All');

  const filteredBooks = dummyEbooks.filter(b => subject === 'All' || b.subject === subject);

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '24px 32px 16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>E-Books Library</h1>
        <select value={subject} onChange={e => setSubject(e.target.value)} style={inputStyle}>
          <option value="All">All Subjects</option>
          <option value="Physics">Physics</option>
          <option value="Maths">Maths</option>
          <option value="English">English</option>
          <option value="History">History</option>
        </select>
      </div>

      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '24px' }}>
          {filteredBooks.map(book => (
            <div key={book.id} style={{ background: '#fff', borderRadius: '8px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: 80, height: 100, background: '#e0e7ff', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <FaBookOpen size={32} color="#4f46e5" />
              </div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: 16, color: '#1e293b' }}>{book.title}</h3>
              <p style={{ margin: '0 0 4px 0', fontSize: 13, color: '#64748b' }}>{book.author}</p>
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <span style={{ fontSize: 12, background: '#f1f5f9', padding: '4px 8px', borderRadius: 4, color: '#475569', fontWeight: 600 }}>{book.class}</span>
                <span style={{ fontSize: 12, background: '#f1f5f9', padding: '4px 8px', borderRadius: 4, color: '#475569', fontWeight: 600 }}>{book.subject}</span>
              </div>
              <button style={{ marginTop: 24, width: '100%', padding: '10px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <FaDownload size={12} /> Download PDF
              </button>
            </div>
          ))}
        </div>
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
