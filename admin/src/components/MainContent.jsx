import React, { useState } from "react";
import GenerateTitlesComponent from "./GenerateTitlesComponent";
import GenContent from "./GenContent";

const MainComponent = ({ initialTopic = "Your topic here", setEditorContent }) => {
  const [selectedTitle, setSelectedTitle] = useState("");

  const handleSelectTitle = (title) => {
    setSelectedTitle(title);
  };

  const handleReset = () => {
    setSelectedTitle("");
  };

  return (
    <div className="main-component">
      {selectedTitle ? (
        <GenContent
          title={selectedTitle}
          setEditorContent={setEditorContent}
          onReset={handleReset}
        />
      ) : (
        <GenerateTitlesComponent
          topic={initialTopic}
          onSelectTitle={handleSelectTitle}
        />
      )}
    </div>
  );
};

export default MainComponent;
