import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

export default function MultiSelect({ options, selected, onChange, placeholder = "None selected" }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (val) => {
    if (selected.includes(val)) {
      onChange(selected.filter(v => v !== val));
    } else {
      onChange([...selected, val]);
    }
  };

  const displayText = selected.length > 0 ? selected.join(', ') : placeholder;

  return (
    <div className="erp-multiselect" ref={containerRef}>
      <div className="erp-multiselect-toggle" onClick={handleToggle}>
        <span style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', paddingRight: '10px' }}>
          {displayText}
        </span>
        <span style={{ fontSize: '10px' }}>▼</span>
      </div>
      {isOpen && (
        <div className="erp-multiselect-dropdown">
          {options.map(opt => (
            <label key={opt.value} className="erp-multiselect-option">
              <input
                type="checkbox"
                checked={selected.includes(opt.value)}
                onChange={() => handleCheckboxChange(opt.value)}
              />
              {opt.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
