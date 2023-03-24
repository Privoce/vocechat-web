// import React from 'react';
// import Tippy from '@tippyjs/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../app/store';
import IconHeadphone from '../../../assets/icons/headphone.svg';
import Tooltip from '../../../common/component/Tooltip';
import Dashboard from './Dashboard';

type Props = {
    context?: "channel" | "dm"
    id: number,
}

const VoiceChat = ({ id, context = "channel" }: Props) => {
    const [dashboardVisible, setDashboardVisible] = useState(false);
    const { loginUser } = useAppSelector(store => { return { loginUser: store.authData.user }; });
    const { t } = useTranslation("chat");
    const toggleDashboard = () => {
        setDashboardVisible(prev => !prev);
    };
    if (!loginUser) return null;
    return (
        <Tooltip disabled={dashboardVisible} tip={t("voice")} placement="left">
            <li className={`relative`} >
                <IconHeadphone className="fill-gray-500" role="button" onClick={toggleDashboard} />
                {dashboardVisible && <Dashboard id={id} context={context} />}
            </li>
        </Tooltip>
    );
};

export default VoiceChat;