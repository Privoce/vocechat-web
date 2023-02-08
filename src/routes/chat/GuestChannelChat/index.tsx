// import { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useMessageFeed from "../../../common/hook/useMessageFeed";
import ChannelIcon from "../../../common/component/ChannelIcon";
import Layout from "../Layout";
import { renderMessageFragment } from "../utils";
import LoadMore from "../LoadMore";
import { useAppSelector } from "../../../app/store";

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
          <header className="box-border h-14 px-5 border-solid border-b border-b-black/10 flex items-center justify-center md:justify-between">
            <div className="flex items-center gap-1">
              <ChannelIcon personal={!is_public} />
              <span className="text-gray-800 dark:text-white">{name}</span>
              <span className="ml-2 text-gray-500">{description}</span>
            </div>
          </header>
        }
      >
        <article className="py-4.5 px-4 w-full h-full overflow-x-hidden overflow-y-auto" id={`VOCECHAT_FEED_channel_${cid}`}>
          {hasMore ? (
            <LoadMore pullUp={pullUp} pulling={pulling} />
          ) : (
            <div className="pt-14 flex flex-col items-start gap-2">
              <h2 className="font-bold text-4xl dark:text-white">{t("welcome_channel", { name })}</h2>
              <p className="text-gray-600 dark:text-gray-300">{t("welcome_desc", { name })} </p>
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
        </article>
      </Layout>
    </>
  );
}
