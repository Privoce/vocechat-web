// import React from 'react';
// import Tippy from '@tippyjs/react';
// import { useState } from 'react';
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { useGetAgoraStatusQuery } from "@/app/services/server";
import { updateChannelVisibleAside, updateDMVisibleAside } from "@/app/slices/footprint";
import { updateCallInfo } from "@/app/slices/voice";
import { useAppSelector } from "@/app/store";
import { ChatContext } from "@/types/common";
import Tooltip from "@/components/Tooltip";
import { useVoice } from "@/components/Voice";
import { isInIframe } from "@/utils";
import IconHeadphone from "@/assets/icons/headphone.svg";

type Props = {
  context?: ChatContext;
  id: number;
};

const VoiceChat = ({ id, context = "channel" }: Props) => {
  const { joinVoice, joined, joining = false, joinedAtThisContext } = useVoice({ id, context });
  const dispatch = useDispatch();
  const { loginUser, voiceList, visibleAside } = useAppSelector((store) => {
    return {
      loginUser: store.authData.user,
      contextData: context == "channel" ? store.channels.byId[id] : store.users.byId[id],
      voiceList: store.voice.list,
      visibleAside: context == "channel" ? store.footprint.channelAsides[id] : null
    };
  });
  const { data: enabled } = useGetAgoraStatusQuery();
  const { t } = useTranslation("chat");
  const toggleDashboard = () => {
    const data = {
      id,
      aside: visibleAside == "voice" ? null : ("voice" as const)
    };
    dispatch(context == "channel" ? updateChannelVisibleAside(data) : updateDMVisibleAside(data));
  };
  const handleJoin = () => {
    if (joining || joined) {
      alert("You have joined another channel, please leave first!");
      return;
    }
    if (isInIframe()) {
      toast.error("Voice is not supported in iframe");
      return;
    }
    joinVoice();
    const data = {
      id,
      aside: "voice" as const
    };
    dispatch(context == "channel" ? updateChannelVisibleAside(data) : updateDMVisibleAside(data));
    // 实时显示calling box
    if (!joinedAtThisContext && context == "dm") {
      dispatch(updateCallInfo({ from: loginUser?.uid ?? 0, to: id, calling: false }));
    }
  };
  if (!loginUser || !enabled) return null;
  const visible = visibleAside == "voice";
  const memberCount = voiceList.find((v) => v.context == context && v.id == id)?.memberCount ?? 0;
  const badgeClass = `absolute -top-2 -right-2 w-4 h-4 rounded-full bg-primary-400 text-white `;
  return (
    <Tooltip disabled={visible} tip={t("voice")} placement="left">
      <li className={`relative group`}>
        <IconHeadphone
          className={visible ? "fill-gray-600" : "fill-gray-500"}
          role="button"
          onClick={joinedAtThisContext ? toggleDashboard : handleJoin}
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
