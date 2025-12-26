import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { shallowEqual, useDispatch } from "react-redux";

import { useGetAgoraStatusQuery, useGetVocespaceConfigQuery } from "@/app/services/server";
import { updateChannelVisibleAside, updateDMVisibleAside } from "@/app/slices/footprint";
import { updateCallInfo } from "@/app/slices/voice";
import { useAppSelector } from "@/app/store";
import { ChatContext } from "@/types/common";
import Tooltip from "@/components/Tooltip";
import { useVoice } from "@/components/Voice";
import { compareVersion, isInIframe } from "@/utils";
import IconHeadphone from "@/assets/icons/headphone.svg";
import { useEffect, useMemo, useState } from "react";
import useSendMessage from "@/hooks/useSendMessage";
import { useNavigate } from "react-router-dom";
import { VocespaceConfig } from "@/types/server";

type Props = {
  context?: ChatContext;
  id: number;
};

const isIframe = isInIframe();
const VoiceChat = ({ id, context = "channel" }: Props) => {
  const [chatType, setChatType] = useState<"agora" | "vocespace">("vocespace");
  const currentVersion = useAppSelector((store) => store.server.version, shallowEqual);
  const showVoceSpace = useMemo(() => {
    return compareVersion(currentVersion, "0.5.8") >= 0;
  }, [currentVersion]);

  const { joinVoice, joined, joining = false, joinedAtThisContext } = useVoice({ id, context });
  const dispatch = useDispatch();
  const loginUid = useAppSelector((store) => store.authData.user?.uid ?? 0, shallowEqual);
  const isAdmin = useAppSelector((store) => store.authData.user?.is_admin ?? false, shallowEqual);
  const visibleAside = useAppSelector(
    (store) => (context == "channel" ? "voice" : null),
    shallowEqual
  );

  const voiceList = useAppSelector((store) => store.voice.list, shallowEqual);
  const { data: enabled } = useGetAgoraStatusQuery();
  const [vocespaceConfig, setVoceSpaceConfig] = useState<VocespaceConfig | undefined>(undefined);
  const { t } = useTranslation("chat");
  const { data: conf } = showVoceSpace ? useGetVocespaceConfigQuery() : { data: undefined };

  useEffect(() => {
    if (!showVoceSpace) {
      setChatType("agora");
    } else {
      if (conf) {
        setVoceSpaceConfig(conf);
        setChatType("vocespace");
      }
    }
  }, [showVoceSpace]);

  const toggleDashboard = () => {
    const data = {
      id,
      aside: visibleAside == "voice" ? null : ("voice" as const),
    };
    dispatch(context == "channel" ? updateChannelVisibleAside(data) : updateDMVisibleAside(data));
  };
  const handleJoin = () => {
    if (joining || joined) {
      alert("You have joined another channel, please leave first!");
      return;
    }
    joinVoice();
    const data = {
      id,
      aside: "voice" as const,
    };
    dispatch(context == "channel" ? updateChannelVisibleAside(data) : updateDMVisibleAside(data));
    // 实时显示calling box
    if (!joinedAtThisContext && context == "dm") {
      dispatch(updateCallInfo({ from: loginUid, to: id, calling: false }));
    }
  };
  const handleInIframe = () => {
    // todo
    toast.error("Voice is not supported in iframe");
  };
  if (loginUid == 0) return null;
  const visible = visibleAside == "voice";
  const memberCount = voiceList.find((v) => v.context == context && v.id == id)?.memberCount ?? 0;
  const badgeClass = `absolute -top-2 -right-2 w-4 h-4 rounded-full bg-primary-400 text-white `;
  const { sendMessage } = useSendMessage({ context, from: loginUid, to: id });
  const replying_mid = useAppSelector(
    (store) => store.message.replying[`${context}_${id}`],
    shallowEqual
  );

  const navigate = useNavigate();

  const sendVoceSpaceMsg = async (url: string) => {
    await sendMessage({
      reply_mid: replying_mid,
      type: "text",
      content: `Join Vocespace Meeting: ${url}`,
      from_uid: loginUid,
    });
  };

  const handleSendVocespaceRequest = async () => {
    const genUUID = () =>
      "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
        (+c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))).toString(16)
      );
    if (vocespaceConfig && vocespaceConfig.state && vocespaceConfig.state === "undeployed") {
      await sendVoceSpaceMsg(
        `https://vocespace.com/${context}_${id}_${encodeURIComponent(genUUID())}`
      );
    } else if (vocespaceConfig && vocespaceConfig?.enabled && vocespaceConfig.state === "success") {
      let url = vocespaceConfig.url;
      if (url.includes(":7880")) {
        url = `http://${url.replace(":7880", ":3008")}/${context}_${id}`;
      } else {
        url = `https://${url}/${context}_${id}`;
      }
      await sendVoceSpaceMsg(url);
    } else {
      if (!showVoceSpace) {
        await sendVoceSpaceMsg(
          `https://vocespace.com/${context}_${id}_${encodeURIComponent(genUUID())}`
        );
      } else {
        if (isAdmin) {
          // 跳转到/setting/video
          navigate("/setting/video");
        } else {
          await sendVoceSpaceMsg(
            `https://vocespace.com/${context}_${id}_${encodeURIComponent(genUUID())}`
          );
        }
      }
    }
  };
  const handleOnClick = async () => {
    if (chatType === "agora" && enabled) {
      return isIframe ? handleInIframe() : joinedAtThisContext ? toggleDashboard() : handleJoin();
    } else {
      // 向当前频道中发送Vocespace链接
      await handleSendVocespaceRequest();
    }
  };

  return (
    <Tooltip disabled={visible} tip={t("voice")} placement="left">
      <li className={`relative group`}>
        <IconHeadphone className={"fill-gray-500"} role="button" onClick={handleOnClick} />
        {/* {visible ? null : (
          <>
            {memberCount > 0 && (
              <span
                className={`${badgeClass} flex-center font-bold text-[10px] group-hover:invisible`}
              >
                {memberCount}
              </span>
            )}
            <span className={`${badgeClass} text-xs flex-center invisible group-hover:visible`}>
              <em className="not-italic">+</em>
            </span>
          </>
        )} */}
        <>
          {memberCount > 0 && (
            <span
              className={`${badgeClass} flex-center font-bold text-[10px] group-hover:invisible`}
            >
              {memberCount}
            </span>
          )}
          <span className={`${badgeClass} text-xs flex-center invisible group-hover:visible`}>
            <em className="not-italic">+</em>
          </span>
        </>
      </li>
    </Tooltip>
  );
};

export default VoiceChat;
