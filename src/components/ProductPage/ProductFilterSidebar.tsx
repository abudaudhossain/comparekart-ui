"use client";

import React, { useState, useEffect } from 'react';

interface FilterValues {
    minPrice?: number;
    maxPrice?: number;
    deliveryTimes: string[];
}

interface ProductFilterSidebarProps {
    onFilterChange: (filters: FilterValues) => void;
}

const predefinedPriceRanges = [
    { value: { min: 0, max: 6 }, label: "Under $6" },
    { value: { min: 6, max: 9 }, label: "$6 - $9" },
    { value: { min: 9, max: 13 }, label: "$9 - $13" },
    { value: { min: 13, max: null }, label: "From $13" }, // null = no upper limit

];

export default function ProductFilterSidebar({ onFilterChange }: ProductFilterSidebarProps) {
    const [minPrice, setMinPrice] = useState<number | undefined>();
    const [maxPrice, setMaxPrice] = useState<number | undefined>();
    const [selectedRangeLabel, setSelectedRangeLabel] = useState<string | null>(null);
    const [selectedDeliveryTimes, setSelectedDeliveryTimes] = useState<string[]>([]);

    const handleRangeSelect = (rangeLabel: string) => {
        const range = predefinedPriceRanges.find(r => r.label === rangeLabel);
        if (!range) return;

        setMinPrice(range.value.min);
        setMaxPrice(range.value.max ?? undefined);
        setSelectedRangeLabel(rangeLabel);
    };

    const handleCheckboxChange = (
        value: string,
        selectedItems: string[],
        setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
        if (selectedItems.includes(value)) {
            setSelectedItems(selectedItems.filter((item) => item !== value));
        } else {
            setSelectedItems([...selectedItems, value]);
        }
    };

    const handleFilterUpdate = () => {
        onFilterChange({
            minPrice,
            maxPrice,
            deliveryTimes: selectedDeliveryTimes,
        });
    };

    useEffect(() => {
        handleFilterUpdate();
    }, [minPrice, maxPrice, selectedDeliveryTimes]);

    return (
        <aside className="bg-[#e6eef6] p-6 rounded-lg shadow-md w-full max-w-xs">
            {/* Price Filter */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Price</h3>
                <div className="flex items-center space-x-3">
                    <div className="relative w-1/2">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500 text-sm">$</span>
                        <input
                            type="number"
                            value={minPrice ?? ""}
                            onChange={(e) => {
                                setMinPrice(e.target.value ? parseInt(e.target.value) : undefined);
                                setSelectedRangeLabel(null);
                            }}
                            className="pl-6 pr-2 py-2 w-full border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="0"
                        />
                    </div>

                    <span className="text-gray-500">-</span>
                    <div className="relative w-1/2">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500 text-sm">$</span>
                        <input
                            type="number"
                            value={maxPrice ?? ""}
                            onChange={(e) => {
                                setMaxPrice(e.target.value ? parseInt(e.target.value) : undefined);
                                setSelectedRangeLabel(null); // manual typing clears selected range
                            }}
                            className="pl-6 pr-2 py-2 w-full border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="91"
                        />
                    </div>


                </div>

                {/* Predefined Ranges */}
                <div className="mt-4 space-y-2 text-gray-700 text-sm">
                    {predefinedPriceRanges.map((range, i) => (
                        <label key={i} className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="radio"
                                name="priceRange"
                                checked={selectedRangeLabel === range.label}
                                onChange={() => handleRangeSelect(range.label)}
                                className="accent-blue-600"
                            />
                            <span className="flex items-center">
                                {range.label}
                                {range.label === "Top Deals" && (
                                    <span className="ml-1 bg-orange-500 text-white text-xs rounded-full px-2 py-0.5">%</span>
                                )}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Delivery Time Filter */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Delivery Time</h3>
                <div className="space-y-2 text-gray-700 text-sm">
                    {["Within 24 hours", "Within 3 days", "Within 7 days", "Anytime"].map((time) => (
                        <label key={time} className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedDeliveryTimes.includes(time)}
                                onChange={() => handleCheckboxChange(time, selectedDeliveryTimes, setSelectedDeliveryTimes)}
                                className="accent-blue-600"
                            />
                            <span>{time}</span>
                        </label>
                    ))}
                </div>
            </div>
        </aside>
    );
}
