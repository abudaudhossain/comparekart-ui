import { Star, StarHalf, } from "lucide-react";

type RatingProps = {
  rating: number; // e.g., 4.5
  ratingCount: number;
};

const Rating: React.FC<RatingProps> = ({ rating, ratingCount }) => {

  const value = rating ? rating : 0;
  const fullStars = Math.floor(value);
  const hasHalf = value % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
  //console.log(rating)
  if (rating > 5)
    return <span className=" flex items-center justify-center bg-[#b8bdc2] font-medium text-xs px-2 h-6 rounded-full text-black">invalid</span>

  return (
    <div className={`flex items-center justify-center bg-[#b8bdc2] font-medium text-xs px-2 h-6 rounded-full text-black`}>
      {/* <div className="flex items-center justify-center"> */}
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="fill-black stroke-black w-2 h-2" />
      ))}

      {hasHalf && <StarHalf className="fill-black stroke-[black] w-2 h-2" />}

      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-2 h-2 text-[#0f3272]" />
      ))}

      {ratingCount > 0 && (
        <span className="ml-1 text-gray-600 text-[12px] font-normal">{ratingCount}</span>
      )}
      {/* </div> */}
    </div>
  );
};

export default Rating;
