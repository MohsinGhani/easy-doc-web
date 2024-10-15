// components/VideoSection.tsx
import React, { useRef } from "react";

interface VideoSectionProps {
  videoElementRef: React.RefObject<HTMLVideoElement>;
  localVideoElementRef: React.RefObject<HTMLVideoElement>;
  timeRemaining: string;
  isAppointmentActive: boolean;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  videoElementRef,
  localVideoElementRef,
  timeRemaining,
  isAppointmentActive,
}) => {
  return (
    <div className="relative flex items-center justify-center">
      <video
        id="local-video"
        className="h-1/4 w-1/4 bg-transparent rounded-lg shadow-lg overflow-hidden absolute bottom-5 right-5"
        ref={localVideoElementRef}
        autoPlay
        playsInline
        muted
      />
      <video
        id="main-video"
        ref={videoElementRef}
        className="w-full h-full"
        autoPlay
        playsInline
        muted
      />
      <div className="absolute w-full text-center top-5 text-white">
        {isAppointmentActive ? (
          <p>Time Remaining: {timeRemaining}</p>
        ) : (
          <p>{`Appointment starts in: ${timeRemaining}`}</p>
        )}
      </div>
    </div>
  );
};

export default VideoSection;
