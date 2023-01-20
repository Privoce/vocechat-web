import { FC, useEffect } from "react";
import useStreaming from "../hook/useStreaming";
// import clsx from "clsx";
import Button from "./styled/Button";

interface Props {
}

const InactiveScreen: FC<Props> = () => {
  const { stopStreaming } = useStreaming();
  // const [reloadVisible, setReloadVisible] = useState(false);
  useEffect(() => {
    stopStreaming();
    const currTitle = document.title;
    document.title = `[INACTIVE] ${currTitle}`;
    return () => {
      document.title = currTitle;
    };
  }, []);
  const handleReload = () => {
    location.reload();
  };
  return (
    <div className="w-screen h-screen bg-orange-200/50 flex justify-center items-center text-4xl font-bold">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-bold">Only one active tab is allowed for VoceChat</h1>
        <p className="text-gray-400 text-base font-semibold" >Please reload this page to continue using this tab or close it</p>
        <Button className="mt-4" onClick={handleReload}>RELOAD</Button>
      </div>

    </div>
  );
};

export default InactiveScreen;
