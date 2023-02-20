import { useRef, useState, memo } from 'react';
import clsx from 'clsx';
import useSendMessage from '../../common/hook/useSendMessage';
import { useWidget } from '../WidgetContext';



type Props = {
    from: number,
    to: number
}
let isComposing = false;
const MessageInput = (props: Props) => {
    const { color } = useWidget();
    const { from, to } = props;
    const { sendMessage } = useSendMessage({
        from,
        to,
        context: "user"
    });

    const [content, setContent] = useState('');
    const ref = useRef<HTMLTextAreaElement>(null);
    const textareaClassName = clsx(
        'px-2.5 py-1.5 text-sm rounded-md w-full block dark:bg-gray-700 dark:text-gray-100',
        'min-h-[32px] max-h-[92px] h-8 resize-none overflow-y-auto',
        `ring-1 ring-gray-200 dark:ring-gray-800 focus:ring-2 focus:ring-[${color}]`,
        'focus:outline-none',
    );
    return (
        <div className="relative border-t border-gray-300 dark:border-gray-600 w-full">
            <div className={'px-3 py-2 min-h-[48px]'}>
                <textarea
                    // disabled={isSending}
                    ref={ref}
                    maxLength={4096}
                    className={textareaClassName}
                    value={content}
                    placeholder="Type and press enter"
                    onChange={e => setContent(e.target.value)}
                    onCompositionStart={() => {
                        isComposing = true;
                    }}
                    onCompositionEnd={() => {
                        isComposing = false;
                    }}
                    onInput={() => {
                        const element = ref.current;
                        if (!element) return;
                        element.style.height = '32px';
                        // borderTop + borderBottom = 2px
                        element.style.height = `${element.scrollHeight + 2}px`;
                    }}
                    onKeyDown={e => {
                        if (!e.shiftKey && e.key === 'Enter' && !isComposing) {
                            // e.stopPropagation();
                            e.preventDefault();
                            if (content.trim().length === 0) return;
                            sendMessage({
                                type: "text",
                                content
                            });
                            setContent("");
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default memo(MessageInput);