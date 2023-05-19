import React from "react";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

import { ContentTypes } from "@/app/config";
import { updateSelectMessages } from "@/app/slices/ui";
import { useAppSelector } from "@/app/store";
import { ChatContext } from "@/types/common";
import Divider from "@/components/Divider";
import LinkifyText from "@/components/LinkifyText";
import Message from "@/components/Message";
import Checkbox from "@/components/styled/Checkbox";
import { isImage } from "@/utils";
import i18n from "../../i18n";

export function getUnreadCount({
  mids = [],
  messageData = {},
  loginUid = 0,
  readIndex = 0
}: {
  mids?: number[];
  messageData: object;
  loginUid: number;
  readIndex: number;
}) {
  // console.log({ mids, loginUid, readIndex });
  // 先过滤掉空信息和from自己的
  const others = mids.filter((mid) => {
    const { from_uid = 0 } = messageData[mid] || {};
    return messageData[mid] && from_uid != loginUid;
  });
  if (others.length == 0) return { unreads: 0 };
  if (readIndex == 0) return { unreads: others.length };
  // 再过滤掉小于read-index，
  const final = others.filter((mid) => {
    return mid > readIndex;
  });
  // 拿at数量
  const tmps: number[] = [];
  final.forEach((mid) => {
    const msg = messageData[mid];
    const { mentions = [] } = msg.properties || {};
    mentions.forEach((id: number) => {
      if (id == loginUid) {
        tmps.push(mid);
      }
    });
  });
  // console.log("unreads", final.length, tmps);
  return { unreads: final.length, mentions: tmps };
}
export const renderPreviewMessage = (message = null) => {
  if (!message) return null;
  const { content_type, content, properties = {} } = message;
  let res = null;

  switch (content_type) {
    case ContentTypes.text:
      {
        res = <LinkifyText text={content} url={false} mentionTextOnly={true} />;
      }
      break;
    case ContentTypes.audio:
      {
        res = `[${i18n.t("voice_message", { ns: "chat" })}]`;
      }
      break;
    case ContentTypes.markdown:
      {
        res = `[markdown]`;
      }
      break;
    case ContentTypes.archive:
      {
        res = `[${i18n.t("forward", { ns: "chat" })}]`;
      }
      break;
    case ContentTypes.file:
      {
        const props = properties ?? {};
        if (isImage(props.content_type, props.size)) {
          res = `[${i18n.t("image", { ns: "chat" })}]`;
        } else {
          res = `[${i18n.t("file", { ns: "chat" })}]`;
        }
      }

      break;

    default:
      break;
  }
  return res;
};

const MessageWrapper = ({ selectMode = false, context, id, mid, divider, children, ...rest }) => {
  const dispatch = useDispatch();

  const selects = useAppSelector((store) => store.ui.selectMessages[`${context}_${id}`]);
  const selected = !!(selects && selects.find((s) => s == mid));
  const toggleSelect = () => {
    const operation = selected ? "remove" : "add";
    dispatch(updateSelectMessages({ context, id, operation, data: mid }));
  };
  return (
    <div className={`group flex flex-col items-start gap-2 relative w-full `} {...rest}>
      {divider}
      <div
        className={`w-full flex items-center ${
          selectMode ? "group-hover:bg-slate-100 dark:group-hover:bg-slate-900" : ""
        }`}
      >
        {selectMode && <Checkbox className="!ml-2" checked={selected} />}
        {children}
      </div>
      {selectMode && (
        <div
          className="absolute left-0 top-0 w-full h-full cursor-pointer"
          onClick={selectMode ? toggleSelect : undefined}
        ></div>
      )}
    </div>
  );
};
type Params = {
  readonly?: boolean;
  selectMode: boolean;
  read?: boolean;
  updateReadIndex?: (param: any) => void;
  prev?: object | null;
  curr: object | null;
  contextId: number;
  context: ChatContext;
};
export const renderMessageFragment = ({
  readonly = false,
  selectMode = false,
  read = true,
  updateReadIndex,
  prev,
  curr = null,
  contextId = 0,
  context = "dm"
}: Params) => {
  if (!curr) return <div className="w-full h-[1px] invisible"></div>;
  let { created_at, mid } = curr;
  const local_id = curr.properties?.local_id;
  let divider = null;
  let time = dayjs(created_at).format("YYYY/MM/DD");
  if (!prev && typeof prev !== "undefined") {
    // 首条信息
    divider = time;
  } else if (prev) {
    let { created_at: prev_created_at } = prev;
    if (!dayjs(prev_created_at).isSame(created_at, "day")) {
      divider = time;
    }
  }
  const _key = local_id || mid;
  return (
    <MessageWrapper
      key={_key}
      data-key={_key}
      context={context}
      id={contextId}
      mid={mid}
      selectMode={selectMode}
      divider={divider ? <Divider className="w-full" content={divider}></Divider> : null}
    >
      <Message
        readOnly={selectMode || readonly}
        updateReadIndex={updateReadIndex}
        read={read}
        context={context}
        mid={mid}
        key={_key}
        contextId={contextId}
      />
    </MessageWrapper>
  );
};

export default getUnreadCount;
