import { useState, useEffect, FormEvent } from 'react';
import { JellyTriangle } from '@uiball/loaders';

import { useReplyWithChatGPTMutation } from '../app/services/message';
import Textarea from '../common/component/styled/Textarea';
import Button from '../common/component/styled/Button';
import clsx from 'clsx';

// type Props = {}
type Conversation = {
    type: "prompt" | "reply", content: string
}[]
const GPTDemo = () => {
    // const promptRef = useRef<HTMLTextAreaElement | undefined>();
    // const [prompt, setPrompt] = useState("");
    const [talk, setTalk] = useState<Conversation>([]);
    const [feedTheGPT, { data, isSuccess, isLoading }] = useReplyWithChatGPTMutation();
    const handleSend = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        const form = evt.currentTarget;
        // 检查格式
        if (!form?.checkValidity()) {
            form?.reportValidity();
            return;
        }
        const content = new FormData(form).get("prompt") as string;
        feedTheGPT(content);
        setTalk(prevs => {
            return [...prevs, { type: "prompt", content }];
        });
        form.reset();
    };
    useEffect(() => {
        if (isSuccess && data) {
            const { message } = data;
            setTalk(prevs => {
                return [...prevs, { type: "reply", content: message }];
            });
        }
    }, [isSuccess, data]);

    return (
        <section className='flex-center flex-col gap-2 max-w-3xl m-auto w-screen h-screen overflow-scroll'>
            <div className="flex flex-col gap-2 w-full mb-10 px-2">
                {talk.map(({ type, content }) => {
                    return <div className="flex items-start gap-3" key={content}>
                        <span className='text-sm text-gray-500 uppercase min-w-[65px] text-right'>{type}:</span>
                        <div className={clsx("text-xl font-bold border border-solid border-gray-200 p-2", type == "reply" && 'bg-green-600 text-white')}>{content}</div>
                    </div>;
                })}
            </div>
            {isLoading &&
                <JellyTriangle
                    size={30}
                    color="#555"
                />}
            <form onSubmit={handleSend} className="w-full flex flex-col gap-2 items-center sticky bottom-0">
                <div className='w-full'>
                    <Textarea rows={8} required name='prompt' placeholder='Input prompt please' />
                </div>
                <Button type='submit' disabled={isLoading} >Send</Button>
            </form>
        </section>
    );
};

export default GPTDemo;