// import { useState, useEffect, ChangeEvent } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// import { useAppSelector } from "@/app/store";
import SettingBlock from "@/components/SettingBlock";
import StyledButton from "@/components/styled/Button";
import AutoDeleteFiles from "./AutoDeleteFiles";
import ClearConfirmModal from "./ClearConfirmModal";
import ServerVersionChecker from "@/components/ServerVersionChecker";

export type VisibleModalType = "chat" | "files";
export default function DataManagement() {
  const [visibleModal, setVisibleModal] = useState<VisibleModalType | null>(null);
  const { t } = useTranslation("setting");
  const handleModalVisible = (visible: VisibleModalType | null) => {
    setVisibleModal(visible);
  };
  const clearConfirmDesc = {
    chat: t("data.clear_msgs.desc"),
    files: t("data.clear_files.desc")
  };
  return (
    <div className="relative w-full md:w-[512px] flex flex-col gap-6">
      {/* 清除服务器聊天消息 */}
      <ServerVersionChecker version="0.3.12" empty={true}>
        <SettingBlock title={t("data.clear_msgs.title")} desc={t("data.clear_msgs.desc")}>
          <StyledButton onClick={handleModalVisible.bind(null, "chat")} className="danger">
            {t("data.clear_msgs.btn")}
          </StyledButton>
        </SettingBlock>
      </ServerVersionChecker>

      {/* 清除服务器文件 */}
      <SettingBlock title={t("data.clear_files.title")} desc={t("data.clear_files.desc")}>
        <StyledButton onClick={handleModalVisible.bind(null, "files")} className="danger">
          {t("data.clear_files.btn")}
        </StyledButton>
      </SettingBlock>
      {/* 自动清除清除服务器数据 */}
      <AutoDeleteFiles />
      {visibleModal && (
        <ClearConfirmModal
          closeModal={handleModalVisible.bind(null, null)}
          context={visibleModal}
          title="Are you sure?"
          desc={clearConfirmDesc[visibleModal]}
        />
      )}
    </div>
  );
}
