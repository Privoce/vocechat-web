import React, { PropsWithChildren } from 'react';
import { useGetServerVersionQuery } from '../../app/services/server';
import { compareVersion } from '../utils';

type Props = {
  version: string,
}

const ServerVersionChecker = ({ version, children }: PropsWithChildren<Props>) => {
  const { data: currentVersion, isSuccess } = useGetServerVersionQuery();
  if (!isSuccess) return null;
  const res = compareVersion(currentVersion, version);
  if (res < 0) return <div className='flex flex-col gap-2 items-start'>
    <span className='text-gray-400 text-sm'>Server version:<strong className='font-bold'>{version}</strong> needed at least 🚨</span>
    <span className='text-gray-400 text-sm'>Your current version:<strong className='font-bold'>{currentVersion}</strong></span>
    <span className='text-gray-400 text-sm'>Please upgrade the Server!</span>
    <a className='text-blue-500 underline' href="https://doc.voce.chat/install/install-by-docker#update-vocechat-docker" target="_blank" rel="noopener noreferrer">How to Update VoceChat Server 📖 </a>
  </div>;
  return children;
};

export default ServerVersionChecker;