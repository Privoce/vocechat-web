import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useGetLoginConfigQuery } from "../../app/services/server";
import useGithubAuthConfig from "../../common/hook/useGithubAuthConfig";
import useGoogleAuthConfig from "../../common/hook/useGoogleAuthConfig";
import GoogleLoginButton from "../../common/component/GoogleLoginButton";
import GithubLoginButton from "../../common/component/GithubLoginButton";
import MetamaskLoginButton from "./MetamaskLoginButton";
import OidcLoginButton from "./OidcLoginButton";
import { useLoginMutation } from '../../app/services/auth';
import { LoginConfig } from '../../types/server';

// type Props = {}

const SocialLoginButtons = () => {
    const [login, { isSuccess }] = useLoginMutation();
    const { config: githubAuthConfig } = useGithubAuthConfig();
    const { data: loginConfig, isSuccess: loginConfigSuccess } = useGetLoginConfigQuery();
    const { clientId } = useGoogleAuthConfig();

    useEffect(() => {
        if (isSuccess) {
            toast.success("Login Successfully");
            // navigateTo("/");
        }
    }, [isSuccess]);
    if (!loginConfigSuccess) return null;
    const {
        github: enableGithubLogin,
        google: enableGoogleLogin,
        metamask: enableMetamaskLogin,
        oidc = [],
    } = loginConfig as LoginConfig;
    const googleLogin = enableGoogleLogin && !!clientId;
    return (
        <>
            {googleLogin && <GoogleLoginButton type="register" clientId={clientId} />}
            {enableGithubLogin && (
                <GithubLoginButton type="register" client_id={githubAuthConfig?.client_id} />
            )}
            {enableMetamaskLogin && <MetamaskLoginButton login={login} />}
            {oidc.length > 0 && <OidcLoginButton issuers={oidc} />}
        </>
    );
};

export default SocialLoginButtons;