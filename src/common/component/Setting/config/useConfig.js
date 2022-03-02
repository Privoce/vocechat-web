import { useEffect, useState } from "react";
import { isObjectEqual } from "../../../utils";
import toast from "react-hot-toast";
import {
  useGetAgoraConfigQuery,
  useGetFirebaseConfigQuery,
  useGetSMTPConfigQuery,
  useUpdateSMTPConfigMutation,
  useUpdateAgoraConfigMutation,
  useUpdateFirebaseConfigMutation,
} from "../../../../app/services/server";
export default function useConfig(config = "smtp") {
  const [changed, setChanged] = useState(false);
  const [values, setValues] = useState({});
  const { data: SMTP, refetch: refetchSMTP } = useGetSMTPConfigQuery();
  const [
    updateSMTPConfig,
    { isSuccess: SMTPUpdated },
  ] = useUpdateSMTPConfigMutation();
  const { data: Agora, refetch: refetchAgora } = useGetAgoraConfigQuery();
  const [
    updateAgoraConfig,
    { isSuccess: AgoraUpdated },
  ] = useUpdateAgoraConfigMutation();
  const {
    data: Firebase,
    refetch: refetchFirebase,
  } = useGetFirebaseConfigQuery();
  const [
    updateFirebaseConfig,
    { isSuccess: FirebaseUpdated },
  ] = useUpdateFirebaseConfigMutation();

  const datas = {
    smtp: SMTP,
    agora: Agora,
    firebase: Firebase,
  };
  const updateFns = {
    smtp: updateSMTPConfig,
    agora: updateAgoraConfig,
    firebase: updateFirebaseConfig,
  };
  const refetchs = {
    smtp: refetchSMTP,
    agora: refetchAgora,
    firebase: refetchFirebase,
  };
  const updateds = {
    smtp: SMTPUpdated,
    agora: AgoraUpdated,
    firebase: FirebaseUpdated,
  };
  const data = datas[config];
  const updateConfig = updateFns[config];
  const refetch = refetchs[config];
  const updated = updateds[config];
  const reset = () => {
    setValues(data ?? {});
  };

  const toggleEnable = () => {
    setValues((prev) => {
      return { ...prev, enabled: !prev.enabled };
    });
  };
  useEffect(() => {
    if (updated) {
      toast.success("Configuration Updated!");
      refetch();
    }
  }, [updated]);
  useEffect(() => {
    console.log("wtf", data);
    // if (data) {
    setValues(data ?? {});
    // }
  }, [data]);
  useEffect(() => {
    // if (data && values) {
    if (!isObjectEqual(data, values)) {
      setChanged(true);
    } else {
      setChanged(false);
    }
    // }
  }, [data, values]);
  return {
    reset,
    changed,
    updateConfig,
    values,
    setValues,
    toggleEnable,
  };
}
