import React from 'react';

export default function ProgressBar({ value, color = 'bg-blue-500', trackColor = 'bg-gray-200', height = 'h-2' }) {
  return (
    <div className={`w-full ${trackColor} rounded-full ${height} overflow-hidden`}>
      <div
        className={`${color} ${height} rounded-full transition-all duration-500`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
