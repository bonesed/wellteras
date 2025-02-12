import React from "react";

function CustomError({ statusCode }) {
  return (
    <div>
      <h1>Error {statusCode}</h1>
      <p>Something went wrong. Please check the console for more details.</p>
    </div>
  );
}

CustomError.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  console.error("Custom Error Page - Error details:", err);
  return { statusCode };
};

export default CustomError;
