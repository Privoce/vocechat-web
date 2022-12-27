import dayjs from 'dayjs';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeMessage } from '../../../app/slices/message';
import IconTimer from '../../../assets/icons/timer.svg';
type Props = {
    mid: number;
    expires_in: number;
    create_at: number;
};

const ExpireTimer: FC<Props> = ({ mid, create_at, expires_in }) => {
    const [countdown, setCountdown] = useState<number | undefined>();
    const dispatch = useDispatch();
    useEffect(() => {
        if (expires_in > 0 && create_at > 0) {
            const expire_time = create_at + expires_in * 1000;
            if (dayjs().isAfter(new Date(expire_time))) {
                // 已过期，立即删除
                dispatch(removeMessage(mid));
                // dispatch()

            } else {
                // 倒计时
                setCountdown(Math.floor((expire_time - new Date().getTime()) / 1000));
            }
        }
    }, [expires_in, create_at, mid]);
    useEffect(() => {
        let timer = 0;
        if (typeof countdown !== "undefined") {
            if (countdown > 0) {
                timer = window.setTimeout(() => {
                    setCountdown(prev => {
                        const _prev = prev ?? 0;
                        return _prev - 1;
                    });
                }, 1000);
            } else {
                // 倒计时结束
                console.log("countdown over", mid, countdown);

                dispatch(removeMessage(mid));
            }
        }
        return () => {
            if (typeof countdown !== "undefined") {
                clearTimeout(timer);
            }
        };
    }, [countdown, mid]);
    if (!countdown) return null;
    const duration = dayjs.duration(countdown * 1000);
    const day = duration.days() !== 0 ? `${duration.days()} day` : "";
    const hours = duration.hours() !== 0 ? `${duration.hours().toString().padStart(2, '0')}:` : "";
    const minutes = duration.minutes() !== 0 ? `${duration.minutes().toString().padStart(2, '0')}:` : "";
    const formatted_countdown = `${day} ${hours}${minutes}${duration.seconds().toString().padStart(2, '0')}`;
    return (
        <div className='absolute bottom-1 right-2 text-xs text-gray-400 flex items-center gap-1 font-mono'>
            <IconTimer className="w-4 h-4 stroke-slate-400" />
            {formatted_countdown}
        </div>
    );
};

export default ExpireTimer;

