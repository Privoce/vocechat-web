import React from "react";

export default function Audio({ url = "" }) {
  if (!url) return null;
  return <audio src={url} />;
}
