import React from 'react';
import { Button } from '@mantine/core';
import Loading from './Loading'; // Adjust the path if necessary

const SubmitButtonComponent = ({ isPending, theme, onClick }) => {
  return (
    <div className="w-full flex items-end justify-end mt-6">
      <Button
        className={theme ? "bg-blue-600" : "bg-black"}
        onClick={onClick}
        disabled={isPending}
        variant="filled" // Added variant
        color={theme ? "blue" : "gray"} // Adjust color based on theme
      >
        {isPending ? <Loading /> : 'Submit Post'}
      </Button>
    </div>
  );
};

export default SubmitButtonComponent;
