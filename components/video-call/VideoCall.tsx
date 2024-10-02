"use client";

import React, { useEffect, useState } from "react";
import {
  MeetingSessionConfiguration,
  DefaultDeviceController,
  DefaultMeetingSession,
  LogLevel,
  ConsoleLogger,
  DataMessage,
} from "amazon-chime-sdk-js";
import { useAppSelector } from "@/lib/hooks";
import { meetingsApiClient } from "@/lib/utils";

interface VideoCallProps {
  meetingId: string;
}

const VideoCall: React.FC<VideoCallProps> = ({ meetingId }) => {
  const { user, loading } = useAppSelector((state) => state.auth);
  const [meetingSession, setMeetingSession] =
    useState<DefaultMeetingSession | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeetingDetails = async () => {
      try {
        const response = await meetingsApiClient.get(`/meeting/${meetingId}`);
        const data = response.data.data;
        console.log("🚀 ~ fetchMeetingDetails ~ data:", data);

        return {
          Meeting: data.Meeting,
          Attendee: data.Attendee,
        };
      } catch (err) {
        console.error("Error fetching meeting details", err);
        setError("Failed to retrieve meeting details.");
      }
    };

    const joinMeeting = async () => {
      try {
        const { Meeting, Attendee } = await fetchMeetingDetails();
        if (!Meeting || !Attendee) {
          setError("Invalid meeting or attendee data.");
          return;
        }

        // Create a new MeetingSessionConfiguration using the fetched Meeting and Attendee
        const meetingSessionConfiguration = new MeetingSessionConfiguration(
          Meeting,
          Attendee
        );
        const logger = new ConsoleLogger("SDK", LogLevel.INFO);
        const deviceController = new DefaultDeviceController(logger);
        const session = new DefaultMeetingSession(
          meetingSessionConfiguration,
          logger,
          deviceController
        );
        setMeetingSession(session);

        const audioVideo = session.audioVideo;

        // Bind audio element for meeting audio
        audioVideo.bindAudioElement(
          document.getElementById("meeting-audio") as HTMLAudioElement
        );

        // Select default audio input device
        const audioInputDevices = await audioVideo.listAudioInputDevices();
        if (audioInputDevices.length > 0) {
          await audioVideo.chooseAudioInputDevice(
            audioInputDevices[0].deviceId
          );
          console.log(
            "Audio input device selected:",
            audioInputDevices[0].label
          );
        }

        // Select default video input device and bind the video element
        const videoInputDevices = await audioVideo.listVideoInputDevices();
        if (videoInputDevices.length > 0) {
          await audioVideo.chooseVideoInputDevice(
            videoInputDevices[0].deviceId
          );
          const videoElement = document.getElementById(
            "video-container"
          ) as HTMLVideoElement;
          audioVideo.bindVideoElement(1, videoElement);
          console.log(
            "Video input device selected:",
            videoInputDevices[0].label
          );
        }

        // Start audio and video if required
        audioVideo.start();

        // Subscribe to data messages
        const topic = "Conversation";
        audioVideo.realtimeSubscribeToReceiveDataMessage(
          topic,
          (dataMessage: DataMessage) => {
            console.log("Received data message:", dataMessage.text());
          }
        );
      } catch (err) {
        console.error("Error joining the meeting", err);
        setError("Failed to join the meeting.");
      }
    };

    if (meetingId && user.userId) {
      joinMeeting();
    }

    return () => {
      // Cleanup: Stop audio/video and unsubscribe from data messages
      if (meetingSession) {
        const audioVideo = meetingSession.audioVideo;
        audioVideo.realtimeUnsubscribeFromReceiveDataMessage("Conversation");
        audioVideo.stopLocalVideoTile();
        audioVideo.stop();
      }
    };
  }, [meetingId, user.userId]);

  const toggleMute = () => {
    if (meetingSession) {
      const audioVideo = meetingSession.audioVideo;
      if (isMuted) {
        // Unmute the microphone
        audioVideo.realtimeUnmuteLocalAudio();
        console.log("Unmuted");
      } else {
        // Mute the microphone
        audioVideo.realtimeMuteLocalAudio();
        console.log("Muted");
      }
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = async () => {
    if (meetingSession) {
      const audioVideo = meetingSession.audioVideo;
      if (isVideoOn) {
        // Stop the local video
        audioVideo.stopLocalVideoTile();
        console.log("Video stopped");
      } else {
        // Start the local video
        await audioVideo.startLocalVideoTile();
        console.log("Video started");
      }
      setIsVideoOn(!isVideoOn);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Meeting ID: {meetingId}</h1>
      <audio id="meeting-audio" style={{ display: "none" }} />
      <div>
        {/* Video Tiles */}
        <div
          id="video-container"
          style={{ height: "400px", width: "100%", backgroundColor: "#000" }}
        >
          {/* Video will be rendered here */}
        </div>

        {/* Mute / Unmute Button */}
        <button onClick={toggleMute}>{isMuted ? "Unmute" : "Mute"}</button>

        {/* Show / Hide Video Button */}
        <button onClick={toggleVideo}>
          {isVideoOn ? "Hide Video" : "Show Video"}
        </button>
      </div>
    </div>
  );
};

export default VideoCall;
