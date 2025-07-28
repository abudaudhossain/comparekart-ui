
import React, { useState, useEffect, useRef } from 'react';

type OfferPriceProps = {
    savingsAmount: number;
    savingsPercent: number;
};

const Offers: React.FC<OfferPriceProps> = ({ savingsAmount, savingsPercent }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div ref={dropdownRef} className="relative w-full">
            <button
                onClick={toggleDropdown}
                className={`bg-[#eeeeee] px-2 py-2.5 w-full shadow border ${isOpen && 'border-b-0 shadow-none'}`}
            >
                <p className="text-sm text-[#787878]">
                    Today, your well save: 
                    <span className="ml-1 font-bold text-green-600">
                        £{savingsAmount.toFixed(2)} (-{savingsPercent}%)
                       
                    </span>
                </p>
            </button>
            <div
                className={`absolute right-0 mt-0 w-full flex-col ${isOpen ? 'block' : 'hidden'
                    } bg-white border border-t-0 px-4 pt-1 pb-3.5`}
            >
                <div className="text-left text-[12px] text-[#787878]">
                    <p className="font-normal pt-2">
                        instead of:
                        <br />
                        <span className="font-bold line-through text-black mr-1">$234 </span> Average cheapest price in the last 90 days
                    </p>
                    <p className="mt-2">Price: </p>
                    <h4 className="text-base  text-[#f60]">
                        <span className='text-base md:text-xl'>$2323</span> Cheapest price
                    </h4>
                </div>
            </div>
        </div>
    );
};

export default Offers;
