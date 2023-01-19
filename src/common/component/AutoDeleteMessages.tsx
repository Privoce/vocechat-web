import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { useTranslation } from "react-i18next";
import { useUpdateAutoDeleteMsgMutation } from "../../app/services/user";
import { useAppSelector } from '../../app/store';
import SaveTip from "./SaveTip";
import StyledRadio from "./styled/Radio";


type Props = {
    id: number,
    type?: "user" | "channel",
    // expires_in?: number
}
const AutoDeleteMessages = ({ id, type = "channel" }: Props) => {
    const setting = useAppSelector(store => type == "channel" ?
        store.footprint.autoDeleteMsgChannels.find(item => item.gid == id)
        :
        store.footprint.autoDeleteMsgUsers.find(item => item.uid == id));
    const [updateSetting, { isSuccess }] = useUpdateAutoDeleteMsgMutation();
    const [value, setValue] = useState<number>(setting?.expires_in ?? 0);
    const { t } = useTranslation("setting", { keyPrefix: "auto_delete_msg" });
    const { t: ct } = useTranslation();
    const options = [
        { title: t("off"), value: 0 },
        { title: t("5_min"), value: 5 * 60 },
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
        setValue(setting?.expires_in ?? 0);
    };
    const handleChange = (val: number) => {
        setValue(val);
    };
    useEffect(() => {
        if (isSuccess) {
            toast.success(ct("tip.update"));
        }
    }, [isSuccess]);
    const originalVal = setting?.expires_in ?? 0;
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
                    value={value || 0}
                    onChange={handleChange}
                />
            </div>
            {originalVal !== value && <SaveTip saveHandler={handleSave} resetHandler={handleReset} />}
        </section>
    );
};

export default AutoDeleteMessages;