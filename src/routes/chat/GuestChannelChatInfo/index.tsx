// import { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
import useMessageFeed from "../../../common/hook/useMessageFeed";
import ChannelIcon from "../../../common/component/ChannelIcon";
import Layout from "../Layout";
import { renderMessageFragment } from "../utils";
import { StyledChannelChat, StyledHeader } from "./styled";
import LoadMore from "../LoadMore";
import { useAppSelector } from "../../../app/store";
type Props = {
  cid?: number;
};
export default function GuestChannelChat({ cid = 0 }: Props) {
  const {
    list: msgIds,
    appends,
    hasMore,
    pullUp
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
          <StyledHeader className="head">
            <div className="txt">
              <ChannelIcon personal={!is_public} />
              <span className="title">{name}</span>
              <span className="desc">{description}</span>
            </div>
          </StyledHeader>
        }
      >
        <StyledChannelChat id={`VOCECHAT_FEED_channel_${cid}`}>
          {hasMore ? (
            <LoadMore pullUp={pullUp} />
          ) : (
            <div className="info">
              <h2 className="title">Welcome to #{name} !</h2>
              <p className="desc">This is the start of the #{name} channel. </p>
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
