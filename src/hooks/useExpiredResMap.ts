import { useLocalstorageState } from "rooks";

const LOCAL_KEY = `EXPIRED_FILES_MAP`;
const useExpiredResMap = () => {
  const [map, setMap, remove] = useLocalstorageState(LOCAL_KEY, {} as Record<string, number>);
  const setExpired = (url: string) => {
    const key = new URL(url).searchParams.get("file_path");
    if (!key || map[key]) return;
    setMap((prev) => {
      return { ...prev, [key]: Date.now() };
    });
  };
  const isExpired = (url: string) => {
    const key = new URL(url).searchParams.get("file_path");
    if (!key || !map[key]) return false;
    return true;
  };
  // const removeFromExpired = (key: string) => {
  //   setMap((prev) => {
  //     const { [key]: _, ...rest } = prev;
  //     return rest;
  //   });
  // };
  const clearExpired = () => {
    remove();
  };

  return { setExpired, isExpired, clearExpired };
};
export default useExpiredResMap;
