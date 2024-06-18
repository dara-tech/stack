import React, { useEffect, useState } from "react";
import {
  Button,
  Group,
  TextInput,
  useMantineColorScheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useInputState } from "@mantine/hooks";
import { AiOutlineUpload, AiOutlineClose } from "react-icons/ai"; // Added AiOutlineClose icon
import { useNavigate } from "react-router-dom";
import { useSignUp } from "../hooks/auth-hook";
import { uploadFile } from "../utils";
import { PasswordStrength } from "./PasswordStrength";
import { clsx } from "clsx";

const SignUpForm = ({
  toast,
  isSignin,
  setIsSignin,
  toggle,
  setFormClose,
}) => {
  const { colorScheme } = useMantineColorScheme();
  const theme = colorScheme === "dark";

  const { mutate } = useSignUp(toast, toggle);
  const [strength, setStrength] = useState(0);
  const [file, setFile] = useState("");
  const [fileURL, setFileURL] = useState("");
  const [passValue, setPassValue] = useInputState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
    },
    validate: {
      firstName: (value) =>
        value.length < 3 ? "First name is too short" : null,
      lastName: (value) => (value.length < 2 ? "Last name is too short" : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = (values) => {
    if (!isSignin && strength < 90) return;
    setFormClose(true);

    const res = mutate({
      ...values,
      password: passValue,
      image: fileURL,
      accountType: "Writer",
    });
  };

  useEffect(() => {
    file && uploadFile(setFileURL, setUploadProgress, file);
  }, [file]);

  useEffect(() => {
    if (uploadProgress === 100) {
      setShowImage(true);
    }
  }, [uploadProgress]);

  const deleteImage = () => {
    setFileURL("");
    setFile("");
    setShowImage(false);
  };

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className="flex flex-col gap-3"
    >
      <div className="w-full flex gap-2 ">
        <TextInput
          className="w-full"
          withAsterisk
          label="First Name"
          placeholder="First Name"
          {...form.getInputProps("firstName")}
        />
        <TextInput
          className="w-full"
          withAsterisk
          label="Last Name"
          placeholder="Last Name"
          {...form.getInputProps("lastName")}
        />
      </div>

      <TextInput
        withAsterisk
        label="Email Address"
        placeholder="your@email.com"
        {...form.getInputProps("email")}
      />

      <PasswordStrength
        value={passValue}
        setValue={setPassValue}
        setStrength={setStrength}
        isSignin={false}
      />

      <Group className="w-full flex justify-between items-center" mt="md">
        <div className="flex items-center">
          <label
            className={clsx(
              "flex items-center gap-1 text-base cursor-pointer",
              theme ? "text-gray-500" : "text-slate-700"
            )}
            htmlFor="imgUpload"
          >
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
              id="imgUpload"
              data-max-size="5120"
              accept=".jpg, .png, .jpeg"
            />
            <AiOutlineUpload /> {/* Changed icon to AiOutlineUpload */}
            <span>Upload Picture</span>
          </label>
          {uploadProgress > 0 && uploadProgress < 100 ? (
            <div className="relative ml-4 w-10 h-10">
              <div
                className="loading-spinner absolute w-5 h-5 border-3 rounded-full"
                style={{
                  border: `3px solid ${theme ? "#242424" : "#f3f3f3"}`,
                  borderTop: `3px solid ${theme ? "#6573c3" : "#3498db"}`,
                  animation: "spin 2s linear infinite",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              ></div>
            </div>
          ) : uploadProgress === 100 && showImage ? (
            <div className="relative ml-4 w-10 h-10">
              <img
                src={fileURL}
                alt="Uploaded File"
                className="w-full h-full rounded-full object-cover"
              />
              <div
                className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 cursor-pointer"
                style={{
                  background: theme ? "#4A4A4A" : "#E3E3E3",
                  borderRadius: "50%",
                }}
                onClick={deleteImage}
              >
                <AiOutlineClose
                  style={{
                    color: theme ? "#E3E3E3" : "#4A4A4A",
                    width: "15px",
                    height: "15px",
                  }}
                />
              </div>
            </div>
          ) : null}
        </div>

        <Button
          type="submit"
          className={clsx(theme ? "bg-blue-600" : "bg-black")}
        >
          Submit
        </Button>
      </Group>
      <p className="text-sm">
        {isSignin ? "Don't have an account?" : "Already has an account?"}
        <span
          className="underline text-blue-600 ml-1 cursor-pointer"
          onClick={() => setIsSignin((prev) => !prev)}
        >
          {isSignin ? "Sign up" : "Sign in"}
        </span>
      </p>
    </form>
  );
};

export default SignUpForm;
