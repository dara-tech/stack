import React, { useState, useEffect } from "react";
import {
  Button,
  LoadingOverlay,
  Tooltip,
  Notification,
  TextInput,
  NumberInput,
  Group,
  CopyButton,
  ActionIcon,
  Select,
  Progress,
  Container,
} from "@mantine/core";
import { Check, X, Copy, Refresh, Trash } from "tabler-icons-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const GenerateTitlesComponent = ({ topic, onSelectTitle }) => {
  const [generatedTitles, setGeneratedTitles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [titleCount, setTitleCount] = useState(5);
  const [context, setContext] = useState("");
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [model, setModel] = useState("gemini-1.5-flash");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Clear titles and selected title on initial component mount
    setGeneratedTitles([]);
    setSelectedTitle(null);
    localStorage.removeItem("selectedTitle");
  }, []);

  useEffect(() => {
    const savedTitle = localStorage.getItem("selectedTitle");
    if (savedTitle) {
      setSelectedTitle(savedTitle);
      onSelectTitle(savedTitle);
    }
  }, [onSelectTitle]);

  const simulateProgress = () => {
    setProgress(0);
    for (let i = 0; i <= 100; i += 10) {
      setTimeout(() => setProgress(i), i * 50);
    }
  };

  const generateContent = async () => {
    if (!topic) {
      setError("Please enter a topic before generating titles.");
      return;
    }

    setLoading(true);
    setError(null);
    simulateProgress();

    try {
      const modelInstance = genAI.getGenerativeModel({ model });
      const prompt = `Generate ${titleCount} advanced blog post titles for: ${topic}. ${
        context ? `Context: ${context}` : ""
      }`;

      const result = await modelInstance.generateContent(prompt);
      const response = result.response;
      const text = await response.text();

      const titles = text.split("\n").filter((title) => title.trim() !== "");
      setGeneratedTitles(titles);
      setSelectedTitle(null);
    } catch (error) {
      console.error("Error generating content:", error);
      setError("Failed to generate content. Please try again.");
    } finally {
      setLoading(false);
      setProgress(100);
    }
  };

  const handleTitleSelect = (title) => {
    const formattedTitle = title.replace(/^\d+\.\s*/, "").replace(/\*\*/g, "");
    setSelectedTitle(formattedTitle);
    onSelectTitle(formattedTitle);
    localStorage.setItem("selectedTitle", formattedTitle);
  };

  const handleClearTitles = () => {
    setGeneratedTitles([]);
    setSelectedTitle(null);
    localStorage.removeItem("selectedTitle");
  };

  const parseBoldText = (text) =>
    text.split("**").map((chunk, index) => <span key={index}>{chunk}</span>);

  return (
    <Container className="w-full flex flex-col">
      <Group direction="column" spacing="sm">
        <TextInput
          placeholder="Enter context (optional)"
          value={context}
          onChange={(event) => setContext(event.currentTarget.value)}
          label="Context"
          className="mt-2"
        />
        <NumberInput
          value={titleCount}
          onChange={(value) => setTitleCount(value)}
          label="Number of Titles"
          min={1}
          max={20}
          className="mt-2 max-w-fit"
        />
        <Select
          label="Select Model"
          placeholder="Pick one"
          value={model}
          onChange={setModel}
          data={[
            { value: "gemini-1.5-flash", label: "Gemini 1.5 Flash" },
            { value: "gemini-1.5-pro", label: "Gemini 1.5 Pro" },
          ]}
          className="lg:mt-2 md:mt-2"
        />
        <Group position="apart" grow>
          <Button
            onClick={generateContent}
            className="lg:mt-2 md:mt-6 max-w-fit relative"
          >
            Generate Titles
            <LoadingOverlay visible={loading} />
          </Button>
          <Button
            onClick={handleClearTitles}
            color="red"
            variant="outline"
            leftIcon={<Trash size={16} />}
            disabled={!generatedTitles.length}
            className="lg:mt-2 md:mt-2"
          >
            Clear Titles
          </Button>
        </Group>
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
      {loading && <Progress value={progress} mt="sm" animate />}
      {generatedTitles.length > 0 && (
        <div className="mt-4 px-3 ">
          {generatedTitles.map((title, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.5em 0",
              }}
            >
              <span
                style={{ flexGrow: 1, cursor: "pointer" }}
                onClick={() => handleTitleSelect(title)}
              >
                {parseBoldText(title)}
              </span>
              <CopyButton value={title}>
                {({ copied, copy }) => (
                  <Tooltip label={copied ? "Copied" : "Copy"} withArrow>
                    <ActionIcon
                      onClick={copy}
                      color={copied ? "teal" : "gray"}
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
            </div>
          ))}
          <Button
            onClick={generateContent}
            variant="light"
            leftIcon={<Refresh size={16} />}
            fullWidth
            mt="sm"
          >
            Regenerate Titles
          </Button>
        </div>
      )}
      <style jsx>{`
        .mantine-RadioGroup-radioWrapper {
          margin-bottom: 8px;
        }
        .mantine-RadioGroup-root {
          padding-bottom: 16px;
        }
      `}</style>
    </Container>
  );
};

export default GenerateTitlesComponent;
