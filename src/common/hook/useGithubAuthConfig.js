import { useState, useEffect } from "react";
// import toast from "react-hot-toast";
import {
  useGetGithubAuthConfigQuery,
  useUpdateGithubAuthConfigMutation,
} from "../../app/services/server";
export default function useGithubAuthConfig() {
  const [changed, setChanged] = useState(false);
  const [clientId, setClientId] = useState("");
  const { data } = useGetGithubAuthConfigQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [
    updateGithubAuthConfig,
    { isSuccess },
  ] = useUpdateGithubAuthConfigMutation();
  useEffect(() => {
    if (data) {
      setClientId(data.client_id);
    }
  }, [data]);

  useEffect(() => {
    setChanged(isSuccess ? false : data?.client_id !== clientId);
  }, [data, clientId, isSuccess]);

  return {
    config: data,
    changed,
    clientId,
    updateClientId: setClientId,
    updateGithubAuthConfig,
    isSuccess,
  };
}
