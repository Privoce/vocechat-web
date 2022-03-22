// import React from "react";
export default function FAQ() {
  console.log("build time", process.env);
  return <div>Build Timestamp: {process.env.REACT_APP_BUILD_TIME}</div>;
}
