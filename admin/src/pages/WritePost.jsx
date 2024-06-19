import React, { useEffect, useState } from "react";
import { useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Toaster, toast } from "sonner";
import useStore from "../store";
import { uploadFile } from "../utils";
import Loading from "../components/Loading";
import { useCreatePost } from "../hooks/post-hook";
import TextInputComponent from "../components/TextInputComponent";
import SelectComponent from "../components/SelectComponent";
import VideoInputComponent from "../components/VideoInputComponent";
import ImageUploadComponent from "../components/ImageUploadComponent";
import EditorComponent from "../components/EditorComponent";
import SubmitButtonComponent from "../components/SubmitButtonComponent";
import GenerateTitlesComponent from "../components/GenerateTitlesComponent";
import GenContent from "../components/GenContent";
import MainContent from "../components/MainContent";
import Trend from '../components/Trend';




const WritePost = () => {
  const { colorScheme } = useMantineColorScheme();
  const { user } = useStore();
  const [visible, { toggle }] = useDisclosure(false);
  const { isPending, mutate } = useCreatePost(toast, toggle, user?.token);
  const [category, setCategory] = useState("NEWS");
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [fileURL, setFileURL] = useState("");
  const [video, setVideo] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(null);
  const theme = colorScheme === "dark";
  const [editorContent, setEditorContent] = useState("");

  const handleSubmit = async () => {
    if (!fileURL || !category || !title || !editorContent) {
      toast.error("All fields are required");
      return;
    }

    const createSlug = (title) => {
      const isKhmer = /^[\u1780-\u17FF]+$/.test(title);
      if (isKhmer) {
        return title;
      }
      return title
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");
    };

    const slug = createSlug(title);

    mutate({
      title,
      slug,
      cat: category,
      img: fileURL,
      video,
      desc: editorContent,
    });
  };

  useEffect(() => {
    if (file) {
      setIsUploading(true);
      uploadFile(setFileURL, setUploadProgress, file)
        .then(() => {
          setIsUploading(false);
          setUploadProgress(0);
          setUploadedImage(URL.createObjectURL(file));
        })
        .catch(() => setIsUploading(false));
    }
  }, [file]);

  return (
    <>
    
      <Trend setEditorContent={setEditorContent} />
      <TextInputComponent value={title} onChange={(e) => setTitle(e.target.value)} />
      <GenerateTitlesComponent topic={title} onSelectTitle={setTitle} />
      <SelectComponent value={category} onChange={(val) => setCategory(val)} />
      <VideoInputComponent
        value={video}
        onChange={(e) => setVideo(e.target.value)}
        onDelete={() => setVideo("")}
      />
      <ImageUploadComponent
        file={file}
        setFile={setFile}
        isUploading={isUploading}
        uploadedImage={uploadedImage}
        setUploadedImage={setUploadedImage}
      />
      <MainContent setEditorContent={setEditorContent} />
      <SubmitButtonComponent
        onClick={handleSubmit}
        theme={theme}
        isPending={isPending}
      />
      <Toaster richColors />
    </>
  );
};

export default WritePost;
