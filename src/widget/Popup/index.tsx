import { useState, useRef, ChangeEvent } from 'react';
import Header from './Header';
import Welcome from './Welcome';
import MessageFeed from './MessageFeed';
import Line from './Line';
import useSendMessage from '../../common/hook/useSendMessage';
import { useAppSelector } from '../../app/store';
type Props = {
    hostId: number,
    handleClose: () => void
}

const Index = ({ handleClose, hostId }: Props) => {
    const { user: loginUser, token, guest: isGuest } = useAppSelector(store => store.authData);
    const { sendMessage } = useSendMessage({
        from: loginUser?.uid,
        to: hostId,
        context: "user"
    });
    const [input, setInput] = useState('');
    const handleInput = (evt: ChangeEvent<HTMLTextAreaElement>) => {
        setInput(evt.target.value);
    };
    const handleSend = () => {
        if (!input) return;
        sendMessage({
            type: "text",
            content: input
        });
        setInput("");
    };

    // no token or guest login
    const notLogin = !token || isGuest;
    return (
        <aside className="flex flex-col justify-between bg-white w-full h-full rounded-md overflow-hidden">
            <Header handleClose={handleClose} />
            <Line />
            {/* message list */}
            <section id='MESSAGE_LIST_CONTAINER' className="px-2 py-3 flex-1 overflow-y-auto scroll-smooth">
                <Welcome needLogin={notLogin} />
                {notLogin ? null : <MessageFeed uid={hostId} />}
            </section>
            <Line />
            {/* message input */}
            <div className="w-full px-2 py-3">
                <textarea
                    value={input}
                    onChange={handleInput}
                    className="w-full h-full text-sm p-2 rounded-lg bg-gray-200 resize-none text-black outline-none"
                    placeholder="Write a message..."
                    rows={3}
                />
            </div>
            <Line thin />
            {/* operation area */}
            <div className="w-full flex px-3 py-2 justify-between">
                <div className="opts">{/* opts placeholder */}</div>
                <button
                    type="button"
                    onClick={handleSend}
                    disabled={input.trim() === ''}
                    className="rounded-full bg-[#FA491D] disabled:bg-gray-200 text-white disabled:text-gray-400 text-xs leading-4 px-2 py-1.5 "
                >
                    Send
                </button>
            </div>
        </aside>
    );
};

export default Index;