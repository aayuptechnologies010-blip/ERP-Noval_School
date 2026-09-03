import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Label,
} from 'recharts';
import { ChevronDown } from 'lucide-react';

const TABS = ["TODAY'S", 'LAST 7 DAYS', 'LAST 30 DAYS'];
const STANDARDS = ['NUR','LKG','UKG','1','2','3','4','5','6','7','8','9','10','11','12'];

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function CollectionSummaryCard() {
  const [tab, setTab] = useState("TODAY'S");
  const [data, setData] = useState(STANDARDS.map(s => ({ standard: s, amount: 0 })));
  const [total, setTotal] = useState(0);
  const [paymentModes, setPaymentModes] = useState([]);
  
  const filterMap = {
    "TODAY'S": 'today',
    'LAST 7 DAYS': '7days',
    'LAST 30 DAYS': '30days'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/api/fee-reports/dashboard/collection-summary?filter=${filterMap[tab]}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const result = await res.json();
        if (res.ok) {
          const formattedData = STANDARDS.map(std => {
            const found = result.standardWise?.find(r => r.standard === std);
            return { standard: std, amount: found ? found.amount : 0 };
          });
          setData(formattedData);
          setTotal(formattedData.reduce((acc, curr) => acc + curr.amount, 0));
          setPaymentModes(result.paymentModes || []);
        }
      } catch (error) {
        console.error('Failed to fetch collection summary', error);
      }
    };
    fetchData();
  }, [tab]);

  const bankAmount = paymentModes.find(m => ['Bank', 'Cheque', 'Demand Draft'].includes(m._id))?.amount || 0;
  const bankTrans = paymentModes.find(m => ['Bank', 'Cheque', 'Demand Draft'].includes(m._id))?.transactions || 0;
  const onlineAmount = paymentModes.find(m => ['Online', 'UPI', 'Card'].includes(m._id))?.amount || 0;
  const onlineTrans = paymentModes.find(m => ['Online', 'UPI', 'Card'].includes(m._id))?.transactions || 0;
  const cashAmount = paymentModes.find(m => ['Cash', 'Manual'].includes(m._id))?.amount || 0;
  const cashTrans = paymentModes.find(m => ['Cash', 'Manual'].includes(m._id))?.transactions || 0;
  const totalTrans = paymentModes.reduce((acc, curr) => acc + curr.transactions, 0);

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
      {/* ── Header ── */}
      <div style={{
        padding: '10px 20px',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        flexWrap: 'wrap',
      }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', textTransform: 'uppercase', letterSpacing: 0.3, whiteSpace: 'nowrap' }}>
          Collection Summary (Standard Wise)
        </span>
        <div style={{ display: 'flex' }}>
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: '5px 16px',
                fontSize: 11,
                fontWeight: 600,
                border: '1px solid #cbd5e1',
                borderRight: t !== 'LAST 30 DAYS' ? 'none' : '1px solid #cbd5e1',
                background: tab === t ? '#29a9d8' : '#f1f5f9',
                color: tab === t ? '#fff' : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.15s',
                whiteSpace: 'nowrap',
              }}
            >
              {t}
            </button>
          ))}
        </div>
        <div style={{ marginLeft: 'auto', border: '1px solid #e2e8f0', minWidth: 340 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '7px 14px', borderBottom: '1px solid #e2e8f0', background: '#fff',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>Total Collection</span>
              <ChevronDown size={13} color="#64748b" />
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>₹{total.toLocaleString('en-IN')}.00</span>
          </div>
          {[
            { label: 'School/Cash (Amt./Trans.)', val: `₹${cashAmount.toLocaleString('en-IN')}.00 / ${cashTrans}` },
            { label: 'Bank (Amt./Trans.)',   val: `₹${bankAmount.toLocaleString('en-IN')}.00 / ${bankTrans}` },
            { label: 'Online (Amt./Trans.)', val: `₹${onlineAmount.toLocaleString('en-IN')}.00 / ${onlineTrans}` },
          ].map(row => (
            <div key={row.label} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '5px 14px', borderBottom: '1px solid #f1f5f9',
            }}>
              <span style={{ fontSize: 11, color: '#64748b' }}>{row.label}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#374151' }}>{row.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ padding: '16px 20px 20px 20px' }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: '#1e293b', marginBottom: 2 }}>
          Total : ₹ {total.toLocaleString('en-IN')}
        </div>
        <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 16 }}>As on {new Date().toLocaleDateString('en-IN')}</div>

        <div style={{ height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 45 }} barCategoryGap="40%">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="standard" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} interval={0}>
                <Label value="STANDARD" position="insideBottom" offset={-14} style={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600, letterSpacing: 1 }} />
              </XAxis>
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={60}>
                <Label value="AMOUNT (₹)" angle={-90} position="insideLeft" offset={10} style={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600, letterSpacing: 1 }} />
              </YAxis>
              <Tooltip formatter={(v) => `₹ ${v.toLocaleString('en-IN')}`} />
              <Bar dataKey="amount" fill="#29a9d8" radius={[2,2,0,0]} maxBarSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
