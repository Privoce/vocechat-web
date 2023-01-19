import { useEffect } from "react";
import Tippy from "@tippyjs/react";
import toast from "react-hot-toast";
import { hideAll } from "tippy.js";
import Input from "../../common/component/styled/Input";
import Toggle from "../../common/component/styled/Toggle";
import Button from "../../common/component/styled/Button";
import {
  useGetThirdPartySecretQuery,
  useUpdateThirdPartySecretMutation
} from "../../app/services/server";
import useConfig from "../../common/hook/useConfig";
import { LoginConfig } from "../../types/server";
import { useTranslation } from "react-i18next";


export default function APIConfig() {
  const { t } = useTranslation("setting");
  const { t: ct } = useTranslation();
  const { updateConfig, values } = useConfig("login");
  const { data } = useGetThirdPartySecretQuery();
  const [updateSecret, { data: updatedSecret, isSuccess, isLoading }] =
    useUpdateThirdPartySecretMutation();

  useEffect(() => {
    if (isSuccess) {
      hideAll();
      toast.success(ct("tip.update"));
    }
  }, [isSuccess]);
  const handleToggle = (val: { third_party: boolean }) => {
    updateConfig({ ...values, ...val });
  };
  const thirdParty = (values as LoginConfig)?.third_party;

  return (
    <div className="max-w-[500px] flex flex-col gap-4 items-start">
      <Toggle
        onClick={handleToggle.bind(null, { third_party: !thirdParty })}
        data-checked={thirdParty}
      />
      <div className="w-full flex flex-col items-start gap-2">
        <label htmlFor="secret" className="text-sm text-gray-500"> {t("third_app.key")}:</label>
        <Input disabled={!thirdParty} type="password" id="secret" value={updatedSecret || data} />
      </div>
      <Tippy
        interactive
        placement="right-start"
        trigger="click"
        content={
          <div className="p-3 rounded-lg border border-orange-400 border-solid flex flex-col gap-3 w-[250px] bg-white">
            <div className="text-orange-500 text-xs">
              {t("third_app.update_tip")}
            </div>
            <div className="flex justify-end gap-3 w-full">
              <Button onClick={() => hideAll()} className="cancel mini">
                {ct("action.cancel")}
              </Button>
              <Button disabled={isLoading} className="mini danger" onClick={() => updateSecret()}>
                {ct("action.yes")}
              </Button>
            </div>
          </div>
        }
      >
        <Button disabled={!thirdParty}> {t("third_app.update")}</Button>
      </Tippy>
      <div className="text-xs text-orange-400">
        {t("third_app.key_tip")}
      </div>
    </div>
  );
}
