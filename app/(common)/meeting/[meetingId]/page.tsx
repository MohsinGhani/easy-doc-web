import VideoCall from "@/components/video-call/VideoCall";
import React from "react";
import { Metadata } from "next";

interface MeetingDetailsPageProps {
  params: { meetingId: string };
}

export const metadata: Metadata = {
  title: "Easy Doc | Meeting",
  description: "Join a meeting",
};

const MeetingDetailsPage: React.FC<MeetingDetailsPageProps> = ({
  params: { meetingId },
}) => {
  return <VideoCall meetingId={meetingId} />;
};

export default MeetingDetailsPage;
