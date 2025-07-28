"use client";
import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
// import { CustomTooltip } from './CustomTooltip';
import Offers from './Offers';
import { filterDataByRange } from '../../../../util/priceHistoryFilterDataByRange';
import { CustomTooltip } from './CustomTooltip';
// import { BellIcon } from '@heroicons/react/24/outline';

type PricePoint = {
  date: string;
  price: number;
};

type PriceHistoryGraphProps = {
  savingsAmount: number;
  savingsPercent: number;
  data: PricePoint[];
};
const ranges = ["3M", "6M", "1Y"] as const;
type RangeType = (typeof ranges)[number];
const PriceHistoryGraph: React.FC<PriceHistoryGraphProps> = ({
  savingsAmount,
  savingsPercent,
  data
}) => {
  const [prices, setPrices] = useState<PricePoint[]>([])
  const [range, setRange] = useState<RangeType>("3M");
  useEffect(() => {
    if (range == "3M") {
      setPrices(filterDataByRange(filterDataByRange(data), "3M"))
    } else if (range == "6M") {
      setPrices(filterDataByRange(filterDataByRange(data), "6M"))
    } else {
      setPrices(filterDataByRange(filterDataByRange(data), "1Y"))
    }
  }, [range, data])
  return (
    <div className="p-4 bg-white ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold">Price History</h2>
        <div className="space-x-2">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1 border rounded ${range === r ? "bg-blue-500 text-white" : "text-blue-500"
                }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full md:flex-1">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={prices} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <XAxis dataKey="date" hide />
            <YAxis hide />
            {/* <Tooltip /> */}
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#E55C00"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Savings summary & Price Alert section */}
      <div className="mt-4 lg:mt-0">
        {savingsAmount ? <Offers savingsAmount={savingsAmount} savingsPercent={savingsPercent} /> : (<p className='text-center mt-2 text-gray-500 bg-[#ebebeb]'>Price History</p>)}
        {/* <button className="mt-3 px-4 py-2 border border-blue-600 text-blue-600 rounded inline-flex items-center hover:bg-blue-50 cursor-pointer">
          <BellIcon className="h-5 w-5 mr-2" aria-hidden="true" />
          Set a Price Alert
        </button> */}
      </div>
    </div>
  );
};

export default PriceHistoryGraph;
