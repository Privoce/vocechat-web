// import React from 'react'
import { useTranslation } from 'react-i18next';
import StyledRadio from "../../../common/component/styled/Radio";

// type Props = {}

const Index = () => {
    const { t, i18n } = useTranslation("setting");
    const handleGuestToggle = (v: "zh" | "en") => {
        i18n.changeLanguage(v);
    };
    return (
        <div className="text-sm">
            <p className="dark:text-gray-100 font-semibold">{t("overview.lang.title")}</p>
            <p className="flex justify-between w-full text-gray-400 mb-2">
                {t("overview.lang.desc")}
            </p>
            <StyledRadio
                options={[t("overview.lang.en"), t("overview.lang.zh"), t("overview.lang.jp")]}
                values={["en", "zh", "jp"]}
                value={i18n.language.split("-")[0]}
                onChange={(v) => {
                    console.log("wtff", v);

                    handleGuestToggle(v);
                }}
            />
        </div>
    );
};

export default Index;