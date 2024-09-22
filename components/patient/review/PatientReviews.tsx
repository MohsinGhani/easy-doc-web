// PatientReviews.tsx
import { useAppSelector } from "@/lib/hooks";
import { CardContent } from "../../ui/card";
import LeaveReviewDialog from "./LeaveReviewDialog";
import RatingSummary from "./RatingSummary";
import ReviewItem from "./ReviewItem";
import { Loader } from "@/components/common/Loader";
import { calculateRatingsData } from "@/lib/utils";

interface PatientReviewsProps {
  reviews: Review[];
  doctorId: string;
  overallRating: number;
  ratingsBreakdownPercentages: { [key: number]: number };
}

const PatientReviews: React.FC<PatientReviewsProps> = ({
  reviews,
  doctorId,
  overallRating,
  ratingsBreakdownPercentages,
}) => {
  const { loading } = useAppSelector((state) => state.doctor);
  const userId = useAppSelector((state) => state.auth.user?.userId);

  if (loading) return <Loader />;

  const hasUserReviewed = reviews.some((review) => review.patientId === userId);

  return (
    <div className="bg-background p-6 rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Patient Reviews:</h2>
        {/* Conditionally show LeaveReviewDialog only if user has not reviewed */}
        {!hasUserReviewed && <LeaveReviewDialog doctorId={doctorId} />}
      </div>

      <CardContent className="mt-6">
        {/* Rating Summary */}
        {reviews.length > 0 ? (
          <>
            <RatingSummary
              overallRating={overallRating}
              ratingsBreakdown={ratingsBreakdownPercentages}
            />
            <div className="mt-6 space-y-4">
              {/* Render individual reviews */}
              {reviews.map((review, index) => (
                <ReviewItem
                  key={index}
                  name={review.name}
                  createdAt={review.createdAt}
                  rating={review.rating}
                  comment={review.comment}
                />
              ))}
            </div>{" "}
          </>
        ) : (
          <p className="text-muted-foreground text-center">
            No reviews found. Add one now!
          </p>
        )}
      </CardContent>
    </div>
  );
};

export default PatientReviews;
