import React from "react";

function NotFound() {
  console.log("not found");
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <p>The page you requested does not exist</p>
    </div>
  );
}

export default NotFound;
