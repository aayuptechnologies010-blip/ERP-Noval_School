import React from 'react';
import { Upload } from 'lucide-react';

export default function UploadStaffPhoto() {
  const staff = [
    { id: 1, name: 'REKHA GUPTA(Teacher)', father: 'PRADEEP GUPTA', img: '3.jpg' },
    { id: 2, name: 'SEEMA GIRI(Teacher)', father: 'RAMANAND GIRI', img: '5.jpg' },
    { id: 3, name: 'KIRAN YADAV(Teacher)', father: 'RAM VIJAY YADAV', img: '6.jpg' },
    { id: 4, name: 'ARPANA UPADHYAY(Teacher)', father: 'BANSHIDHAR UPADHYAY', img: '11.jpg' },
    { id: 5, name: 'PRIYANKA RAI(Teacher)', father: 'PAWAN KUMAR RAI', img: '12.jpg' },
    { id: 6, name: 'AMIT DUBEY(Teacher)', father: 'HARISHYAM DUBEY', img: '13.jpg' },
    { id: 7, name: 'WASEEM FIROJ(Teacher)', father: 'SHAFATULLAH ANSARI', img: '17.jpg' },
    { id: 8, name: 'AVANEESH KUMAR RAI(Manager)', father: 'SRI RAM RAI', img: '20.jpg' },
    { id: 9, name: 'GOLENDRA SINGH(Teacher)', father: 'DHRUPATI SINGH', img: '27.jpg' },
    { id: 10, name: 'SUSHIL KUMAR YADAV(Teacher)', father: 'KEDRA YADAV', img: '28.jpg' },
  ];

  return (
    <div className="mail-template-container">
      
      <div style={{ padding: '20px', borderBottom: '1px solid #dee2e6' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <label style={{ fontSize: '14px', color: '#333' }}>Select Staff</label>
          <select className="settings-input" style={{ width: '400px' }} defaultValue="None selected">
            <option value="None selected">None selected</option>
          </select>
        </div>
      </div>

      <div style={{ padding: '15px 20px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6', fontWeight: 'bold', color: '#495057', fontSize: '13px' }}>
        <span style={{ color: '#159BD7', marginRight: '5px' }}>✔</span> View Staff Photo
      </div>

      <div className="mail-table-wrapper" style={{ border: 'none', borderRadius: '0' }}>
        <table className="mail-table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>S.No.</th>
              <th>Name</th>
              <th>Fathername</th>
              <th style={{ width: '150px' }}>Image Name</th>
              <th style={{ width: '200px' }}>Upload Image</th>
              <th style={{ width: '80px', textAlign: 'center' }}>Show</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((row) => (
              <tr key={row.id} className={row.id % 2 === 0 ? 'row-even' : 'row-odd'} style={row.id === 8 ? { backgroundColor: '#d4edda' } : {}}>
                <td style={{ padding: '10px' }}>{row.id}</td>
                <td style={{ padding: '10px' }}>{row.name}</td>
                <td style={{ padding: '10px' }}>{row.father}</td>
                <td style={{ padding: '10px' }}>{row.img}</td>
                <td style={{ padding: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
                    <button style={{ backgroundColor: '#f8f9fa', border: '1px solid #ced4da', padding: '2px 8px', borderRadius: '2px', cursor: 'pointer' }}>Choose File</button>
                    <span style={{ color: '#6c757d' }}>No file chosen</span>
                  </div>
                </td>
                <td style={{ textAlign: 'center', padding: '5px' }}>
                  <div style={{ width: '30px', height: '30px', backgroundColor: '#e9ecef', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '10px', color: '#adb5bd' }}>Img</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', borderTop: '1px solid #dee2e6' }}>
        <button className="blue-btn" style={{ padding: '8px 25px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Upload size={16} /> Start upload
        </button>
      </div>

    </div>
  );
}
