import { useState, MouseEvent, ChangeEvent, FC } from "react";
import toast from "react-hot-toast";

import Modal from "../Modal";
import Button from "../styled/Button";
import Input from "../styled/Input";
import Channel from "../Channel";
import User from "../User";
import Reply from "../Message/Reply";
import useForwardMessage from "../../hook/useForwardMessage";
import useSendMessage from "../../hook/useSendMessage";
import useFilteredChannels from "../../hook/useFilteredChannels";
import useFilteredUsers from "../../hook/useFilteredUsers";
import CloseIcon from "../../../assets/icons/close.circle.svg";
import StyledCheckbox from "../styled/Checkbox";
import { useTranslation } from "react-i18next";
interface IProps {
  mids: number[];
  closeModal: () => void;
}

const ForwardModal: FC<IProps> = ({ mids, closeModal }) => {
  const { t } = useTranslation();
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
      <div className="flex max-h-[514px] min-h-[400px] bg-white drop-shadow rounded-lg overflow-hidden">
        <div className="w-[271px] shadow-[inset_-1px_0px_0px_rgba(0,_0,_0,_0.1)] overflow-y-scroll bg-inherit">
          <div className="sticky top-0 bg-inherit z-[90] p-4 w-[calc(100%_-_1px)]">
            <input
              className="px-2 py-2.5 text-sm bg-black/10 rounded-lg w-full"
              value={input}
              onChange={handleSearchChange}
              placeholder="Search user or channel"
            />
          </div>
          <ul className="flex flex-col pb-5">
            {channels &&
              channels.map((c) => {
                const { gid } = c;
                const checked = selectedChannels.includes(gid);
                return (
                  <li
                    key={gid}
                    data-type="channel"
                    data-id={gid}
                    className="cursor-pointer flex items-center px-4 rounded md:hover:bg-gray-600/10"
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
                    className="cursor-pointer flex items-center px-4 rounded md:hover:bg-gray-600/10"
                    onClick={toggleCheck}
                  >
                    <StyledCheckbox readOnly checked={checked} name="cb" id="cb" />
                    <User uid={uid} interactive={false} />
                  </li>
                );
              })}
          </ul>
        </div>
        <div className={`flex flex-col items-start p-4 box-border`}>
          <h3 className="font-semibold text-sm text-gray-700 mb-4">Send To {selectedCount}</h3>
          <ul className="w-full h-[260px] py-2.5 overflow-y-scroll">
            {selectedChannels.map((cid) => {
              return (
                <li key={cid} className="relative">
                  <Channel key={cid} id={cid} interactive={false} />
                  <CloseIcon
                    className="cursor-pointer absolute right-1 top-1/2 -translate-y-1/2"
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
          <div className="rounded-lg p-2 max-h-[200px] overflow-auto bg-slate-100 w-[280px] mb-1">
            {mids.map((mid) => (
              <Reply key={mid} mid={mid} interactive={false} />
            ))}
          </div>
          <Input
            className="mb-8"
            placeholder="Leave a message"
            value={appendText}
            onChange={updateAppendText}
          ></Input>
          <div className="w-full flex items-center justify-end gap-4">
            <Button onClick={closeModal} className="normal cancel">
              {t('action.cancel')}
            </Button>
            <Button className="normal" disabled={sendButtonDisabled} onClick={handleForward}>
              Send To {selectedCount == 0 ? null : `(${selectedCount})`}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default ForwardModal;
