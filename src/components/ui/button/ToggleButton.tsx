// components/ToggleButton.tsx
import React from 'react';

interface ToggleButtonProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ checked, onChange, label }) => {
  return (
    <div className="flex items-center space-x-2">
      {label && <span className="text-gray-700">{label}</span>}
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
          checked ? 'bg-blue-600' : 'bg-gray-300'
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
            checked ? 'translate-x-6' : ''
          }`}
        />
      </button>
    </div>
  );
};

export default ToggleButton;
