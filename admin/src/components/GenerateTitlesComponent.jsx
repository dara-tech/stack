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
  ActionIcon
} from "@mantine/core";
import { Check, X, Copy, Refresh, Trash } from "tabler-icons-react"; // Added Trash icon
import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key directly.
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(apiKey);

const GenerateTitlesComponent = ({ topic, onSelectTitle }) => {
  const [generatedTitles, setGeneratedTitles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [titleCount, setTitleCount] = useState(5);
  const [context, setContext] = useState("");
  const [selectedTitle, setSelectedTitle] = useState(null);

  useEffect(() => {
    const savedTitle = localStorage.getItem("selectedTitle");
    if (savedTitle) {
      setSelectedTitle(savedTitle);
      onSelectTitle(savedTitle);
    }
  }, [onSelectTitle]);

  const generateContent = async () => {
    if (!topic) {
      setError("Please enter a topic before generating titles.");
      return;
    }
 
    setLoading(true);
    setError(null);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Generate ${titleCount} advanced blog post titles for: ${topic}. ${
        context ? `Context: ${context}` : ""
      }`;
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = await response.text(); 

      let titles = text.split("\n").filter(title => title.trim() !== ""); // Split and filter non-empty titles
      setGeneratedTitles(titles);
      setSelectedTitle(null); // Reset selected title on new generation
    } catch (error) {
      console.error("Error generating content:", error);
      setError("Failed to generate content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTitleSelect = (title) => {
    const formattedTitle = title.replace(/^\d+\.\s*/, '').replace(/\*\*/g, ''); // Remove the number at the beginning and asterisks
    setSelectedTitle(formattedTitle);
    onSelectTitle(formattedTitle);
    localStorage.setItem("selectedTitle", formattedTitle);
  };

  const handleClearTitles = () => {
    setGeneratedTitles([]);
    setSelectedTitle(null);
    localStorage.removeItem("selectedTitle");
  };

  const parseBoldText = (text) => {
    return text.split("**").map((chunk, index) => {
      return <span key={index}>{chunk}</span>;
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
        <NumberInput
          value={titleCount}
          onChange={(value) => setTitleCount(value)}
          label="Number of Titles"
          min={1}
          max={20}
          className="mt-2"
        />
        <Group position="apart" grow>
        <Button onClick={generateContent} className="lg:mt-8 md:mt-8 max-w-fit relative">
  Generate Titles
  <LoadingOverlay visible={loading} />
</Button>

         
         
          <Button
            onClick={handleClearTitles}
            color="red"
            variant="outline"
            leftIcon={<Trash size={16} />}
            disabled={!generatedTitles.length}
            className="lg:mt-8 md:mt-8"
          > 
            Clear Titles
          </Button>
        </Group>
      </Group>
      {error && (
        <Notification icon={<X size={18} />} color="red" title="Error" disallowClose>
          {error}
          <Button onClick={generateContent} size="xs" color="red" variant="light" mt="sm">
            Retry
          </Button>
        </Notification>
      )}
      {generatedTitles.length > 0 && (
        <div className="mt-4 px-3 ">
          {generatedTitles.map((title, index) => (
            <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span 
                style={{ flexGrow: 1, cursor: "pointer" }}
                onClick={() => handleTitleSelect(title)}
              >
                {parseBoldText(title)}
              </span>
              <CopyButton value={title}>
                {({ copied, copy }) => (
                  <ActionIcon onClick={copy} color={copied ? "teal" : "gray"} >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </ActionIcon>
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
    </div>
  );
};

export default GenerateTitlesComponent;
