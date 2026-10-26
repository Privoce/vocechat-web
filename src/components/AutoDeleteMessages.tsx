import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { useUpdateAutoDeleteMsgMutation } from "@/app/services/user";
import {
  useGetChannelQuery,
  useLazyClearChannelMessageQuery,
  useUpdateChannelMutation
} from "../app/services/channel";
import { useAppSelector } from "../app/store";
import { ChatContext } from "../types/common";
import SaveTip from "./SaveTip";
import StyledButton from "./styled/Button";
import StyledRadio from "./styled/Radio";
import { shallowEqual } from "react-redux";

type Props = {
  id: number;
  type?: ChatContext;
};
const AutoDeleteMessages = ({ id, type = "channel" }: Props) => {
  const setting = useAppSelector(
    (store) =>
      type == "channel"
        ? store.footprint.autoDeleteMsgChannels.find((item) => item.gid == id)
        : store.footprint.autoDeleteMsgUsers.find((item) => item.uid == id),
    shallowEqual
  );
  const support = useAppSelector((store) => store.footprint.autoDeleteSupported);
  const loginUser = useAppSelector((store) => store.authData.user, shallowEqual);
  const channel = useAppSelector(
    (store) => (type == "channel" ? store.channels.byId[id] : null),
    shallowEqual
  );
  // Require a fresh response: cached fields from a newer server must not enable
  // unsupported controls after a server downgrade.
  const channelResponse = useGetChannelQuery(id, {
    skip: type !== "channel",
    refetchOnMountOrArgChange: true
  });
  const canManage =
    type === "channel" && !!loginUser &&
    (channel?.owner === loginUser.uid || loginUser.is_admin);
  const supportsChannelPolicy =
    !channelResponse.isFetching &&
    typeof channelResponse.currentData?.auto_delete_after === "number";
  const [wholeChannel, setWholeChannel] = useState(true);
  const channelScope = canManage && supportsChannelPolicy && wholeChannel;
  const [updateSetting, { isLoading: savingPersonal }] = useUpdateAutoDeleteMsgMutation();
  const [updateChannel, { isLoading: savingChannel }] = useUpdateChannelMutation();
  const [clearMessage, { isSuccess: clearSuccess }] = useLazyClearChannelMessageQuery();

  const [personalValue, setPersonalValue] = useState(setting?.expires_in ?? 0);
  const [channelValue, setChannelValue] = useState(channel?.auto_delete_after ?? 0);
  const value = channelScope ? channelValue : personalValue;
  const setValue = channelScope ? setChannelValue : setPersonalValue;
  const saving = savingPersonal || savingChannel;
  const loadingChannel = type === "channel" && channelResponse.isFetching;
  const supported =
    !loadingChannel && (channelScope || (type === "channel" ? support?.groups : support?.users));
  const supportPending = loadingChannel || (!channelScope && !support);
  useEffect(() => setPersonalValue(setting?.expires_in ?? 0), [id, type, setting?.expires_in]);
  useEffect(() => setChannelValue(channel?.auto_delete_after ?? 0), [id, channel?.auto_delete_after]);
  useEffect(() => setWholeChannel(true), [id, type]);
  const { t } = useTranslation("setting", { keyPrefix: "auto_delete_msg" });
  const { t: ct } = useTranslation();
  const options = [
    { title: t("off"), value: 0 },
    { title: t("5_min"), value: 5 * 60 },
    { title: t("10_min"), value: 10 * 60 },
    { title: t("1_hour"), value: 60 * 60 },
    { title: t("1_day"), value: 24 * 60 * 60 },
    { title: t("1_week"), value: 7 * 24 * 60 * 60 },
    { title: t("1_month"), value: 30 * 24 * 60 * 60 }
  ];
  const originalVal = channelScope ? channel?.auto_delete_after ?? 0 : setting?.expires_in ?? 0;
  const handleSave = async () => {
    if (saving || !supported) return;
    try {
      if (channelScope) {
        await updateChannel({ id, auto_delete_after: value }).unwrap();
      } else {
        const dto =
          type === "dm"
            ? { users: [{ uid: id, expires_in: value }] }
            : { groups: [{ gid: id, expires_in: value }] };
        await updateSetting(dto).unwrap();
      }
      toast.success(ct("tip.update"));
    } catch {
      toast.error(t("save_failed"));
    }
  };
  const handleReset = () => setValue(originalVal);
  const handleChange = (val: number) => setValue(val);
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
  const showClear = canManage;
  const unsupportedChannelMessage = t(loadingChannel ? "checking_support" : "unsupported");
  const unsupportedPersonalMessage = t(supportPending ? "checking_support" : "unsupported");
  return (
    <section className="max-w-[512px] h-full relative">
      {canManage && (
        <div className="mb-4">
          <label className="flex items-center justify-between gap-4 text-sm dark:text-white">
            <span>{t("whole_channel")}</span>
            <span title={!supportsChannelPolicy ? unsupportedChannelMessage : undefined}>
              <button
                type="button"
                role="switch"
                aria-checked={channelScope}
                aria-label={t("whole_channel")}
                aria-describedby={!supportsChannelPolicy ? "auto-delete-unsupported" : undefined}
                disabled={!supportsChannelPolicy || saving}
                onClick={() => setWholeChannel(!wholeChannel)}
                className={`relative h-6 w-11 rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${channelScope ? "bg-primary-400" : "bg-gray-300"}`}
              >
                <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${channelScope ? "translate-x-5" : ""}`} />
              </button>
            </span>
          </label>
          {!supportsChannelPolicy && (
            <p id="auto-delete-unsupported" className="mt-2 text-xs text-gray-400">
              {unsupportedChannelMessage}
            </p>
          )}
        </div>
      )}
      <div className="text-sm">
        <h2 className="dark:text-white">{channelScope ? t("channel_title") : t("title")}</h2>
        <p className="text-gray-400 text-xs">{channelScope ? t("channel_desc") : t("desc")}</p>
        {type === "channel" && (
          <p className="mt-1 text-gray-400 text-xs">{t("policy_desc")}</p>
        )}
      </div>
      {!supported && (
        <p className="mt-2 text-xs text-gray-400" role="status">
          {unsupportedPersonalMessage}
        </p>
      )}
      <div className="mt-4" title={!supported ? unsupportedPersonalMessage : undefined}>
        <StyledRadio
          disabled={saving || !supported}
          options={options.map(({ title }) => title)}
          values={options.map(({ value }) => value)}
          value={value || 0}
          onChange={handleChange}
        />
      </div>
      {originalVal !== value && !saving && supported && (
        <SaveTip saveHandler={handleSave} resetHandler={handleReset} />
      )}
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
