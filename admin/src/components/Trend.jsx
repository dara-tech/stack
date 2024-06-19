import React, { useState, useEffect, useCallback } from "react";
import { Button, Notification, Group, LoadingOverlay, Text, NumberInput, TextInput, Grid } from "@mantine/core";
import { X, Refresh, Copy, Check } from "tabler-icons-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const Trend = ({ setEditorContent }) => {
  const [trendingNews, setTrendingNews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [numArticles, setNumArticles] = useState(5);
  const [context, setContext] = useState("");

  const generateTrendingContent = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompts = Array.from({ length: numArticles }, (_, index) => {
        return `Generate detailed content based on the latest trending trading news ${index + 1}. ${context ? `Context: ${context}` : ""}`;
      });

      const promises = prompts.map(async (prompt, index) => {
        try {
          const result = await model.generateContent(prompt);
          const response = result.response;
          const text = await response.text();

          const imageUrl = `https://picsum.photos/200/300?random=${index}`;
          return { text, imageUrl };
        } catch (error) {
          console.error(`Error generating content for prompt ${index}:`, error);
          return { text: `Error generating content for prompt ${index}`, imageUrl: null };
        }
      });

      const articles = await Promise.all(promises);
      setTrendingNews(articles);
      setEditorContent(articles.map(article => article.text).join("\n\n"));
    } catch (error) {
      console.error("Error generating content:", error);
      setError("Failed to generate content. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [numArticles, context, setEditorContent]);

  useEffect(() => {
    generateTrendingContent();
  }, [generateTrendingContent]);

  const copyToClipboard = useCallback(() => {
    const combinedContent = trendingNews.map(article => article.text).join("\n\n");
    navigator.clipboard.writeText(combinedContent).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }).catch(() => {
      console.error("Failed to copy content to clipboard.");
      setError("Failed to copy content to clipboard. Please try again.");
    });
  }, [trendingNews]);

  const handleRetry = useCallback(() => {
    setError(null);
    generateTrendingContent();
  }, [generateTrendingContent]);

  return (
    <div className="w-full px-4 relative">
      <Group direction="column" spacing="sm">
        <NumberInput
          value={numArticles}
          onChange={setNumArticles}
          label="Number of Articles"
          min={1}
          max={10}
          className="mt-2"
        />
        <TextInput
          placeholder="Enter context (optional)"
          value={context}
          onChange={(event) => setContext(event.currentTarget.value)}
          label="Context"
          className="mt-2"
        />
        <Button
          onClick={generateTrendingContent}
          className="lg:mt-8 md:mt-8 max-w-fit relative"
          disabled={loading}
        >
          {loading ? (
            <>
              Generating... <LoadingOverlay visible={loading} color="#ffffff" opacity={0.7} />
            </>
          ) : (
            "Generate Trending Content"
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
            onClick={handleRetry}
            size="xs"
            color="red"
            variant="light"
            mt="sm"
          >
            Retry
          </Button>
        </Notification>
      )}
      <Grid gutter="lg" mt="lg">
        {trendingNews.map((article, index) => (
          <Grid.Col span={4} key={index}>
            <div className="card-container">
              {article.imageUrl && (
                <img src={article.imageUrl} alt="Generated content" className="card-image" />
              )}
              <Text className="card-text">{article.text.substring(0, 150)}</Text>
            </div>
          </Grid.Col>
        ))}
      </Grid>
      <Button
        onClick={generateTrendingContent}
        variant="light"
        leftIcon={<Refresh size={16} />}
        fullWidth
        mt="sm"
        disabled={loading}
      >
        Regenerate Trending Content
      </Button>
      <Button
        onClick={copyToClipboard}
        variant="light"
        leftIcon={copySuccess ? <Check size={16} /> : <Copy size={16} />}
        fullWidth
        mt="sm"
        color={copySuccess ? "green" : "blue"}
        disabled={trendingNews.length === 0}
      >
        {copySuccess ? "Copied" : "Copy Content"}
      </Button>
      <Text mt="sm">Number of Articles: {trendingNews.length}</Text>
      <style jsx>{`
        .card-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 16px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          background-color: #ffffff;
          margin-bottom: 16px;
        }

        .card-image {
          width: 100%;
          height: auto;
          border-radius: 8px;
          margin-bottom: 12px;
        }

        .card-text {
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3; /* Number of lines to show */
          -webkit-box-orient: vertical;
        }
      `}</style>
    </div>
  );
};

export default Trend;
