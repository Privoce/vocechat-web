// import React from 'react'
import { useTranslation } from 'react-i18next';
import { useGetSystemCommonQuery, useUpdateSystemCommonMutation } from '../../../app/services/server';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import StyledRadio from "../../../common/component/styled/Radio";
import { useAppSelector } from '../../../app/store';
// type Props = {}

const Index = () => {
    const currStatus = useAppSelector(store => !!store.server.show_user_online_status);
    const { t } = useTranslation("setting", { keyPrefix: "overview.online_status" });
    const { t: ct } = useTranslation();
    const { refetch } = useGetSystemCommonQuery();
    const [updateSetting, { isSuccess }] = useUpdateSystemCommonMutation();
    useEffect(() => {
        if (isSuccess) {
            refetch();
            toast.success(ct("tip.update"));
        }
    }, [isSuccess]);
    const handleToggle = () => {
        updateSetting({ show_user_online_status: !currStatus });
    };
    // if (!loadSuccess) return null;
    return (
        <div className="text-sm">
            <p className="dark:text-gray-100 font-semibold">{t("title")}</p>
            <p className="flex justify-between w-full text-gray-400 mb-2">
                <span className="txt">
                    {t("desc")}
                </span>
            </p>
            <StyledRadio
                options={[t("enable"), t("disable")]}
                values={["true", "false"]}
                value={`${currStatus}`}
                onChange={handleToggle}
            />
        </div>
    );
};

export default Index;