import { useState, useEffect, FC, MouseEvent, ChangeEvent } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import Button from "../styled/Button";
import Input from "../styled/Input";
import User from "../User";
import StyledCheckbox from "../styled/Checkbox";
import { useAddMembersMutation } from "../../../app/services/channel";
import CloseIcon from "../../../assets/icons/close.svg";
import useFilteredUsers from "../../hook/useFilteredUsers";
import { useAppSelector } from "../../../app/store";

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
    box-shadow: 0 1px 2px rgba(31, 41, 55, 0.08);
    border-radius: 4px;
    .selects {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 5px;
      width: 100%;
      overflow: scroll;
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
    padding-bottom: 20px;
    max-height: 364px;
    overflow: scroll;
    .user {
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 4px 8px;
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

interface Props {
  cid?: number;
  closeModal: () => void;
}

const AddMembers: FC<Props> = ({ cid, closeModal }) => {
  const [addMembers, { isLoading: isAdding, isSuccess }] = useAddMembersMutation();
  const [selects, setSelects] = useState<number[]>([]);
  const { channel, userData } = useAppSelector((store) => {
    return {
      channel: cid ? store.channels.byId[cid] : null,
      userData: store.users.byId
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
  const { input, updateInput, users = [] } = useFilteredUsers();

  const toggleCheckMember = ({ currentTarget }: MouseEvent<SVGSVGElement | HTMLLIElement>) => {
    const uid = Number(currentTarget.dataset.uid);
    if (selects.includes(uid)) {
      setSelects((prevs) => {
        return prevs.filter((id) => id != uid);
      });
    } else {
      setSelects([...selects, +uid]);
    }
  };

  const handleFilterInput = (evt: ChangeEvent<HTMLInputElement>) => {
    updateInput(evt.target.value);
  };

  if (!channel) return null;
  const { members: uids } = channel;
  const userIds = users.map(({ uid }) => uid);

  return (
    <Styled>
      <div className="filter">
        {/* {selects && selects.length > 0 && ( */}
        <ul className="selects">
          {selects.map((uid) => {
            return (
              <li className="select" key={uid}>
                {userData[uid]?.name}
                <CloseIcon data-uid={uid} onClick={toggleCheckMember} className="close" />
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
        {userIds.map((uid) => {
          const added = uids.includes(uid);
          return (
            <li
              key={uid}
              data-uid={uid}
              className="user"
              onClick={added ? undefined : toggleCheckMember}
            >
              <StyledCheckbox
                disabled={added}
                readOnly
                checked={added || selects.includes(uid)}
                name="cb"
                id="cb"
              />
              <User uid={uid} interactive={false} />
            </li>
          );
        })}
      </ul>
      <Button disabled={selects.length == 0 || isAdding} className="btn" onClick={handleAddMembers}>
        {isAdding ? `Adding` : "Add"} to #{channel.name}
      </Button>
    </Styled>
  );
};

export default AddMembers;
