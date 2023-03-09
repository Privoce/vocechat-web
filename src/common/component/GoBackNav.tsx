import React from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import IconArrow from '../../assets/icons/arrow.left.svg';
type Props = {
    path?: string,
    className?: string
}

const GoBackNav = ({ path, className = "" }: Props) => {
    const navigate = useNavigate();
    const isChannelChatPage = useMatch("/chat/channel/:channel_id");
    const isDMChatPage = useMatch("/chat/dm/:user_id");
    const isProfilePage = useMatch("/users/:user_id");
    // console.log("routt", isChannelChatPage, isDMChatPage);
    const isChatPage = !!isChannelChatPage || !!isDMChatPage;
    const handleBack = () => {
        if (path) {
            navigate(path);
        } else if (isChatPage) {
            navigate("/chat");
        } else if (isProfilePage) {
            navigate("/users");
        } else {
            navigate(-1);
        }
    };
    return (
        <button className={`p-1 absolute left-0 md:hidden ${className}`} onClick={handleBack}>
            <IconArrow className="dark:stroke-white  w-6 h-6" />
        </button>
    );
};

export default GoBackNav;