import { useState } from "react";
// import toast from "react-hot-toast";
import Modal from "../Modal";
import Button from "../styled/Button";
import Input from "../styled/Input";
import Channel from "../Channel";
import Contact from "../Contact";
// import Channel from "../Channel";
import Reply from "../Message/Reply";
import StyledWrapper from "./styled";
import useForwardMessage from "../../hook/useForwardMessage";
import useSendMessage from "../../hook/useSendMessage";
import useFilteredChannels from "../../hook/useFilteredChannels";
import useFilteredUsers from "../../hook/useFilteredUsers";
import CloseIcon from "../../../assets/icons/close.circle.svg";
import StyledCheckbox from "../../component/styled/Checkbox";
import toast from "react-hot-toast";

export default function ForwardModal({ mids, closeModal }) {
  const [appendText, setAppendText] = useState("");
  const { sendMessages } = useSendMessage();
  const { forwardMessage, forwarding } = useForwardMessage();
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedChannels, setSelectedChannels] = useState([]);
  const {
    channels,
    // input: channelInput,
    updateInput: updateChannelInput
  } = useFilteredChannels();
  const { contacts, input, updateInput } = useFilteredUsers();
  // const { conactsData, loginUid } = useSelector((store) => {
  //   return { conactsData: store.contacts.byId, loginUid: store.authData.uid };
  // });
  const toggleCheck = ({ currentTarget }) => {
    const { id, type = "user" } = currentTarget.dataset;
    const ids = type == "user" ? selectedMembers : selectedChannels;
    const updateState = type == "user" ? setSelectedMembers : setSelectedChannels;
    let tmp = ids.includes(+id) ? ids.filter((m) => m != id) : [...ids, +id];
    console.log(id, currentTarget);
    updateState(tmp);
  };
  const updateAppendText = (evt) => {
    setAppendText(evt.target.value);
  };
  const handleForward = async () => {
    await forwardMessage({
      mids: mids.map((mid) => +mid),
      users: selectedMembers,
      channels: selectedChannels
    });
    if (appendText.trim()) {
      await sendMessages({
        content: appendText,
        users: selectedMembers,
        channels: selectedChannels
      });
    }
    toast.success("Forward Message Successfully");
    closeModal();
  };
  const removeSelected = (id, from = "user") => {
    if (from == "user") {
      setSelectedMembers(selectedMembers.filter((m) => m != id));
    } else {
      setSelectedChannels(selectedChannels.filter((cid) => cid != id));
    }
  };
  const handleSearchChange = (evt) => {
    const newVal = evt.target.value;
    updateChannelInput(newVal);
    updateInput(newVal);
  };
  let selectedCount = selectedMembers.length + selectedChannels.length;
  const sendButtonDisabled =
    (selectedChannels.length == 0 && selectedMembers.length == 0) || forwarding;
  return (
    <Modal>
      <StyledWrapper>
        <div className="left">
          <div className="search">
            <input
              value={input}
              onChange={handleSearchChange}
              placeholder="Search user or channel"
            />
          </div>
          <ul className="users">
            {channels &&
              channels.map((c) => {
                const { gid } = c;
                const checked = selectedChannels.includes(gid);
                console.log({ checked });
                return (
                  <li
                    key={gid}
                    data-type="channel"
                    data-id={gid}
                    className="user channel"
                    onClick={toggleCheck}
                  >
                    <StyledCheckbox readOnly checked={checked} name="cb" id="cb" />
                    <Channel id={gid} interactive={false} />
                  </li>
                );
              })}
            {contacts &&
              contacts.map((u) => {
                const { uid } = u;
                const checked = selectedMembers.includes(uid);
                console.log({ checked });
                return (
                  <li
                    key={uid}
                    data-id={uid}
                    data-type="user"
                    className="user"
                    onClick={toggleCheck}
                  >
                    <StyledCheckbox readOnly checked={checked} name="cb" id="cb" />
                    <Contact uid={uid} interactive={false} />
                  </li>
                );
              })}
          </ul>
        </div>
        <div className={`right`}>
          <h3 className="title">Send To {selectedCount}</h3>
          <ul className="selected">
            {selectedChannels.map((cid) => {
              return (
                <li key={cid} className="item">
                  <Channel
                    key={cid}
                    id={cid}
                    interactive={false}
                    // avatarSize={40}
                  />
                  <CloseIcon
                    className="remove"
                    onClick={removeSelected.bind(null, cid, "channel")}
                  />
                </li>
              );
            })}
            {selectedMembers.map((uid) => {
              return (
                <li key={uid} className="item">
                  <Contact
                    key={uid}
                    uid={uid}
                    interactive={false}
                    // avatarSize={40}
                  />
                  <CloseIcon className="remove" onClick={removeSelected.bind(null, uid, "user")} />
                </li>
              );
            })}
          </ul>
          <div className="msgs">
            {mids.map((mid) => (
              <Reply key={mid} mid={mid} interactive={false} />
            ))}
          </div>
          <Input
            className="input"
            placeholder="Leave a message"
            value={appendText}
            onChange={updateAppendText}
          ></Input>
          <div className="btns">
            <Button onClick={closeModal} className="normal cancel">
              Cancel
            </Button>
            <Button className="normal" disabled={sendButtonDisabled} onClick={handleForward}>
              Send To {selectedCount == 0 ? null : `(${selectedCount})`}
            </Button>
          </div>
        </div>
      </StyledWrapper>
    </Modal>
  );
}
