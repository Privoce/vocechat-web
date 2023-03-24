// import React from 'react';
import Tippy from '@tippyjs/react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../app/store';
import IconHeadphone from '../../../assets/icons/headphone.svg';
import Tooltip from '../../../common/component/Tooltip';
import Dashboard from './Dashboard';

type Props = {
    id: number,
    channel: string
}

const VoiceChat = ({ channel, id }: Props) => {
    const { loginUser, voice } = useAppSelector(store => { return { loginUser: store.authData.user, voice: store.authData.voice }; });
    const { t } = useTranslation("chat");
    const toolClass = `relative cursor-pointer`;
    if (!loginUser) return null;
    return (
        <Tooltip tip={t("voice")} placement="left">
            <Tippy
                placement="left-start"
                popperOptions={{ strategy: "fixed" }}
                offset={[0, 164]}
                interactive
                trigger="click"
                content={<Dashboard id={id} uid={loginUser.uid} channel={channel} voicing={voice} />}
            >
                <li className={`${toolClass}`}>
                    <IconHeadphone className="fill-gray-500" />
                </li>
            </Tippy>
        </Tooltip>
    );
};

export default VoiceChat;