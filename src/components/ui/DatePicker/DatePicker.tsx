import { useState, useRef } from 'react';
import { format } from 'date-fns';
import { DayPicker, DateRange } from 'react-day-picker';
import { Popover } from '@headlessui/react';
import 'react-day-picker/dist/style.css';

type Props = {
    range: DateRange | undefined;
    onChange: (range: DateRange | undefined) => void;
};
export default function DatePicker({ range, onChange }: Props) {

    const buttonRef = useRef(null);

    const getLabel = () => {
        if (range?.from && range?.to) {
            return `From: ${format(range.from, 'PPP')} - To: ${format(range.to, 'PPP')}`;
        }
        return 'Select date';
    };

    const clearDates = () => {
        onChange(undefined);
    };

    return (
        <div className="relative max-w-sm">
            <Popover className="relative">
                {({ close }) => (
                    <>
                        <Popover.Button
                            ref={buttonRef}
                            className="w-full px-4 py-2 text-left text-[#667085] bg-white border border-gray-300 rounded-sm shadow-sm hover:bg-gray-50 focus:outline-none"
                        >
                            {getLabel()}
                        </Popover.Button>

                        <Popover.Panel className="absolute z-999 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg">
                            <div className="p-3 ">
                                <DayPicker
                                    mode="range"
                                    selected={range}
                                    onSelect={onChange}
                                    numberOfMonths={1}
                                    initialFocus
                                    modifiersClassNames={{
                                        selected: 'bg-blue-600 text-white',
                                        range_start: 'bg-blue-600 text-white',
                                        range_end: 'bg-blue-600 text-white',
                                        range_middle: 'bg-blue-100 text-blue-800',
                                        today: 'text-blue-500 font-bold',
                                    }}
                                />

                                <div className="mt-4 flex justify-between items-center">
                                    <button
                                        onClick={clearDates}
                                        className="text-sm text-red-500 hover:underline"
                                    >
                                        Clear
                                    </button>
                                    <button
                                        onClick={close}
                                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        Done
                                    </button>
                                </div>
                            </div>
                        </Popover.Panel>
                    </>
                )}
            </Popover>
        </div>
    );
}
