import { useEffect, useRef, useState } from 'react';
// import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import Modal from '../../../common/component/Modal';
import Button from '../../../common/component/styled/Button';
import Textarea from '../../../common/component/styled/Textarea';
import StyledModal from '../../../common/component/styled/Modal';
import { useLazyGetBotRelatedChannelsQuery, useSendMessageByBotMutation } from '../../../app/services/server';
import clsx from 'clsx';
import { MessageTypes } from '../../../app/config';

type Props = {
    closeModal: () => void
}
const TestAPIKeyModal = ({ closeModal }: Props) => {
    const [currCid, setCurrCid] = useState<number | null>(null);
    const [msgType, setMsgType] = useState("text");
    const [getChannels, { data }] = useLazyGetBotRelatedChannelsQuery();
    const [sendMessage] = useSendMessageByBotMutation();
    const inputRef = useRef<HTMLTextAreaElement | undefined>();
    const msgInputRef = useRef<HTMLTextAreaElement | undefined>();
    const [key, setKey] = useState("");
    // const { t } = useTranslation("setting", { keyPrefix: "bot" });
    const { t: ct } = useTranslation();
    const handleSetKey = () => {
        const input = inputRef?.current;
        if (input && input.value) {
            setKey(input.value);
        }
    };
    const handleSetChannel = (cid: number) => {
        setCurrCid(cid);
    };
    const handleSetMsgType = (type: string) => {
        setMsgType(type);
    };
    const handleSend = () => {
        const input = msgInputRef?.current;
        if (input && input.value && currCid) {
            sendMessage({ cid: currCid, api_key: key, type: msgType, content: input.value });
        }
    };
    useEffect(() => {
        if (key) {
            getChannels({ api_key: key });
        }
    }, [key]);


    return (
        <Modal id="modal-modal">
            <StyledModal
                title={key ? "" : `Input API Key`}
                buttons={
                    <>
                        <Button className="cancel" onClick={closeModal}>
                            {ct("action.cancel")}
                        </Button>
                        <Button onClick={handleSetKey} >{ct("action.done")}</Button>
                    </>
                }
            >
                {key ? (data ? <ul className="divide-y-2">
                    {data.map(({ gid, name, is_public }) => {
                        return <li key={gid} className={clsx("py-1 px-2 text-gray-500 cursor-pointer hover:bg-slate-50", gid == currCid ? 'bg-slate-100' : "")} onClick={handleSetChannel.bind(null, gid)}>
                            # {name} {!is_public ? "🔒" : ""}
                        </li>;
                    })}
                </ul> : null)
                    : <Textarea rows={6} ref={inputRef} placeholder='Input API Key First' />}

                {currCid ? <div className='mt-4 flex flex-col items-start gap-2'>
                    <Textarea ref={msgInputRef} placeholder='Input Something...' />
                    <ul className='flex gap-1'>
                        {Object.entries(MessageTypes).map(([key, value]) => {
                            return <li onClick={handleSetMsgType.bind(null, key)} className={clsx("py-1 px-2 text-gray-500 cursor-pointer hover:bg-slate-50", msgType == key ? 'bg-slate-100' : "")} key={key}>{value}</li>;
                        })}
                    </ul>
                    <Button className='mini' onClick={handleSend} >Send</Button>
                </div> : null}
            </StyledModal>
        </Modal>
    );
};

export default TestAPIKeyModal;