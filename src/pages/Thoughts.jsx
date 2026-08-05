import React, { useState } from 'react';
import { FaQuoteLeft, FaPlus, FaTrash, FaTimes } from 'react-icons/fa';

const dummyData = [
  { id: 1, author: 'Mahatma Gandhi', content: 'Be the change that you wish to see in the world.', date: '2023-10-01' },
  { id: 2, author: 'Dr. A.P.J. Abdul Kalam', content: 'Dream, dream, dream. Dreams transform into thoughts and thoughts result in action.', date: '2023-10-02' },
  { id: 3, author: 'Albert Einstein', content: 'Imagination is more important than knowledge.', date: '2023-10-03' },
];

function Thoughts() {
  const [thoughts, setThoughts] = useState(dummyData);
  const [showModal, setShowModal] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newContent, setNewContent] = useState('');

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this thought?')) {
      setThoughts(thoughts.filter(t => t.id !== id));
    }
  };

  const handleCreateNew = (e) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newContent.trim()) return alert('Please enter both author and thought content');
    
    const newThought = {
      id: Date.now(),
      author: newAuthor,
      content: newContent,
      date: new Date().toISOString().split('T')[0],
    };
    
    setThoughts([newThought, ...thoughts]);
    setShowModal(false);
    setNewAuthor('');
    setNewContent('');
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header */}
      <div style={{ padding: '24px 32px 16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Thought of the Day</h1>
        <button 
          onClick={() => setShowModal(true)}
          style={{ background: '#5cb85c', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <FaPlus size={12} /> Add New Thought
        </button>
      </div>

      {/* Main Content */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {thoughts.map((t) => (
            <div key={t.id} style={{ background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 16, right: 16 }}>
                <button 
                  onClick={() => handleDelete(t.id)} 
                  style={{ background: '#fee2e2', border: 'none', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#ef4444' }}
                  title="Delete"
                >
                  <FaTrash size={12} />
                </button>
              </div>
              <FaQuoteLeft size={24} color="#e2e8f0" style={{ marginBottom: 16 }} />
              <p style={{ margin: '0 0 16px 0', fontSize: 15, color: '#334155', fontStyle: 'italic', lineHeight: 1.6 }}>"{t.content}"</p>
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, color: '#1e293b', fontSize: 14 }}>- {t.author}</span>
                <span style={{ fontSize: 12, color: '#94a3b8' }}>{t.date}</span>
              </div>
            </div>
          ))}
          {thoughts.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 48, color: '#94a3b8' }}>
              No thoughts available.
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: 32, borderRadius: 8, width: 500, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontSize: 18, color: '#1e293b' }}>Add New Thought</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><FaTimes size={16} color="#64748b" /></button>
            </div>
            <form onSubmit={handleCreateNew} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 600, color: '#475569' }}>Author / Speaker</label>
                <input 
                  type="text" 
                  value={newAuthor}
                  onChange={e => setNewAuthor(e.target.value)}
                  placeholder="e.g. Swami Vivekananda" 
                  style={{ width: '100%', padding: 10, borderRadius: 4, border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 600, color: '#475569' }}>Thought Content</label>
                <textarea 
                  value={newContent}
                  onChange={e => setNewContent(e.target.value)}
                  placeholder="Enter the thought or quote..." 
                  rows={4}
                  style={{ width: '100%', padding: 10, borderRadius: 4, border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
                  required
                />
              </div>
              <button type="submit" style={{ marginTop: 16, background: '#3b82f6', color: '#fff', border: 'none', padding: 12, borderRadius: 4, fontWeight: 600, cursor: 'pointer' }}>
                Publish Thought
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Thoughts;
