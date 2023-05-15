import { ChangeEvent, FC, useState, useEffect } from "react";
import toast from "react-hot-toast";
import Modal from "@/components/Modal";
import StyledModal from "@/components/styled/Modal";
import Button from "@/components/styled/Button";
import Textarea from "@/components/styled/Textarea";

import { useTranslation } from "react-i18next";
interface Props {
  closeModal: () => void;
  updateLicense: (param: string) => Promise<any>;
  updated: boolean;
  updating: boolean
  // domain: string;
}

const UpdateLicenseModal: FC<Props> = ({ closeModal, updateLicense, updating, updated }) => {
  const [value, setValue] = useState("");
  const { t } = useTranslation("setting");
  const { t: ct } = useTranslation();

  const handleRenew = async () => {
    const updateSuccess = await updateLicense(value);
    if (typeof updateSuccess == "boolean" && !updateSuccess) {
      toast.error("Check License Invalid!");
    }
  };
  const handleLicenseUpdate = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(evt.target.value);
  };
  useEffect(() => {
    if (updated) {
      toast.success(ct("tip.update"));
      closeModal();
    }
  }, [updated]);

  return (
    <Modal id="modal-modal">
      <StyledModal
        buttons={
          <>
            <Button onClick={closeModal} className="ghost">
              {ct("action.cancel")}
            </Button>
            <Button disabled={updating || updated || !value} onClick={handleRenew} >
              {updating ? "Updating" : updated ? "Update Successfully" : t("license.update")}
            </Button>
          </>
        }
      >
        <Textarea rows={18} placeholder={t("license.update_placeholder")} value={value} onChange={handleLicenseUpdate} />
      </StyledModal>
    </Modal>
  );
};

export default UpdateLicenseModal;
