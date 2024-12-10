import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { useUpdateAvatarByAdminMutation } from "@/app/services/user";
import { useAppSelector } from "@/app/store";
import AvatarUploader from "@/components/AvatarUploader";
import Button from "@/components/styled/Button";
import IconDelete from "@/assets/icons/delete.svg";
import BotAPIKeys from "./BotAPIKeys";
import CreateModal from "./CreateModal";
import DeleteModal from "./DeleteModal";
import NameEdit from "./NameEdit";
import WebhookEdit from "./WebhookEdit";
import WebhookModal from "./WebhookModal";
import { shallowEqual } from "react-redux";
import { ConfigTip } from "@/components/ConfigTip";

const tdClass =
  "p-6 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100 align-top";
type WebhookParams = { webhook?: string; uid: number };
type DeleteParams = { name: string; uid: number };
export default function BotConfig() {
  // const [testAPIKeyModalVisible, setTestAPIKeyModalVisible] = useState(false);
  const [updateAvatar, { isSuccess: updateAvatarSuccess }] = useUpdateAvatarByAdminMutation();
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [currWebhookParams, setCurrWebhookParams] = useState<WebhookParams | undefined>(undefined);
  const [currDeleteParams, setCurrDeleteParams] = useState<DeleteParams | undefined>(undefined);
  const bots = useAppSelector(
    (store) => Object.values(store.users.byId).filter((u) => !!u.is_bot),
    shallowEqual
  );
  const { t } = useTranslation("setting", { keyPrefix: "bot" });
  const { t: ct } = useTranslation();

  // const toggleTestAPIKeyModalVisible = () => {
  //   setTestAPIKeyModalVisible(prev => !prev);
  // };
  const toggleCreateModalVisible = () => {
    setCreateModalVisible((prev) => !prev);
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
          <ConfigTip title={t("bot_tip_title")} desc={t("bot_tip_desc")} />
          <ConfigTip title={t("webhook_tip_title")} desc={t("webhook_tip_desc")} />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold flex gap-4 items-center dark:text-white">
            {t("manage")}
            <a
              href="https://doc.voce.chat/bot/bot-and-webhook"
              target="_blank"
              className="text-sm text-blue-400 underline-offset-1 underline"
              rel="noopener noreferrer"
            >
              🔗 {t("how_to_use")}
            </a>
          </h2>
          <p className="text-gray-400 text-xs">{t("manage_desc")}</p>
        </div>
        <div className="w-full md:w-fit overflow-auto md:overflow-hidden">
          <table className="min-w-full table-auto">
            <thead className="border-b dark:border-b-gray-500 bg-gray-50 dark:bg-gray-600">
              <tr>
                {[
                  t("col_avatar"),
                  t("col_name"),
                  t("col_api_key"),
                  t("col_webhook"),
                  t("col_opt")
                ].map((title) => (
                  <th
                    key={title}
                    scope="col"
                    className="text-sm font-bold text-gray-900 dark:text-gray-100 px-6 py-4 text-left"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bots.map((bot) => {
                const { uid, name, avatar } = bot;
                return (
                  <tr
                    key={uid}
                    className="bg-white dark:bg-gray-800 border-b dark:border-b-gray-500 transition duration-300 ease-in-out md:hover:bg-gray-100 dark:md:hover:bg-transparent"
                  >
                    <td className="px-4 py-2">
                      <AvatarUploader
                        size={60}
                        uid={uid}
                        url={avatar}
                        uploadImage={updateAvatar}
                        name={name}
                      />
                    </td>
                    <td className={`${tdClass}`}>
                      <NameEdit uid={uid} />
                      <div className="text-xs text-gray-500">#{uid}</div>
                    </td>
                    <td className={`${tdClass} py-2`}>
                      <BotAPIKeys uid={uid} />
                    </td>
                    <td className={tdClass}>
                      <WebhookEdit uid={uid} />
                    </td>
                    <td className={tdClass}>
                      <button
                        type="button"
                        onClick={toggleDeleteModalVisible.bind(null, { uid, name })}
                      >
                        <IconDelete className="hover:opacity-80" />
                      </button>
                      {/* <Button className='mini' onClick={toggleWebhookModalVisible.bind(null, { webhook: webhook_url, uid })} >Set Webhook</Button> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* <Button onClick={toggleCreateModalVisible} className="ghost small">{ct("action.add")}</Button> */}
        <div className="flex gap-4">
          <Button onClick={toggleCreateModalVisible} className="small">
            {ct("action.add")}
          </Button>
          {/* {bots.length > 0 && <Button onClick={toggleTestAPIKeyModalVisible} className="ghost small stroke-slate-200 fill-gray-200"> Test API Key</Button>} */}
        </div>
      </div>
      {createModalVisible && <CreateModal closeModal={toggleCreateModalVisible} />}
      {currWebhookParams && (
        <WebhookModal closeModal={toggleWebhookModalVisible} {...currWebhookParams} />
      )}
      {currDeleteParams && (
        <DeleteModal closeModal={toggleDeleteModalVisible} {...currDeleteParams} />
      )}
      {/* {testAPIKeyModalVisible && <TestAPIKeyModal closeModal={toggleTestAPIKeyModalVisible} />} */}
    </>
  );
}
