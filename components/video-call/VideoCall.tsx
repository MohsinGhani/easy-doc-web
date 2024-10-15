"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  MeetingSessionConfiguration,
  DefaultDeviceController,
  DefaultMeetingSession,
  LogLevel,
  ConsoleLogger,
  DataMessage,
  VideoTileState,
  AudioVideoObserver,
  DefaultActiveSpeakerPolicy,
} from "amazon-chime-sdk-js";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { appointmentThunks } from "@/lib/features/appointment/appointmentThunks";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import EmptyState from "../common/EmptyState";
import { useMeetingControls } from "@/hooks/useMeetingControls";
import ControlButtons from "./ControlButtons";
import ChatSection from "./ChatSection";
import VideoSection from "./VideoSection";
import { Loader } from "../common/Loader";
import { useMediaPermissions } from "@/hooks/useMediaPermissions";
import { useAppointmentTimer } from "@/hooks/useAppointmentTimer";

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
  const [error, setError] = useState<string | null>(null);
  const [chatLog, setChatLog] = useState<{ sender: string; message: string }[]>(
    []
  );
  const [loader, setLoader] = useState(false);

  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const localVideoElementRef = useRef<HTMLVideoElement | null>(null); // For your own video
  const activeSpeakerId = useRef<string | null>(null); // To track the active speaker

  const {
    isMuted,
    isVideoOn,
    toggleMute,
    toggleVideo,
    leaveMeeting,
    sendMessage,
    fetchMeetingDetails,
    checkPermissionsAndInitializeDevices,
    highlightActiveSpeaker,
  } = useMeetingControls(meetingSession, user.role);

  const { error: mediaError, requestPermissions } = useMediaPermissions();

  const joinMeeting = async () => {
    try {
      setLoader(true);

      const stream = await requestPermissions();
      if (!stream) return;

      const meetingData = await fetchMeetingDetails(
        meetingId,
        user.userId,
        user.display_name
      );
      if (!meetingData.Meeting || !meetingData.Attendee) {
        setError("Invalid meeting or attendee data.");
        return;
      }

      const logger = new ConsoleLogger("SDK", LogLevel.DEBUG);
      const deviceController = new DefaultDeviceController(logger);
      const meetingSessionConfiguration = new MeetingSessionConfiguration(
        meetingData.Meeting,
        meetingData.Attendee
      );

      const session = new DefaultMeetingSession(
        meetingSessionConfiguration,
        logger,
        deviceController
      );

      setMeetingSession(session);
      const audioVideo = session.audioVideo;

      await checkPermissionsAndInitializeDevices(audioVideo);

      const observer: AudioVideoObserver = {
        videoTileDidUpdate: (tileState: VideoTileState) => {
          if (
            localVideoElementRef.current &&
            tileState.localTile &&
            tileState.tileId
          ) {
            audioVideo.bindVideoElement(
              tileState.tileId,
              localVideoElementRef.current
            );
            console.log(
              "Video tile updated and bound to the local video element."
            );
          } else if (
            videoElementRef.current &&
            !tileState.localTile &&
            tileState.tileId
          ) {
            audioVideo.bindVideoElement(
              tileState.tileId,
              videoElementRef.current
            );
            console.log("Video tile updated and bound to the video element.");
          } else {
            console.log(
              "Video tile updated but not bound to the video element."
            );
          }
        },
        audioVideoDidStart: () => {
          console.log("Audio and video started.");
          audioVideo.startLocalVideoTile();

          if (audioElementRef.current)
            audioVideo.bindAudioElement(audioElementRef.current);
        },
      };

      audioVideo.addObserver(observer);
      // Active Speaker Detector
      audioVideo.subscribeToActiveSpeakerDetector(
        new DefaultActiveSpeakerPolicy(),
        (attendeeIds: string[]) => {
          activeSpeakerId.current = attendeeIds[0]; // Track active speaker
          highlightActiveSpeaker(activeSpeakerId); // Highlight active speaker
        }
      );

      audioVideo.realtimeSubscribeToReceiveDataMessage(
        "Conversation",
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

      audioVideo.start();
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

  const { isAppointmentActive, timeRemaining } = useAppointmentTimer(
    fetchedAppointment?.scheduled_date?.start_time ?? null,
    fetchedAppointment?.scheduled_date?.end_time ?? null,
    user.role
  );

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

  if (loading || loader || Aloader) return <Loader />;

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

        <ControlButtons
          isMuted={isMuted}
          isVideoOn={isVideoOn}
          toggleMute={toggleMute}
          toggleVideo={toggleVideo}
          leaveMeeting={leaveMeeting}
        />
      </CardHeader>

      <audio ref={audioElementRef} className="hidden" />

      <CardContent className="flex-grow flex rounded-xl">
        <div className="flex-grow flex flex-col md:flex-row max-w-7xl mx-auto w-full p-4 gap-4">
          {/* Video Section */}
          <VideoSection
            videoElementRef={videoElementRef}
            localVideoElementRef={localVideoElementRef}
            timeRemaining={timeRemaining}
            isAppointmentActive={isAppointmentActive}
          />

          {/* Conversation Section */}
          <ChatSection
            chatLog={chatLog}
            setChatLog={setChatLog}
            sendMessage={sendMessage}
          />
        </div>
      </CardContent>
    </Card>
  );
}
