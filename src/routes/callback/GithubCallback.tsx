import { useEffect, FC } from 'react';
import { KEY_LOCAL_MAGIC_TOKEN } from "@/app/config";
import { useLoginMutation } from "@/app/services/auth";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useTranslation } from 'react-i18next';
import StyledButton from '../../components/styled/Button';

export type GithubLoginSource = "widget" | "webapp"
type Props = {
    code: string, from?: GithubLoginSource
}
const GithubCallback: FC<Props> = ({ code, from = "webapp" }) => {
    const { t } = useTranslation("auth");
    const { t: ct } = useTranslation();
    //拿本地存的magic token
    const magic_token = localStorage.getItem(KEY_LOCAL_MAGIC_TOKEN);
    const [login, { isLoading, isSuccess, error }] = useLoginMutation();
    useEffect(() => {
        if (code) {
            login({
                magic_token,
                code,
                type: "github"
            });
        }
    }, [code]);
    useEffect(() => {
        if (isSuccess) {
            toast.success(ct("tip.login"));
            // 通知widget
            if (from == 'widget') {
                localStorage.setItem("widget", `${new Date().getTime()}`);
            }
            // webapp 跳回首页
            if (from == 'webapp') {
                location.href = "/";
            }
        }
    }, [isSuccess, from]);
    useEffect(() => {
        if (error) {
            console.log(error);
            // todo: why?
            switch ((error as FetchBaseQueryError).status) {
                case 410:
                    toast.error(
                        "No associated account found, please contact user admin for an invitation link to join."
                    );
                    break;
                default:
                    toast.error("Something Error");
                    break;
            }
        }
    }, [error]);
    const handleClose = () => {
        window.close();
    };
    if (error) return <span className='text-red-500 text-lg'>Something Error</span>;
    return <section className='flex-center flex-col gap-3'>
        <StyledButton onClick={handleClose}>{ct("action.close")}</StyledButton>
        {isSuccess && from == 'widget' && <h1>{t("github_cb_tip")}</h1>}
        <span className='text-3xl text-green-600 font-bold'>{isLoading ? t("github_logging_in") : t("github_login_success")}</span>
    </section>;
};

export default GithubCallback;