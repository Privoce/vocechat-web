// import { useState, ChangeEvent } from 'react';
import Header from './Header';
import Footer from './Footer';
import Welcome from './Welcome';
import MessageFeed from './MessageFeed';
import MessageInput from './MessageInput';
import { useAppSelector } from '../../app/store';
type Props = {
    hostId: number,
    handleClose: () => void
}

const Index = ({ handleClose, hostId }: Props) => {
    const { user: loginUser, token, guest: isGuest } = useAppSelector(store => store.authData);
    // const { sendMessage } = useSendMessage({
    //     from: loginUser?.uid,
    //     to: hostId,
    //     context: "user"
    // });
    // const [input, setInput] = useState('');
    // const handleInput = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    //     setInput(evt.target.value);
    // };
    // const handleSend = () => {
    //     if (!input) return;
    //     sendMessage({
    //         type: "text",
    //         content: input
    //     });
    //     setInput("");
    // };

    // no token or guest login
    const notLogin = !token || isGuest;
    return (
        <aside className="flex flex-col bg-white w-full h-full rounded-md overflow-hidden">
            <Header handleClose={handleClose} />
            {/* message list */}
            <main id='MESSAGE_LIST_CONTAINER' className="relative flex-1 overflow-y-auto scroll-smooth">
                {/* placeholder */}
                <div className="flex items-center h-10 justify-center"></div>
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