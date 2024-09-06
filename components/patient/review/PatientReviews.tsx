import { CardContent } from "../../ui/card";
import LeaveReviewDialog from "./LeaveReviewDialog";
import RatingSummary from "./RatingSummary"; // Import RatingSummary component
import ReviewItem from "./ReviewItem"; // Import ReviewItem component

interface PatientReviewsProps {
  reviews: Review[];
  doctorId: string;
}

const PatientReviews: React.FC<PatientReviewsProps> = ({ reviews, doctorId }) => {
  // Mock data for the overall rating and breakdown
  const overallRating = 5.0;
  const ratingsBreakdown = {
    5: 100.0,
    4: 0.0,
    3: 0.0,
    2: 0.0,
    1: 0.0,
  };

  return (
    <div className="bg-background p-6 rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Patient Reviews:</h2>
        <LeaveReviewDialog doctorId={doctorId} />
      </div>

      <CardContent>
        {/* Rating Summary */}
        <RatingSummary
          overallRating={overallRating}
          ratingsBreakdown={ratingsBreakdown}
        />

        <div className="mt-6 space-y-4">
          {/* Render individual reviews */}
          {reviews.map((review, index) => (
            <ReviewItem
              key={index}
              name={review.name}
              date={review.date}
              rating={review.rating}
              comment={review.comment}
            />
          ))}
        </div>
      </CardContent>
    </div>
  );
};

export default PatientReviews;
