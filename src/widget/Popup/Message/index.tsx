import { memo } from 'react';
import dayjs from 'dayjs';
import clsx from 'clsx';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);
import Text from './Text';
import { useAppSelector } from '../../../app/store';

export interface IWidgetMessage {
    mid: number,
    uid: number,
    host?: boolean,
    type?: "text",
    content: string,
    create_time: number,
    sending: boolean
}
const Time = ({ time }: { time: number }) => {
    return <time itemProp='dateCreated' dateTime={new Date(time).toISOString()} className='hidden group-hover:inline px-1.5 text-gray-500 text-xs'>
        {dayjs.unix(time / 1000).format('LT')}
    </time>;
};
const Index = (props: IWidgetMessage) => {
    const { logo } = useAppSelector(store => store.server);
    const { host = false, type = "text", content, uid, create_time, sending } = props;
    let contentContainer = null;
    switch (type) {
        case "text":
            contentContainer = <Text sending={sending} content={content} host={host} uid={uid} />;
            break;

        default:
            break;
    }
    return <div className={clsx('group flex mb-3', host ? 'relative justify-start items-start' : 'items-center justify-end px-3')}>
        {host ? <><div className="w-9 h-9 absolute top-0 left-3">
            <img src={logo} alt="avatar" className='rounded-full bg-gray-100 w-9 h-9' />
        </div>
            <div className="pl-14 flex items-center">
                {contentContainer}
                <Time time={create_time} />
            </div>
        </> : <>
            <Time time={create_time} />
            {contentContainer}
        </>}
    </div>;
};

export default memo(Index, (prev, next) => {
    return prev.mid === next.mid;
});