import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Modal from "../../../common/component/Modal";
import Button from "../../../common/component/styled/Button";
import Input from "../../../common/component/styled/Input";
import Contact from "../../../common/component/Contact";
import StyledCheckbox from "../../../common/component/styled/Checkbox";
import { useAddMembersMutation } from "../../../app/services/channel";
import CloseIcon from "../../../assets/icons/close.svg";
import toast from "react-hot-toast";
import useFilteredUsers from "../../../common/hook/useFilteredUsers";
import Styled from "./add.member.styled";

export default function AddMemberModal({ uids = [], cid = null, closeModal }) {
  const [
    addMembers,
    { isLoading: isAdding, isSuccess },
  ] = useAddMembersMutation();
  const [selects, setSelects] = useState([]);
  const { channel, contactData } = useSelector((store) => {
    return {
      channel: store.channels.byId[cid],
      // contactIds: store.contacts.ids,
      contactData: store.contacts.byId,
    };
  });
  useEffect(() => {
    if (isSuccess) {
      toast.success("Add members successfully!");
      closeModal();
    }
  }, [isSuccess]);

  const handleAddMembers = () => {
    addMembers({ id: cid, members: selects });
  };
  const { input, updateInput, contacts = [] } = useFilteredUsers();
  const toggleCheckMember = ({ currentTarget }) => {
    const { uid } = currentTarget.dataset;
    if (selects.includes(+uid)) {
      setSelects((prevs) => {
        return prevs.filter((id) => id != uid);
      });
    } else {
      setSelects([...selects, +uid]);
    }
  };
  const handleFilterInput = (evt) => {
    updateInput(evt.target.value);
  };
  if (!channel) return null;
  const contactIds = contacts.map(({ uid }) => uid);
  console.log("selects", selects);
  return (
    <Modal>
      <Styled>
        <div className="head">
          Add friends to #{channel.name}{" "}
          <CloseIcon onClick={closeModal} className="close" />
        </div>
        <div className="filter">
          {/* {selects && selects.length > 0 && ( */}
          <ul className="selects">
            {selects.map((uid) => {
              return (
                <li className="select" key={uid}>
                  {contactData[uid].name}
                  <CloseIcon
                    data-uid={uid}
                    onClick={toggleCheckMember}
                    className="close"
                  />
                </li>
              );
            })}
            <Input
              autoFocus
              type="text"
              className="input none"
              value={input}
              onChange={handleFilterInput}
            />
          </ul>
          {/* )} */}
        </div>
        <ul className="users">
          {contactIds.map((uid) => {
            const added = uids.includes(uid);
            return (
              <li
                key={uid}
                data-uid={uid}
                className="user"
                onClick={added ? null : toggleCheckMember}
              >
                <StyledCheckbox
                  disabled={added}
                  readOnly
                  checked={added || selects.includes(uid)}
                  name="cb"
                  id="cb"
                />
                <Contact uid={uid} interactive={false} />
              </li>
            );
          })}
        </ul>
        <Button
          disabled={selects.length == 0 || isAdding}
          className="btn main"
          onClick={handleAddMembers}
        >
          {isAdding ? `Adding` : "Add"} to #{channel.name}
        </Button>
      </Styled>
    </Modal>
  );
}
