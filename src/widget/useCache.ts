import { useEffect } from "react";

import initCache, { useRehydrate } from "../app/cache";

export default function useCache() {
  const { rehydrate, rehydrated } = useRehydrate();
  useEffect(() => {
    initCache();
    rehydrate();
  }, []);

  return {
    rehydrated
  };
}
