import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import useLeaveChannel from "@/hooks/useLeaveChannel";
import Modal from "../Modal";
import Button from "../styled/Button";
import StyledModal from "../styled/Modal";
import User from "../User";

interface Props {
  id: number;
  closeModal: () => void;
  withLeave?: boolean;
}

const TransferOwnerModal: FC<Props> = ({ id, closeModal, withLeave = true }) => {
  const { t } = useTranslation();
  const {
    transferOwner,
    otherMembers,
    leaving,
    leaveChannel,
    leaveSuccess,
    transferSuccess,
    transferring
  } = useLeaveChannel(id);

  const [uid, setUid] = useState<number | null>(null);
  const navigateTo = useNavigate();

  const handleSelectUser = (uid: number) => {
    setUid(uid);
  };
  const handleTransferAndLeave = async () => {
    if (!uid) return;
    await transferOwner(uid);
    if (withLeave) {
      await leaveChannel();
    }
  };

  useEffect(() => {
    if (transferSuccess && leaveSuccess) {
      toast.success("Leave channel successfully!");
      closeModal();
      navigateTo("/chat");
    }
  }, [leaveSuccess, transferSuccess, withLeave]);

  if (!id) return null;
  const operating = leaving || transferring;
  return (
    <Modal id="modal-modal">
      <StyledModal
        className="compact"
        title="Transfer Ownership"
        description={"This cannot be undone."}
        buttons={
          <>
            <Button onClick={closeModal.bind(null, undefined)} className="cancel">
              {t("action.cancel")}
            </Button>
            <Button disabled={!uid} onClick={handleTransferAndLeave} className="danger">
              {operating ? "Assigning" : `Assign and Leave`}
            </Button>
          </>
        }
      >
        <ul className="flex flex-col max-h-[260px] py-4 overflow-y-scroll">
          {otherMembers.map((id) => {
            return (
              <li
                key={id}
                className={clsx(
                  `cursor-pointer flex items-center px-2 md:hover:bg-gray-500/10`,
                  uid == id ? "bg-gray-500/10" : ""
                )}
                onClick={handleSelectUser.bind(null, id)}
              >
                <User uid={id} interactive={false} />
              </li>
            );
          })}
        </ul>
      </StyledModal>
    </Modal>
  );
};

export default TransferOwnerModal;
