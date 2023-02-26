// import React from 'react'
import clsx from 'clsx';
import { FormEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '../../../app/services/auth';
import { useGetLoginConfigQuery } from '../../../app/services/server';
import { setAuthData } from '../../../app/slices/auth.data';
import Divider from '../../../common/component/Divider';
import GithubLoginButton from '../../../common/component/GithubLoginButton';
import GoogleLoginButton from '../../../common/component/GoogleLoginButton';
import StyledButton from '../../../common/component/styled/Button';
import Input from '../../../common/component/styled/Input';
import useGithubAuthConfig from '../../../common/hook/useGithubAuthConfig';
import useGoogleAuthConfig from '../../../common/hook/useGoogleAuthConfig';
import { useWidget } from '../../WidgetContext';

// type Props = {}

const Login = () => {
    const dispatch = useDispatch();
    const { color, fgColor, from } = useWidget();
    const { clientId } = useGoogleAuthConfig();
    const { config: githubAuthConfig } = useGithubAuthConfig();
    const [register, { isLoading, isSuccess, data }] = useRegisterMutation();
    const { data: loginConfig, isSuccess: loginConfigSuccess } = useGetLoginConfigQuery();
    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        const form = evt.currentTarget;
        // 检查格式
        if (!form?.checkValidity()) {
            form?.reportValidity();
            return;
        }
        const data = new FormData(form);
        const name = data.get("username") as string;
        const email = data.get("email") as string;
        console.log("name,email", name, email);
        register({
            name: `${name}-[${from}]`,
            email,
            password: email,
            gender: 0,
            device: "unknown"
        });
        // const content = new FormData(form).get("prompt") as string;
    };
    useEffect(() => {
        if (isSuccess && data) {
            dispatch(setAuthData(data));
        }
    }, [isSuccess, data]);

    if (!loginConfigSuccess) return null;

    const {
        github: enableGithubLogin,
        google: enableGoogleLogin,
    } = loginConfig;
    const googleLogin = enableGoogleLogin && clientId;
    const hasSocialLogins = enableGithubLogin || googleLogin;
    return (
        <div className="w-full max-w-[288px] flex flex-col gap-2 mt-4 animate-[fadeInUp_.5s_.8s_ease-in-out_both]">
            <div className="bg-white dark:bg-gray-700 border dark:border-gray-500 rounded-lg">
                <form className="px-4 py-3 flex flex-col gap-2" onSubmit={handleSubmit}>
                    <Input required placeholder="Name" name='username' />
                    <Input required placeholder="Email" type="email" name='email' />
                    <StyledButton disabled={isLoading} type="submit" className={clsx("small", `bg-[${color}] text-[${fgColor}]`)}>Start Chat</StyledButton>
                    {hasSocialLogins && <Divider content='OR' />}
                    {googleLogin && <GoogleLoginButton clientId={clientId} />}
                    {enableGithubLogin && <GithubLoginButton client_id={githubAuthConfig?.client_id} source="widget" />}
                </form>
            </div>
        </div>
    );
};

export default Login;