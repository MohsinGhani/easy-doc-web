// hooks/useMediaPermissions.ts
import { useState } from "react";

export const useMediaPermissions = () => {
  const [error, setError] = useState<string | null>(null);

  const requestPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      console.log("Permissions granted for audio and video");
      return stream;
    } catch (error) {
      if (error instanceof Error && error.name === "NotAllowedError") {
        setError("Permission denied by the user.");
        alert(
          "You need to grant camera and microphone access to join the video call."
        );
      } else if (error instanceof Error && error.name === "NotFoundError") {
        setError("No camera or microphone found. Please check your device.");
      } else {
        setError("Error accessing media devices.");
      }
      throw error;
    }
  };

  return { requestPermissions, error };
};
