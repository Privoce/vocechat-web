import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
import { useSendChannelMsgMutation } from "../../../../app/services/channel";
import { useSendMsgMutation } from "../../../../app/services/contact";
import Modal from "../../Modal";
import { formatBytes } from "../../../utils";
import Button from "../../styled/Button";

import StyledWrapper from "./styled";

export default function UploadModal({
  type = "user",
  sendTo = 0,
  files = [],
  closeModal,
}) {
  // const dispatch = useDispatch();
  const from_uid = useSelector((store) => store.authData.uid);
  const [
    sendChannelMsg,
    { isLoading: channelSending },
  ] = useSendChannelMsgMutation();
  const [sendUserMsg, { isLoading: userSending }] = useSendMsgMutation();
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    files.forEach((file, idx) => {
      const { name, size, type } = file;
      setProperties((prevs) => {
        prevs[idx] = { name, size, type };
        return prevs;
      });
      // var fileReader = new FileReader();
      // fileReader.onloadend = (e) => {
      //   let dataUrl = e.target.result;
      //   let tmp = new Image();
      //   tmp.src = dataUrl;
      //   tmp.onload = function () {
      //     console.log("image load", this.width, this.height);
      //     setProperties((prevs) => {
      //       prevs[idx].width = this.width;
      //       prevs[idx].height = this.height;
      //       return prevs;
      //     });
      //   };
      // };
      // fileReader.readAsDataURL(file);
    });
  }, [files]);
  const handleUpload = () => {
    const uploadFn = type == "user" ? sendUserMsg : sendChannelMsg;
    uploadFn({
      id: sendTo,
      content: files[0],
      properties: { ...properties[0], local_id: new Date().getTime() },
      type: "image",
      from_uid,
    });
    closeModal();
  };
  if (!sendTo) return null;
  return (
    <Modal>
      <StyledWrapper
        title={"Upload a file"}
        description="Photos accept jpg, png, max size limit to 10M."
        buttons={
          <>
            <Button className="cancel" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              className="upload"
              disabled={channelSending || userSending}
              onClick={handleUpload}
            >
              {channelSending || userSending ? "Uploading" : `Upload`}
            </Button>
          </>
        }
        className="animate__animated animate__fadeInDown animate__faster"
      >
        <ul className="list">
          {files.map((f, idx) => {
            console.log({ f });
            return (
              <li key={idx} className="item">
                <img
                  src={URL.createObjectURL(f)}
                  alt="thumb"
                  className="thumb"
                />
                <div className="right">
                  <div className="name">
                    <span className="input">{f.name}</span>
                    {/* <i className="tip">(click title to change name)</i> */}
                  </div>
                  <i className="size">{formatBytes(f.size)}</i>
                </div>
              </li>
            );
          })}
        </ul>
      </StyledWrapper>
    </Modal>
  );
}
