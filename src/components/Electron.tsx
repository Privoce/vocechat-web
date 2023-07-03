import { useEffect } from "react";

// type Props = {};

const Electron = () => {
  useEffect(() => {
    if (window.electron === undefined) return;
    const handleData = (_: any, arg: any) => {
      console.log("electron msg", arg);
    };
    console.log("ttttt", window.electron.process.platform);
    window.electron.ipcRenderer.on("server-name-popover", handleData);
  }, []);

  return null;
};

export default Electron;
