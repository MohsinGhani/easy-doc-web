// hooks/useMeetingControls.ts
import { useState } from "react";
import { AudioVideoFacade, DefaultMeetingSession } from "amazon-chime-sdk-js";
import { meetingsApiClient } from "@/lib/utils";
import { useRouter } from "next/navigation";

export const useMeetingControls = (
  meetingSession: DefaultMeetingSession | null,
  userRole: string
) => {
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);

  const toggleMute = () => {
    if (meetingSession) {
      const audioVideo = meetingSession.audioVideo;
      if (isMuted) {
        audioVideo.realtimeUnmuteLocalAudio();
      } else {
        audioVideo.realtimeMuteLocalAudio();
      }
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (meetingSession) {
      const audioVideo = meetingSession.audioVideo;
      if (isVideoOn) {
        audioVideo.stopLocalVideoTile();
      } else {
        audioVideo.startLocalVideoTile();
      }
      setIsVideoOn(!isVideoOn);
    }
  };

  const leaveMeeting = () => {
    if (meetingSession) {
      const audioVideo = meetingSession.audioVideo;
      audioVideo.stop();
      router.push(
        userRole === "doctor"
          ? "/appointments?activeTab=completed"
          : "/my-appointments"
      );
    }
  };

  const sendMessage = (
    message: string
  ): { sender: string; message: string } | undefined => {
    if (meetingSession && message.trim()) {
      const audioVideo = meetingSession.audioVideo;
      audioVideo.realtimeSendDataMessage("Conversation", message, 30000);
      return { sender: "You", message };
    }
    return undefined;
  };

  const fetchMeetingDetails = async (
    meetingId: string,
    userId: string,
    display_name: string
  ) => {
    try {
      // Get user's timezone using the Intl API
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // e.g., "Europe/London"
      console.log(`User's Time Zone: ${userTimeZone}`);

      // Example of sending the user's timezone as a query string parameter
      const apiUrl = `/meeting/${meetingId}?role=${userRole}&userId=${userId}&name=${display_name}&timezone=${userTimeZone}`;

      // Then send this API call with the user's time zone to the backend

      const response = await meetingsApiClient.get(apiUrl);
      const data = response.data.data;

      const Meeting = {
        meetingId: data.Meeting.MeetingId,
        MediaPlacement: data.Meeting.MediaPlacement,
      };

      return {
        Meeting,
        Attendee: data.Attendee,
      };
    } catch (err) {
      // console.error("Error fetching meeting details", err);
      throw new Error("Failed to retrieve meeting details.");
    }
  };

  const checkPermissionsAndInitializeDevices = async (
    audioVideo: AudioVideoFacade
  ) => {
    try {
      // Get available audio and video devices
      const audioInputDevices = await audioVideo.listAudioInputDevices();
      const audioOutputDevices = await audioVideo.listAudioOutputDevices();
      const videoInputDevices = await audioVideo.listVideoInputDevices();

      // Ensure devices are available
      if (audioInputDevices.length === 0 || videoInputDevices.length === 0) {
        throw new Error("No audio or video input devices available.");
      }

      const audioInputDeviceInfo = audioInputDevices[0]; // Select first audio input device
      const audioOutputDeviceInfo = audioOutputDevices[0]; // Select first audio output device
      const videoInputDeviceInfo = videoInputDevices[0]; // Select first video input device

      // Start audio and video input
      await audioVideo.startAudioInput(audioInputDeviceInfo.deviceId);
      await audioVideo.chooseAudioOutput(audioOutputDeviceInfo.deviceId);
      await audioVideo.startVideoInput(videoInputDeviceInfo.deviceId);

      console.log("Audio and video devices initialized successfully.");
    } catch (err) {
      console.error("Error initializing devices", err);
      throw new Error(
        "Failed to initialize audio or video devices. Please ensure permissions are granted."
      );
    }
  };

  const highlightActiveSpeaker = (
    activeSpeakerId: React.MutableRefObject<string | null>
  ) => {
    const mainVideoElement = document.getElementById("main-video");
    const localVideoElement = document.getElementById("local-video");

    if (activeSpeakerId.current && mainVideoElement) {
      mainVideoElement.classList.add("border-4", "border-green-500");
    }
  };

  return {
    isMuted,
    isVideoOn,
    toggleMute,
    toggleVideo,
    leaveMeeting,
    sendMessage,
    fetchMeetingDetails,
    checkPermissionsAndInitializeDevices,
    highlightActiveSpeaker,
  };
};
