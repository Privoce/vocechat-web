import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { useUpdateAutoDeleteMsgMutation } from "@/app/services/user";
import { useLazyClearChannelMessageQuery } from "../app/services/channel";
import { useAppSelector } from "../app/store";
import { ChatContext } from "../types/common";
import SaveTip from "./SaveTip";
import StyledButton from "./styled/Button";
import StyledRadio from "./styled/Radio";
import { shallowEqual } from "react-redux";

type Props = {
  id: number;
  type?: ChatContext;
  // expires_in?: number
};
const AutoDeleteMessages = ({ id, type = "channel" }: Props) => {
  const setting = useAppSelector(
    (store) =>
      type == "channel"
        ? store.footprint.autoDeleteMsgChannels.find((item) => item.gid == id)
        : store.footprint.autoDeleteMsgUsers.find((item) => item.uid == id),
    shallowEqual
  );
  const loginUser = useAppSelector((store) => store.authData.user, shallowEqual);
  const channel = useAppSelector(
    (store) => (type == "channel" ? store.channels.byId[id] : null),
    shallowEqual
  );
  const [updateSetting, { isSuccess }] = useUpdateAutoDeleteMsgMutation();
  const [clearMessage, { isSuccess: clearSuccess }] = useLazyClearChannelMessageQuery();

  const [value, setValue] = useState<number>(setting?.expires_in ?? 0);
  const { t } = useTranslation("setting", { keyPrefix: "auto_delete_msg" });
  const { t: ct } = useTranslation();
  const options = [
    { title: t("off"), value: 0 },
    { title: t("5_min"), value: 5 * 60 },
    { title: t("10_min"), value: 10 * 60 },
    { title: t("1_hour"), value: 60 * 60 },
    { title: t("1_day"), value: 24 * 60 * 60 },
    { title: t("1_week"), value: 7 * 24 * 60 * 60 }
  ];
  const handleSave = () => {
    const dto =
      type == "dm"
        ? { users: [{ uid: id, expires_in: value }] }
        : { groups: [{ gid: id, expires_in: value }] };
    updateSetting(dto);
  };
  const handleReset = () => {
    setValue(setting?.expires_in ?? 0);
  };
  const handleChange = (val: number) => {
    setValue(val);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(ct("tip.update"));
    }
  }, [isSuccess]);
  useEffect(() => {
    if (clearSuccess) {
      toast.success("Cleared!");
    }
  }, [clearSuccess]);
  const handleClear = () => {
    if (confirm("are you sure?")) {
      clearMessage(id);
    }
  };
  const originalVal = setting?.expires_in ?? 0;
  const showClear = type == "channel" && (channel?.owner == loginUser?.uid || loginUser?.is_admin);
  return (
    <section className="max-w-[512px] h-full relative">
      <div className="text-sm">
        <h2 className="dark:text-white">{t("title")}</h2>
        <p className="text-gray-400 text-xs">{t("desc")}</p>
      </div>
      <div className="mt-4">
        <StyledRadio
          options={options.map(({ title }) => title)}
          values={options.map(({ value }) => value)}
          value={value || 0}
          onChange={handleChange}
        />
      </div>
      {originalVal !== value && <SaveTip saveHandler={handleSave} resetHandler={handleReset} />}
      {showClear && (
        <>
          <div className="text-sm mt-8">
            <h2 className="dark:text-white">{t("clear_title")}</h2>
            <p className="text-gray-400 text-xs">{t("clear_desc")}</p>
          </div>
          <div className="mt-4">
            <StyledButton className="danger" onClick={handleClear}>
              {t("clear")}
            </StyledButton>
          </div>
        </>
      )}
    </section>
  );
};

export default AutoDeleteMessages;
