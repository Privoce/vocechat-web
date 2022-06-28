import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { isObjectEqual } from "../utils";
import {
  useUpdateLoginConfigMutation,
  useUpdateSMTPConfigMutation,
  useUpdateAgoraConfigMutation,
  useUpdateFirebaseConfigMutation,
  useLazyGetFirebaseConfigQuery,
  useLazyGetAgoraConfigQuery,
  useLazyGetSMTPConfigQuery,
  useLazyGetLoginConfigQuery
} from "../../app/services/server";

// config: smtp agora login firebase
let originalValue: null | object = null;

export default function useConfig(config = "smtp") {
  const [changed, setChanged] = useState(false);
  const [values, setValues] = useState<object>({});
  const [updateLoginConfig, { isSuccess: LoginUpdated }] = useUpdateLoginConfigMutation();
  const [updateSMTPConfig, { isSuccess: SMTPUpdated }] = useUpdateSMTPConfigMutation();
  const [getAgoraConfig, { data: agoraConfig }] = useLazyGetAgoraConfigQuery();
  const [updateAgoraConfig, { isSuccess: AgoraUpdated }] = useUpdateAgoraConfigMutation();
  const [getLoginConfig, { data: loginConfig }] = useLazyGetLoginConfigQuery();
  const [getSMTPConfig, { data: smtpConfig }] = useLazyGetSMTPConfigQuery();
  const [getFirebaseConfig, { data: firebaseConfig }] = useLazyGetFirebaseConfigQuery();
  const [updateFirebaseConfig, { isSuccess: FirebaseUpdated }] = useUpdateFirebaseConfigMutation();

  // const datas = {
  //   login: {},
  //   smtp: {},
  //   agora: {},
  //   firebase: {}
  // };
  const updateFns = {
    login: updateLoginConfig,
    smtp: updateSMTPConfig,
    agora: updateAgoraConfig,
    firebase: updateFirebaseConfig
  };
  const refetchs = {
    smtp: getSMTPConfig,
    agora: getAgoraConfig,
    firebase: getFirebaseConfig,
    login: getLoginConfig
  };
  const updateds = {
    login: LoginUpdated,
    smtp: SMTPUpdated,
    agora: AgoraUpdated,
    firebase: FirebaseUpdated
  };
  // const data = datas[config];
  const updateConfig = updateFns[config];
  const refetch = refetchs[config];
  const updated = updateds[config];
  const reset = () => {
    setValues(originalValue);
  };

  const toggleEnable = () => {
    setValues((prev) => {
      return { ...prev, enabled: !prev.enabled };
    });
  };

  useEffect(() => {
    switch (config) {
      case "firebase":
        getFirebaseConfig();
        break;
      case "agora":
        getAgoraConfig();
        break;
      case "smtp":
        getSMTPConfig();
        break;
      case "login":
        getLoginConfig();
        break;

      default:
        break;
    }
  }, [config]);

  useEffect(() => {
    if (updated) {
      toast.success("Configuration Updated!");
      refetch();
    }
  }, [updated]);
  useEffect(() => {
    const _config = smtpConfig || firebaseConfig || loginConfig || agoraConfig;
    if (_config) {
      originalValue = _config;
      setValues(_config);
    }
  }, [smtpConfig, firebaseConfig, loginConfig, agoraConfig]);
  useEffect(() => {
    // 空对象
    if (Object.keys(values).length == 0) return;
    if (!isObjectEqual(originalValue, values)) {
      setChanged(true);
    } else {
      setChanged(false);
    }
  }, [values]);

  return {
    reset,
    changed,
    updateConfig,
    agoraConfig,
    values,
    setValues,
    toggleEnable
  };
}
