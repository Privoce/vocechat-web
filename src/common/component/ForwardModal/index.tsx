import { useState, MouseEvent, ChangeEvent, FC } from "react";
// import toast from "react-hot-toast";
import Modal from "../Modal";
import Button from "../styled/Button";
import Input from "../styled/Input";
import Channel from "../Channel";
import User from "../User";
// import Channel from "../Channel";
import Reply from "../Message/Reply";
import StyledWrapper from "./styled";
import useForwardMessage from "../../hook/useForwardMessage";
import useSendMessage from "../../hook/useSendMessage";
import useFilteredChannels from "../../hook/useFilteredChannels";
import useFilteredUsers from "../../hook/useFilteredUsers";
import CloseIcon from "../../../assets/icons/close.circle.svg";
import StyledCheckbox from "../styled/Checkbox";
import toast from "react-hot-toast";
interface IProps {
  mids: number[];
  closeModal: () => void;
}

const ForwardModal: FC<IProps> = ({ mids, closeModal }) => {
  const [appendText, setAppendText] = useState("");
  const { sendMessages } = useSendMessage();
  const { forwardMessage, forwarding } = useForwardMessage();
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [selectedChannels, setSelectedChannels] = useState<number[]>([]);
  const {
    channels,
    // input: channelInput,
    updateInput: updateChannelInput
  } = useFilteredChannels();
  const { users, input, updateInput } = useFilteredUsers();
  const toggleCheck = ({ currentTarget }: MouseEvent<HTMLLIElement>) => {
    const { id = 0, type = "user" } = currentTarget.dataset;
    const ids = type == "user" ? selectedMembers : selectedChannels;
    const updateState = type == "user" ? setSelectedMembers : setSelectedChannels;
    let tmp = ids.includes(+id) ? ids.filter((m) => m != id) : [...ids, +id];
    updateState(tmp);
  };
  const updateAppendText = (evt: ChangeEvent<HTMLInputElement>) => {
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
  const removeSelected = (id: number, from = "user") => {
    if (from == "user") {
      setSelectedMembers(selectedMembers.filter((m) => m != id));
    } else {
      setSelectedChannels(selectedChannels.filter((cid) => cid != id));
    }
  };
  const handleSearchChange = (evt: ChangeEvent<HTMLInputElement>) => {
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
            {users &&
              users.map((u) => {
                const { uid } = u;
                const checked = selectedMembers.includes(uid);
                return (
                  <li
                    key={uid}
                    data-id={uid}
                    data-type="user"
                    className="user"
                    onClick={toggleCheck}
                  >
                    <StyledCheckbox readOnly checked={checked} name="cb" id="cb" />
                    <User uid={uid} interactive={false} />
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
                  <Channel key={cid} id={cid} interactive={false} />
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
                  <User key={uid} uid={uid} interactive={false} />
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
};
export default ForwardModal;
