import { StarIcon } from "lucide-react";

interface RatingSummaryProps {
  overallRating: number;
  ratingsBreakdown: { [rating: number]: number }; // Example: { 5: 100, 4: 20, 3: 50, 2: 10, 1: 0 }
}

const RatingSummary = ({
  overallRating,
  ratingsBreakdown,
}: RatingSummaryProps) => {
  return (
    <div className="flex items-center justify-between">
      {/* Overall Rating */}
      <div className="flex items-center space-x-2">
        <span className="text-5xl font-bold">{overallRating}</span>
        <StarIcon className="w-10 h-10 text-yellow-500" />
      </div>

      {/* Rating Breakdown */}
      <div className="w-full ml-6">
        {Object.keys(ratingsBreakdown).map((rating) => (
          <div key={Number(rating)} className="flex items-center mb-1">
            <span className="text-sm mr-2">{rating}</span>
            <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="bg-yellow-500 h-full"
                style={{ width: `${ratingsBreakdown[Number(rating)]}%` }}
              />
            </div>
            <span className="ml-2 text-sm">
              {ratingsBreakdown[Number(rating)].toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingSummary;
