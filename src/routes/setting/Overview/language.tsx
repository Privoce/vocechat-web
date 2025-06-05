// import React from 'react'
import { useTranslation } from "react-i18next";

import SettingBlock from "@/components/SettingBlock";
import StyledRadio from "@/components/styled/Radio";

// type Props = {}
export type LanguageType = "en" | "zh" | "jp" | "tr" | "pt" | "es" | "fr" | "ru";
export const LangMap: Record<LanguageType, string> = {
  en: "English",
  zh: "中文",
  tr: "Türkçe",
  jp: "日本語",
  pt: "Portuguese",
  fr: "Français",
  es: "Español",
  ru: "Русский",
};
const LanguageList = ({
  context = "overview",
  callback,
}: {
  context?: "overview" | "aside";
  callback?: (_v: string) => void;
}) => {
  const { t, i18n } = useTranslation("setting");
  const handleGuestToggle = (v: LanguageType) => {
    i18n.changeLanguage(v);
  };
  return (
    <SettingBlock
      title={context == "overview" ? t("overview.lang.title") : ""}
      desc={t("overview.lang.desc")}
    >
      <StyledRadio
        options={Object.values(LangMap)}
        values={Object.keys(LangMap)}
        value={i18n.language.split("-")[0]}
        onChange={(v) => {
          const _v = v as LanguageType;
          handleGuestToggle(_v);
          callback?.(LangMap[_v]);
        }}
      />
    </SettingBlock>
  );
};

export default LanguageList;
