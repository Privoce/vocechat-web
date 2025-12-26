import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { isEqual } from "lodash";

import {
  useGetAgoraConfigQuery,
  useGetFirebaseConfigQuery,
  useGetLoginConfigQuery,
  useGetSMTPConfigQuery,
  useGetVocespaceConfigQuery,
  useUpdateAgoraConfigMutation,
  useUpdateFirebaseConfigMutation,
  useUpdateLoginConfigMutation,
  useUpdateSMTPConfigMutation,
  useUpdateVocespaceConfigMutation,
} from "@/app/services/server";
import {
  AgoraConfig,
  FirebaseConfig,
  LoginConfig,
  SMTPConfig,
  VocespaceConfig,
} from "@/types/server";

// config: smtp agora login firebase
type ConfigType = "smtp" | "agora" | "login" | "firebase" | "vocespace";
type ConfigMap = Record<
  ConfigType,
  AgoraConfig | FirebaseConfig | LoginConfig | SMTPConfig | VocespaceConfig
>;
type valuesOf<T> = T[keyof T];
let originalValue: valuesOf<ConfigMap> | undefined = undefined;
// type valueOf<T,config as ConfigType> = T[config];
export default function useConfig(config: keyof ConfigMap = "smtp") {
  const { t: ct } = useTranslation();
  const [changed, setChanged] = useState(false);
  const [values, setValues] = useState<valuesOf<ConfigMap> | undefined>(undefined);
  const [updateLoginConfig, { isSuccess: LoginUpdated, isLoading: LoginUpdating }] =
    useUpdateLoginConfigMutation();
  const [updateSMTPConfig, { isSuccess: SMTPUpdated, isLoading: SMTPUpdating }] =
    useUpdateSMTPConfigMutation();
  const [updateAgoraConfig, { isSuccess: AgoraUpdated, isLoading: AgoraUpdating }] =
    useUpdateAgoraConfigMutation();
  const [updateVocespaceConfig, { isSuccess: VocespaceUpdated, isLoading: VocespaceUpdating }] =
    useUpdateVocespaceConfigMutation();
  const [updateFirebaseConfig, { isSuccess: FirebaseUpdated, isLoading: FirebaseUpdating }] =
    useUpdateFirebaseConfigMutation();
  const { refetch: getAgoraConfig, data: agoraConfig } = useGetAgoraConfigQuery(undefined, {
    skip: config !== "agora",
  });
  const { refetch: getVocespaceConfig, data: vocespaceConfig } = useGetVocespaceConfigQuery(
    undefined,
    {
      skip: config !== "vocespace",
    }
  );
  const { refetch: getLoginConfig, data: loginConfig } = useGetLoginConfigQuery(undefined, {
    skip: config !== "login",
  });
  const { refetch: getSMTPConfig, data: smtpConfig } = useGetSMTPConfigQuery(undefined, {
    skip: config !== "smtp",
  });
  const { refetch: getFirebaseConfig, data: firebaseConfig } = useGetFirebaseConfigQuery(
    undefined,
    {
      skip: config !== "firebase",
    }
  );

  const updateFns = {
    login: updateLoginConfig,
    smtp: updateSMTPConfig,
    agora: updateAgoraConfig,
    firebase: updateFirebaseConfig,
    vocespace: updateVocespaceConfig,
  };
  const requests = {
    smtp: getSMTPConfig,
    agora: getAgoraConfig,
    firebase: getFirebaseConfig,
    login: getLoginConfig,
    vocespace: getVocespaceConfig,
  };
  const updates = {
    login: LoginUpdated,
    smtp: SMTPUpdated,
    agora: AgoraUpdated,
    firebase: FirebaseUpdated,
    vocespace: VocespaceUpdated,
  };
  const updatings = {
    login: LoginUpdating,
    smtp: SMTPUpdating,
    agora: AgoraUpdating,
    firebase: FirebaseUpdating,
    vocespace: VocespaceUpdating,
  };
  const updateConfig = updateFns[config];
  const refetch = requests[config];
  const updated = updates[config];
  const updating = updatings[config];
  const reset = () => {
    setValues(originalValue ? { ...originalValue } : undefined);
  };

  const toggleEnable = () => {
    setValues((prev) => {
      if (prev && "enabled" in prev) {
        return { ...prev, enabled: !prev.enabled };
      }
      return prev;
    });
  };

  useEffect(() => {
    if (updated) {
      toast.success(ct("tip.update"));
      // setChanged(false);
      refetch();
    }
  }, [updated]);
  useEffect(() => {
    const _config = smtpConfig || firebaseConfig || loginConfig || agoraConfig || vocespaceConfig;
    if (_config) {
      originalValue = _config;
      setValues(_config);
    }
  }, [smtpConfig, firebaseConfig, loginConfig, agoraConfig, vocespaceConfig]);
  useEffect(() => {
    // 空对象
    if (!values || Object.keys(values).length == 0) return;
    if (!isEqual(originalValue, values)) {
      setChanged(true);
    } else {
      setChanged(false);
    }
  }, [values]);

  return {
    originalValues: originalValue,
    updating,
    updated,
    reset,
    changed,
    updateConfig,
    agoraConfig,
    values,
    setValues,
    toggleEnable,
    refetch,
  };
}
