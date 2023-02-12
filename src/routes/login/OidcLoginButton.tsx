/* eslint-disable no-undef */
import { FC, useState } from "react";
import StyledModal from "../../common/component/styled/Modal";
import Modal from "../../common/component/Modal";
import StyledButton from "../../common/component/styled/Button";
import OidcLoginEntry from "./OidcLoginEntry";
import { OIDCConfig } from "../../types/auth";
import { useTranslation } from "react-i18next";
import { AuthType } from "../../types/common";
import Button from "../../common/component/styled/Button";
interface IProps {
  issuers?: OIDCConfig[];
  type?: AuthType
}
const OidcLoginButton: FC<IProps> = ({ issuers, type = "login" }) => {
  const { t } = useTranslation("auth");
  const { t: ct } = useTranslation();
  const [modal, setModal] = useState(false);
  if (!issuers) return null;
  return (
    <>
      <Button
        className="flex ghost flex-center gap-2"
        onClick={() => {
          setModal(true);
        }}
      >
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
