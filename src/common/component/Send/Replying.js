// import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { MdClose } from "react-icons/md";
import { removeReplyingMessage } from "../../../app/slices/message";

export default function Replying({ id, mid }) {
  const { msg, contactsData } = useSelector((store) => {
    return { contactsData: store.contacts.byId, msg: store.message[mid] };
  });
  const dispatch = useDispatch();
  const removeReply = () => {
    dispatch(removeReplyingMessage(id));
  };
  if (!msg) return null;
  const { from_uid } = msg;
  const user = contactsData[from_uid];
  return (
    <div className="reply">
      <span className="txt">
        Replying to
        <em>{user?.name}</em>
      </span>
      <button className="close" onClick={removeReply}>
        <MdClose size={20} color="#78787C" />
      </button>
    </div>
  );
}
