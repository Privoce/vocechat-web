import { ReactElement } from 'react';
import { useGetServerVersionQuery } from '../../app/services/server';
import { compareVersion } from '../utils';

type Props = {
  empty?: boolean,
  version: string,
  children: ReactElement
}

const ServerVersionChecker = ({ empty = false, version, children }: Props) => {
  const { data: currentVersion, isSuccess } = useGetServerVersionQuery();
  if (!isSuccess) return null;
  const res = compareVersion(currentVersion, version);
  if (res < 0) return empty ? null : <div className='flex flex-col gap-2 items-start border border-solid border-orange-500 p-3 rounded-lg'>
    <span className='text-gray-400 text-sm'>This function needs server version:<strong className='font-bold'>{version}</strong> at least 🚨</span>
    <span className='text-gray-400 text-sm'>Your current version:<strong className='font-bold'>{currentVersion}</strong></span>
    <span className='text-gray-400 text-sm'>Please upgrade the Server!</span>
    <a className='text-blue-500 underline' href="https://doc.voce.chat/install/install-by-docker#update-vocechat-docker" target="_blank" rel="noopener noreferrer">How to Update VoceChat Server 📖 </a>
  </div>;
  return children;
};

export default ServerVersionChecker;