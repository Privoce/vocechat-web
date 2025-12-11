import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { shallowEqual, useDispatch } from "react-redux";

import { useGetAgoraStatusQuery } from "@/app/services/server";
import { updateChannelVisibleAside, updateDMVisibleAside } from "@/app/slices/footprint";
import { updateCallInfo } from "@/app/slices/voice";
import { useAppSelector } from "@/app/store";
import { ChatContext } from "@/types/common";
import Tooltip from "@/components/Tooltip";
import { useVoice } from "@/components/Voice";
import { isInIframe } from "@/utils";
import IconHeadphone from "@/assets/icons/headphone.svg";
// import useSendMessage from "@/hooks/useSendMessage";

type Props = {
  context?: ChatContext;
  id: number;
};
// TODO: 通过API获取是否Vocespace已经部署完成，如果部署成功则点击事件需要向当前频道发送一个发言请求
// 包含Vocespace会议室URL即可
const isIframe = isInIframe();
const VoiceChat = ({ id, context = "channel" }: Props) => {
  const { joinVoice, joined, joining = false, joinedAtThisContext } = useVoice({ id, context });
  const dispatch = useDispatch();
  const loginUid = useAppSelector((store) => store.authData.user?.uid ?? 0, shallowEqual);
  const visibleAside = useAppSelector(
    (store) => (context == "channel" ? store.footprint.channelAsides[id] : null),
    shallowEqual
  );
  const voiceList = useAppSelector((store) => store.voice.list, shallowEqual);
  const { data: enabled } = useGetAgoraStatusQuery();
  const { t } = useTranslation("chat");
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
  if (loginUid == 0 || !enabled) return null;
  const visible = visibleAside == "voice";
  const memberCount = voiceList.find((v) => v.context == context && v.id == id)?.memberCount ?? 0;
  const badgeClass = `absolute -top-2 -right-2 w-4 h-4 rounded-full bg-primary-400 text-white `;
  // 向当前频道中发送Vocespace链接
  // const { sendMessage } = useSendMessage({ context, from: loginUid, to: id });
  // const replying_mid = useAppSelector(
  //   (store) => store.message.replying[`${context}_${id}`],
  //   shallowEqual
  // );
  // const handleSendVocespaceRequest = async () => {
  //   await sendMessage({
  //     reply_mid: replying_mid,
  //     type: "text",
  //     content: "Join Vocespace Meeting: https://vocespace.example.com/meeting/12345",
  //     from_uid: loginUid,
  //   });
  // };

  return (
    <Tooltip disabled={visible} tip={t("voice")} placement="left">
      <li className={`relative group`}>
        <IconHeadphone
          className={visible ? "fill-gray-600" : "fill-gray-500"}
          role="button"
          onClick={isIframe ? handleInIframe : joinedAtThisContext ? toggleDashboard : handleJoin}
        />
        {visible ? null : (
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
        )}
      </li>
    </Tooltip>
  );
};

export default VoiceChat;
