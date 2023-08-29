import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import {
  useChangeChannelTypeMutation,
  useGetChannelQuery,
  useUpdateChannelMutation,
  useUpdateIconMutation
} from "@/app/services/channel";
import { useAppSelector } from "@/app/store";
import { Channel } from "@/types/channel";
import AvatarUploader from "@/components/AvatarUploader";
import SaveTip from "@/components/SaveTip";
import Input from "@/components/styled/Input";
import Label from "@/components/styled/Label";
import Radio from "@/components/styled/Radio";
import Textarea from "@/components/styled/Textarea";
import IconChannel from "@/assets/icons/channel.svg";
import { shallowEqual } from "react-redux";

export default function Overview({ id = 0 }) {
  const { t } = useTranslation("setting", { keyPrefix: "channel" });
  const { t: ct } = useTranslation();
  const loginUser = useAppSelector((store) => store.authData.user, shallowEqual);
  const channel = useAppSelector((store) => store.channels.byId[id], shallowEqual);
  const { data, refetch } = useGetChannelQuery(id);
  const [changed, setChanged] = useState(false);
  const [values, setValues] = useState<Channel>();
  const [updateChannelIcon] = useUpdateIconMutation();
  const [updateChannel, { isSuccess: updated }] = useUpdateChannelMutation();
  const [changeChannelType, { isSuccess: changeTypeSuccess }] = useChangeChannelTypeMutation();
  const handleUpdate = () => {
    if (!values) return;
    const { name, description } = values;
    updateChannel({ id, name, description });
  };

  const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = evt.target.value;
    const { type = "" } = evt.target.dataset;
    setValues((prev) => {
      if (!prev) return prev;
      return { ...prev, [type]: newValue };
    });
  };

  const updateIcon = (image: File) => {
    updateChannelIcon({ gid: id, image });
  };

  const handleReset = () => {
    setValues(data);
  };

  useEffect(() => {
    if (data) {
      setValues(data);
    }
  }, [data]);

  useEffect(() => {
    if (data && values) {
      const { name, description } = values;
      const { name: oName, description: oDescription } = data;
      if (oName !== name || oDescription !== description) {
        setChanged(true);
      } else {
        setChanged(false);
      }
    }
  }, [data, values]);

  useEffect(() => {
    if (updated) {
      toast.success(ct("tip.update"));
      refetch();
    }
  }, [updated]);
  useEffect(() => {
    if (changeTypeSuccess) {
      toast.success(ct("tip.update"));
    }
  }, [changeTypeSuccess]);

  if (!values || !id || !channel) return null;
  const { name, description } = values;
  const readOnly = !loginUser?.is_admin && channel?.owner != loginUser?.uid;
  const inputClass = `w-full flex flex-col items-start gap-2 relative`;
  return (
    <div className="relative w-[512px] flex flex-col gap-6 h-full">
      <AvatarUploader type="channel" url={channel?.icon} name={name} uploadImage={updateIcon} />
      <div className="flex flex-col gap-6 items-start">
        <div className={"flex items-center gap-1"}>
          <Label htmlFor="name">{t("id")}</Label>
          <span className="text-gray-500">#{id}</span>
        </div>
        <div className={inputClass}>
          <Label htmlFor="name">{t("name")}</Label>
          <Input
            disabled={readOnly}
            className="!pl-8"
            data-type="name"
            onChange={handleChange}
            value={name}
            name="name"
            id="name"
            placeholder={t("name")}
          />
          <IconChannel className="absolute bottom-2.5 left-2 dark:fill-gray-300" />
        </div>
        <div className={inputClass}>
          <Label htmlFor="desc">{t("topic")}</Label>
          <Textarea
            disabled={readOnly}
            data-type="description"
            onChange={handleChange}
            value={description ?? ""}
            rows={4}
            name="name"
            id="name"
            placeholder={t("topic_placeholder")}
          />
        </div>
        {!readOnly && loginUser.is_admin && (
          <div className={inputClass}>
            <Label htmlFor="desc">{t("visibility")}</Label>
            <Radio
              options={[t("public"), t("private")]}
              values={["true", "false"]}
              value={String(channel.is_public)}
              onChange={(v: string) => {
                // console.log("wtff", typeof v, v);
                changeChannelType({ is_public: v.toLowerCase() === "true", id });
                // handleGuestToggle(v);
              }}
            />
          </div>
        )}
      </div>
      {changed && <SaveTip saveHandler={handleUpdate} resetHandler={handleReset} />}
    </div>
  );
}
