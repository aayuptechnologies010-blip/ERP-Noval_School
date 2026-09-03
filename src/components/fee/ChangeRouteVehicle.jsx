import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const token = localStorage.getItem('token');

const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', outline: 'none' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' };

export default function ChangeRouteVehicle() {
  const [relations, setRelations] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  
  const [selectedRouteId, setSelectedRouteId] = useState('');
  const [currentRelation, setCurrentRelation] = useState(null);
  const [newVehicle, setNewVehicle] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const fetchAll = async () => {
    try {
      const [rRes, vRes] = await Promise.all([
        fetch(`${API_URL}/api/transport/route-relations`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_URL}/api/transport/vehicles`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      if (rRes.ok) setRelations(await rRes.json());
      if (vRes.ok) setVehicles(await vRes.json());
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchAll(); }, []);

  useEffect(() => {
    if (selectedRouteId) {
      const relation = relations.find(r => r.route?._id === selectedRouteId);
      setCurrentRelation(relation || null);
    } else {
      setCurrentRelation(null);
    }
  }, [selectedRouteId, relations]);

  const handleUpdate = async () => {
    if (!currentRelation) return setMessage({ type: 'error', text: 'No active relation found for this route.' });
    if (!newVehicle) return setMessage({ type: 'error', text: 'Please select a new vehicle.' });

    setLoading(true);
    try {
      const payload = {
        route: currentRelation.route._id,
        vehicle: newVehicle,
        driver: currentRelation.driver?._id || currentRelation.driver,
        status: currentRelation.status
      };
      
      const res = await fetch(`${API_URL}/api/transport/route-relations/${currentRelation._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: 'Vehicle changed successfully for the route.' });
        setSelectedRouteId('');
        setNewVehicle('');
        fetchAll();
      } else { setMessage({ type: 'error', text: data.message }); }
    } catch (err) { setMessage({ type: 'error', text: 'Server error' }); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ padding: '20px', background: '#f3f4f6', minHeight: '100%' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {message && <div style={{ padding: '10px', borderRadius: '4px', background: message.type === 'success' ? '#d1fae5' : '#fee2e2', color: message.type === 'success' ? '#065f46' : '#991b1b', fontSize: '13px' }}>{message.text}</div>}

        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#1f2937' }}>Change Route Vehicle</h3>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Select Route *</label>
            <select value={selectedRouteId} onChange={(e) => setSelectedRouteId(e.target.value)} style={inputStyle}>
              <option value="">Select Route</option>
              {Array.from(new Set(relations.filter(r => r.route).map(r => r.route._id))).map(routeId => {
                const r = relations.find(rel => rel.route._id === routeId);
                return <option key={routeId} value={routeId}>{r.route.routeName}</option>;
              })}
            </select>
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Current Vehicle</label>
              <input 
                value={currentRelation?.vehicle?.vehicleNo || 'Not Assigned'} 
                disabled 
                style={{ ...inputStyle, background: '#f3f4f6', color: '#6b7280' }} 
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>New Vehicle *</label>
              <select value={newVehicle} onChange={(e) => setNewVehicle(e.target.value)} style={inputStyle} disabled={!currentRelation}>
                <option value="">Select New Vehicle</option>
                {vehicles.map(v => <option key={v._id} value={v._id}>{v.vehicleNo} ({v.capacity} seats)</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <button onClick={handleUpdate} disabled={loading || !newVehicle} style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '9px 25px', borderRadius: '4px', fontSize: '13px', cursor: newVehicle ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', opacity: newVehicle ? 1 : 0.6 }}>
              <RefreshCw size={14} /> Update Vehicle
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
