// import clsx from 'clsx'
import { memo } from 'react';
import { useAppSelector } from '../../app/store';

const TextMessage = ({ text, animate = '' }: { text: string; animate?: string }) => (
  <p className={`text-gray-600 text-md mb-3 ${animate}`}>{text}</p>
);
const Index = () => {
  const { name, logo } = useAppSelector(store => store.server);
  return (
    <div className="flex gap-2">
      <div className="w-12 h-12">
        <img src={logo} alt="logo" className="w-full h-full" />
      </div>
      <div className="flex flex-col">
        <span className="flex items-center gap-2 leading-6">
          <em className="text-black not-italic font-bold text-lg">{name}</em>
          <time className="text-gray-300 text-sm">{`${new Date().toLocaleTimeString('en-US', {
            minute: 'numeric',
            hour: 'numeric',
            hour12: true,
          })}`}</time>
        </span>
        <TextMessage text="Hi there, Nice to meet you!" animate="animate-[fadeInUp_.5s_ease-in-out_both]" />
      </div>
    </div>
  );
};

export default memo(Index);
