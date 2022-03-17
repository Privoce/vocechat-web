import { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Modal from "../../../common/component/Modal";
import Button from "../../../common/component/styled/Button";
import Contact from "../../../common/component/Contact";
import StyledCheckbox from "../../../common/component/styled/Checkbox";
import { useAddMembersMutation } from "../../../app/services/channel";
import closeIcon from "../../../assets/icons/close.svg?url";
import toast from "react-hot-toast";
// import useFilteredUsers from "../../../common/hook/useFilteredUsers";
const Styled = styled.div`
  padding: 16px;
  filter: drop-shadow(0px 25px 50px rgba(31, 41, 55, 0.25));
  border-radius: 8px;
  background-color: #fff;
  min-width: 410px;
  > .head {
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
    color: #374151;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .close {
      width: 12px;
      height: 12px;
      cursor: pointer;
    }
  }
  > .filter {
    width: 376px;
    height: 40px;
    background: rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    padding: 6px 8px;
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    .selects {
      display: flex;
      align-items: center;
      gap: 5px;
      width: 100%;
      overflow: scroll;

      white-space: nowrap;
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
          filter: invert(1);
        }
      }
    }
    /* .input{
        background: none;
        padding: ;
    } */
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

export default function AddMemberModal({ uids = [], cid = null, closeModal }) {
  const [
    addMembers,
    { isLoading: isAdding, isSuccess },
  ] = useAddMembersMutation();
  const [selects, setSelects] = useState([]);
  const { channel, contactIds, contactData } = useSelector((store) => {
    return {
      channel: store.channels.byId[cid],
      contactIds: store.contacts.ids,
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
  //   const { input, updateInput, contacts } = useFilteredUsers();
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
  //   const handleFilterInput = (evt) => {
  //     updateInput(evt.target.value);
  //   };
  if (!channel) return null;
  console.log("selects", selects);
  return (
    <Modal>
      <Styled>
        <div className="head">
          Add friends to #{channel.name}{" "}
          <img onClick={closeModal} className="close" src={closeIcon} />
        </div>
        <div className="filter">
          <ul className="selects">
            {selects.map((uid) => {
              return (
                <li className="select" key={uid}>
                  {contactData[uid].name}
                  <img
                    data-uid={uid}
                    onClick={toggleCheckMember}
                    className="close"
                    src={closeIcon}
                  />
                </li>
              );
            })}
          </ul>
          {/* <input
            type="text"
            className="input"
            value={input}
            onChange={handleFilterInput}
          /> */}
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
