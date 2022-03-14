import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
import { useSendChannelMsgMutation } from "../../../../app/services/channel";
import { useSendMsgMutation } from "../../../../app/services/contact";
import Modal from "../../Modal";
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
    uploadFn({ id: sendTo, content: files[0], type: "image", from_uid });
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
              className="upload main"
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
                    <span className="input">{b.name}</span>
                    <i className="tip">(click title to change name)</i>
                  </div>
                  <i className="size">{`${Math.floor(b.size / 1000)}KB`}</i>
                </div>
              </li>
            );
          })}
        </ul>
      </StyledWrapper>
    </Modal>
  );
}
