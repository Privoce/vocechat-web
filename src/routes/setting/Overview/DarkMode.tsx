import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Radio from '../../../common/component/styled/Radio';
import { Theme } from '../../../types/common';

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
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.classList.add(isDark ? "dark" : 'light');

        }
    };
    return (
        <div className="text-sm">
            <p className="dark:text-gray-100 font-semibold">{t("overview.theme.title")}</p>
            <p className="flex justify-between w-full text-gray-400 mb-2">
                {t("overview.theme.desc")}
            </p>
            <Radio
                options={[t("overview.theme.auto"), t("overview.theme.dark"), t("overview.theme.light")]}
                values={['auto', 'dark', 'light']}
                value={theme}
                onChange={(v) => {
                    handleThemeToggle(v);
                }}
            />
        </div>
    );
};

export default DarkMode;