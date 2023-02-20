import { useState, useEffect, FC, MouseEvent, ChangeEvent } from "react";
import toast from "react-hot-toast";
import Button from "../styled/Button";
import Input from "../styled/Input";
import User from "../User";
import StyledCheckbox from "../styled/Checkbox";
import { useAddMembersMutation } from "../../../app/services/channel";
import CloseIcon from "../../../assets/icons/close.svg";
import useFilteredUsers from "../../hook/useFilteredUsers";
import { useAppSelector } from "../../../app/store";

interface Props {
  cid?: number;
  closeModal: () => void;
}

const AddMembers: FC<Props> = ({ cid = 0, closeModal }) => {
  const [addMembers, { isLoading: isAdding, isSuccess }] = useAddMembersMutation();
  const [selects, setSelects] = useState<number[]>([]);
  const { channel, userData } = useAppSelector((store) => {
    return {
      channel: store.channels.byId[cid],
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
  const userIds = users.map((u) => u?.uid || 0);

  return (
    <div className="pt-4">
      <div className="flex items-center w-[376px] min-h-[40px] px-2 py-1.5 mb-3 border border-solid border-slate-100 shadow rounded">
        <ul className="flex items-center flex-wrap gap-1 w-full overflow-scroll">
          {selects.map((uid) => {
            return (
              <li className="px-1.5 py-1 rounded text-sm bg-primary-300 text-white flex items-center justify-between gap-1" key={uid}>
                {userData[uid]?.name}
                <CloseIcon data-uid={uid} onClick={toggleCheckMember} className="cursor-pointer w-3 h-3 fill-white" />
              </li>
            );
          })}
          <Input
            autoFocus
            type="text"
            className="!w-fit none"
            value={input}
            onChange={handleFilterInput}
          />
        </ul>
      </div>
      <ul className="flex flex-col pb-5 max-h-[364px] overflow-scroll">
        {userIds.map((uid) => {
          const added = uids.includes(uid);
          return (
            <li
              key={uid}
              data-uid={uid}
              className="cursor-pointer flex items-center px-2 py-1 rounded-lg md:hover:bg-slate-400/20"
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
      <Button disabled={selects.length == 0 || isAdding} className="flex mt-4 justify-center" onClick={handleAddMembers}>
        {isAdding ? `Adding` : "Add"} to #{channel.name}
      </Button>
    </div>
  );
};

export default AddMembers;
