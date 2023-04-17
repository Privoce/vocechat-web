import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useJoinPrivateChannelMutation } from '../../app/services/channel';
import StyledButton from '../../common/component/styled/Button';
import { useCheckMagicTokenValidMutation } from '../../app/services/auth';

// type Props = {}

const InvitePrivate = () => {
    const navigateTo = useNavigate();
    const [joinChannel, { isLoading, data, isSuccess }] = useJoinPrivateChannelMutation();
    const [checkTokenInvalid, { data: isTokenValid, isLoading: checkingToken }] =
        useCheckMagicTokenValidMutation();
    let [searchParams] = useSearchParams(new URLSearchParams(location.search));
    const magic_token = searchParams.get("magic_token") ?? "";
    useEffect(() => {
        if (magic_token) {
            checkTokenInvalid(magic_token);
        }
    }, [magic_token]);
    useEffect(() => {
        if (data && isSuccess) {
            //  joinChannel(data)
            navigateTo(`/chat/channel/${data.gid}`);
        }
    }, [isSuccess, data]);
    const handleJoin = async () => {
        const resp = await joinChannel({ magic_token });
        if ("error" in resp) {
            if (resp.error.originalStatus === 409) {
                // alert("The invite link is invalid or expired"); 
            }
        }
    };
    return (
        <div className="flex-center flex-col gap-4 h-screen overflow-x-hidden overflow-y-auto dark:bg-gray-700 dark:text-slate-100">
            <div className="py-8 px-10 shadow-md rounded-xl">
                {checkingToken ? "Checking..." : isTokenValid ? "You are invited to join a private channel" : "The invite link is invalid or expired"}
            </div>
            <StyledButton disabled={isLoading || checkingToken || !isTokenValid} onClick={handleJoin}>Join the channel</StyledButton>
        </div>
    );
};

export default InvitePrivate;