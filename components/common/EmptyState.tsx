import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  image?: string; // URL to the image or icon
  minHeight?: string; // Minimum height of the component (default: "50vh")
  buttonText?: string; // Text for the Go Back button
  onButtonClick?: () => void; // Optional click handler for the Go Back button
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Nothing to show here", // Default title
  subtitle = "It seems we couldn't find any data to display right now. You can try refreshing the page or come back later.", // Default subtitle
  image,
  minHeight = "50vh",
  buttonText = "Go Back", // Default Go Back button text
  onButtonClick, // Optional click handler for Go Back button
}) => {
  const router = useRouter();

  // Default handler for the Go Back button
  const handleGoBackClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      router.back(); // Default action to go back
    }
  };

  // Handler for the Refresh Page button
  const handleRefreshClick = () => {
    router.refresh(); // Refreshes the page
  };

  return (
    <div
      className="flex flex-col items-center justify-center text-center p-6"
      style={{ minHeight }}
    >
      {image && (
        <div className="mb-4">
          <img
            src={image}
            alt="Empty state illustration"
            className="w-24 h-24 object-contain"
          />
        </div>
      )}
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
      <div className="flex space-x-4 mt-4">
        <Button onClick={handleGoBackClick} className="px-4 py-2">
          {buttonText}
        </Button>
        <Button
          onClick={handleRefreshClick}
          className="px-4 py-2 bg-green-500 text-white"
        >
          Refresh Page
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;
