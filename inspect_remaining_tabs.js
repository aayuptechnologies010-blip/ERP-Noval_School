import fs from 'fs';

const content = fs.readFileSync('panel/src/layouts/AdmissionLayout.jsx', 'utf8');
const lines = content.split('\n');

const list = [
  { name: 'Student Document Details', start: 19180, end: 19383 },
  { name: 'Class Wise Admission report', start: 19383, end: 19611 },
  { name: 'Student Repeater list', start: 19611, end: 19772 },
  { name: 'Verification Admission Form', start: 19772, end: 19924 },
  { name: 'Admission Withdrawal Register', start: 19924, end: 20070 },
  { name: 'Challan Amount Collection Report', start: 20070, end: 20184 },
  { name: 'Total Collection Report Student Wise', start: 20184, end: 20301 },
  { name: 'Manual List Generation Report', start: 20301, end: 20418 },
  { name: 'Student Modification History Report', start: 20418, end: 20502 },
  { name: 'Certificates History', start: 20502, end: 20650 }
];

list.forEach(item => {
  console.log(`=== ${item.name} (${item.start}-${item.end}) ===`);
  const slice = lines.slice(item.start - 1, item.end);
  const tbodyStart = slice.findIndex(l => l.includes('<tbody>') || l.includes('No record') || l.includes('No Record'));
  if (tbodyStart !== -1) {
    console.log(slice.slice(tbodyStart - 2, tbodyStart + 25).join('\n'));
  } else {
    console.log('No tbody found in slice');
  }
});
