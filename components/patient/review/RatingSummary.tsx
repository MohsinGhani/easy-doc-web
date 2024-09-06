import { StarIcon } from "lucide-react";

const RatingSummary = ({ overallRating, ratingsBreakdown }) => {
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
          <div key={rating} className="flex items-center mb-1">
            <span className="text-sm mr-2">{rating}</span>
            <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="bg-yellow-500 h-full"
                style={{ width: `${ratingsBreakdown[rating]}%` }}
              ></div>
            </div>
            <span className="ml-2 text-sm">
              {ratingsBreakdown[rating].toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingSummary;
