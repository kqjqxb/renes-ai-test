import React, { useState } from 'react';

const Dropdown = ({ options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const handleSelect = (option) => {
      onChange(option);
      setIsOpen(false);
    };
  
    return (
      <div className="relative inline-block">
        <div 
          className="bg-purple-200 text-black text-center items-center text-xs rounded-lg px-2 py-1 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          style={{ width: '50px' }}
        >
          {value}
        </div>
        {isOpen && (
          <div className="absolute z-10 bg-white border border-gray-200 rounded-md shadow-lg">
            {options.map((option, index) => (
              <div
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  

export default Dropdown;
