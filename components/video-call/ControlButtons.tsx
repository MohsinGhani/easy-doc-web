// components/ControlButtons.tsx
import React from "react";
import { Mic, MicOff, Video, VideoOff, LogOut } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ControlButtonsProps {
  isMuted: boolean;
  isVideoOn: boolean;
  toggleMute: () => void;
  toggleVideo: () => void;
  leaveMeeting: () => void;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  isMuted,
  isVideoOn,
  toggleMute,
  toggleVideo,
  leaveMeeting,
}) => {
  return (
    <div className="flex justify-between items-center gap-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            onClick={toggleMute}
            className={buttonVariants({
              size: "icon",
              variant: isMuted ? "destructive" : "default",
            })}
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
            className={buttonVariants({
              size: "icon",
              variant: isVideoOn ? "destructive" : "default",
            })}
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
            className={buttonVariants({
              size: "icon",
              variant: "destructive",
            })}
          >
            <LogOut className="h-4 w-4" />
          </TooltipTrigger>
          <TooltipContent className="bg-destructive">
            <p>Leave Meeting</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ControlButtons;
