// import React from 'react'
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { useGetSystemCommonQuery, useUpdateSystemCommonMutation } from "@/app/services/server";
import { useAppSelector } from "@/app/store";
import { MessageExpireMode } from "@/types/server";
import Modal from "@/components/Modal";
import SettingBlock from "@/components/SettingBlock";
import Button from "@/components/styled/Button";
import StyledModal from "@/components/styled/Modal";
import StyledRadio from "@/components/styled/Radio";

// type Props = {
//   updateConfirmModal: (context: VisibleModalType | null) => void;
// };

const AutoDeleteFiles = () => {
  const currStatus = useAppSelector((store) => store.server.max_file_expiry_mode ?? "Off");
  const { t } = useTranslation("setting", { keyPrefix: "data.auto_delete_file" });
  const { t: ct } = useTranslation();
  const { refetch } = useGetSystemCommonQuery();
  const [selected, setSelected] = useState(currStatus);
  const [updateSetting, { isSuccess, isLoading }] = useUpdateSystemCommonMutation();
  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(ct("tip.update"));
    }
  }, [isSuccess]);
  const handleChange = (newVal: MessageExpireMode) => {
    // updateConfirmModal("auto_delete_file");
    setSelected(newVal);
  };
  const handleClose = () => {
    setSelected(currStatus);
  };
  const handleUpdate = () => {
    // todo
    updateSetting({ max_file_expiry_mode: selected });
  };
  // if (!loadSuccess) return null;
  return (
    <>
      <SettingBlock title={t("title")} desc={t("desc")}>
        <StyledRadio
          options={[t("off"), t("day1"), t("day7"), t("day30"), t("day90"), t("day180")]}
          values={["Off", "Day1", "Day7", "Day30", "Day90", "Day180"]}
          value={currStatus}
          onChange={handleChange}
        />
      </SettingBlock>
      {selected !== currStatus && (
        <Modal id="modal-modal">
          <StyledModal
            title={"Are you sure?"}
            description={selected == "Off" ? "" : t("confirm_desc")}
            buttons={
              <>
                <Button className="cancel" onClick={handleClose}>
                  {ct("action.cancel")}
                </Button>
                <Button onClick={handleUpdate} className="danger">
                  {isLoading ? "Updating" : ct("action.yes")}
                </Button>
              </>
            }
          ></StyledModal>
        </Modal>
      )}
    </>
  );
};

export default AutoDeleteFiles;
