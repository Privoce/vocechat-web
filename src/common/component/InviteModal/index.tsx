import InviteByEmail from "./InviteByEmail";
import AddMembers from "./AddMembers";
import CloseIcon from "../../../assets/icons/close.svg";
import Modal from "../Modal";
import { useAppSelector } from "../../../app/store";
import { FC } from "react";
import { useTranslation } from "react-i18next";


interface Props {
  type?: "server" | "channel";
  cid?: number;
  title?: string;
  closeModal: () => void;
}

const InviteModal: FC<Props> = ({ type = "server", cid, title = "", closeModal }) => {
  const { t } = useTranslation("chat");
  const { channel, server } = useAppSelector((store) => {
    return {
      channel: cid ? store.channels.byId[cid] : undefined,
      server: store.server
    };
  });
  const finalTitle = type == "server" ? server.name : `#${title || channel?.name}`;
  return (
    <Modal>
      <div className="flex flex-col bg-white rounded-lg p-4 min-w-[408px]">
        <h2 className="flex items-center justify-between text-lg text-gray-700 ">
          {t("invite_title", { name: finalTitle })}
          <CloseIcon className="cursor-pointer" onClick={closeModal} />
        </h2>
        {!channel?.is_public && <AddMembers cid={cid} closeModal={closeModal} />}
        <InviteByEmail cid={channel?.is_public ? undefined : cid} />
      </div>
    </Modal>
  );
};

export default InviteModal;
