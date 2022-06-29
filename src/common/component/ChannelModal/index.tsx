import { useState, useEffect, FC, MouseEvent, ChangeEvent } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Button from "../styled/Button";
import ChannelIcon from "../ChannelIcon";
import Contact from "../Contact";
import StyledWrapper from "./styled";
import StyledCheckbox from "../styled/Checkbox";
import useFilteredUsers from "../../hook/useFilteredUsers";
import { useCreateChannelMutation } from "../../../app/services/channel";
import { useAppSelector } from "../../../app/store";
import { CreateChannelDTO } from "../../../types/channel";

interface Props {
  personal?: boolean;
  closeModal: () => void;
}

const ChannelModal: FC<Props> = ({ personal = false, closeModal }) => {
  const { contactsData, loginUid } = useAppSelector((store) => {
    return { contactsData: store.contacts.byId, loginUid: store.authData.user?.uid };
  });
  const navigateTo = useNavigate();
  const [data, setData] = useState<CreateChannelDTO>({
    name: "",
    description: "",
    members: loginUid ? [Number(loginUid)] : [],
    is_public: !personal
  });

  const { contacts, input, updateInput } = useFilteredUsers();
  const [createChannel, { isSuccess, isError, isLoading, data: newChannelId }] =
    useCreateChannelMutation();

  // const handleToggle = () => {
  //   const { is_public } = data;
  //   setData((prev) => {
  //     return { ...prev, is_public: !is_public };
  //   });
  // };
  const handleCreate = () => {
    // todo: add field validation (maxLength, text format, trim)
    if (!data.name) {
      toast("please input channel name");
      return;
    }
    if (data.is_public) {
      // 公共频道 不必有members
      delete data.members;
    }
    createChannel(data);
  };

  // todo: delete the following code and use common error handler instead
  useEffect(() => {
    if (isError) {
      toast.error("create new channel failed");
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("create new channel success");
      closeModal();
      navigateTo(`/chat/channel/${newChannelId}`);
    }
  }, [isSuccess, newChannelId]);

  const handleNameInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, name: evt.target.value }));
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    updateInput(evt.target.value);
  };

  const toggleCheckMember = ({ currentTarget }: MouseEvent<HTMLLIElement>) => {
    const members = data.members ?? [];
    const { uid } = currentTarget.dataset;
    const uidNum = Number(uid);
    let tmp = members.includes(uidNum) ? members.filter((m) => m != uidNum) : [...members, uidNum];
    setData((prev) => ({ ...prev, members: tmp }));
  };

  if (!loginUid) return null;
  const loginUser = contactsData[Number(loginUid)];
  if (!loginUser) return null;
  const { name, members, is_public } = data;

  return (
    <Modal>
      <StyledWrapper>
        {!is_public && (
          <div className="left">
            <div className="search">
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Type Username to search"
              />
            </div>
            {contacts && (
              <ul className="users">
                {contacts.map((u) => {
                  const { uid } = u;
                  const checked = members ? members.includes(uid) : false;
                  return (
                    <li
                      key={uid}
                      data-uid={uid}
                      className="user"
                      onClick={loginUid == uid ? undefined : toggleCheckMember}
                    >
                      <StyledCheckbox
                        disabled={loginUid == uid}
                        readOnly
                        checked={checked}
                        name="cb"
                        id="cb"
                      />
                      <Contact uid={uid} interactive={false} />
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
        <div className={`right ${!is_public ? "private" : ""}`}>
          <h3 className="title">Create New Channel</h3>
          <p className="desc normal">
            {!is_public
              ? "This is a private channel, only select members will be able to join."
              : "This is a public channel, everyone in this team can see it."}
          </p>
          <div className="name">
            <span className="label normal">Channel Name</span>
            <div className="input">
              <input onChange={handleNameInput} value={name} placeholder="new channel" />
              <ChannelIcon personal={!is_public} className="icon" />
            </div>
          </div>
          {/* <div className="private">
            <span className="txt normal">Private Channel</span>
            <StyledToggle
              data-checked={!is_public}
              data-disabled={!loginUser?.is_admin}
              onClick={handleToggle}
            />
          </div> */}
          <div className="btns">
            <Button onClick={closeModal} className="normal cancel">
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={handleCreate} className="normal">
              Create
            </Button>
          </div>
        </div>
      </StyledWrapper>
    </Modal>
  );
};

export default ChannelModal;
