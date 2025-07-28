import { TooltipProps } from 'recharts';
import { format } from 'date-fns'


export const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length > 0) {
    const rawDate = label as string;
    const price = payload[0].value;

    const formattedDate = format(new Date(rawDate), "d MMMM yyyy"); // → 1 March 2025

    return (
      <div className="bg-white border p-2 rounded shadow text-sm">
        <p className="font-semibold">{formattedDate}</p>
        <p className="text-blue-600">£{price?.toFixed(2)} </p>
      </div>
    );
  }

  return null;
};
