// import React from 'react'
import { useTranslation } from "react-i18next";

import SettingBlock from "@/components/SettingBlock";
import StyledRadio from "@/components/styled/Radio";

// type Props = {}
type LanguageType = "en" | "zh" | "jp" | "tr" | "pt" | "es";
const Langs: LanguageType[] = ["en", "zh", "jp", "tr", "pt", "es"];
const Index = () => {
  const { t, i18n } = useTranslation("setting");
  const handleGuestToggle = (v: LanguageType) => {
    i18n.changeLanguage(v);
  };
  return (
    <SettingBlock title={t("overview.lang.title")} desc={t("overview.lang.desc")}>
      <StyledRadio
        options={[
          t("overview.lang.en"),
          t("overview.lang.zh"),
          t("overview.lang.jp"),
          t("overview.lang.tr"),
          t("overview.lang.pt"),
          t("overview.lang.es")
        ]}
        values={Langs}
        value={i18n.language.split("-")[0]}
        onChange={(v) => {
          const _v = v as LanguageType;
          handleGuestToggle(_v);
        }}
      />
    </SettingBlock>
  );
};

export default Index;
