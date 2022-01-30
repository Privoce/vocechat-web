import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "../Modal";
import ChannelIcon from "../ChannelIcon";
import Contact from "../Contact";
import StyledWrapper from "./styled";
import useFilteredUsers from "../../hook/useFilteredUsers";
import { useCreateChannelMutation } from "../../../app/services/channel";

export default function ChannelModal({ personal = false, closeModal }) {
  const navigateTo = useNavigate();
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
                      <input
                        readOnly
                        checked={checked}
                        type="checkbox"
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
              <input
                disabled={!currentUser?.is_admin}
                onChange={handleToggle}
                checked={!is_public}
                type="checkbox"
                name="private"
                id="private"
              />
            </div>
          }
          <div className="btns">
            <button onClick={closeModal} className="btn normal cancel">
              Cancel
            </button>
            <button
              disabled={isLoading}
              onClick={handleCreate}
              className="btn normal create"
            >
              Create
            </button>
          </div>
        </div>
      </StyledWrapper>
    </Modal>
  );
}
