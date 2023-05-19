import { useEffect, useState } from "react";

import {
  useGetGithubAuthConfigQuery,
  useUpdateGithubAuthConfigMutation
} from "@/app/services/server";
import { GithubAuthConfig } from "@/types/server";

export default function useGithubAuthConfig() {
  const [changed, setChanged] = useState(false);
  const [config, setConfig] = useState<GithubAuthConfig | undefined>();
  const { data } = useGetGithubAuthConfigQuery(undefined, {
    refetchOnMountOrArgChange: true
  });
  const [updateAuthConfig, { isSuccess }] = useUpdateGithubAuthConfigMutation();
  useEffect(() => {
    if (data) {
      setConfig(data);
    }
  }, [data]);

  useEffect(() => {
    setChanged(isSuccess ? false : JSON.stringify(data) !== JSON.stringify(config));
  }, [data, config, isSuccess]);
  const updateGithubAuthConfig = (obj: Partial<GithubAuthConfig>) => {
    setConfig((prev) => {
      if (prev) {
        return { ...prev, ...obj };
      }
      return obj;
    });
  };
  const updateGithubAuthConfigToServer = async () => {
    if (config) {
      await updateAuthConfig(config);
    }
  };
  return {
    config,
    changed,
    updateGithubAuthConfig,
    updateGithubAuthConfigToServer,
    isSuccess
  };
}
