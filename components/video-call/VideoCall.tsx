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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, MicOff, Video, VideoOff, Send, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

interface VideoCallProps {
  meetingId: string;
}

export default function VideoCall({ meetingId }: VideoCallProps) {
  const router = useRouter();
  const { user, loading } = useAppSelector((state) => state.auth);
  const [meetingSession, setMeetingSession] =
    useState<DefaultMeetingSession | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [participants, setParticipants] = useState<
    { id: string; name: string }[]
  >([]);
  const [message, setMessage] = useState<string>("");
  const [chatLog, setChatLog] = useState<{ sender: string; message: string }[]>(
    []
  );

  useEffect(() => {
    const fetchMeetingDetails = async () => {
      try {
        const response = await meetingsApiClient.get(
          `/meeting/${meetingId}?role=${user.role}&userId=${user.userId}&name=${user.display_name}`
        );
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
        console.error("Error fetching meeting details", err);
        setError("Failed to retrieve meeting details.");
      }
    };

    const joinMeeting = async () => {
      try {
        const meetingData = await fetchMeetingDetails();
        if (!meetingData || !meetingData.Meeting || !meetingData.Attendee) {
          setError("Invalid meeting or attendee data.");
          return;
        }

        const meetingSessionConfiguration = new MeetingSessionConfiguration(
          meetingData.Meeting,
          meetingData.Attendee
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

        audioVideo.bindAudioElement(
          document.getElementById("meeting-audio") as HTMLAudioElement
        );

        const audioInputDevices = await audioVideo.listAudioInputDevices();
        if (audioInputDevices.length > 0) {
          await audioVideo.chooseAudioOutput(audioInputDevices[0].deviceId);
        }

        const videoInputDevices = await audioVideo.listVideoInputDevices();
        if (videoInputDevices.length > 0) {
          await audioVideo.chooseAudioOutput(videoInputDevices[0].deviceId);
          const videoElement = document.getElementById(
            "video-container"
          ) as HTMLVideoElement;
          audioVideo.bindVideoElement(1, videoElement);
        }

        audioVideo.start();

        // Subscribe to attendee presence and update the participants with names
        audioVideo.realtimeSubscribeToAttendeeIdPresence(
          (attendeeId: string, present: boolean, externalUserId?: string) => {
            const attendeeName = externalUserId
              ? externalUserId.split("#")[0]
              : "Unknown"; // Get the name from ExternalUserId
            setParticipants((prev) =>
              present
                ? [...prev, { id: attendeeId, name: attendeeName }]
                : prev.filter((participant) => participant.id !== attendeeId)
            );
          }
        );

        const topic = "Conversation";
        audioVideo.realtimeSubscribeToReceiveDataMessage(
          topic,
          (dataMessage: DataMessage) => {
            const text = dataMessage.text();
            setChatLog((prev) => [
              ...prev,
              {
                sender:
                  dataMessage.senderExternalUserId.split("#")[0] ??
                  `${user.role === "patient" ? "Patient" : "Doctor"}`,
                message: text,
              },
            ]);
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
      if (meetingSession) {
        leaveMeeting();
      }
    };
  }, [meetingId, user.userId]);

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

  const toggleVideo = async () => {
    if (meetingSession) {
      const audioVideo = meetingSession.audioVideo;
      if (isVideoOn) {
        audioVideo.stopLocalVideoTile();
      } else {
        await audioVideo.startLocalVideoTile();
      }
      setIsVideoOn(!isVideoOn);
    }
  };

  const leaveMeeting = () => {
    if (meetingSession) {
      const audioVideo = meetingSession.audioVideo;
      audioVideo.realtimeUnsubscribeFromReceiveDataMessage("Conversation");
      audioVideo.realtimeUnmuteLocalAudio();
      audioVideo.stopLocalVideoTile();
      audioVideo.stop();
      setMeetingSession(null);
      router.push(
        `/${
          user.role === "doctor"
            ? "appointments?activeTab=completed"
            : "my-appointments"
        }`
      );
    }
  };

  const sendMessage = () => {
    if (meetingSession && message.trim() !== "") {
      const audioVideo = meetingSession.audioVideo;
      const DATA_MESSAGE_LIFETIME_MS = 30000;
      audioVideo.realtimeSendDataMessage(
        "Conversation",
        message,
        DATA_MESSAGE_LIFETIME_MS
      );
      setChatLog((prev) => [...prev, { sender: "You", message }]);
      setMessage("");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Meeting ID: {meetingId}
        </h1>
      </header>
      <audio id="meeting-audio" className="hidden" />
      <main className="flex-grow flex">
        <div className="flex-grow flex flex-col md:flex-row">
          <div className="md:w-3/4 bg-black">
            <div id="video-container" className="h-full w-full bg-gray-900" />
          </div>
          <div className="md:w-1/4 bg-white p-4 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Participants</h2>
            <ul className="space-y-2">
              {participants.map((participant) => (
                <li key={participant.id} className="bg-gray-100 p-2 rounded">
                  {participant.name} {/* Display name instead of ID */}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <footer className="bg-white shadow-sm p-4">
        <div className="flex justify-between items-center">
          <div className="space-x-2">
            <Button
              onClick={toggleMute}
              variant={isMuted ? "destructive" : "default"}
            >
              {isMuted ? (
                <MicOff className="mr-2 h-4 w-4" />
              ) : (
                <Mic className="mr-2 h-4 w-4" />
              )}
              {isMuted ? "Unmute" : "Mute"}
            </Button>
            <Button
              onClick={toggleVideo}
              variant={isVideoOn ? "destructive" : "default"}
            >
              {isVideoOn ? (
                <VideoOff className="mr-2 h-4 w-4" />
              ) : (
                <Video className="mr-2 h-4 w-4" />
              )}
              {isVideoOn ? "Stop Video" : "Start Video"}
            </Button>
          </div>
          <Button onClick={leaveMeeting} variant="destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Leave Meeting
          </Button>
        </div>
      </footer>
      <div className="bg-white shadow-sm p-4">
        <h2 className="text-xl font-semibold mb-4">Conversation</h2>
        <div className="h-40 overflow-y-auto mb-4 bg-gray-100 p-2 rounded">
          {chatLog.map((msg, idx) => (
            <p key={idx} className="mb-1">
              <span className="font-semibold">{msg.sender}: </span>
              {msg.message}
            </p>
          ))}
        </div>
        <div className="flex">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter a message"
            className="flex-grow mr-2"
          />
          <Button onClick={sendMessage}>
            <Send className="mr-2 h-4 w-4" />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
