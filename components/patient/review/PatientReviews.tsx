import { useAppSelector } from "@/lib/hooks";
import { CardContent } from "../../ui/card";
import LeaveReviewDialog from "./LeaveReviewDialog";
import RatingSummary from "./RatingSummary"; // Import RatingSummary component
import ReviewItem from "./ReviewItem"; // Import ReviewItem component
import { Loader } from "@/components/common/Loader";

interface PatientReviewsProps {
  reviews: Review[];
  doctorId: string;
}

const PatientReviews: React.FC<PatientReviewsProps> = ({
  reviews,
  doctorId,
}) => {
  const { loading } = useAppSelector((state) => state.doctor);
  const userId = useAppSelector((state) => state.auth.user?.userId);

  if (loading) return <Loader />;

  // Calculate the overall rating dynamically from reviews
  const totalRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) || 0;
  const totalReviews = reviews.length || 0;
  const overallRating =
    totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : "0";

  // Calculate the ratings breakdown based on the fetchedDoctor reviews
  const ratingsBreakdown = reviews.reduce(
    (acc: { [key: number]: number }, review) => {
      acc[review.rating] += 1; // Increment the count for the corresponding rating
      return acc;
    },
    { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } // Initial value with all counts set to 0
  );

  // Convert counts to percentages if there are any reviews
  const ratingsBreakdownPercentages = totalReviews
    ? Object.keys(ratingsBreakdown).reduce(
        (acc: { [key: number]: number }, rating) => {
          acc[Number(rating)] =
            (ratingsBreakdown[Number(rating)] / totalReviews) * 100;
          return acc;
        },
        { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      )
    : { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  const hasUserReviewed = reviews.some((review) => review.patientId === userId);

  return (
    <div className="bg-background p-6 rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Patient Reviews:</h2>
        {/* Conditionally show LeaveReviewDialog only if user has not reviewed */}
        {!hasUserReviewed && <LeaveReviewDialog doctorId={doctorId} />}
      </div>

      <CardContent>
        {/* Rating Summary */}
        <RatingSummary
          overallRating={Number(overallRating)} // Convert overallRating to a number
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
        </div>
      </CardContent>
    </div>
  );
};

export default PatientReviews;
