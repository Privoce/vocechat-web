import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
import { useSendChannelMsgMutation } from "../../../../app/services/channel";
import { useSendMsgMutation } from "../../../../app/services/contact";
import { addChannelMsg } from "../../../../app/slices/message.channel";
import { addUserMsg } from "../../../../app/slices/message.user";
import Modal from "../../Modal";
import StyledWrapper from "./styled";

export default function UploadModal({
  type = "user",
  sendTo = 0,
  files = [],
  closeModal,
}) {
  const dispatch = useDispatch();
  const [
    sendChannelMsg,
    {
      error: sendChannelError,
      isLoading: channelSending,
      isSuccess: sendChannelSuccess,
      data: sendChannelData,
    },
  ] = useSendChannelMsgMutation();
  const [
    sendUserMsg,
    {
      error: sendUserError,
      isLoading: userSending,
      isSuccess: sendUserSuccess,
      data: sendUserData,
    },
  ] = useSendMsgMutation();
  const [blobs, setBlobs] = useState([]);
  useEffect(() => {
    files.forEach((file) => {
      var fileReader = new FileReader();
      fileReader.onloadend = (e) => {
        const { name, size, type } = file;
        const obj = { name, size, type };
        let dataUrl = e.target.result;
        console.log({ dataUrl }, e.target);
        // let blob = new Blob([arrayBuffer]);
        obj.data = dataUrl;
        setBlobs((prevs) => {
          return [...prevs, obj];
        });
      };
      fileReader.readAsDataURL(file);
    });
  }, [files]);
  const handleUpload = () => {
    const uploadFn = type == "user" ? sendUserMsg : sendChannelMsg;
    uploadFn({ id: sendTo, content: files[0], type: "image" });
  };
  useEffect(() => {
    if (sendUserSuccess) {
      dispatch(addUserMsg({ id: sendTo, ...sendUserData, unread: false }));
      closeModal();
    }
  }, [sendUserSuccess, sendUserData]);

  useEffect(() => {
    if (sendChannelSuccess) {
      const { gid, ...rest } = sendChannelData;
      dispatch(addChannelMsg({ id: gid, ...rest, unread: false }));
      closeModal();
    }
  }, [sendChannelSuccess, sendChannelData]);
  if (!sendTo) return null;
  return (
    <Modal>
      <StyledWrapper className="animate__animated animate__fadeInDown animate__faster">
        <h3 className="head">Upload a file</h3>
        <p className="intro">Photos accept jpg, png, max size limit to 10M.</p>
        <ul className="list">
          {blobs.map((b, idx) => {
            console.log({ b });
            return (
              <li key={idx} className="item">
                <img
                  src={b.data}
                  // src={URL.createObjectURL(b.data)}
                  alt="thumb"
                  className="thumb"
                />
                <div className="right">
                  <div className="name">
                    <span contentEditable className="input">
                      {b.name}
                    </span>
                    <i className="tip">(click title to change name)</i>
                  </div>
                  <i className="size">{`${Math.floor(b.size / 1000)}KB`}</i>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="btns">
          <button className="btn cancel" onClick={closeModal}>
            Cancel
          </button>
          <button
            className="btn upload"
            disabled={channelSending || userSending}
            onClick={handleUpload}
          >
            {channelSending || userSending ? "Uploading" : `Upload`}
          </button>
        </div>
      </StyledWrapper>
    </Modal>
  );
}
