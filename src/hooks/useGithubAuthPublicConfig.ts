import { useEffect, useState } from "react";
import {
  useGetGithubAuthPublicConfigQuery,
  useGetGithubAuthConfigQuery
} from "@/app/services/server";

export default function useGithubAuthPublicConfig() {
  const [shouldUseFallback, setShouldUseFallback] = useState(false);

  // Try public config first
  const { data: publicData, error: publicError } = useGetGithubAuthPublicConfigQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: shouldUseFallback
  });

  // Fallback to old config endpoint if public config returns 404
  const { data: fallbackData, error: fallbackError } = useGetGithubAuthConfigQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: !shouldUseFallback
  });

  useEffect(() => {
    // If public config returns 404, switch to fallback
    if (publicError && 'status' in publicError && publicError.status === 404) {
      setShouldUseFallback(true);
    }
  }, [publicError]);

  // Use public data if available, otherwise use fallback data
  // Ignore fallback errors (401 means new server requiring auth, 404 means very old server)
  const data = shouldUseFallback ? fallbackData : publicData;

  return {
    clientId: data?.client_id || ""
  };
}
