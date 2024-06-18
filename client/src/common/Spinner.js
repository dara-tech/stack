// Spinner.js
import React from "react";
import PropTypes from "prop-types";

const Spinner = ({ size, color }) => {
  return (
    <div
      className={`spinner-ring spinner-ring-${color} ${size && `spinner-${size}`} position-absolute top-0 start-0 bottom-0 end-0 d-flex justify-content-center align-items-center`}
      role="status"
    >
    </div>
  );
};

Spinner.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"]), // Size of the spinner (optional)
  color: PropTypes.string, // Color of the spinner (optional)
};

Spinner.defaultProps = {
  size: "md", // Default size is medium
  color: "primary", // Default color is primary
};

export default Spinner;
