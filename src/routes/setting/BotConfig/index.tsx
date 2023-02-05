import { useEffect } from "react";
// import dayjs from "dayjs";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUpdateAvatarByAdminMutation } from '../../../app/services/user';
import { useAppSelector } from '../../../app/store';
import AvatarUploader from '../../../common/component/AvatarUploader';
import Button from '../../../common/component/styled/Button';
import IconDelete from '../../../assets/icons/delete.svg';
// import IconTest from '../../../assets/icons/test.svg';
import CreateModal from './CreateModal';
import WebhookEdit from './WebhookEdit';
import WebhookModal from './WebhookModal';
// import TestAPIKeyModal from './TestAPIKeyModal';
import DeleteModal from './DeleteModal';
import BotAPIKeys from './BotAPIKeys';
import { toast } from 'react-hot-toast';

type TipProps = { title: string, desc: string };
const Tip = ({ title, desc }: TipProps) => {

  return <div className="flex flex-col text-sm">
    <h2 className="dark:text-white">{title}</h2>
    <p className="text-gray-500 dark:text-gray-400">{desc}</p>
  </div>;
};
const tdClass = "p-6 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100 align-top";
type WebhookParams = { webhook?: string, uid: number };
type DeleteParams = { name: string, uid: number };
export default function BotConfig() {
  // const [testAPIKeyModalVisible, setTestAPIKeyModalVisible] = useState(false);
  const [updateAvatar, { isSuccess: updateAvatarSuccess }] = useUpdateAvatarByAdminMutation();
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [currWebhookParams, setCurrWebhookParams] = useState<WebhookParams | undefined>(undefined);
  const [currDeleteParams, setCurrDeleteParams] = useState<DeleteParams | undefined>(undefined);
  const bots = useAppSelector(store => Object.values(store.users.byId).filter(u => !!u.is_bot));
  const { t } = useTranslation("setting", { keyPrefix: "bot" });
  const { t: ct } = useTranslation();

  // const toggleTestAPIKeyModalVisible = () => {
  //   setTestAPIKeyModalVisible(prev => !prev);
  // };
  const toggleCreateModalVisible = () => {
    setCreateModalVisible(prev => !prev);
  };
  const toggleWebhookModalVisible = (obj?: WebhookParams) => {
    console.log("webhook modal", obj);

    setCurrWebhookParams(obj);
  };
  const toggleDeleteModalVisible = (obj?: DeleteParams) => {
    setCurrDeleteParams(obj);
  };
  useEffect(() => {
    if (updateAvatarSuccess) {
      toast.success(ct("tip.update"));
    }
  }, [updateAvatarSuccess]);

  return (
    <>
      <div className="flex flex-col justify-start items-start gap-4">
        <div className="flex flex-col gap-4 max-w-[634px] mb-4">
          <Tip title={t("bot_tip_title")} desc={t("bot_tip_desc")} />
          <Tip title={t("webhook_tip_title")} desc={t("webhook_tip_desc")} />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className='font-semibold flex gap-4 items-center dark:text-white'>
            {t("manage")}
            <a href="https://doc.voce.chat/bot-and-webhook" target="_blank" className="text-sm text-blue-400 underline-offset-1 underline" rel="noopener noreferrer">
              🔗 {t("how_to_use")}
            </a>
          </h2>
          <p className='text-gray-500 dark:text-gray-400 text-xs'>{t("manage_desc")}</p>
        </div>
        <div className="w-fit  overflow-hidden">
          <table className="min-w-full table-auto">
            <thead className="border-b dark:border-b-gray-500 bg-gray-50 dark:bg-gray-600">
              <tr>
                {[t("col_avatar"), t('col_name'), t('col_api_key'), t('col_webhook'), t('col_opt')].map(title => <th key={title} scope="col" className="text-sm font-bold text-gray-900 dark:text-gray-100 px-6 py-4 text-left">
                  {title}
                </th>)}
              </tr>
            </thead>
            <tbody>
              {bots.map(bot => {
                const { uid, name, avatar } = bot;
                return <tr key={uid} className="bg-white dark:bg-gray-800 border-b dark:border-b-gray-500 transition duration-300 ease-in-out hover:bg-gray-100">
                  <td className="px-4 py-2">
                    <AvatarUploader uid={uid} url={avatar} uploadImage={updateAvatar} name={name} size={56} />
                  </td>
                  <td className={`${tdClass}`}>
                    <div>
                      {name}
                    </div>
                    <div className='text-xs text-gray-500'>
                      #{uid}
                    </div>
                  </td>
                  <td className={`${tdClass} py-2`}>
                    <BotAPIKeys uid={uid} />
                  </td>
                  <td className={tdClass}>
                    <WebhookEdit uid={uid} />
                  </td>
                  <td className={tdClass}>
                    <button type='button' onClick={toggleDeleteModalVisible.bind(null, { uid, name })} >
                      <IconDelete className="hover:opacity-80" />
                    </button>
                    {/* <Button className='mini' onClick={toggleWebhookModalVisible.bind(null, { webhook: webhook_url, uid })} >Set Webhook</Button> */}
                  </td>
                </tr>;
              })}
            </tbody>
          </table>
        </div>
        {/* <Button onClick={toggleCreateModalVisible} className="ghost small">{ct("action.add")}</Button> */}
        <div className="flex gap-4">
          <Button onClick={toggleCreateModalVisible} className="small">{ct("action.add")}</Button>
          {/* {bots.length > 0 && <Button onClick={toggleTestAPIKeyModalVisible} className="ghost small stroke-slate-200 fill-gray-200"> Test API Key</Button>} */}
        </div>

      </div>
      {createModalVisible && <CreateModal closeModal={toggleCreateModalVisible} />}
      {currWebhookParams && <WebhookModal closeModal={toggleWebhookModalVisible} {...currWebhookParams} />}
      {currDeleteParams && <DeleteModal closeModal={toggleDeleteModalVisible} {...currDeleteParams} />}
      {/* {testAPIKeyModalVisible && <TestAPIKeyModal closeModal={toggleTestAPIKeyModalVisible} />} */}
    </>
  );
}
