import { useState, useEffect } from "react";
import styled from "styled-components";
// import { useSelector } from "react-redux";
import {
  useGetServerQuery,
  useUpdateServerMutation,
  useUpdateLogoMutation,
} from "../../../app/services/server";
import LogoUploader from "../AvatarUploader";
import Input from "../StyledInput";
import Textarea from "../StyledTextarea";
import SaveTip from "../SaveTip";
import toast from "react-hot-toast";
const StyledWrapper = styled.div`
  position: relative;
  width: 512px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  .logo {
    display: flex;
    gap: 16px;
    .preview {
      width: 96px;
      height: 96px;
    }
    .upload {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      .tip {
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
        color: #374151;
      }
      .btn {
        padding: 8px 14px;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #1fe1f9;
        background: #ecfeff;
        border: 1px solid #ecfeff;
        box-sizing: border-box;
        box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
        border-radius: 8px;
      }
    }
  }
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
      label {
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #6b7280;
      }
    }
  }
`;
export default function Overview() {
  const [changed, setChanged] = useState(false);
  const [values, setValues] = useState(null);
  const { data, refetch } = useGetServerQuery();
  const [updateServer, { isSuccess: updated }] = useUpdateServerMutation();
  const [uploadLogo, { isSuccess: uploadSuccess }] = useUpdateLogoMutation();
  const handleUpdate = () => {
    const { name, description } = values;
    updateServer({ name, description });
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
    if (uploadSuccess) {
      toast.success("update logo successfully");
      refetch();
    }
  }, [uploadSuccess]);
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
      toast.success("Server updated!");
      refetch();
    }
  }, [updated]);

  if (!values) return null;
  const { name, description, logo } = values;
  return (
    <StyledWrapper>
      <div className="logo">
        <div className="preview">
          <LogoUploader
            url={uploadSuccess ? `${logo}?t=${new Date().getTime()}` : logo}
            name={name}
            uploadImage={uploadLogo}
          />
        </div>
        <div className="upload">
          <div className="tip">
            Minimum size is 128x128, We recommend at least 512x512 for the
            server. Max size limited to 5M.
          </div>
          <button className="btn">Upload Image</button>
        </div>
      </div>
      <div className="inputs">
        <div className="input">
          <label htmlFor="name">Server Name</label>
          <Input
            data-type="name"
            onChange={handleChange}
            value={name}
            name="name"
            id="name"
            placeholder="Server Name"
          />
        </div>
        <div className="input">
          <label htmlFor="desc">Server Description</label>
          <Textarea
            data-type="description"
            onChange={handleChange}
            value={description}
            rows={4}
            name="name"
            id="name"
            placeholder="Tell the world a bit about this server"
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
