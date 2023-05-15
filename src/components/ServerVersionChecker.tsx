import { ReactElement } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { compareVersion } from '../utils';
import { useAppSelector } from '../app/store';

type Props = {
  empty?: boolean,
  version: string,
  children: ReactElement
}

const ServerVersionChecker = ({ empty = false, version, children }: Props) => {
  const { t } = useTranslation();
  const currentVersion = useAppSelector(store => store.server.version);
  if (!currentVersion) return null;
  const res = compareVersion(currentVersion, version);
  if (res < 0) return empty ? null : <div className='flex flex-col gap-2 items-start border border-solid border-orange-500 p-3 rounded-lg w-fit'>
    <span className='text-gray-400 text-sm'>
      <Trans i18nKey={"server_update.version_needed"}>
        <strong className='font-bold'>{{ version }}</strong>
      </Trans>
    </span>
    <span className='text-gray-400 text-sm'>
      <Trans i18nKey={"server_update.current_version"}>
        <strong className='font-bold'>{{ version: currentVersion }}</strong>
      </Trans>
    </span>
    <span className='text-gray-400 text-sm'>{t("server_update.update_tip")}</span>
    <a className='text-blue-500 underline' href="https://doc.voce.chat/install/install-by-docker#update-vocechat-docker" target="_blank" rel="noopener noreferrer">
      {t("server_update.howto")}  📖 </a>
  </div>;
  return children;
};

export default ServerVersionChecker;