import { useState, useEffect, useRef, ChangeEvent } from 'react';
import Header from './Header';
import Welcome from './Welcome';
import MessageFeed from './MessageFeed';
import Line from './Line';
import useSendMessage from '../../common/hook/useSendMessage';
import { useAppSelector } from '../../app/store';
type Props = {
    handleClose: () => void
}

const Index = ({ handleClose }: Props) => {
    const messageListRef = useRef<HTMLElement | null>(null);
    const loginUid = useAppSelector(store => store.authData.user?.uid);
    const { sendMessage, isSuccess } = useSendMessage({
        from: loginUid,
        to: 304,
        context: "user"
    });
    // const { checked, firstEnter, session } = useSession({ preCheck: true });
    // const { isSending, sendSuccess, sendMessage, message } = useSendMessage();
    // const { appendMessage, messages } = useFeed();
    // const messageListRef = useRef<HTMLElement | null>(null);
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

    // 自动滚动到底部，todo:根据距离底部位置大小自动滚动 类似微信体验
    useEffect(() => {
        const container = messageListRef.current;
        if (container) {
            setTimeout(() => {
                container.scrollTop = container.scrollHeight;
            }, 30);
        }
    }, [isSuccess]);
    return (
        <aside className="flex flex-col justify-between bg-white w-full h-full rounded-[10px] pointer-events-auto">
            <Header handleClose={handleClose} />
            <Line />
            {/* message list */}
            <section ref={messageListRef} className="px-2 py-3 flex-1 overflow-y-auto scroll-smooth">
                <Welcome />
                <MessageFeed uid={304} />
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