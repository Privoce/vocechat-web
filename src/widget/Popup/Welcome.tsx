// import clsx from 'clsx'
import { memo } from 'react';
import { useAppSelector } from '../../app/store';
import Login from './Login';

type Props = {
  needLogin?: boolean
}
const Index = ({ needLogin = false }: Props) => {
  const { logo } = useAppSelector(store => store.server);
  return (
    <>
      <div className="group relative flex justify-start items-start mb-3">
        <div className="w-9 h-9 absolute top-0 left-3">
          <img src={logo} alt="logo" className="rounded-full bg-transparent w-9 h-9" />
        </div>
        <div className="pl-14">
          <div className="rounded-lg" style={{ maxWidth: 'min(((100vw - 56px) - 20px) - 64px, 360px)' }}>
            <div className="text-md text-gray-900 dark:text-gray-100 px-3 py-1.5 bg-gray-100 dark:bg-gray-900 rounded-lg mb-1.5">
              {needLogin ?
                `👋 Hi there, Nice to meet you! Please login before we have a nice talk 👇`
                :
                `👋 Hi there, Nice to meet you! `}
            </div>
          </div>
        </div>
      </div>
      {needLogin && <div className="pl-14 animate-[fadeInUp_.5s_ease-in-out_both]">
        <Login />
      </div>}
    </>
  );
};

export default memo(Index);
