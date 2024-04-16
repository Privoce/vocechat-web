// import { useState, ChangeEvent } from 'react';
import clsx from "clsx";

import { useAppSelector } from "../../app/store";
import useSSE from "../useSSE";
import { useWidget } from "../WidgetContext";
import Footer from "./Footer";
import Header from "./Header";
import InviteOnlyTip from "./InviteOnlyTip";
import MessageFeed from "./MessageFeed";
import MessageInput from "./MessageInput";
import Welcome from "./Welcome";
import { shallowEqual } from "react-redux";

type Props = {
  hostId: number;
  handleClose: () => void;
};

const Index = ({ handleClose, hostId }: Props) => {
  const { embed, inviteOnly } = useWidget();
  // 建立 SSE 连接
  useSSE();
  const loginUser = useAppSelector((store) => store.authData.user, shallowEqual);
  const token = useAppSelector((store) => store.authData.token, shallowEqual);
  const isGuest = useAppSelector((store) => store.authData.guest, shallowEqual);

  // no token or guest login
  const notLogin = !token || isGuest;
  return (
    <aside
      className={clsx(
        "flex flex-col bg-white dark:bg-gray-700 rounded-md overflow-hidden",
        embed
          ? "w-full h-full"
          : `w-full h-full md:max-w-lg md:h-[calc(100vh_-_20px)] m-auto md:my-2 md:shadow-lg rounded-none md:rounded-md`
      )}
    >
      <Header handleClose={handleClose} />
      {inviteOnly ? (
        <InviteOnlyTip />
      ) : (
        <>
          {/* message list */}
          <main
            id="MESSAGE_LIST_CONTAINER"
            className="relative flex-1 overflow-y-auto scroll-smooth"
          >
            {/* placeholder */}
            <div className="flex-center h-10"></div>
            <Welcome needLogin={notLogin} />
            {notLogin ? null : <MessageFeed hostId={hostId} />}
          </main>
          {/* message input */}
          {notLogin ? null : <MessageInput from={loginUser?.uid || 0} to={hostId} />}
        </>
      )}
      <Footer />
    </aside>
  );
};

export default Index;
