import React from "react";
import { Card, Image, Text } from "@mantine/core";

const TrendingArticleCard = ({ article }) => {
  return (
    <Card shadow="sm" padding="lg" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {article.imageUrl && (
        <div style={{ marginBottom: "10px" }}>
          <Image
            src={article.imageUrl}
            alt="Generated content image"
            height={120} // Adjust the height of the image as needed
            radius="lg" // Apply border-radius for a nicer look
          />
        </div>
      )}
      <Text align="center" style={{ marginTop: "10px" }}>
        {article.text.substring(0, 30)} {/* Limiting to 30 words */}
      </Text>
    </Card>
  );
};

export default TrendingArticleCard;
