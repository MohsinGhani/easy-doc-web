"use client";

import React, { useEffect, useState } from "react";
import {
  MeetingSessionConfiguration,
  DefaultDeviceController,
  DefaultMeetingSession,
  LogLevel,
  ConsoleLogger,
  DataMessage,
  AudioVideoFacade,
} from "amazon-chime-sdk-js";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { cn, formatTimeDiff, meetingsApiClient } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { formatInTimeZone } from "date-fns-tz";
import EmptyState from "../common/EmptyState";

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
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [isAppointmentActive, setIsAppointmentActive] =
    useState<boolean>(false);
  const [redirectTimeout, setRedirectTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const audioElementRef = React.useRef<HTMLAudioElement | null>(null);
  const videoElementRef = React.useRef<HTMLVideoElement | null>(null);

  // Function to check and request audio/video permissions
  async function requestMediaPermissions() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      console.log("Permissions granted for audio and video");
      return stream;
    } catch (error) {
      handleMediaPermissionError(error);
      throw error;
    }
  }

  function handleMediaPermissionError(error: any) {
    if (error instanceof Error && error.name === "NotAllowedError") {
      alert(
        "You need to grant camera and microphone access to join the video call."
      );
    } else if (error instanceof Error && error.name === "NotFoundError") {
      alert(
        "No camera or microphone found. Please check your device settings."
      );
    } else {
      console.error("Error accessing media devices:", error);
    }
  }

  // Check permissions and start audio/video devices after getting permission
  const initializeDevices = async (audioVideo: AudioVideoFacade) => {
    try {
      const audioInputDevices = await audioVideo.listAudioInputDevices();
      const audioOutputDevices = await audioVideo.listAudioOutputDevices();
      const videoInputDevices = await audioVideo.listVideoInputDevices();

      if (audioInputDevices.length === 0 || videoInputDevices.length === 0) {
        throw new Error("No audio or video input devices available.");
      }

      const audioInputDeviceInfo = audioInputDevices[0];
      const audioOutputDeviceInfo = audioOutputDevices[0];
      const videoInputDeviceInfo = videoInputDevices[0];

      await audioVideo.startAudioInput(audioInputDeviceInfo.deviceId);
      await audioVideo.chooseAudioOutput(audioOutputDeviceInfo.deviceId);
      await audioVideo.startVideoInput(videoInputDeviceInfo.deviceId);

      console.log("🚀 ~ initializeDevices ~ audioElementRef:", audioElementRef)
      console.log("🚀 ~ initializeDevices ~ videoElementRef:", videoElementRef)
      
      if (audioElementRef.current) {
        audioVideo.bindAudioElement(audioElementRef.current);
      }
      if (videoElementRef.current) {
        audioVideo.bindVideoElement(1, videoElementRef.current);
      }

      audioVideo.start();
      console.log("Audio and video devices initialized successfully.");
    } catch (err) {
      console.error("Error initializing devices", err);
      setError(
        "Failed to initialize audio or video devices. Please ensure permissions are granted."
      );
    }
  };

  // Fetch meeting details
  const fetchMeetingDetails = async () => {
    try {
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const apiUrl = `/meeting/${meetingId}?role=${user.role}&userId=${user.userId}&name=${user.display_name}&timezone=${userTimeZone}`;
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

  // Join the meeting when the refs are ready
  const joinMeetingWhenRefsReady = async () => {
    const tryJoinMeeting = () => {
      if (!audioElementRef.current || !videoElementRef.current) {
        console.log("Waiting for refs to be initialized...");
        return setTimeout(tryJoinMeeting, 100); // Check every 100ms
      }

      joinMeeting(); // Proceed once refs are ready
    };

    tryJoinMeeting();
  };

  // Join the meeting and initialize the session
  const joinMeeting = async () => {
    try {
      setLoader(true);
      await requestMediaPermissions();

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

      await initializeDevices(session.audioVideo);

      session.audioVideo.realtimeSubscribeToReceiveDataMessage(
        "Conversation",
        (dataMessage: DataMessage) => {
          const text = dataMessage.text();
          setChatLog((prev) => [
            ...prev,
            {
              sender: dataMessage.senderExternalUserId.split("#")[0],
              message: text,
            },
          ]);
        }
      );
    } catch (err) {
      console.error("Error joining the meeting", err);
      setError("Failed to join the meeting.");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (meetingId && user.userId) {
      joinMeetingWhenRefsReady();
      dispatch(appointmentThunks.fetchAppointmentById(meetingId));
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
      isMuted
        ? audioVideo.realtimeUnmuteLocalAudio()
        : audioVideo.realtimeMuteLocalAudio();
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = async () => {
    if (meetingSession) {
      const audioVideo = meetingSession.audioVideo;
      isVideoOn
        ? audioVideo.stopLocalVideoTile()
        : audioVideo.startLocalVideoTile();
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

  // Timer logic and redirect handling
  useEffect(() => {
    if (fetchedAppointment) {
      const { scheduled_date } = fetchedAppointment;
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      // Get today's date in 'yyyy-MM-dd' format in the user's time zone
      const currentDate = formatInTimeZone(new Date(), timezone, "yyyy-MM-dd");

      // Combine today's date with the start_time and end_time from the appointment
      const startDateTimeString = `${currentDate}T${scheduled_date.start_time}:00`;
      const endDateTimeString = `${currentDate}T${scheduled_date.end_time}:00`;

      // Convert these to Date objects in the user's time zone
      const startTime = new Date(
        formatInTimeZone(
          startDateTimeString,
          timezone,
          "yyyy-MM-dd'T'HH:mm:ssXXX"
        )
      );
      const endTime = new Date(
        formatInTimeZone(
          endDateTimeString,
          timezone,
          "yyyy-MM-dd'T'HH:mm:ssXXX"
        )
      );

      // Log the current time, start time, and end time for debugging
      console.log("User Time Zone:", timezone);
      console.log(
        "Current Time:",
        new Date().toLocaleString("en-US", { timeZone: timezone })
      );
      console.log("Start Time:", startTime);
      console.log("End Time:", endTime);

      const now = new Date().toLocaleString("en-US", { timeZone: timezone });

      // Update timer and check meeting status on every fetch
      if (new Date(now) < startTime) {
        // Appointment hasn't started yet
        setIsAppointmentActive(false);
        setTimeRemaining(
          formatTimeDiff(startTime.getTime() - new Date(now).getTime())
        );
      } else if (new Date(now) >= startTime && new Date(now) <= endTime) {
        // Appointment is ongoing
        setIsAppointmentActive(true);
        setTimeRemaining(
          formatTimeDiff(endTime.getTime() - new Date(now).getTime())
        );
      } else {
        // Appointment has ended
        setIsAppointmentActive(false);
        setTimeRemaining("Appointment has ended.");
        handleMeetingEnd(endTime);
      }

      // Timer updates every second
      const interval = setInterval(() => {
        const currentTime = new Date().toLocaleString("en-US", {
          timeZone: timezone,
        });

        if (
          new Date(currentTime) >= startTime &&
          new Date(currentTime) <= endTime
        ) {
          // Appointment ongoing
          setIsAppointmentActive(true);
          setTimeRemaining(
            formatTimeDiff(endTime.getTime() - new Date(currentTime).getTime())
          );
        } else if (new Date(currentTime) < startTime) {
          // Appointment hasn't started yet
          setTimeRemaining(
            formatTimeDiff(
              startTime.getTime() - new Date(currentTime).getTime()
            )
          );
        } else {
          // Appointment has ended
          setIsAppointmentActive(false);
          setTimeRemaining("Appointment has ended.");
          handleMeetingEnd(endTime);
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
      <EmptyState
        buttonText="Go Back"
        onButtonClick={() => router.back()}
        title="Something went wrong"
        subtitle={error}
      />
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
              <TooltipTrigger
                onClick={toggleMute}
                className={cn(
                  buttonVariants({
                    size: "icon",
                    variant: isMuted ? "destructive" : "default",
                  })
                )}
              >
                {isMuted ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </TooltipTrigger>
              <TooltipContent>
                <p>{isMuted ? "Unmute" : "Mute"}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                onClick={toggleVideo}
                className={cn(
                  buttonVariants({
                    size: "icon",
                    variant: isVideoOn ? "destructive" : "default",
                  })
                )}
              >
                {isVideoOn ? (
                  <VideoOff className="h-4 w-4" />
                ) : (
                  <Video className="h-4 w-4" />
                )}
              </TooltipTrigger>
              <TooltipContent>
                <p>{isVideoOn ? "Stop Video" : "Start Video"}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                onClick={leaveMeeting}
                className={cn(
                  buttonVariants({
                    size: "icon",
                    variant: "destructive",
                  })
                )}
              >
                <LogOut className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent className="bg-destructive">
                <p>Leave Meeting</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>

      <audio ref={audioElementRef} className="hidden" />

      <CardContent className="flex-grow flex rounded-xl">
        <div className="flex-grow flex flex-col md:flex-row max-w-7xl mx-auto w-full p-4 gap-4">
          {/* Video Section */}
          <div className="md:w-3/4 bg-black relative rounded-lg max-h-[700px] flex items-center justify-center">
            <div
              id="video-container"
              className="h-full w-full bg-gray-900 rounded-lg shadow-lg overflow-hidden flex items-center justify-center text-white text-center relative"
            >
              <video
                ref={videoElementRef}
                className="w-full h-full"
                autoPlay
                playsInline
              />

              {/* Show Timer instead of Video Placeholder */}
              <div className="absolute left-0 right-0 top-5">
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
