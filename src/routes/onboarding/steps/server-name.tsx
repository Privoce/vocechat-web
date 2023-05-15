import { FC } from "react";
import toast from "react-hot-toast";
import StyledInput from "@/components/styled/Input";
import StyledButton from "@/components/styled/Button";
import { useTranslation } from "react-i18next";
import { useWizard } from "react-use-wizard";

type Props = {
  serverName: string;
  setServerName: (name: string) => void;
};
const ServerName: FC<Props> = ({ serverName, setServerName }) => {
  const { t } = useTranslation("welcome", { keyPrefix: "onboarding" });
  const { nextStep } = useWizard();

  return (
    <div className="h-full flex-center flex-col text-center w-[360px] m-auto dark:text-gray-200">
      <span className="text-2xl mb-2 font-bold">{t("new_server")}</span>
      <span className="text-sm mb-6 text-gray-400 dark:text-gray-600">
        {t("server_desc")}
      </span>
      <StyledInput
        className="h-11 px-3.5 py-2.5 border-gray-300 rounded-lg shadow"
        placeholder={t("placeholder_server")}
        value={serverName}
        onChange={(e) => setServerName(e.target.value)}
      />
      <StyledButton
        className="w-full mt-6"
        onClick={() => {
          // Verification for space name
          if (serverName === "") {
            toast.error("Please enter server name!");
            return;
          }
          nextStep();
        }}
      >
        {t("create_server")}
      </StyledButton>
    </div>
  );
};
export default ServerName;
