"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

interface ClicksBarChartProps {
    data: {
        month: string;
        monthName: string;
        totalClick: number;
        countedClick: number;
        ValidClickCount: number;
        blockedCountClick: number;
    }[];
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const { month, totalClick, countedClick, ValidClickCount, blockedCountClick, monthName } = payload[0].payload;
        const year = month.split("-")[0];

        return (
            <div className="bg-white p-4 rounded-md shadow-md border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                <p className="text-sm font-semibold mb-2"> {monthName}-{year}</p>
                <p className="text-xs">Total Clicks: {totalClick}</p>
                <p className="text-xs">Counted Clicks: {countedClick}</p>
                {/* <p className="text-xs">Valid Clicks: {ValidClickCount}</p> */}
                <p className="text-xs">Blocked Clicks: {blockedCountClick}</p>
            </div>
        );
    }

    return null;
};

export default function ClicksBarChart({ data }: ClicksBarChartProps) {
    const sortedData = [...data].sort((a, b) => a.month.localeCompare(b.month));

    return (
        <div className="rounded-2xl border border-gray-300 bg-gradient-to-b from-white to-gray-100 p-6 shadow-md dark:border-gray-700 dark:from-gray-900 dark:to-gray-800 w-full overflow-x-auto">
            <div className="w-full h-[400px] min-w-[700px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sortedData} margin={{ top: 30, right: 30, left: 20, bottom: 50 }}>
                        <CartesianGrid strokeDasharray="4 4" strokeOpacity={0.5} />
                        <XAxis dataKey="monthName" interval={0} angle={-30} dy={10} tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ paddingTop: "10px" }} />
                        <Bar dataKey="countedClick" stackId="a" fill="#6366f1" name="Counted Clicks" />
                        {/* <Bar dataKey="ValidClickCount" stackId="a" fill="#22c55e" name="Valid Clicks" /> */}
                        <Bar dataKey="blockedCountClick" stackId="a" fill="#facc15" name="Blocked Clicks" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
