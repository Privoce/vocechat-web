import { useState, useEffect } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import {
  useGetChannelQuery,
  useUpdateChannelMutation,
} from "../../../app/services/channel";
import Input from "../styled/Input";
import Label from "../styled/Label";
import Textarea from "../styled/Textarea";
import SaveTip from "../SaveTip";
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
        background: url(https://static.nicegoodthings.com/project/rustchat/icon.hash.svg);
        background-size: 20px;
        background-position-x: 8px;
        background-position-y: 8px;
        background-repeat: no-repeat;
      }
    }
  }
`;
export default function Overview({ id = 0 }) {
  const { data, refetch } = useGetChannelQuery(id);
  const [changed, setChanged] = useState(false);
  const [values, setValues] = useState(null);
  const [updateChannel, { isSuccess: updated }] = useUpdateChannelMutation();
  const handleUpdate = () => {
    const { name, description } = values;
    updateChannel({ id, name, description });
  };
  const handleChange = (evt) => {
    const newValue = evt.target.value;
    const { type } = evt.target.dataset;
    setValues((prev) => {
      return { ...prev, [type]: newValue };
    });
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
  return (
    <StyledWrapper>
      <div className="inputs">
        <div className="input">
          <Label htmlFor="name">Channel Name</Label>
          <Input
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
      {changed && (
        <SaveTip saveHandler={handleUpdate} resetHandler={handleReset} />
      )}
      {/* <button onClick={handleUpdate} className="btn">update</button> */}
    </StyledWrapper>
  );
}
