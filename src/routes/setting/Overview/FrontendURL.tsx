// import React from 'react'
import { useTranslation } from 'react-i18next';
import { useUpdateFrontendUrlMutation } from '../../../app/services/server';
import StyledInput from "../../../common/component/styled/Input";
import StyledButton from "../../../common/component/styled/Button";
import { ChangeEvent, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import ServerVersionChecker from '../../../common/component/ServerVersionChecker';
// type Props = {}

const Index = () => {
    const [url, setUrl] = useState(location.origin);
    const { t } = useTranslation("setting");
    const { t: ct } = useTranslation();
    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        // update
        setUrl(evt.target.value);
    };
    const handleUpdate = () => {
        updateUrl(url);
    };
    const [updateUrl, { isLoading, isSuccess }] = useUpdateFrontendUrlMutation();
    useEffect(() => {
        if (isSuccess) {
            toast.success("Update Successfully!");
        }
    }, [isSuccess]);

    return (
        <div className="setting">
            <p className="label">{t("overview.url.title")}</p>
            <p className="tip">
                <span className="txt">
                    {t("overview.url.desc")}
                </span>
            </p>
            <div className="flex items-center gap-4 mt-4">
                <ServerVersionChecker version="0.3.2">
                    <StyledInput placeholder='frontend url' value={url} onChange={handleChange} />
                    <StyledButton disabled={!url || isLoading} className='' onClick={handleUpdate}> {ct("action.update")}</StyledButton>
                </ServerVersionChecker>
            </div>
        </div>
    );
};

export default Index;