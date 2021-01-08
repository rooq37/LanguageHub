import { useReactMediaRecorder } from "react-media-recorder";
import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

const Record = ({ onStop }) => {
  const { status, startRecording, stopRecording } = useReactMediaRecorder({
    audio: true,
    video: false,
    onStop: onStop,
  });

  return (
    <div>
      {status === "recording" ? (
        <Button variant="outline-primary" onClick={stopRecording}>
          <FontAwesomeIcon className="text-danger" icon={faMicrophone} />
        </Button>
      ) : (
        <Button onClick={startRecording}>
          <FontAwesomeIcon icon={faMicrophone} />
        </Button>
      )}
    </div>
  );
};

export default Record;
