import React from 'react';
import { FileText, User, CreditCard, HandCoins, BookOpen, GraduationCap, Laptop } from 'lucide-react';

const SessionTransfer = ({ openTab }) => {
  const cards = [
    {
      id: 1,
      title: 'Account Manager',
      icon: (
        <div style={{ position: 'relative', width: 64, height: 64 }}>
          <FileText size={48} strokeWidth={1} color="#374151" style={{ position: 'absolute', top: 4, left: 4 }} />
          <User size={32} strokeWidth={1} color="#29a9d8" style={{ position: 'absolute', bottom: 4, right: 4, background: '#fff', borderRadius: '50%' }} />
        </div>
      )
    },
    {
      id: 2,
      title: 'Fee Manager',
      icon: (
        <div style={{ position: 'relative', width: 64, height: 64 }}>
          <Laptop size={48} strokeWidth={1} color="#374151" style={{ position: 'absolute', top: 4, left: 4 }} />
          <CreditCard size={28} strokeWidth={1} color="#29a9d8" style={{ position: 'absolute', bottom: 12, right: 0, transform: 'rotate(-15deg)', background: '#fff' }} />
        </div>
      )
    },
    {
      id: 3,
      title: 'Payroll Manager',
      icon: (
        <div style={{ position: 'relative', width: 64, height: 64 }}>
          <FileText size={48} strokeWidth={1} color="#374151" style={{ position: 'absolute', top: 4, left: 4 }} />
          <HandCoins size={32} strokeWidth={1} color="#29a9d8" style={{ position: 'absolute', bottom: 4, right: 4, background: '#fff' }} />
        </div>
      )
    },
    {
      id: 4,
      title: 'Admission Manager',
      icon: (
        <div style={{ position: 'relative', width: 64, height: 64 }}>
          <BookOpen size={48} strokeWidth={1} color="#374151" style={{ position: 'absolute', bottom: 4, left: 8 }} />
          <GraduationCap size={36} strokeWidth={1} color="#29a9d8" style={{ position: 'absolute', top: 0, right: 4, background: '#fff' }} />
        </div>
      )
    }
  ];

  return (
    <div style={{ padding: '40px', display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'flex-start', background: '#fff', minHeight: '100%' }}>
      {cards.map(card => (
        <div 
          key={card.id}
          onClick={() => {
            if (card.title === 'Account Manager' && openTab) {
              openTab('Account Manager Session transfer');
            }
            if (card.title === 'Fee Manager' && openTab) {
              openTab('Fees Manager Session transfer');
            }
            if (card.title === 'Payroll Manager' && openTab) {
              openTab('Payroll Manager Session transfer');
            }
            if (card.title === 'Admission Manager' && openTab) {
              openTab('Admission Manager Session transfer');
            }
          }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '180px',
            height: '180px',
            background: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            border: '1px solid #f1f5f9',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.08)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
          }}
        >
          <div style={{ marginBottom: '16px' }}>
            {card.icon}
          </div>
          <span style={{ fontSize: '14px', fontWeight: 500, color: '#475569' }}>
            {card.title}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SessionTransfer;
