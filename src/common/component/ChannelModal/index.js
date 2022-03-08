import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../Modal";
import Button from "../styled/Button";
import ChannelIcon from "../ChannelIcon";
import Contact from "../Contact";
import StyledWrapper from "./styled";
import StyledToggle from "../../component/styled/Toggle";
import StyledCheckbox from "../../component/styled/Checkbox";
import useFilteredUsers from "../../hook/useFilteredUsers";
import { addChannel } from "../../../app/slices/channels";

import { useCreateChannelMutation } from "../../../app/services/channel";

export default function ChannelModal({ personal = false, closeModal }) {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    dsecription: "",
    members: [],
    is_public: !personal,
  });
  const { contacts, input, updateInput } = useFilteredUsers();
  const [
    createChannel,
    { isSuccess, isError, isLoading, data: newChannel },
  ] = useCreateChannelMutation();
  const currentUser = useSelector((state) => {
    return state.authData.user;
  });
  const handleToggle = () => {
    const { is_public } = data;
    setData((prev) => {
      return { ...prev, is_public: !is_public };
    });
  };
  const handleCreate = () => {
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
  useEffect(() => {
    if (isError) {
      toast.error("create new channel failed");
    }
  }, [isError]);
  useEffect(() => {
    if (isSuccess) {
      toast.success("create new channel success");
      closeModal();
      dispatch(addChannel(newChannel));
      navigateTo(`/chat/channel/${newChannel.gid}`);
    }
  }, [isSuccess, newChannel]);

  const handleNameInput = (evt) => {
    setData((prev) => {
      return { ...prev, name: evt.target.value };
    });
  };
  const handleInputChange = (evt) => {
    updateInput(evt.target.value);
  };
  const toggleCheckMember = ({ currentTarget }) => {
    const { members } = data;
    const { uid } = currentTarget.dataset;
    let tmp = members.includes(+uid)
      ? members.filter((m) => m != uid)
      : [...members, +uid];
    console.log(uid, currentTarget);
    setData((prev) => {
      return { ...prev, members: tmp };
    });
    console.log({ data });
  };
  console.log("contacts", contacts);
  if (!currentUser) return null;
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
                placeholder="Type username to search"
              />
            </div>
            {contacts && (
              <ul className="users">
                {contacts.map((u) => {
                  const { uid } = u;
                  const checked = members.includes(uid);
                  console.log({ checked });
                  return (
                    <li
                      key={uid}
                      data-uid={uid}
                      className="user"
                      onClick={toggleCheckMember}
                    >
                      <StyledCheckbox
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
              ? "This is a private channel, only select members will bee able to join."
              : "This is a public channel, everyone in this team can see it."}
          </p>
          <div className="name">
            <span className="label normal">Channel Name</span>
            <div className="input">
              <input
                onChange={handleNameInput}
                value={name}
                placeholder="new channel"
              />
              <ChannelIcon personal={!is_public} className="icon" />
            </div>
          </div>
          {/* admin or  */}
          {
            <div className="private">
              <span className="txt normal">Private Channel</span>
              <StyledToggle
                data-checked={!is_public}
                data-disabled={!currentUser?.is_admin}
                onClick={handleToggle}
              />
            </div>
          }
          <div className="btns">
            <Button onClick={closeModal} className="normal cancel">
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={handleCreate}
              className="normal main"
            >
              Create
            </Button>
          </div>
        </div>
      </StyledWrapper>
    </Modal>
  );
}
