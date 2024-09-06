import { StarIcon } from "lucide-react";

const ReviewItem = ({ name, date, rating, comment }) => {
  return (
    <div className="border-t py-4">
      <div className="flex items-center justify-between text-sm mb-2">
        <span>{date}</span>
      </div>
      <div className="flex items-center mb-2">
        <div className="flex items-center">
          {/* Display Stars */}
          {[...Array(5)].map((_, index) => (
            <StarIcon
              key={index}
              className={`w-5 h-5 ${
                index < rating ? "text-yellow-500" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <p className="ml-3 font-medium">{name}</p>
      </div>
      <p className="text-sm text-muted-foreground">{comment}</p>
    </div>
  );
};

export default ReviewItem;
