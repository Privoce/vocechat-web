import { useState, useEffect, ChangeEvent } from 'react';
import { toast } from "react-hot-toast";
import StyledInput from "@/components/styled/Input";
import StyledButton from "@/components/styled/Button";
import { useGetFrontendUrlQuery, useUpdateFrontendUrlMutation } from "@/app/services/server";
import InfoIcon from '@/assets/icons/info.svg';
import { useTranslation } from 'react-i18next';


type Props = {
    refreshInviteLink: () => void
}

const UpdateFrontendURL = ({ refreshInviteLink }: Props) => {
    const { t } = useTranslation("welcome", { keyPrefix: "onboarding" });
    const { t: ct } = useTranslation();
    const [updateUrl, { isSuccess, isLoading }] = useUpdateFrontendUrlMutation();
    const { data, isSuccess: getUrlSuccess } = useGetFrontendUrlQuery();
    const [frontUrl, setFrontUrl] = useState(location.origin);
    const handleUpdateUrl = (evt: ChangeEvent<HTMLInputElement>) => {
        setFrontUrl(evt.target.value);
    };
    const updateFrontUrl = () => {
        updateUrl(frontUrl);
    };
    useEffect(() => {
        if (getUrlSuccess && data) {
            setFrontUrl(data);
        }
    }, [getUrlSuccess]);
    useEffect(() => {
        if (isSuccess) {
            refreshInviteLink();
            toast.success(ct("tip.update"));
        }
    }, [isSuccess]);
    return (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-8 border-2 border-solid border-primary-300 dark:border-primary-700 bg-primary-25 dark:bg-primary-900 rounded-lg px-2 py-3 flex justify-start gap-4">
            <InfoIcon />
            <div className="flex flex-col items-start gap-2">
                <span className="text-sm text-primary-700 dark:text-primary-300 mb-1">{t("update_domain_tip")}</span>
                <div className="w-[300px] md:w-[400px] rounded flex gap-2">
                    <StyledInput type={"url"} className="!shadow-none md:!bg-transparent" placeholder="Frontend URL" value={frontUrl} onChange={handleUpdateUrl} />
                    <StyledButton disabled={!frontUrl || isLoading} onClick={updateFrontUrl} className="small ">
                        {ct("action.update")}
                    </StyledButton>
                </div>
            </div>
        </div>
    );
};

export default UpdateFrontendURL;