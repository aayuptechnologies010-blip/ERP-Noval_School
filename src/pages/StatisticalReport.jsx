import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { FaUserGraduate, FaUserTie, FaBus, FaMale, FaFemale, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const studentData = [
  { name: 'Boys', value: 780, color: '#f59e0b', icon: FaMale },
  { name: 'Girls', value: 452, color: '#3b82f6', icon: FaFemale },
];
const studentTotal = 1232;

const staffData = [
  { name: 'Teaching', value: 85, color: '#10b981' },
  { name: 'Non-Teaching', value: 35, color: '#8b5cf6' },
];
const staffTotal = 120;

const transportData = [
  { name: 'Active', value: 420, color: '#16a34a' },
  { name: 'Inactive', value: 15, color: '#ef4444' },
];
const transportTotal = 435;

function StatisticalReport() {
  const [activeTab, setActiveTab] = useState('Student');

  const renderData = () => {
    switch (activeTab) {
      case 'Staff': return { data: staffData, total: staffTotal };
      case 'Transport': return { data: transportData, total: transportTotal };
      case 'Student':
      default: return { data: studentData, total: studentTotal };
    }
  };

  const currentData = renderData();

  return (
    <div style={{ flex: 1, background: '#f4f6f9', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', minHeight: '100vh', boxSizing: 'border-box' }}>
      
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', margin: 0 }}>Statistical Report</h1>
        <p style={{ color: '#64748b', fontSize: 14, margin: '4px 0 0' }}>Comprehensive overview of school statistics</p>
      </div>

      <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', flex: 1 }}>
        
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 12, borderBottom: '2px solid #f1f5f9', paddingBottom: 16, marginBottom: 32 }}>
          {[
            { id: 'Student', icon: FaUserGraduate, label: 'Student' },
            { id: 'Staff', icon: FaUserTie, label: 'Staff' },
            { id: 'Transport', icon: FaBus, label: 'Transport' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 24px',
                borderRadius: 8,
                background: activeTab === tab.id ? '#10b981' : 'transparent',
                color: activeTab === tab.id ? '#fff' : '#64748b',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 14,
                transition: 'all 0.2s ease',
              }}
            >
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center', flex: 1 }}>
          
          {/* Chart Area */}
          <div style={{ position: 'relative', height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={currentData.data}
                  cx="50%"
                  cy="50%"
                  innerRadius={100}
                  outerRadius={140}
                  paddingAngle={5}
                  dataKey="value"
                  labelLine={false}
                >
                  {currentData.data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value} (${((value / currentData.total) * 100).toFixed(1)}%)`, name]}
                  contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center Text */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <p style={{ margin: 0, color: '#f59e0b', fontSize: 16, fontWeight: 600 }}>Total</p>
              <h2 style={{ margin: 0, color: '#1e293b', fontSize: 32, fontWeight: 800 }}>{currentData.total}</h2>
            </div>
          </div>

          {/* Details Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {currentData.data.map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', background: '#f8fafc', borderRadius: 12, borderLeft: `6px solid ${item.color}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: `${item.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.icon ? <item.icon size={24} color={item.color} /> : <div style={{ width: 16, height: 16, borderRadius: '50%', background: item.color }} />}
                  </div>
                  <h3 style={{ margin: 0, fontSize: 18, color: '#334155', fontWeight: 600 }}>{item.name}</h3>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <h2 style={{ margin: 0, fontSize: 24, color: '#0f172a', fontWeight: 800 }}>{item.value}</h2>
                  <p style={{ margin: '4px 0 0', fontSize: 14, color: '#64748b', fontWeight: 500 }}>{((item.value / currentData.total) * 100).toFixed(2)}%</p>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default StatisticalReport;
