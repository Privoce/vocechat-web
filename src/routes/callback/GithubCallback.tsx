import { useEffect, FC } from 'react';
import { KEY_LOCAL_MAGIC_TOKEN } from "../../app/config";
import { useLoginMutation } from "../../app/services/auth";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

export type GithubLoginSource = "widget" | "webapp"
type Props = {
    code: string, from?: GithubLoginSource
}
const GithubCallback: FC<Props> = ({ code, from = "webapp" }) => {
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
            toast.success("Login Successfully");
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
            // todo: why?
            switch ((error as FetchBaseQueryError).status) {
                case 410:
                    toast.error(
                        "No associated account found, please user admin for an invitation link to join."
                    );
                    break;
                default:
                    toast.error("Something Error");
                    break;
            }
            return;
        }
    }, [error]);
    if (error) return <span>Something Error</span>;
    return <section className='flex flex-col gap-3 justify-center items-center'>
        {isSuccess && from == 'widget' && <h1>Please close this window and return widget window</h1>}
        <span className='text-3xl text-green-600 font-bold'>{isLoading ? "Github Logging in..." : "Github Login Success!"}</span>
    </section>;
};

export default GithubCallback;