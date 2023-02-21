// import Tippy from '@tippyjs/react';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetBotAPIKeysQuery } from '../../../app/services/user';
import IconDelete from '../../../assets/icons/delete.svg';
import IconAdd from '../../../assets/icons/add.svg';
import CreateAPIKeyModal from './CreateAPIKeyModal';
import DeleteAPIKeyModal from './DeleteAPIKeyModal';
import clsx from 'clsx';

type Props = {
    uid: number
}
type DeleteAPIKeyProps = { uid: number, kid: number }
const tdClass = "p-1 whitespace-nowrap text-xs text-gray-500 dark:text-gray-200 align-middle px-1";
const BotAPIKeys = ({ uid }: Props) => {
    const { t } = useTranslation("setting", { keyPrefix: "bot" });
    const [currentUid, setCurrentUid] = useState<number | undefined>();
    const [deleteApiKey, setDeleteApiKey] = useState<DeleteAPIKeyProps | undefined>();
    const { data, refetch } = useGetBotAPIKeysQuery(uid);
    const toggleCreateModal = (param?: number) => {
        if (!param) refetch();
        setCurrentUid(param);
    };
    const toggleDeleteModal = (param?: DeleteAPIKeyProps) => {
        if (!param) refetch();
        setDeleteApiKey(param);
    };
    if (!data) return null;
    const colWidths = ["w-20", "w-[166px]", "w-36", "w-15", "w-10"];
    return (
        <div className='flex flex-col gap-2 items-start'>
            <div className='border-t border-solid border-b border-gray-100 dark:border-gray-500 py-2 w-full'>
                <table className="min-w-full table-fixed font-mono">
                    <thead >
                        <tr >
                            {[t("col_key_name"), t('col_key_value'), t('col_key_create_time'), t('col_key_last_used'), ""].map((title, idx) => <th key={title} scope="col" className={clsx(`text-xs text-gray-900 dark:text-gray-50 px-1 text-left pb-2`, colWidths[idx])}>
                                {title}
                            </th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? data.map(ak => {
                            const { id, name, key, created_at, last_used } = ak;
                            return <tr key={id} className="group" >
                                <td className={tdClass}>
                                    {name}
                                </td>
                                <td className={`${tdClass} w-40`}>
                                    {`${key.slice(0, 4)} ... ... ${key.slice(-6)}`}
                                </td>
                                <td className={tdClass}>
                                    {dayjs(created_at).format("YYYY-MM-DD HH:mm:ss")}
                                </td>
                                <td className={tdClass}>
                                    {last_used ? dayjs(last_used).format("YYYY-MM-DD HH:mm:ss") : "Unused"}
                                </td>
                                <td className={`${tdClass} invisible group-hover:visible`}>
                                    <button onClick={toggleDeleteModal.bind(null, { kid: id, uid })}>
                                        <IconDelete />
                                    </button>
                                </td>
                            </tr>;
                        }) : <tr>
                            <td colSpan={4} className='text-center text-xs text-gray-400 py-2'>
                                {t("no_api_key")}
                            </td>
                        </tr>}
                    </tbody>
                </table>
                <button onClick={toggleCreateModal.bind(null, uid)} className="text-green-600 text-xs py-0.5 flex items-center gap-1 m-auto my-2 bg-green-50 rounded-full px-2 ">
                    <IconAdd className="!w-4 !h-4 fill-green-600" /> {t("add_api_key")}
                </button>
            </div>
            {currentUid && <CreateAPIKeyModal uid={currentUid} closeModal={toggleCreateModal.bind(null, undefined)} />}
            {deleteApiKey && <DeleteAPIKeyModal uid={deleteApiKey.uid} kid={deleteApiKey.kid} closeModal={toggleDeleteModal.bind(null, undefined)} />}
        </div>
    );
};

export default BotAPIKeys;