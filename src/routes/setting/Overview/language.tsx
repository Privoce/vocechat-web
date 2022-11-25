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
        <div className="setting">
            <p className="label">{t("overview.lang.title")}</p>
            <p className="tip">
                <span className="txt">
                    {t("overview.lang.desc")}
                </span>
            </p>
            <StyledRadio
                options={[t("overview.lang.en"), t("overview.lang.zh")]}
                values={["en", "zh"]}
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