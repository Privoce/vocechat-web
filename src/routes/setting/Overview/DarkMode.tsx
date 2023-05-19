import { useState } from "react";
import { useTranslation } from "react-i18next";

import Radio from "../../../components/styled/Radio";
import { Theme } from "../../../types/common";
import SettingBlock from "./SettingBlock";

// type Props = {}

const DarkMode = () => {
  const [theme, setTheme] = useState<Theme>(localStorage.theme || "auto");
  const { t } = useTranslation("setting");
  const handleThemeToggle = (v: Theme) => {
    setTheme(v);
    localStorage.theme = v;
    // reset
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.remove("light");
    if (v !== "auto") {
      document.documentElement.classList.add(v);
    } else {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.add(isDark ? "dark" : "light");
    }
  };
  return (
    <SettingBlock title={t("overview.theme.title")} desc={t("overview.theme.desc")}>
      <Radio
        options={[t("overview.theme.auto"), t("overview.theme.dark"), t("overview.theme.light")]}
        values={["auto", "dark", "light"]}
        value={theme}
        onChange={(v) => {
          handleThemeToggle(v);
        }}
      />
    </SettingBlock>
  );
};

export default DarkMode;
