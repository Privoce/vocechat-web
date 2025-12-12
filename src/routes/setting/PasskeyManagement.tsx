import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import {
  useGetUserPasskeysQuery,
  usePasskeyRegisterStartMutation,
  usePasskeyRegisterFinishMutation,
  useDeletePasskeyMutation
} from "@/app/services/auth";
import { startPasskeyRegistration, isWebAuthnSupported } from "@/passkey";
import Button from "@/components/styled/Button";
import Input from "@/components/styled/Input";
import Modal from "@/components/Modal";
import StyledModal from "@/components/styled/Modal";
import { useAppSelector } from "@/app/store";

export default function PasskeyManagement() {
  const { t } = useTranslation("setting");
  const { t: ct } = useTranslation();
  const [isRegistering, setIsRegistering] = useState(false);
  const [passkeyName, setPasskeyName] = useState("");
  const [showModal, setShowModal] = useState(false);
  
  const { data: passkeys, refetch } = useGetUserPasskeysQuery();
  const [registerStart] = usePasskeyRegisterStartMutation();
  const [registerFinish] = usePasskeyRegisterFinishMutation();
  const [deletePasskey] = useDeletePasskeyMutation();
  const user = useAppSelector((store) => store.authData.user);

  const handleAddPasskey = async () => {
    if (!isWebAuthnSupported()) {
      toast.error(t("passkey.error_not_supported"));
      return;
    }

    if (!user?.name) {
      toast.error("User information not available");
      return;
    }

    if (!passkeyName.trim()) {
      toast.error(t("passkey.enter_name") || "Please enter a name for this passkey");
      return;
    }

    setIsRegistering(true);
    setShowModal(false);
    try {
      const { challenge_id, options } = await registerStart({ name: user.name }).unwrap();
      
      const credential = await startPasskeyRegistration(options);
      
      await registerFinish({ 
        challenge_id, 
        attestation: credential,
        name: passkeyName.trim()
      }).unwrap();
      
      toast.success(t("passkey.success_add"));
      setPasskeyName("");
      refetch();
    } catch (error: any) {
      if (error.name === 'NotAllowedError') {
        toast.error(t("passkey.error_cancelled"));
      } else if (error.name === 'InvalidStateError') {
        toast.error(t("passkey.error_exists"));
      } else {
        toast.error(t("passkey.error_add"));
      }
      console.error("Passkey registration error:", error);
    } finally {
      setIsRegistering(false);
    }
  };

  const handleDeletePasskey = async (credentialId: string) => {
    if (!confirm(t("passkey.delete_confirm"))) {
      return;
    }

    try {
      await deletePasskey(credentialId).unwrap();
      toast.success(t("passkey.success_delete"));
      refetch();
    } catch (error) {
      toast.error(t("passkey.error_delete"));
      console.error("Passkey deletion error:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{t("passkey.title")}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t("passkey.desc")}
          </p>
        </div>
        <Button onClick={() => setShowModal(true)} disabled={isRegistering}>
          {isRegistering ? t("passkey.adding") : t("passkey.add")}
        </Button>
      </div>

      <div className="space-y-2">
        {passkeys && passkeys.length > 0 ? (
          passkeys.map((passkey) => (
            <div
              key={passkey.credential_id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-800 dark:text-white">
                  {passkey.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {t("passkey.created")}: {new Date(passkey.created_at).toLocaleDateString()}
                  {passkey.last_used_at && 
                    ` • ${t("passkey.last_used")}: ${new Date(passkey.last_used_at).toLocaleDateString()}`
                  }
                </span>
              </div>
              <Button
                className="danger"
                onClick={() => handleDeletePasskey(passkey.credential_id)}
              >
                {t("passkey.delete")}
              </Button>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            {t("passkey.no_passkeys")}
          </div>
        )}
      </div>

      {showModal && (
        <Modal id="modal-modal">
          <StyledModal
            title={t("passkey.add")}
            description={t("passkey.enter_name") || "Enter a name for this passkey"}
            buttons={
              <>
                <Button className="cancel" onClick={() => { setShowModal(false); setPasskeyName(""); }}>
                  {ct("action.cancel")}
                </Button>
                <Button onClick={handleAddPasskey} disabled={isRegistering}>
                  {isRegistering ? t("passkey.adding") : ct("action.done")}
                </Button>
              </>
            }
          >
            <Input
              autoFocus
              placeholder={t("passkey.enter_name") || "Passkey name"}
              value={passkeyName}
              onChange={(e) => setPasskeyName(e.target.value)}
            />
          </StyledModal>
        </Modal>
      )}
    </div>
  );
}

