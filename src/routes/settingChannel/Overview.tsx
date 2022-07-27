import { useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import {
  useGetChannelQuery,
  useUpdateChannelMutation,
  useUpdateIconMutation
} from "../../app/services/channel";
import AvatarUploader from "../../common/component/AvatarUploader";
import Input from "../../common/component/styled/Input";
import Label from "../../common/component/styled/Label";
import Textarea from "../../common/component/styled/Textarea";
import SaveTip from "../../common/component/SaveTip";
import channelIcon from "../../assets/icons/channel.svg?url";
import { useAppSelector } from "../../app/store";
import { Channel } from "../../types/channel";

const StyledWrapper = styled.div`
  position: relative;
  width: 512px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  .inputs {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    .input {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      .name {
        padding-left: 36px;
        background-image: url(${channelIcon});
        background-size: 20px;
        background-position-x: 8px;
        background-position-y: 8px;
        background-repeat: no-repeat;
      }
    }
  }
`;
export default function Overview({ id = 0 }) {
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
    console.log("reset", data);
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
      toast.success("Channel updated!");
      refetch();
    }
  }, [updated]);

  if (!values || !id) return null;
  const { name, description } = values;
  const readOnly = !loginUser?.is_admin && channel?.owner != loginUser?.uid;

  return (
    <StyledWrapper>
      <AvatarUploader type="channel" url={channel?.icon} name={name} uploadImage={updateIcon} />
      <div className="inputs">
        <div className="input">
          <Label htmlFor="name">Channel Name</Label>
          <Input
            disabled={readOnly}
            className="name"
            data-type="name"
            onChange={handleChange}
            value={name}
            name="name"
            id="name"
            placeholder="Channel Name"
          />
        </div>
        <div className="input">
          <Label htmlFor="desc">Channel Topic</Label>
          <Textarea
            disabled={readOnly}
            data-type="description"
            onChange={handleChange}
            value={description ?? ""}
            rows={4}
            name="name"
            id="name"
            placeholder="Let everyone know how to use this channel."
          />
        </div>
      </div>
      {changed && <SaveTip saveHandler={handleUpdate} resetHandler={handleReset} />}
    </StyledWrapper>
  );
}
