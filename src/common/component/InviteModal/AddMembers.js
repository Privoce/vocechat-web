import { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Button from "../styled/Button";
import Input from "../styled/Input";
import Contact from "../Contact";
import StyledCheckbox from "../styled/Checkbox";
import { useAddMembersMutation } from "../../../app/services/channel";
import CloseIcon from "../../../assets/icons/close.svg";
import toast from "react-hot-toast";
import useFilteredUsers from "../../../common/hook/useFilteredUsers";

const Styled = styled.div`
  padding-top: 16px;
  > .filter {
    width: 376px;
    min-height: 40px;
    padding: 6px 8px;
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    box-shadow: 0px 1px 2px rgba(31, 41, 55, 0.08);
    border-radius: 4px;
    .selects {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 5px;
      width: 100%;
      overflow: scroll;

      /* white-space: nowrap; */
      &::-webkit-scrollbar {
        width: 0; /* Remove scrollbar space */
        height: 0; /* Remove scrollbar space */
        background: transparent; /* Optional: just make scrollbar invisible */
      }
      .select {
        padding: 4px 6px;
        background: #52edff;
        border-radius: 4px;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: #ffffff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 5px;
        .close {
          cursor: pointer;
          width: 12px;
          height: 12px;
          path {
            fill: #fff;
            fill-opacity: 1;
          }
          /* filter: invert(1); */
        }
      }
      .input {
        width: fit-content;
      }
    }
  }
  .users {
    display: flex;
    flex-direction: column;
    /* height: 260px; */
    padding-bottom: 20px;
    max-height: 364px;
    overflow: scroll;
    .user {
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 4px 8px;
      /* margin: 0 4px; */
      width: -webkit-fill-available;
      border-radius: 8px;
      &:hover {
        background: rgba(116, 127, 141, 0.1);
      }
      > div {
        width: 100%;
      }
    }
  }
  > .btn {
    width: 100%;
    margin-top: 16px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
  }
`;
export default function AddMembers({ cid = null, closeModal }) {
  const [
    addMembers,
    { isLoading: isAdding, isSuccess },
  ] = useAddMembersMutation();
  const [selects, setSelects] = useState([]);
  const { channel, contactData } = useSelector((store) => {
    return {
      channel: store.channels.byId[cid],
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
  const { members: uids } = channel;
  const contactIds = contacts.map(({ uid }) => uid);
  console.log("selects", selects);
  return (
    <Styled>
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
        className="btn"
        onClick={handleAddMembers}
      >
        {isAdding ? `Adding` : "Add"} to #{channel.name}
      </Button>
    </Styled>
  );
}
