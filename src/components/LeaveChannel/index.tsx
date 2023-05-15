import { useState, FC } from "react";
import TransferOwnerModal from "./TransferOwnerModal";
import LeaveConfirmModal from "./LeaveConfirmModal";

interface Props {
  id: number;
  isOwner?: boolean;
  closeModal: () => void;
}

const LeaveChannel: FC<Props> = ({ id, isOwner = false, closeModal }) => {
  const [transferOwner, setTransferOwner] = useState(isOwner);
  const handleNextStep = () => {
    setTransferOwner(true);
  };
  if (transferOwner) return <TransferOwnerModal id={id} closeModal={closeModal} />;
  return <LeaveConfirmModal id={id} closeModal={closeModal} handleNextStep={handleNextStep} />;
};

export default LeaveChannel;
