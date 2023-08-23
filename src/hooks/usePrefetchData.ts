// import React from 'react'

import { useLazyGetInitializedQuery } from "@/app/services/auth";
import { useLazyGetLoginConfigQuery } from "@/app/services/server";
import { useEffect } from "react";

// type Props = {}

const usePrefetchData = () => {
  const [loadLoginConfig] = useLazyGetLoginConfigQuery();
  const [loadOnboardingSetting] = useLazyGetInitializedQuery();
  useEffect(() => {
    loadLoginConfig();
    loadOnboardingSetting();
  }, []);

  return null;
};

export default usePrefetchData;
