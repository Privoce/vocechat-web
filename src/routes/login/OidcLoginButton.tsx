/* eslint-disable no-undef */
import { FC, useState } from "react";
import styled from "styled-components";
import StyledModal from "../../common/component/styled/Modal";
import Modal from "../../common/component/Modal";
import { StyledSocialButton } from "./styled";
import StyledButton from "../../common/component/styled/Button";
import OidcLoginEntry from "./OidcLoginEntry";
import { OIDCConfig } from "../../types/auth";
import { useTranslation } from "react-i18next";
import { AuthType } from "../../types/common";

const StyledOidcLoginModal = styled(StyledModal)`
  text-align: center;
  padding: 32px 32px 16px;

  > *:first-child {
    margin-bottom: 32px;
  }

  > .button {
    > .icon {
      width: 24px;
      height: 24px;
    }

    &.buttonCancel {
      color: #8f8f8f;
    }
  }
`;
interface IProps {
  issuers?: OIDCConfig[];
  type?: AuthType
}
const OidcLoginButton: FC<IProps> = ({ issuers, type = "login" }) => {
  const { t } = useTranslation("auth");
  const [modal, setModal] = useState(false);
  if (!issuers) return null;
  return (
    <>
      <StyledSocialButton
        onClick={() => {
          setModal(true);
        }}
      >
        {type == "login" ? t("login.oidc") : t("reg.oidc")}
      </StyledSocialButton>
      {modal && (
        <Modal id="modal-modal">
          <StyledOidcLoginModal title="Login with OIDC">
            {issuers
              .filter((issuer) => issuer.enable)
              .map((issuer, index) => (
                <OidcLoginEntry issuer={issuer} key={index} />
              ))}
            <StyledButton
              className="border_less ghost buttonCancel"
              onClick={() => {
                setModal(false);
              }}
            >
              Close
            </StyledButton>
          </StyledOidcLoginModal>
        </Modal>
      )}
    </>
  );
};
export default OidcLoginButton;
