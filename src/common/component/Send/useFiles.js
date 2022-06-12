import { useState } from "react";

export default function useFiles(initialFiles = []) {
  const [files, setFiles] = useState(initialFiles);
  const resetFiles = () => {
    setFiles([]);
  };
  return {
    files,
    setFiles,
    resetFiles
  };
}
