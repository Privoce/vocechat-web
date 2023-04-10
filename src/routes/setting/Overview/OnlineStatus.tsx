// import React from 'react'
import { useTranslation } from 'react-i18next';
import { useGetSystemCommonQuery, useUpdateSystemCommonMutation } from '../../../app/services/server';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Label from '../../../common/component/styled/Label';
import Toggle from '../../../common/component/styled/Toggle';
import { useAppSelector } from '../../../app/store';
// type Props = {}

const Index = () => {
    const currStatus = useAppSelector(store => store.server.show_user_online_status);
    const { t } = useTranslation("setting", { keyPrefix: "overview.online_status" });
    const { t: ct } = useTranslation();
    const { data, isSuccess: loadSuccess, refetch } = useGetSystemCommonQuery();
    const [updateSetting, { isSuccess }] = useUpdateSystemCommonMutation();
    useEffect(() => {
        if (isSuccess) {
            refetch();
            toast.success(ct("tip.update"));
        }
    }, [isSuccess]);
    const handleToggle = () => {
        const opposite = !data?.show_user_online_status;
        updateSetting({ show_user_online_status: opposite });
    };
    if (!loadSuccess) return null;
    return (
        <div className="flex justify-between">
            <div className="text-sm">
                <div className="dark:text-gray-100 font-semibold">
                    <Label className="dark:text-gray-200">{t("title")}</Label>
                </div>
                <span className="flex justify-between w-full text-gray-400" >{t("desc")}</span>
            </div>
            <Toggle
                onClick={handleToggle}
                checked={currStatus}
            ></Toggle>
        </div>
    );
};

export default Index;