'use client';

import { Info, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface DiscountBadgeWithInfoProps {
  discount: number;
}

const DiscountBadgeWithInfo: React.FC<DiscountBadgeWithInfoProps> = ({ discount }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close tooltip on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowTooltip(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  return (
    <div className="relative w-fit" ref={wrapperRef}>
      {/* Badge */}
      <div className="flex items-center bg-orange-500 text-white text-sm font-bold px-2 py-1 rounded-tr-xl rounded-bl-xl">
        <span>-{discount}&nbsp;%</span>
        <button
          className="bg-white text-orange-500 rounded-sm ml-1 p-0.5"
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            setShowTooltip((prev) => !prev)
          }}
        >
          <Info size={14} />
        </button>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()

        }} className="absolute left-4 top-full mt-2 bg-white text-black text-sm rounded shadow-lg p-3 w-64 border border-gray-200 overflow-">
          <div className="flex justify-between items-start">
            <p>Saving compared to the average of the lowest daily prices over the last 90 days.</p>
            <button
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                setShowTooltip(false)
              }}
              className="text-gray-500 hover:text-gray-800 ml-2"
            >
              <X size={16} />
            </button>
          </div>
          <div className="absolute -bottom-1 left-0 w-full h-1 bg-orange-500 rounded-b"></div>
        </div>
      )}
    </div>
  );
};

export default DiscountBadgeWithInfo;
