import React from "react";
import { TextInput } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

const VideoInputComponent = ({ value, onChange, onDelete }) => (
  <div className="w-full px-4 mt-2">
    <TextInput
      withAsterisk
      label="Video Link"
      placeholder="Enter Video Link"
      value={value}
      onChange={onChange}
    />
    {value && (
      <div className="relative mt-2">
        <button
          onClick={onDelete}
          className="absolute top-0 right-0 p-1 bg-gray-200 rounded-full focus:outline-none"
        >
          <IconX size={24} strokeWidth={1.5} />
        </button>
        <iframe
          width="100%"
          height="315"
          src={value}
          title="VK video player"
          frameBorder="0"
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
        ></iframe>
      </div>
    )}
  </div>
);

export default VideoInputComponent;
