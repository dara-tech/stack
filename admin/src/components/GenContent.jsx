import React, { useState, useEffect, useCallback } from "react";
import { Button, Notification, TextInput, Group, LoadingOverlay, Text } from "@mantine/core";
import { X, Refresh, Copy, Check } from "tabler-icons-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import EditorComponent from "./EditorComponent";

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const GenContent = ({ title, setEditorContent }) => {
  const [generatedContent, setGeneratedContent] = useState("");
  const [error, setError] = useState(null);
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [generationCount, setGenerationCount] = useState(0);
  const [copySuccess, setCopySuccess] = useState(false);

  const generateContent = useCallback(async () => {
    if (!title) {
      setError("Please select a title before generating content.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Generate a detailed content based on the title: "${title}". ${context ? `Context: ${context}` : ""}`;
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = await response.text();

      setGeneratedContent(text);
      setEditorContent(text);
      setGenerationCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error("Error generating content:", error);
      setError("Failed to generate content. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [title, context, setEditorContent]);

  useEffect(() => {
    if (title) {
      generateContent();
    }
  }, [title, generateContent]);

  const filterAndStyleContent = (content) => {
    const filteredContent = content
      .replace(/##(.*?)##/g, (match, p1) => `<strong>${p1}</strong>`)
      .replace(/\*\*(.*?)\*\*/g, (match, p1) => `<li>${p1}</li>`)
      .replace(/[#*]/g, '');

    return filteredContent;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }).catch(() => {
      Notification.error({
        title: "Copy Failed",
        message: "Failed to copy content to clipboard.",
        icon: <X size={18} />,
      });
    });
  };

  return (
    <div className="w-full px-4 relative">
      <Group direction="column" spacing="sm">
        <TextInput
          placeholder="Enter context (optional)"
          value={context}
          onChange={(event) => setContext(event.currentTarget.value)}
          label="Context"
          className="mt-2"
        />
        <Button
          onClick={generateContent}
          className="lg:mt-8 md:mt-8 max-w-fit relative"
        >
          Generate Content
          {loading && (
            <LoadingOverlay visible={loading} color="#ffffff" opacity={0.7}>
              <div className="loading-spinner"></div>
            </LoadingOverlay>
          )}
        </Button>
      </Group>
      {error && (
        <Notification
          icon={<X size={18} />}
          color="red"
          title="Error"
          disallowClose
        >
          {error}
          <Button
            onClick={generateContent}
            size="xs"
            color="red"
            variant="light"
            mt="sm"
          >
            Retry
          </Button>
        </Notification>
      )}
      <div className="editor-wrapper">
        <EditorComponent
          initialContent={filterAndStyleContent(generatedContent)}
          setEditorContent={setGeneratedContent}
        />
      </div>
      <Button
        onClick={generateContent}
        variant="light"
        leftIcon={<Refresh size={16} />}
        fullWidth
        mt="sm"
      >
        Regenerate Content
      </Button>
      <Button
        onClick={copyToClipboard}
        variant="light"
        leftIcon={copySuccess ? <Check size={16} /> : <Copy size={16} />}
        fullWidth
        mt="sm"
        color={copySuccess ? "green" : "blue"}
      >
        {copySuccess ? "Copied" : "Copy Content"}
      </Button>
      <Text mt="sm">Generation Count: {generationCount}</Text>
      <style jsx>{`
        .editor-wrapper {
          margin-top: 20px;
        }

        .loading-spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-top: 4px solid #fff;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
          margin: auto;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default GenContent;
