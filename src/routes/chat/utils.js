import React from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { isImage } from "../../common/utils";
import { ContentTypes } from "../../app/config";
import Checkbox from "../../common/component/styled/Checkbox";
import Divider from "../../common/component/Divider";
import Message from "../../common/component/Message";
import { updateSelectMessages } from "../../app/slices/ui";
// function debounce(callback, wait = 2000, immediate = false) {
//   let timeout = null;
//   return function () {
//     const callNow = immediate && !timeout;
//     const next = () => callback.apply(this, arguments);
//     clearTimeout(timeout);
//     timeout = setTimeout(next, wait);
//     if (callNow) {
//       next();
//     }
//   };
// }
export function getUnreadCount({
  mids = [],
  messageData = {},
  loginUid = 0,
  readIndex = 0,
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
  const tmps = [];
  final.forEach((mid) => {
    const msg = messageData[mid];
    const { mentions = [] } = msg.properties || {};
    mentions.forEach((id) => {
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
        res = content;
      }
      break;
    case ContentTypes.markdown:
      {
        res = `[markdown]`;
      }
      break;
    // case ContentTypes.archive:
    //   {
    //     res = `[forward]`;
    //   }
    //   break;
    case ContentTypes.file:
      {
        const props = properties ?? {};
        if (isImage(props.content_type, props.size)) {
          res = `[image]`;
        } else {
          res = `[file]`;
        }
      }

      break;

    default:
      break;
  }
  return res;
};
const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  > .overlay {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  > .check {
    display: none;
    margin-top: 18px;
    margin-left: 8px;
  }
  > .message {
    flex: 1;
  }
  &.select {
    /* cursor: pointer; */
    &:hover {
      border-radius: var(--br);
      background: #f5f6f7;
    }
    > .check {
      display: block;
    }
  }
`;
const MessageWrapper = ({
  selectMode = false,
  context,
  id,
  mid,
  children,
  ...rest
}) => {
  const dispatch = useDispatch();

  const selects = useSelector(
    (store) => store.ui.selectMessages[`${context}_${id}`]
  );
  const selected = !!(selects && selects.find((s) => s == mid));
  const toggleSelect = () => {
    const operation = selected ? "remove" : "add";
    dispatch(updateSelectMessages({ context, id, operation, data: mid }));
  };
  return (
    <StyledWrapper className={selectMode ? "select" : ""} {...rest}>
      <Checkbox className="check" checked={selected} />
      {/* {React.cloneElement(children, { readOnly: selected })} */}
      {children}
      {selectMode && (
        <div
          className="overlay"
          onClick={selectMode ? toggleSelect : null}
        ></div>
      )}
    </StyledWrapper>
  );
};
export const renderMessageFragment = ({
  selectMode = false,
  isFirst = false,
  read = true,
  updateReadIndex,
  prev = null,
  curr = null,
  contextId = 0,
  context = "user",
}) => {
  if (!curr) return null;
  let { created_at, mid } = curr;
  const local_id = curr.properties?.local_id;
  let divider = null;
  let time = dayjs(created_at).format("YYYY/MM/DD");
  if (!prev) {
    divider = time;
  } else {
    let { created_at: prev_created_at } = prev;
    if (!dayjs(prev_created_at).isSame(created_at, "day")) {
      divider = time;
    }
  }
  const _key = local_id || mid;
  // console.log("_key", _key, local_id, mid);
  return (
    <React.Fragment key={_key}>
      {divider && <Divider content={divider}></Divider>}
      <MessageWrapper
        key={_key}
        data-key={_key}
        context={context}
        id={contextId}
        mid={mid}
        selectMode={selectMode}
      >
        <Message
          readOnly={selectMode}
          isFirst={isFirst}
          updateReadIndex={updateReadIndex}
          read={read}
          context={context}
          mid={mid}
          key={_key}
          contextId={contextId}
        />
      </MessageWrapper>
    </React.Fragment>
  );
};

export default getUnreadCount;
