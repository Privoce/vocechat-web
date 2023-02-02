// import { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
import useMessageFeed from "../../../common/hook/useMessageFeed";
import ChannelIcon from "../../../common/component/ChannelIcon";
import Layout from "../Layout";
import { renderMessageFragment } from "../utils";
import { StyledChannelChat } from "./styled";
import LoadMore from "../LoadMore";
import { useAppSelector } from "../../../app/store";
import { useTranslation } from "react-i18next";
type Props = {
  cid?: number;
};
export default function GuestChannelChat({ cid = 0 }: Props) {
  const { t } = useTranslation("chat");
  const {
    list: msgIds,
    appends,
    hasMore,
    pullUp,
    pulling
  } = useMessageFeed({
    context: "channel",
    id: cid
  });
  const { data, messageData } = useAppSelector((store) => {
    return {
      footprint: store.footprint,
      data: store.channels.byId[cid],
      messageData: store.message || {}
    };
  });
  if (!data) return null;
  const { name, description, is_public } = data;
  const feeds = [...msgIds, ...appends];
  return (
    <>
      <Layout
        readonly
        to={cid}
        context="channel"
        header={
          <header className="head flex items-center h-full justify-center md:justify-between">
            <div className="flex items-center gap-1 text-base">
              <ChannelIcon personal={!is_public} />
              <span className="text-gray-800">{name}</span>
              <span className="ml-2 text-gray-500">{description}</span>
            </div>
          </header>
        }
      >
        <StyledChannelChat id={`VOCECHAT_FEED_channel_${cid}`}>
          {hasMore ? (
            <LoadMore pullUp={pullUp} pulling={pulling} />
          ) : (
            <div className="info">
              <h2 className="title">{t("welcome_channel", { name })}</h2>
              <p className="desc">{t("welcome_desc", { name })} </p>
            </div>
          )}
          {/* <div className="feed"> */}
          {feeds.map((mid, idx) => {
            const curr = messageData[mid];
            if (!curr) return null;
            const isFirst = idx == 0;
            const prev = isFirst ? null : messageData[feeds[idx - 1]];
            return renderMessageFragment({
              readonly: true,
              selectMode: false,
              prev,
              curr,
              contextId: cid,
              context: "channel"
            });
          })}
        </StyledChannelChat>
      </Layout>
    </>
  );
}
