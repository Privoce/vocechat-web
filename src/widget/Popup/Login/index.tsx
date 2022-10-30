// import React from 'react'
import { useGetLoginConfigQuery } from '../../../app/services/server';
import GithubLoginButton from '../../../common/component/GithubLoginButton';
import GoogleLoginButton from '../../../common/component/GoogleLoginButton';
import useGithubAuthConfig from '../../../common/hook/useGithubAuthConfig';
import useGoogleAuthConfig from '../../../common/hook/useGoogleAuthConfig';

// type Props = {}

const Login = () => {
    const { clientId } = useGoogleAuthConfig();
    const { config: githubAuthConfig } = useGithubAuthConfig();

    const { data: loginConfig, isSuccess: loginConfigSuccess } = useGetLoginConfigQuery();
    if (!loginConfigSuccess) return <span className="text-xs text-gray-500">checking...</span>;

    const {
        github: enableGithubLogin,
        google: enableGoogleLogin,
    } = loginConfig;
    const googleLogin = enableGoogleLogin && clientId;
    return (
        <div className="w-60 flex flex-col py-2">
            {googleLogin && <GoogleLoginButton clientId={clientId} />}
            {enableGithubLogin && <GithubLoginButton client_id={githubAuthConfig?.client_id} source="widget" />}
        </div>
    );
};

export default Login;