import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { useTranslation } from "react-i18next";
import { useUpdateAutoDeleteMsgMutation } from "../../app/services/user";
import SaveTip from "../../common/component/SaveTip";
import StyledRadio from "../../common/component/styled/Radio";


type Props = {
    id: number,
    type?: "user" | "channel",
    expires_in?: number
}
const AutoDeleteMessages = ({ id, type = "channel", expires_in = 0 }: Props) => {
    const [updateSetting, { isSuccess }] = useUpdateAutoDeleteMsgMutation();
    const [value, setValue] = useState(expires_in);
    const { t } = useTranslation("setting", { keyPrefix: "auto_delete_msg" });
    const options = [
        { title: t("off"), value: 0 },
        { title: t("30_seconds"), value: 30 },
        { title: t("10_min"), value: 10 * 60 },
        { title: t("1_hour"), value: 60 * 60 },
        { title: t("1_day"), value: 24 * 60 * 60 },
        { title: t("1_week"), value: 7 * 24 * 60 * 60 },
    ];
    const handleSave = () => {
        const dto = type == "user" ? { users: [{ uid: id, expires_in: value }] } : { groups: [{ gid: id, expires_in: value }] };
        updateSetting(dto);
    };
    const handleReset = () => {
        setValue(expires_in);
    };
    const handleChange = (val: number) => {
        setValue(val);
    };
    useEffect(() => {
        if (isSuccess) {
            toast.success("Update Successfully!");
        }
    }, [isSuccess]);

    return (
        <section className="max-w-[512px] h-full relative">
            <div className="text-sm">
                <h2 >{t("title")}</h2>
                <p className="text-gray-500">{t("desc")}</p>
            </div>
            <div className="mt-4">
                <StyledRadio
                    options={options.map(({ title }) => title)}
                    values={options.map(({ value }) => value)}
                    value={value}
                    onChange={handleChange}
                />
            </div>
            {expires_in !== value && <SaveTip saveHandler={handleSave} resetHandler={handleReset} />}
        </section>
    );
};

export default AutoDeleteMessages;