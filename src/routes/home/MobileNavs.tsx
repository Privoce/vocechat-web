import clsx from 'clsx';
import React from 'react';
import { NavLink, useLocation, useMatch } from 'react-router-dom';
import { useAppSelector } from '../../app/store';

import ChatIcon from "@/assets/icons/chat.svg";
import UserIcon from "@/assets/icons/user.svg";
import SettingIcon from "@/assets/icons/setting.svg";

// type Props = {}

const MobileNavs = () => {
    const isHomePath = useMatch(`/`);
    const { pathname } = useLocation();
    const isChatHomePath = useMatch(`/chat`);
    const isDMChat = useMatch(`/chat/dm/:user_id`);
    // const isSettingPage = useMatch(`/setting`);
    const isChannelChat = useMatch(`/chat/channel/:channel_id`);
    const {
        ui: {
            rememberedNavs: { chat: chatPath, user: userPath }
        }
    } = useAppSelector((store) => {
        return {
            ui: store.ui,
            loginUid: store.authData.user?.uid,
            guest: store.authData.guest
        };
    });

    const linkClass = `flex`;
    const isChatPage = isHomePath || pathname.startsWith("/chat");
    const isChattingPage = !!isDMChat || !!isChannelChat;
    // console.log("rrr", isDMChat, isChannelChat);

    // 有点绕
    const chatNav = isChatHomePath ? "/chat" : chatPath || "/chat";
    const userNav = userPath || "/users";
    return (
        <ul className={clsx('flex justify-around py-2 fixed bottom-0 left-0 w-full bg-gray-100 dark:bg-gray-800 md:hidden', isChattingPage && "hidden")}>
            <li>
                <NavLink
                    className={() => `${linkClass}`}
                    to={chatNav}
                >
                    {({ isActive }) => {
                        const active = isActive || isChatPage;
                        return <div className='flex flex-col gap-1 items-center'>
                            <ChatIcon className={!active ? "fill-gray-500" : "fill-primary-500"} />
                            <span className={clsx('text-xs', !active ? "text-gray-500" : "text-primary-500")}>Chats</span>
                        </div>;
                    }}
                </NavLink>
            </li>
            <li>
                <NavLink className={() => `${linkClass}`} to={userNav}>
                    {({ isActive: active }) => {
                        return <div className='flex flex-col gap-1 items-center'>
                            <UserIcon className={!active ? "fill-gray-500" : "fill-primary-500"} />
                            <span className={clsx('text-xs', !active ? "text-gray-500" : "text-primary-500")}>Contacts</span>
                        </div>;
                    }}
                </NavLink>
            </li>
            <li>
                <NavLink className={() => `${linkClass}`} to={'/setting'}>
                    {({ isActive: active }) => {
                        return <div className='flex flex-col gap-1 items-center'>
                            <SettingIcon className={clsx("w-6 h-6", !active ? "fill-gray-500" : "fill-primary-500")} />
                            <span className={clsx('text-xs', !active ? "text-gray-500" : "text-primary-500")}>Settings</span>
                        </div>;
                    }}
                </NavLink>
            </li>
        </ul>
    );
};

export default MobileNavs;