import { useEffect, useState } from "react";

import {
  useGetGoogleAuthConfigQuery,
  useUpdateGoogleAuthConfigMutation
} from "@/app/services/server";

export default function useGoogleAuthConfig() {
  const [changed, setChanged] = useState(false);
  const [clientId, setClientId] = useState("");
  const { data } = useGetGoogleAuthConfigQuery(undefined, {
    refetchOnMountOrArgChange: true
  });
  const [updateGoogleAuthConfig, { isSuccess }] = useUpdateGoogleAuthConfigMutation();
  useEffect(() => {
    if (data) {
      setClientId(data.client_id);
    }
  }, [data]);

  useEffect(() => {
    setChanged(isSuccess ? false : data?.client_id !== clientId);
  }, [data, clientId, isSuccess]);

  const updateClientIdToServer = async () => {
    if (!clientId) return;
    await updateGoogleAuthConfig({ client_id: clientId });
  };

  return {
    config: data,
    changed,
    clientId,
    updateClientId: setClientId,
    updateClientIdToServer,
    updateGoogleAuthConfig,
    isSuccess
  };
}
