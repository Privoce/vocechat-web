import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { useCheckMagicTokenValidMutation } from "../../app/services/auth";
import { useJoinPrivateChannelMutation, useLazyGetChannelQuery } from "../../app/services/channel";
import { useAppSelector } from "../../app/store";
import StyledButton from "../../components/styled/Button";
import { shallowEqual } from "react-redux";

const InvitePrivate = () => {
  const { channel_id } = useParams();
  const server = useAppSelector((store) => store.server, shallowEqual);
  const navigateTo = useNavigate();
  const [joinChannel, { isLoading, data, isSuccess }] = useJoinPrivateChannelMutation();
  const [fetchChannelInfo, { data: channel, isSuccess: fetchChannelSuccess }] =
    useLazyGetChannelQuery();
  const [checkTokenInvalid, { data: isTokenValid, isLoading: checkingToken }] =
    useCheckMagicTokenValidMutation();
  let [searchParams] = useSearchParams(new URLSearchParams(location.search));
  const magic_token = searchParams.get("magic_token") ?? "";
  useEffect(() => {
    if (channel_id) {
      fetchChannelInfo(+channel_id);
    }
  }, [channel_id]);
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
  if (!fetchChannelSuccess) return null;
  return (
    <div className="flex-center flex-col gap-4 h-screen overflow-x-hidden overflow-y-auto dark:bg-gray-700 dark:text-slate-100">
      <div className="flex flex-col gap-4 items-center py-8 px-10 rounded-lg shadow-md bg-slate-100/30 dark:bg-gray-800 text-center">
        <div className="flex flex-col items-center gap-4">
          <img src={server.logo} className="w-20 h-20" alt="server logo" />
          <h2 className="text-2xl font-bold">{server.name}</h2>
        </div>
        <span>
          {checkingToken ? (
            "Checking..."
          ) : isTokenValid ? (
            <>
              You are invited to join private channel{" "}
              <strong className="text-primary-400">#{channel?.name}</strong>
            </>
          ) : (
            "The invite link is invalid or expired"
          )}
        </span>
        <StyledButton disabled={isLoading || checkingToken || !isTokenValid} onClick={handleJoin}>
          Join
        </StyledButton>
      </div>
    </div>
  );
};

export default InvitePrivate;
