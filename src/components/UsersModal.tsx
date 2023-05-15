import { ChangeEvent, useRef, FC } from "react";
import { NavLink } from "react-router-dom";
import { useOutsideClick } from "rooks";
import useFilteredUsers from "@/hooks/useFilteredUsers";
import User from "./User";
import Modal from "./Modal";
import { useTranslation } from "react-i18next";


interface Props {
  closeModal: () => void;
}

const UsersModal: FC<Props> = ({ closeModal }) => {
  const { t } = useTranslation("chat");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { users, updateInput, input } = useFilteredUsers();
  useOutsideClick(wrapperRef, closeModal);

  const handleSearch = (evt: ChangeEvent<HTMLInputElement>) => {
    updateInput(evt.target.value);
  };


  return (
    <Modal>
      <div className="flex flex-col w-80 md:w-[440px] max-h-[402px] bg-white dark:bg-gray-900 drop-shadow rounded-lg" ref={wrapperRef}>
        <div className="shadow-md p-2">
          <input className="p-2 text-sm bg-transparent dark:text-white w-full outline-none" value={input} onChange={handleSearch} placeholder={t("search_user_placeholder")} />
        </div>
        {users && (
          <ul className="flex flex-col overflow-y-scroll h-[260px] py-4">
            {users.map((u) => {
              const { uid = 0 } = u || {};
              return (
                <li key={uid} className="cursor-pointer px-2 md:hover:bg-gray-600/10">
                  <NavLink className={'w-full'} onClick={closeModal} to={`/chat/dm/${uid}`}>
                    <User uid={uid} interactive={false} />
                  </NavLink>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Modal>
  );
};

export default UsersModal;
