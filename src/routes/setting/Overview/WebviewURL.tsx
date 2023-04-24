// import React from 'react'
import { useTranslation } from 'react-i18next';
import { useGetSystemCommonQuery, useUpdateSystemCommonMutation } from '../../../app/services/server';
import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import StyledInput from "../../../common/component/styled/Input";
import StyledButton from "../../../common/component/styled/Button";
import { useAppSelector } from '../../../app/store';
// type Props = {}

const Index = () => {
    const currUrl = useAppSelector(store => store.server.webview_url);
    const [url, setUrl] = useState(currUrl);
    const { t } = useTranslation("setting", { keyPrefix: "overview.webview_url" });
    const { t: ct } = useTranslation();
    const { refetch } = useGetSystemCommonQuery();
    const [updateSetting, { isSuccess, isLoading }] = useUpdateSystemCommonMutation();
    useEffect(() => {
        if (isSuccess) {
            refetch();
            toast.success(ct("tip.update"));
        }
    }, [isSuccess]);
    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        // update
        setUrl(evt.target.value);
    };
    const handleUpdate = () => {
        updateSetting({ webview_url: url });
    };
    // const handleToggle = () => {
    //     updateSetting({ show_user_online_status: !currUrl });
    // };
    // if (!loadSuccess) return null;
    return (
        <div className="text-sm">
            <p className="dark:text-gray-100 font-semibold">{t("title")}</p>
            <p className="flex justify-between w-full text-gray-400 mb-2">
                <span className="txt">
                    {t("desc")}
                </span>
            </p>
            <div className="flex items-center gap-4 mt-2">
                <StyledInput placeholder={t("desc")} value={url} onChange={handleChange} />
                <StyledButton disabled={!url || isLoading} className='' onClick={handleUpdate}> {ct("action.update")}</StyledButton>
            </div>
        </div>
    );
};

export default Index;