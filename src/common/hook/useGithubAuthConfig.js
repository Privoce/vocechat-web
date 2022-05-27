import { useState, useEffect } from "react";
// import toast from "react-hot-toast";
import {
  useGetGithubAuthConfigQuery,
  useUpdateGithubAuthConfigMutation,
} from "../../app/services/server";
export default function useGithubAuthConfig() {
  const [changed, setChanged] = useState(false);
  const [config, setConfig] = useState({});
  const { data } = useGetGithubAuthConfigQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateAuthConfig, { isSuccess }] = useUpdateGithubAuthConfigMutation();
  useEffect(() => {
    if (data) {
      setConfig(data);
    }
  }, [data]);

  useEffect(() => {
    setChanged(
      isSuccess ? false : JSON.stringify(data) !== JSON.stringify(config)
    );
  }, [data, config, isSuccess]);
  const updateGithubAuthConfig = (obj) => {
    setConfig((prev) => {
      return { ...prev, ...obj };
    });
  };
  const updateGithubAuthConfigToServer = async () => {
    await updateAuthConfig(config);
  };
  return {
    config,
    changed,
    updateGithubAuthConfig,
    updateGithubAuthConfigToServer,
    isSuccess,
  };
}
