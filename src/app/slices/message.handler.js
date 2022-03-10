import { isObjectEqual } from "../../common/utils";

export const msgReaction = (state, payload) => {
  const { id, from_uid, mid, action: reaction } = payload;
  console.log("msg reaction: likes", id, mid, from_uid, reaction);
  if (state[id] && state[id][mid]) {
    if (!state[id][mid].likes) {
      console.log("msg reaction: initial ");
      state[id][mid].likes = {};
    }
    const currLikes = state[id][mid].likes;
    // state[id][mid].likes = currLikes ? [...currLikes, reaction] : [reaction];
    if (currLikes[reaction]) {
      if (currLikes[reaction].includes(from_uid)) {
        const idx = currLikes[reaction].findIndex((id) => {
          return id == from_uid;
        });
        console.log("remove reaction", currLikes[reaction], idx, from_uid);
        currLikes[reaction].splice(idx, 1);
      } else {
        currLikes[reaction].push(from_uid);
      }
    } else {
      currLikes[reaction] = [from_uid];
    }
    // state[id][mid].likes = currLikes;
  }
};

export const msgAdd = (state, payload) => {
  const {
    id,
    content,
    created_at,
    mid,
    reply_mid = null,
    from_uid,
    content_type,
    unread = true,
  } = payload;
  const newMsg = { content, content_type, created_at, from_uid, unread };

  if (reply_mid && state[id][reply_mid]) {
    newMsg.reply = { mid: reply_mid, ...state[id][reply_mid] };
  }
  if (state[id]) {
    let replaceMsg = state[id][mid];
    // 如果存在，并且新消息和缓存消息不一样，则替换掉，并且改为已读（可能有问题）
    if (replaceMsg) {
      const copyMsg = { ...replaceMsg };
      if (!isObjectEqual(copyMsg, newMsg)) {
        state[id][mid] = { ...newMsg, unread: false };
      }
    } else {
      state[id][mid] = newMsg;
    }
  } else {
    state[id] = { [mid]: newMsg };
  }
};
export const msgAddPending = (state, payload) => {
  const {
    id,
    content,
    created_at,
    local_mid,
    reply_mid = null,
    from_uid,
    content_type,
    unread = false,
  } = payload;
  const newMsg = { content, content_type, created_at, from_uid, unread };

  if (reply_mid && state[id][reply_mid]) {
    newMsg.reply = { mid: reply_mid, ...state[id][reply_mid] };
  }
  if (state[id]) {
    state[id][local_mid] = newMsg;
  } else {
    state[id] = { [local_mid]: newMsg };
  }
};
export const msgReplacePending = (state, payload) => {
  const { id, local_mid, server_mid } = payload;
  if (state[id] && state[id][local_mid]) {
    // 先赋值，再去delete
    state[id] = Object.fromEntries(
      Object.entries(state[id]).map(([key, obj]) => {
        return key == local_mid ? [server_mid, obj] : [key, obj];
      })
    );
    // state[id][server_mid] = { ...state[id][local_mid] };
    // delete state[id][local_mid];
  }
};
export const msgRemovePending = (state, payload) => {
  const { id, local_mid } = payload;
  if (state[id] && state[id][local_mid]) {
    delete state[id][local_mid];
  }
};
export const msgSetRead = (state, payload) => {
  const { id, mid } = payload;
  console.log("set read", id, mid);
  if (state[id] && state[id][mid]) {
    state[id][mid].unread = false;
  }
};
export const msgDelete = (state, payload) => {
  const { id, mid } = payload;
  console.log("delete message", id, mid);
  if (state[id][mid]) {
    // state[id][mid].removed = true;
    delete state[id][mid];
  }
};
export const msgClearUnread = (state, id) => {
  console.log("set all unread", id);
  Object.entries(state[id]).forEach(([, obj]) => {
    obj.unread = false;
  });
};
export const msgUpdate = (state, payload) => {
  const { id, mid, content, time } = payload;
  console.log("update channel message", id, mid);
  if (state[id][mid]) {
    state[id][mid].content = content;
    state[id][mid].edited = time;
  }
};
