import { useState, useEffect, ChangeEvent } from "react";
import toast from "react-hot-toast";
import {
  useChangeChannelTypeMutation,
  useGetChannelQuery,
  useUpdateChannelMutation,
  useUpdateIconMutation
} from "../../app/services/channel";
import AvatarUploader from "../../common/component/AvatarUploader";
import Input from "../../common/component/styled/Input";
import Label from "../../common/component/styled/Label";
import Radio from "../../common/component/styled/Radio";
import Textarea from "../../common/component/styled/Textarea";
import SaveTip from "../../common/component/SaveTip";
import IconChannel from "../../assets/icons/channel.svg";
import { useAppSelector } from "../../app/store";
import { Channel } from "../../types/channel";
import { useTranslation } from "react-i18next";

export default function Overview({ id = 0 }) {
  const { t } = useTranslation("setting", { keyPrefix: "channel" });
  const { t: ct } = useTranslation();
  const { loginUser, channel } = useAppSelector((store) => {
    return {
      loginUser: store.authData.user,
      channel: store.channels.byId[id]
    };
  });
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
          <IconChannel className="absolute bottom-2.5 left-2" />
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
            placeholder={t("topic_placeholder")} />
        </div>
        {!readOnly && loginUser.is_admin && <div className={inputClass}>
          <Label htmlFor="desc">{t("visibility")}</Label>
          <Radio
            options={[t("public"), t("private")]}
            values={["true", "false"]}
            value={String(channel.is_public)}
            onChange={(v: string) => {
              // console.log("wtff", typeof v, v);
              changeChannelType({ is_public: v.toLowerCase() === 'true', id });
              // handleGuestToggle(v);
            }}
          />
        </div>}
      </div>
      {changed && <SaveTip saveHandler={handleUpdate} resetHandler={handleReset} />}
    </div>
  );
}
