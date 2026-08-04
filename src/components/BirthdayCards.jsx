import React from 'react';
import { FaBirthdayCake } from 'react-icons/fa';

function BirthdayCards() {
  const cards = [
    { title: 'Colleagues Birthdays', count: '0' },
    { title: 'Upcoming Birthdays', count: '1' },
    { title: 'Students Birthdays', count: '3' },
    { title: 'Upcoming Birthdays', count: '28' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex items-center justify-between hover:shadow-md transition">
          <div>
            <div className="text-gray-500 font-medium text-sm mb-1">{card.title}</div>
            <div className="text-2xl font-extrabold text-gray-800">{card.count}</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-orange-400 flex items-center justify-center text-2xl flex-shrink-0">
            <FaBirthdayCake />
          </div>
        </div>
      ))}
    </div>
  );
}

export default BirthdayCards;
