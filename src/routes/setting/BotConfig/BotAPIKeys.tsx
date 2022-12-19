// import Tippy from '@tippyjs/react';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetBotAPIKeysQuery } from '../../../app/services/user';
import IconDelete from '../../../assets/icons/delete.svg';
import CreateAPIKeyModal from './CreateAPIKeyModal';
import DeleteAPIKeyModal from './DeleteAPIKeyModal';

type Props = {
    uid: number
}

// const APIKeyTable = () => {


//     return <table>

//     </table>;
// };
type DeleteAPIKeyProps = { uid: number, kid: number }
const tdClass = "p-1 whitespace-nowrap text-xs text-gray-500 align-middle px-1";
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
    return (
        <div className='flex flex-col gap-2 items-start'>
            <button onClick={toggleCreateModal.bind(null, uid)} type='button' className="rounded-full bg-green-50 text-green-600 text-xs py-0.5 px-2">
                New API Key
            </button>
            {data.length > 0 ? <div className='border-t border-solid border-b border-gray-200 py-2'>
                <table className="min-w-full table-auto font-mono">
                    <thead >
                        <tr >
                            {[t("col_key_name"), t('col_key_value'), t('col_key_create_time'), t('col_key_last_used'), ""].map(title => <th key={title} scope="col" className="text-xs text-gray-900 px-1 text-left pb-2">
                                {title}
                            </th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(ak => {
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
                        })}
                    </tbody>
                </table></div> : null}
            {currentUid && <CreateAPIKeyModal uid={currentUid} closeModal={toggleCreateModal.bind(null, undefined)} />}
            {deleteApiKey && <DeleteAPIKeyModal uid={deleteApiKey.uid} kid={deleteApiKey.kid} closeModal={toggleDeleteModal.bind(null, undefined)} />}
        </div>
    );
};

export default BotAPIKeys;