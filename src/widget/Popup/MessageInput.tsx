import { useRef, useState, memo } from 'react';
import clsx from 'clsx';
import useSendMessage from '../../hooks/useSendMessage';
import { useWidget } from '../WidgetContext';
import IconSend from '@/assets/icons/send.svg';
import { useTranslation } from 'react-i18next';



type Props = {
    from: number,
    to: number
}
let isComposing = false;
const MessageInput = (props: Props) => {
    const { t } = useTranslation("widget");
    const { color } = useWidget();
    const { from, to } = props;
    const { sendMessage } = useSendMessage({
        from,
        to,
        context: "dm"
    });

    const [content, setContent] = useState('');
    const ref = useRef<HTMLTextAreaElement>(null);
    const textareaClassName = clsx(
        'px-2.5 py-1.5 text-sm rounded-md w-full block dark:bg-gray-700 dark:text-gray-100',
        'min-h-[32px] max-h-[92px] h-8 resize-none overflow-y-auto',
        `ring-1 ring-gray-200 dark:ring-gray-800 focus:ring-2 focus:ring-[${color}]`,
        'focus:outline-none',
    );
    const handleSend = () => {
        sendMessage({
            type: "text",
            content
        });
        setContent("");
    };
    return (
        <div className="relative border-t border-gray-300 dark:border-gray-600 w-full">
            <div className={'px-3 py-2 min-h-[48px] flex items-center gap-2'}>
                <textarea
                    // disabled={isSending}
                    ref={ref}
                    maxLength={4096}
                    className={textareaClassName}
                    value={content}
                    placeholder={t("placeholder_send")}
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
                            handleSend();
                        }
                    }}
                />
                <button onClick={handleSend} disabled={content.trim().length === 0} className='px-2 py-1 disabled:opacity-60'>
                    <IconSend className="dark:stroke-white w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default memo(MessageInput);