import React from "react";
import { TextInput } from "@mantine/core";

const TextInputComponent = ({ value, onChange }) => (
  <TextInput
    withAsterisk
    label="Post title"
    className="w-full px-4"
    placeholder="Enter Post title"
    value={value}
    onChange={onChange}
  />
);

export default TextInputComponent;
