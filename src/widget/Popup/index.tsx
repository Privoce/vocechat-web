// import { useState, ChangeEvent } from 'react';
import Header from './Header';
import Footer from './Footer';
import Welcome from './Welcome';
import MessageFeed from './MessageFeed';
import MessageInput from './MessageInput';
import { useAppSelector } from '../../app/store';
import useSSE from '../useSSE';

type Props = {
    hostId: number,
    handleClose: () => void
}

const Index = ({ handleClose, hostId }: Props) => {
    // 建立SSE连接
    useSSE();
    const { user: loginUser, token, guest: isGuest } = useAppSelector(store => store.authData);

    // no token or guest login
    const notLogin = !token || isGuest;
    return (
        <aside className="flex flex-col bg-white w-full h-full rounded-md overflow-hidden">
            <Header handleClose={handleClose} />
            {/* message list */}
            <main id='MESSAGE_LIST_CONTAINER' className="relative flex-1 overflow-y-auto scroll-smooth">
                {/* placeholder */}
                <div className="flex-center h-10"></div>
                <Welcome needLogin={notLogin} />
                {notLogin ? null : <MessageFeed hostId={hostId} />}
            </main>
            {/* message input */}
            {notLogin ? null : <MessageInput from={loginUser?.uid || 0} to={hostId} />}
            <Footer />
        </aside>
    );
};

export default Index;