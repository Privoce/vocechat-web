import { useGetSystemCommonQuery, useUpdateSystemCommonMutation } from "@/app/services/server";
import { useAppSelector } from "@/app/store";
import { getJSONField, upsertJSON } from "@/utils";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { shallowEqual } from "react-redux";

// type Props = {};

const useServerExtSetting = (config?: { successTip?: boolean; key?: string }) => {
  const { t } = useTranslation();
  const _config = Object.assign({}, { successTip: true, key: "" }, config);
  const { refetch } = useGetSystemCommonQuery();
  const [updateSetting, { isSuccess }] = useUpdateSystemCommonMutation();

  const jsonSetting = useAppSelector((store) => store.server.ext_setting ?? "{}", shallowEqual);
  let setting = {};
  try {
    setting = JSON.parse(jsonSetting);
  } catch (error) {}
  const defaultValueMap = {
    string: "",
    boolean: false
  };
  const getExtSetting = (key?: string, type?: "string" | "boolean") => {
    const _key = key ?? _config.key;
    const _type = type ?? "boolean";
    return getJSONField(jsonSetting, _key) ?? defaultValueMap[_type];
  };
  const updateExtSetting = (key: string, value: any) => {
    const json = upsertJSON(jsonSetting, { [key]: value });
    updateSetting({ ext_setting: json });
  };
  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccess && _config.successTip) {
      toast.success(t("tip.update"));
    }
  }, [isSuccess, _config.successTip]);

  return {
    jsonSetting,
    setting,
    getExtSetting,
    updateExtSetting
  };
};

export default useServerExtSetting;
