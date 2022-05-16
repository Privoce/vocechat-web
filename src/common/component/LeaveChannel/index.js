import { useState } from "react";
// import styled from "styled-components";
import TransferOwnerModal from "./TransferOwnerModal";
import LeaveConfirmModal from "./LeaveConfirmModal";
export default function LeaveChannel({
  id = null,
  isOwner = false,
  closeModal,
}) {
  const [transferOwner, setTransferOwner] = useState(isOwner);
  const handleNextStep = () => {
    setTransferOwner(true);
  };
  if (transferOwner)
    return <TransferOwnerModal id={id} closeModal={closeModal} />;
  return (
    <LeaveConfirmModal
      id={id}
      closeModal={closeModal}
      handleNextStep={handleNextStep}
    />
  );
}
