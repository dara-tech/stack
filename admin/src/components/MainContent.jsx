import React, { useState } from "react";
import GenerateTitlesComponent from "./GenerateTitlesComponent";
import GenContent from "./GenContent";

const MainComponent = ({ setEditorContent }) => {
  const [selectedTitle, setSelectedTitle] = useState("");

  const handleSelectTitle = (title) => {
    setSelectedTitle(title);
  };

  return (
    <div className="main-component">
      {!selectedTitle && <GenerateTitlesComponent topic="Your topic here" onSelectTitle={handleSelectTitle} />}
      {selectedTitle && <GenContent title={selectedTitle} setEditorContent={setEditorContent} />}
    </div>
  );
};

export default MainComponent;
