/* eslint-disable no-undef */
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { OIDCConfig } from "@/types/auth";
import { AuthType } from "@/types/common";
import Modal from "@/components/Modal";
import StyledButton from "@/components/styled/Button";
import Button from "@/components/styled/Button";
import StyledModal from "@/components/styled/Modal";
import IconIODC from "@/assets/icons/oidc/icon.svg";
import OidcLoginEntry from "./OidcLoginEntry";

interface IProps {
  issuers?: OIDCConfig[];
  type?: AuthType;
}
const OidcLoginButton: FC<IProps> = ({ issuers, type = "login" }) => {
  const { t } = useTranslation("auth");
  const { t: ct } = useTranslation();
  const [modal, setModal] = useState(false);
  if (!issuers) return null;
  return (
    <>
      <Button
        className="flex ghost flex-center gap-2 relative"
        onClick={() => {
          setModal(true);
        }}
      >
        <IconIODC className="w-6 h-6 absolute left-4" />
        {type == "login" ? t("login.oidc") : t("reg.oidc")}
      </Button>
      {modal && (
        <Modal id="modal-modal">
          <StyledModal className="text-center " title="Login with OIDC">
            <div className="flex flex-col gap-2">
              {issuers
                .filter((issuer) => issuer.enable)
                .map((issuer, index) => (
                  <OidcLoginEntry issuer={issuer} key={index} />
                ))}
            </div>
            <StyledButton
              className="border_less ghost"
              onClick={() => {
                setModal(false);
              }}
            >
              {ct("action.close")}
            </StyledButton>
          </StyledModal>
        </Modal>
      )}
    </>
  );
};
export default OidcLoginButton;
