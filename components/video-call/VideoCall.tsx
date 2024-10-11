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
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { meetingsApiClient } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, MicOff, Video, VideoOff, Send, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { appointmentThunks } from "@/lib/features/appointment/appointmentThunks";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface VideoCallProps {
  meetingId: string;
}

export default function VideoCall({ meetingId }: VideoCallProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);
  const { fetchedAppointment, loading: Aloader } = useAppSelector(
    (state) => state.appointment
  );

  const [meetingSession, setMeetingSession] =
    useState<DefaultMeetingSession | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [chatLog, setChatLog] = useState<{ sender: string; message: string }[]>(
    []
  );
  const [loader, setLoader] = useState(false);

  // Timer-related states
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  console.log("🚀 ~ VideoCall ~ timeRemaining:", timeRemaining)
  const [isAppointmentActive, setIsAppointmentActive] =
    useState<boolean>(false);
  const [redirectTimeout, setRedirectTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const audioElementRef = React.useRef<HTMLAudioElement | null>(null);

  const fetchMeetingDetails = async () => {
    try {
      // Get user's timezone using the Intl API
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // e.g., "Europe/London"
      console.log(`User's Time Zone: ${userTimeZone}`);

      // Example of sending the user's timezone as a query string parameter
      const apiUrl = `/meeting/${meetingId}?role=${user.role}&userId=${user.userId}&name=${user.display_name}&timezone=${userTimeZone}`;

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
      console.error("Error fetching meeting details", err);
      setError("Failed to retrieve meeting details.");
    }
  };

  const joinMeeting = async () => {
    try {
      setLoader(true); // Show loading spinner
      const meetingData = await fetchMeetingDetails();
      if (!meetingData || !meetingData.Meeting || !meetingData.Attendee) {
        setError("Invalid meeting or attendee data.");
        return;
      }

      const meetingSessionConfiguration = new MeetingSessionConfiguration(
        meetingData.Meeting,
        meetingData.Attendee
      );
      const logger = new ConsoleLogger("SDK", LogLevel.OFF);
      const deviceController = new DefaultDeviceController(logger);
      const session = new DefaultMeetingSession(
        meetingSessionConfiguration,
        logger,
        deviceController
      );
      setMeetingSession(session);

      const audioVideo = session.audioVideo;

      if (audioElementRef.current) {
        audioVideo.bindAudioElement(audioElementRef.current);
      }

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
    } finally {
      setLoader(false); // Hide loading spinner
    }
  };

  useEffect(() => {
    if (meetingId && user.userId) {
      joinMeeting();
      dispatch(appointmentThunks.fetchAppointmentById(meetingId));
    }

    return () => {
      if (meetingSession) {
        leaveMeeting();
      }
    };
  }, [meetingId, user.userId]);

  // Timer logic and redirect handling
  useEffect(() => {
    if (fetchedAppointment) {
      const { scheduled_date } = fetchedAppointment;

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      // Convert appointment times to user's local timezone
      const startTime = new Date(scheduled_date.start_time.replace(' ', 'T')).toLocaleString(
        "en-US",
        { timeZone: timezone }
      );
      const endTime = new Date(scheduled_date.end_time.replace(' ', 'T')).toLocaleString(
        "en-US",
        { timeZone: timezone }
      );
      const now = new Date().toLocaleString("en-US", {
        timeZone: timezone,
      });

      console.log("Current Time:", now);
      console.log("Start Time:", startTime);
      console.log("End Time:", endTime);

      // Update timer and check meeting status on every fetch
      if (now < startTime) {
        // Appointment hasn't started yet
        setIsAppointmentActive(false);
        setTimeRemaining(
          formatTimeDiff(
            new Date(startTime).getTime() - new Date(now).getTime()
          )
        );
      } else if (now >= startTime && now <= endTime) {
        // Appointment is ongoing
        setIsAppointmentActive(true);
        setTimeRemaining(
          formatTimeDiff(new Date(endTime).getTime() - new Date(now).getTime())
        );
      } else {
        // Appointment has ended
        setIsAppointmentActive(false);
        setTimeRemaining("Appointment has ended.");
        handleMeetingEnd(new Date(endTime));
      }

      // Timer updates every second
      const interval = setInterval(() => {
        const currentTime = new Date().toLocaleString("en-US", {
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        });

        if (currentTime >= startTime && currentTime <= endTime) {
          // Appointment ongoing
          setIsAppointmentActive(true);
          setTimeRemaining(
            formatTimeDiff(
              new Date(endTime).getTime() - new Date(currentTime).getTime()
            )
          );
        } else if (currentTime < startTime) {
          // Appointment hasn't started yet
          setTimeRemaining(
            formatTimeDiff(
              new Date(startTime).getTime() - new Date(currentTime).getTime()
            )
          );
        } else {
          // Appointment has ended
          setIsAppointmentActive(false);
          setTimeRemaining("Appointment has ended.");
          handleMeetingEnd(new Date(endTime));
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [fetchedAppointment]);

  // Logic to handle the meeting end and redirection after 10 minutes
  const handleMeetingEnd = (endTime: Date) => {
    const now = new Date();
    const timePassed = Math.floor((now.getTime() - endTime.getTime()) / 1000);

    // If the meeting ended more than 10 minutes ago, redirect immediately
    if (timePassed >= 600) {
      router.push(
        user.role === "doctor"
          ? "/appointments?activeTab=completed"
          : "/my-appointments"
      );
    } else {
      // If the meeting ended less than 10 minutes ago, start a 10-minute countdown
      const remainingTime = 600 - timePassed; // Remaining seconds
      const timeout = setTimeout(() => {
        router.push(
          user.role === "doctor"
            ? "/appointments?activeTab=completed"
            : "/my-appointments"
        );
      }, remainingTime * 1000);

      // Clear previous timeout if any
      if (redirectTimeout) {
        clearTimeout(redirectTimeout);
      }

      // Set the new timeout
      setRedirectTimeout(timeout);
    }
  };

  // Prevent reload logic
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = ""; // Trigger confirmation dialog
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

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
        audioVideo.startLocalVideoTile();
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
        user.role === "doctor"
          ? "/appointments?activeTab=completed"
          : "/my-appointments"
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

  if (loading || loader || Aloader) {
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
    <Card className="flex flex-col h-screen">
      <CardHeader className="flex sm:flex-row items-center justify-between w-full gap-4">
        <CardTitle className="text-2xl font-bold text-gray-800">
          Appointment for {fetchedAppointment?.patient?.display_name} with Dr.{" "}
          {fetchedAppointment?.doctor?.display_name}
        </CardTitle>

        <div className="flex justify-between items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  onClick={toggleMute}
                  size={"icon"}
                  variant={isMuted ? "destructive" : "default"}
                >
                  {isMuted ? (
                    <MicOff className="h-4 w-4" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isMuted ? "Unmute" : "Mute"}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Button
                  onClick={toggleVideo}
                  size={"icon"}
                  variant={isVideoOn ? "destructive" : "default"}
                >
                  {isVideoOn ? (
                    <VideoOff className="h-4 w-4" />
                  ) : (
                    <Video className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isVideoOn ? "Stop Video" : "Start Video"}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Button
                  onClick={leaveMeeting}
                  size={"icon"}
                  variant="destructive"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-destructive">
                <p>Leave Meeting</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>

      <audio ref={audioElementRef} id="meeting-audio" className="hidden" />

      <CardContent className="flex-grow flex rounded-xl">
        <div className="flex-grow flex flex-col md:flex-row max-w-7xl mx-auto w-full p-4 gap-4">
          {/* Video Section */}
          <div className="md:w-3/4 bg-black relative rounded-lg max-h-[700px] flex items-center justify-center">
            <div
              id="video-container"
              className="h-full w-full bg-gray-900 rounded-lg shadow-lg overflow-hidden flex items-center justify-center text-white text-center"
            >
              {/* Show Timer instead of Video Placeholder */}
              {isAppointmentActive ? (
                <p>Time Remaining: {timeRemaining}</p>
              ) : (
                <p>
                  {timeRemaining === "Appointment has ended."
                    ? "Appointment has ended."
                    : `Appointment starts in: ${timeRemaining}`}
                </p>
              )}
            </div>
          </div>

          {/* Conversation Section */}
          <Card className="h-full flex flex-col md:w-1/4">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Conversation
              </CardTitle>
            </CardHeader>

            {/* Chat Log */}
            <CardContent className="overflow-y-auto flex-grow bg-gray-100 mb-4 max-h-64 md:max-h-full">
              {chatLog.map((msg, idx) => (
                <p key={idx} className="mb-2 text-gray-800">
                  <span className="font-semibold text-gray-700">
                    {msg.sender}:
                  </span>{" "}
                  {msg.message}
                </p>
              ))}
            </CardContent>

            {/* Input and Send Button */}
            <CardFooter className="flex items-center gap-3">
              <Input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter a message"
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button onClick={sendMessage} size={"icon"}>
                <Send className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}

// Utility function to format the time difference
const formatTimeDiff = (timeDiff: number): string => {
  const totalSeconds = Math.floor(timeDiff / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours}h ${minutes}m ${seconds}s`;
};
