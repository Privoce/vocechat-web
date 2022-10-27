import { FC, memo } from 'react';
import clsx from 'clsx';
import { MessagePayload } from '../../../../app/slices/message';
// import { Message } from '../../../../types/chatbot';
// import Image from 'next/image';
import { useAppSelector } from '../../../../app/store';
import { getInitials, getInitialsAvatar } from '../../../../common/utils';

type TimeProps = {
  time: number;
};

const Time: FC<TimeProps> = ({ time }) => {
  return (
    <time className="text-gray-300 text-sm">{`${new Date(time).toLocaleTimeString('en-US', {
      minute: 'numeric',
      hour: 'numeric',
      hour12: true,
    })}`}</time>
  );
};

export type MessageProps = {
  compact?: boolean;
  isFirst?: boolean;
} & MessagePayload;

const Index: FC<MessageProps> = (props) => {
  const { server: { name, logo }, loginUser } = useAppSelector(store => { return { server: store.server, loginUser: store.authData.user }; });
  const { from_uid, content, created_at, compact, isFirst = false } = props;
  // 暂时写死
  const isHost = from_uid == 304;
  return (
    <div
      className={clsx(
        'flex flex-col relative pl-14 py-1 hover:bg-gray-100 rounded-sm',
        compact ? 'mt-2' : 'mt-6',
        isFirst ? 'mt-0' : ''
      )}
    >
      {!compact && (
        <div className="absolute left-2 top-2 w-10 h-10 rounded-full overflow-hidden">
          {isHost ? (
            <img src={logo} alt="logo" className="w-full h-full" />
          ) : (
            <img className="w-10 h-10" src={getInitialsAvatar({ initials: getInitials(loginUser?.name ?? "Unkown") })} alt="avatar" />
          )}
        </div>
      )}
      {!compact && (
        <span className="flex items-center gap-2 leading-6">
          <em className="text-black not-italic font-bold text-md">{isHost ? name : loginUser?.name}</em>
          <Time time={created_at ?? 0} />
        </span>
      )}
      <p
        className={clsx(
          'text-gray-600 text-sm whitespace-normal break-words mt-2 w-[80%]',
          compact ? 'group relative mt-0' : ''
        )}
      >
        {compact && (
          <time className="absolute -left-2 top-0 -translate-x-full text-gray-300 text-[10px] invisible group-hover:visible">{`${new Date(created_at)
            .toLocaleTimeString('en-US', {
              second: 'numeric',
              minute: 'numeric',
              hour: 'numeric',
              hour12: true,
            })
            .split(' ')[0]
            }`}</time>
        )}
        {content}
      </p>
    </div>
  );
};

export default memo(Index, (prev, next) => {
  return prev.mid === next.mid;
});
